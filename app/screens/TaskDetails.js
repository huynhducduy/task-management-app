import { useFocusEffect } from '@react-navigation/native';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { format, formatDistance, toDate } from 'date-fns';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Loader from '../components/loader';
import {
  endpoint,
  TASK,
  TASK_CHECK,
  TASK_CLOSE,
  TASK_CONFIRM,
  TASK_HAVE_PERMISSION,
  TASK_START,
  TASK_VERIFY,
  USER,
} from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Get, Patch, Post } from '../utils/api_caller';
import getStatus from '../utils/getStatus';

const win = Dimensions.get('window');

export default function TaskDetails({ navigation, route }) {
  // const [menuVisible, setMenuVisible] = useState(false);
  const [proofVisible, setProofVisible] = React.useState(false);
  const { setLoading } = LoadingContainer.useContainer();
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [report, setReport] = useState('');
  const [assigner, setAssigner] = useState({});
  const [assignee, setAssignee] = useState({});
  const [permission, setPermission] = useState('nope');
  const [oldTask, setOldTask] = useState({});
  const [realDate, setRealDate] = useState(false);
  const [stt, sttColor] = getStatus(task.status, task.is_closed);

  function loadData() {
    Get({
      to: endpoint(TASK, { id: route.params.id }),
      setLoading,
    })
      .then(res => {
        setTask(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setReport(res.data.report);

        Get({
          to: endpoint(TASK_HAVE_PERMISSION, { id: route.params.id }),
          setLoading,
        })
          .then(res1 => {
            setPermission(res1.data.message);
          })
          .catch(() => setPermission('nope'));

        Get({ to: endpoint(USER, { id: res.data.assignee }) })
          .then(res2 => {
            setAssignee(res2.data);
          })
          .catch(err2 => {
            console.log(err2.response);
          });

        if (res.data.assigner) {
          Get({ to: endpoint(USER, { id: res.data.assigner }) })
            .then(res1 => {
              setAssigner(res1.data);
            })
            .catch(err => {
              console.log(err.response);
            });
        }

        if (res.data.open_from) {
          Get({ to: endpoint(TASK, { id: res.data.open_from }) })
            .then(res1 => {
              setOldTask(res1.data);
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function toggleRealDate() {
    setRealDate(!realDate);
  }

  async function markAs(blocked = false) {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // eslint-disable-next-line
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    console.log(result.uri);

    const formData = new FormData();
    formData.append('proof', {
      uri: result.uri,
      name: 'image.png',
      type: 'image/jpeg',
    });

    Post({
      to: endpoint(TASK_CONFIRM, { id: route.params.id }),
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: { blocked },
      data: formData,
    })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  function verify(ok) {
    Post({
      to: endpoint(TASK_VERIFY, { id: route.params.id }),
      params: { ok },
    })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  function check(good) {
    Post({
      to: endpoint(TASK_CHECK, { id: route.params.id }),
      params: { close: !good },
    })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  function close() {
    Post({
      to: endpoint(TASK_CLOSE, { id: route.params.id }),
    })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  function save() {
    Patch({
      to: endpoint(TASK, { id: route.params.id }),
      data: {
        name,
        description,
        report,
      },
    }).then(navigation.goBack);
  }

  function start() {
    Post({
      to: endpoint(TASK_START, { id: route.params.id }),
    })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  const toggleProof = () => {
    setProofVisible(!proofVisible);
  };

  // const menuData = [
  //   {
  //     title: 'Start',
  //     icon: style => <Icon {...style} name="play" />,
  //   },
  //   {
  //     title: 'Check',
  //     icon: style => <Icon {...style} name="check-outline" />,
  //   },
  //   {
  //     title: 'Confirm',
  //     icon: style => <Icon {...style} name="certificate" />,
  //   },
  //   {
  //     title: 'Verify',
  //     icon: style => <Icon {...style} name="radiobox-marked" />,
  //   },
  //   {
  //     title: 'Close',
  //     icon: style => <Icon {...style} name="close" />,
  //   },
  // ];

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  // const onMenuItemSelect = index => {
  //   setMenuVisible(false);
  //   console.log(index);
  // };

  useFocusEffect(useCallback(loadData, []), []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(51, 102, 255)',
      }}
    >
      <StatusBar barStyle="light-content" />
      <TopNavigation
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{
          color: 'white',
          fontSize: 18,
        }}
        title="Task Details"
        alignment="center"
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon
                {...style}
                style={{
                  color: 'white',
                }}
                name="arrow-left"
              />
            )}
            onPress={() => navigation.goBack()}
          />
        }
        rightControls={
          <>
            <TopNavigationAction
              icon={style => (
                <Icon
                  {...style}
                  style={{
                    color: 'white',
                  }}
                  name="reload"
                />
              )}
              onPress={loadData}
            />
            {permission === 'manage' && (
              <TopNavigationAction
                icon={style => (
                  <Icon
                    {...style}
                    style={{
                      color: 'white',
                    }}
                    name="close-circle"
                  />
                )}
                onPress={close}
              />
            )}
            {/* <OverflowMenu
              visible={menuVisible}
              data={menuData}
              onSelect={onMenuItemSelect}
              onBackdropPress={toggleMenu}
            >
              <TopNavigationAction
                icon={style => (
                  <Icon
                    {...style}
                    style={{
                      color: 'white',
                    }}
                    name="menu"
                  />
                )}
                onPress={toggleMenu}
              />
            </OverflowMenu> */}
          </>
        }
      />
      {(permission === 'do' || permission === 'manage') &&
        task.status === 1 &&
        task.is_closed === false && (
          <Layout style={{ padding: 10, paddingBottom: 0 }}>
            <Button
              size="tiny"
              icon={stylei => (
                <Icon {...stylei} name="play" style={{ marginHorizontal: 0 }} />
              )}
              onPress={start}
            >
              START
            </Button>
          </Layout>
        )}
      {(permission === 'do' || permission === 'manage') &&
        task.status === 2 &&
        task.is_closed === false && (
          <Layout
            style={{ flexDirection: 'row', padding: 10, paddingBottom: 0 }}
          >
            <Button
              style={{ width: '49%' }}
              status="success"
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="check"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => markAs(false)}
            >
              MARK AS DONE
            </Button>
            <Layout style={{ width: '2%' }} />
            <Button
              status="danger"
              style={{ width: '49%' }}
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="close"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => markAs(true)}
            >
              MARK AS BLOCKED
            </Button>
          </Layout>
        )}
      {permission === 'manage' &&
        task.status === 0 &&
        task.is_closed === false && (
          <Layout
            style={{ flexDirection: 'row', padding: 10, paddingBottom: 0 }}
          >
            <Button
              style={{ width: '49%' }}
              status="success"
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="check"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => check(true)}
            >
              APPPROVE TASK
            </Button>
            <Layout style={{ width: '2%' }} />
            <Button
              status="danger"
              style={{ width: '49%' }}
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="close"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => check(false)}
            >
              REJECT TASK
            </Button>
          </Layout>
        )}
      {permission === 'manage' &&
        [3, 4].includes(task.status) &&
        task.is_closed === false && (
          <Layout
            style={{ flexDirection: 'row', padding: 10, paddingBottom: 0 }}
          >
            <Button
              style={{ width: '49%' }}
              status="success"
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="check"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => verify(true)}
            >
              APPPROVE
            </Button>
            <Layout style={{ width: '2%' }} />
            <Button
              status="danger"
              style={{ width: '49%' }}
              size="tiny"
              icon={stylei => (
                <Icon
                  {...stylei}
                  name="close"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={() => verify(false)}
            >
              REJECT
            </Button>
          </Layout>
        )}
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'top',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <Loader />
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            disabled={permission === 'do'}
          />
          <Input
            label="Description"
            value={description}
            multiline
            onChangeText={setDescription}
            autoCapitalize="none"
            disabled={permission === 'do'}
          />
          {task.status !== 0 && task.status !== 1 && (
            <Input
              label="Report"
              value={report}
              multiline
              onChangeText={setReport}
              autoCapitalize="none"
            />
          )}
          <Layout style={{ width: '100%' }}>
            <Layout
              level="1"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
              }}
            >
              <Text appearance="hint" category="s1">
                Status
              </Text>
              <Text category="s1" style={{ color: sttColor }}>
                {stt}
              </Text>
            </Layout>
            <Divider />
            {task.start_at && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Start at
                  </Text>
                  <TouchableOpacity onPress={toggleRealDate}>
                    <Text category="s1">
                      {realDate
                        ? format(toDate(task.start_at * 1000), 'dd/MM/yyyy')
                        : formatDistance(
                            toDate(task.start_at * 1000),
                            new Date()
                          )}
                    </Text>
                  </TouchableOpacity>
                </Layout>
                <Divider />
              </>
            )}
            {task.open_from && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Old task
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('TaskDetails', {
                        id: task.open_from,
                      })
                    }
                  >
                    <Text category="s1">{oldTask.name}</Text>
                  </TouchableOpacity>
                </Layout>
                <Divider />
              </>
            )}
            {task.assigner && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Assigner
                  </Text>
                  <Layout style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProfileView', {
                          id: assigner.id,
                        })
                      }
                    >
                      <Text
                        category="s1"
                        style={{ marginTop: 2, marginRight: 10 }}
                      >
                        {assigner.username}
                      </Text>
                    </TouchableOpacity>
                    <Button
                      size="tiny"
                      icon={stylei => (
                        <Icon
                          {...stylei}
                          name="pencil"
                          style={{ marginHorizontal: 0 }}
                        />
                      )}
                    />
                  </Layout>
                </Layout>
              </>
            )}
            <Divider />
            <Layout
              level="1"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
              }}
            >
              <Text appearance="hint" category="s1">
                Assignee
              </Text>
              <Layout style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProfileView', {
                      id: assignee.id,
                    })
                  }
                >
                  <Text category="s1" style={{ marginTop: 2, marginRight: 10 }}>
                    {assignee.username}
                  </Text>
                </TouchableOpacity>
                <Button
                  size="tiny"
                  icon={stylei => (
                    <Icon
                      {...stylei}
                      name="pencil"
                      style={{ marginHorizontal: 0 }}
                    />
                  )}
                />
              </Layout>
            </Layout>
            <Divider />
            {task.stop_at && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Deadline
                  </Text>
                  <Layout style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={toggleRealDate}>
                      <Text category="s1" style={{ marginRight: 10 }}>
                        {realDate
                          ? format(toDate(task.stop_at * 1000), 'dd/MM/yyyy')
                          : formatDistance(
                              toDate(task.stop_at * 1000),
                              new Date()
                            )}
                      </Text>
                    </TouchableOpacity>
                    <Button
                      size="tiny"
                      icon={stylei => (
                        <Icon
                          {...stylei}
                          name="pencil"
                          style={{ marginHorizontal: 0 }}
                        />
                      )}
                    />
                  </Layout>
                </Layout>
                <Divider />
              </>
            )}
            {task.status !== 2 && task.proof && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Proof
                  </Text>
                  <TouchableOpacity onPress={toggleProof}>
                    <Avatar
                      source={{
                        uri: `http://192.168.0.4:8080/images/${task.proof}`,
                      }}
                    />
                  </TouchableOpacity>
                </Layout>
                <Divider />
              </>
            )}
            {task.report && task.review && (
              <>
                <Input
                  disabled
                  label="Review"
                  style={{ marginTop: 5 }}
                  value={task.report}
                  multiline
                  autoCapitalize="none"
                />
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Mark
                  </Text>
                  <Text category="s1">
                    {task.review}
                    <Text style={{ fontSize: 10 }}> / 10</Text>
                  </Text>
                </Layout>
                <Divider />
              </>
            )}
            {task.close_at && (
              <>
                <Layout
                  level="1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text appearance="hint" category="s1">
                    Close at
                  </Text>
                  <Layout style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={toggleRealDate}>
                      <Text category="s1">
                        {realDate
                          ? format(toDate(task.close_at * 1000), 'dd/MM/yyyy')
                          : formatDistance(
                              toDate(task.close_at * 1000),
                              new Date()
                            )}
                      </Text>
                    </TouchableOpacity>
                  </Layout>
                </Layout>
                <Divider />
              </>
            )}
            {(permission === 'manage' || permission === 'do') &&
              !task.is_closed && (
                <Button
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 15,
                  }}
                  icon={style => <Icon {...style} name="content-save" />}
                  onPress={save}
                >
                  SAVE
                </Button>
              )}
          </Layout>
        </Layout>
      </ScrollView>
      {task.proof && (
        <Modal
          backdropStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onBackdropPress={toggleProof}
          visible={proofVisible}
        >
          <TouchableWithoutFeedback onPress={toggleProof}>
            <Image
              source={{ uri: `http://192.168.0.4:8080/images/${task.proof}` }}
              resizeMode="contain"
              style={{
                width: win.width - 20,
                height: win.height - 20,
              }}
            />
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
}

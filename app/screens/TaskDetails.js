import { useFocusEffect } from '@react-navigation/native';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Modal,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Loader from '../components/loader';
import { endpoint, TASK, TASKS_ASSIGNABLE } from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Get } from '../utils/api_caller';

const imageAddress = {
  uri:
    'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/p720x720/89226360_1242331635970433_5737219590329466880_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_oc=AQl9FzRHX52DuOeZ-vs09OCwdLJlhfbPo3m1yMe0ooQCRXStwcVcoKSUlhSPMNUPx7Y&_nc_ht=scontent-hkg3-1.xx&_nc_tp=6&oh=eeeb2e1902a61a36655e9dfea66f7824&oe=5EA0FC6E',
};

export default function TaskDetails({ navigation, route }) {
  const [proofVisible, setProofVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { setLoading } = LoadingContainer.useContainer();
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [report, setReport] = useState('');
  // const [assignerId, setAssignerId] = useState(0);
  // const [assigneeId, setAssigneeId] = useState(0);

  const toggleProof = () => {
    setProofVisible(!proofVisible);
  };

  function loadData() {
    Promise.all([
      Get({
        to: endpoint(TASK, { id: route.params.id }),
        setLoading,
      }),
      Get({
        to: endpoint(TASKS_ASSIGNABLE, { id: route.params.id }),
      }),
    ])
      // eslint-disable-next-line
      .then(([res1, res2]) => {
        setTask(res1.data);
        setName(res1.data.name);
        setDescription(res1.data.description);
        setReport(res1.data.report);
      })
      .catch(([err1, err2]) => {
        console.log(err1.response, err2.response);
      });
  }

  const menuData = [
    {
      title: 'Start',
      icon: style => <Icon {...style} name="play" />,
    },
    {
      title: 'Check',
      icon: style => <Icon {...style} name="check-outline" />,
    },
    {
      title: 'Confirm',
      icon: style => <Icon {...style} name="certificate" />,
    },
    {
      title: 'Verify',
      icon: style => <Icon {...style} name="radiobox-marked" />,
    },
    {
      title: 'Close',
      icon: style => <Icon {...style} name="close" />,
    },
  ];

  useFocusEffect(useCallback(loadData, []), []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = index => {
    setMenuVisible(false);
    console.log(index);
  };

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
          <OverflowMenu
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
          </OverflowMenu>
        }
      />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'top',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <Loader />
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <Input
            label="Description"
            value={description}
            multiline
            onChangeText={setDescription}
            autoCapitalize="none"
          />
          <Input
            label="Report"
            value={report}
            multiline
            onChangeText={setReport}
            autoCapitalize="none"
          />
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
              <Text category="s1">On-going</Text>
            </Layout>
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
                Start at
              </Text>
              <Text category="s1">Yesterday</Text>
            </Layout>
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
                Old task
              </Text>
              <Text category="s1">this task cannot be done</Text>
            </Layout>
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
                Assigner
              </Text>
              <Layout style={{ flexDirection: 'row' }}>
                <Text category="s1" style={{ marginTop: 2, marginRight: 10 }}>
                  duy0
                </Text>
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
                <Text category="s1" style={{ marginTop: 2, marginRight: 10 }}>
                  duy1
                </Text>
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
                <Text category="s1" style={{ marginTop: 2, marginRight: 10 }}>
                  One month later
                </Text>
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
                <Avatar source={imageAddress} />
              </TouchableOpacity>
            </Layout>
            <Divider />
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
              <Text category="s1">10</Text>
            </Layout>
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
                Review at
              </Text>
              <Text category="s1">Today</Text>
            </Layout>
            <Button
              style={{
                marginHorizontal: 10,
                marginVertical: 15,
              }}
              icon={style => <Icon {...style} name="content-save" />}
              // onPress={onDoneButtonPress}
            >
              SAVE
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
      <Modal
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onBackdropPress={toggleProof}
        visible={proofVisible}
      >
        <Image
          source={imageAddress}
          style={{ width: 350, height: 350, borderRadius: 10 }}
        />
      </Modal>
    </SafeAreaView>
  );
}

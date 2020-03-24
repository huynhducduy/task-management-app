import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Modal,
  Select,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';

import Loader from '../components/loader';
import { endpoint, GROUP, GROUP_MEMBER, GROUPS_ADDABLES } from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Delete, Get, Patch, Put } from '../utils/api_caller';

export default function GroupDetails({ route, navigation }) {
  const [members, setMembers] = useState([]);
  const [managerId, setManagerId] = useState();
  const [manager, setManager] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addMemberVisible, setAddMemberVisible] = React.useState(false);
  const [addables, setAddables] = useState([]);
  const [toAdd, setToAdd] = useState();
  const { setLoading } = LoadingContainer.useContainer();
  const [searchValue, setSeachValue] = useState('');

  function loadData() {
    Promise.all([
      Get({ to: endpoint(GROUP, { id: route.params.id }), setLoading }),
      Get({ to: endpoint(GROUP_MEMBER, { id: route.params.id }) }),
    ])
      .then(([res1, res2]) => {
        setManagerId(res1.data.manager_id);
        setMembers(res2.data);
        setName(res1.data.name);
        setDescription(res1.data.description);
      })
      .catch(([err1, err2]) => {
        console.log(err1.response, err2.response);
      });
  }

  function loadMember() {
    Get({ to: endpoint(GROUP_MEMBER, { id: route.params.id }) }).then(res =>
      setMembers(res.data)
    );
  }

  function addMem() {
    Put({
      to: endpoint(GROUP_MEMBER, { id: route.params.id }),
      params: {
        id: toAdd.id,
      },
    }).then(() => {
      loadMember();
      setToAdd({});
      setAddMemberVisible(false);
    });
  }

  function removeMem(id) {
    Delete({
      to: endpoint(GROUP_MEMBER, { id: route.params.id }),
      params: {
        id,
      },
    }).then(() => {
      loadMember();
    });
  }

  function remove() {
    Delete({
      to: endpoint(GROUP, { id: route.params.id }),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {
        // eslint-disable-next-line
        alert('Remove all members first');
      });
  }

  function save() {
    Patch({
      to: endpoint(GROUP, { id: route.params.id }),
      data: {
        manager_id: managerId,
        name,
        description,
      },
    }).then(() => navigation.goBack());
  }

  useEffect(() => {
    members.forEach(value => {
      if (value.id === managerId) {
        setManager({ text: value.username, id: value.id });
      }
    });
  }, [managerId, members]);

  function toggleAddMemberVisible() {
    if (addMemberVisible === false) {
      Get({ to: GROUPS_ADDABLES }).then(res => {
        setAddables(
          res.data.map(m => {
            return { text: m.username, id: m.id };
          })
        );
        setAddMemberVisible(true);
      });
    } else {
      setAddMemberVisible(false);
    }
  }

  function setToAddd(data) {
    setToAdd(data);
  }

  useFocusEffect(useCallback(loadData, []), []);

  function renderMember({ item, index }) {
    return (
      <ListItem
        key={index}
        icon={style => <Icon {...style} name="account-circle" />}
        title={item.username}
        description={item.full_name}
        onPress={() => {
          navigation.navigate('ProfileView', { id: item.id });
        }}
        accessory={style => (
          <Button
            size="tiny"
            style={style}
            status="danger"
            onPress={() => {
              removeMem(item.id);
            }}
            icon={() => (
              <Icon
                {...style}
                style={{
                  marginLeft: -5,
                  marginRight: -5,
                  marginTop: -5,
                  marginBottom: -5,
                }}
                name="close"
              />
            )}
          />
        )}
      />
    );
  }

  return (
    <>
      <TopNavigation
        title="Group details"
        alignment="center"
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="arrow-left" />
            )}
            onPress={() => navigation.navigate('GroupList')}
          />
        }
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="plus" />
            )}
            onPress={toggleAddMemberVisible}
          />
        }
      />

      <Layout style={{ flex: 1 }}>
        <Loader />
        <Layout
          style={{
            justifyContent: 'top',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            labelStyle={{ marginTop: 10 }}
            autoCapitalize="none"
          />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            labelStyle={{ marginTop: 10 }}
            autoCapitalize="none"
          />
          <Select
            controlStyle={{ width: '100%' }}
            label="Manager"
            data={members.map(m => {
              return { text: m.username, id: m.id };
            })}
            textStyle={{ fontWeight: 'normal' }}
            selectedOption={manager}
            onSelect={data => {
              setManager(data);
              setManagerId(data.id);
            }}
          />
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button style={{ marginTop: 10 }} onPress={save}>
              Save
            </Button>
            <Button
              style={{ marginTop: 10, marginLeft: 10 }}
              buttonStyle={{ backgroundColor: 'red' }}
              status="danger"
              onPress={remove}
            >
              Remove
            </Button>
          </Layout>
        </Layout>
        <Input
          value={searchValue}
          placeholder="Search"
          icon={style => <Icon {...style} name="magnify" />}
          onChangeText={setSeachValue}
          style={{ marginHorizontal: 10 }}
          autoCapitalize="none"
        />
        <List
          data={members.filter(function filter(c) {
            return (
              searchValue === '' ||
              c.full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
              c.username.toLowerCase().includes(searchValue.toLowerCase())
            );
          })}
          renderItem={renderMember}
        />
        <Modal
          visible={addMemberVisible}
          onBackdropPress={toggleAddMemberVisible}
          backdropStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          style={{ width: '100%', paddingHorizontal: 25 }}
        >
          <Layout
            level="4"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 5,
            }}
          >
            <Layout
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <Button
                status="danger"
                onPress={toggleAddMemberVisible}
                size="small"
                style={{
                  flexDirection: 'row-reverse',
                  position: 'absolute',
                  transform: [{ translateY: '-15' }, { translateX: '-15' }],
                }}
                icon={style => (
                  <Icon
                    {...style}
                    style={{
                      marginLeft: -5,
                      marginRight: -5,
                      marginTop: -5,
                      marginBottom: -5,
                    }}
                    name="close"
                  />
                )}
              />
            </Layout>
            <Select
              controlStyle={{ width: '100%' }}
              label="Add member"
              data={addables}
              textStyle={{ fontWeight: 'normal' }}
              selectedOption={toAdd}
              onSelect={setToAddd}
            />
            <Button style={{ marginTop: 15 }} onPress={addMem}>
              Add
            </Button>
          </Layout>
        </Modal>
      </Layout>
    </>
  );
}

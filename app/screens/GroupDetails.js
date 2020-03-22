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

import { endpoint, GROUP, GROUP_MEMBER, GROUPS_ADDABLES } from '../endpoints';
import { Delete, Get, Patch, Put } from '../utils/api_caller';

export default function GroupDetails({ route, navigation }) {
  const [members, setMembers] = useState([]);
  const [managerId, setManagerId] = useState();
  const [manager, setManager] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [addables, setAddables] = useState([]);
  const [toAdd, setToAdd] = useState();

  const loadData = useCallback(function loadData(thisId) {
    Promise.all([
      Get({ to: endpoint(GROUP, { id: thisId }) }),
      Get({ to: endpoint(GROUP_MEMBER, { id: thisId }) }),
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
  }, []);

  useEffect(() => {
    if (visible)
      Get({ to: GROUPS_ADDABLES }).then(res => {
        setAddables(res.data);
      });
  }, [visible]);

  function add() {
    Put({
      to: endpoint(GROUP_MEMBER, { id: route.params.id }),
      params: {
        id: toAdd.id,
      },
    }).then(() => {
      loadData(route.params.id);
      setVisible(false);
    });
  }

  function removeMem(id) {
    Delete({
      to: endpoint(GROUP_MEMBER, { id: route.params.id }),
      params: {
        id,
      },
    }).then(() => {
      loadData(route.params.id);
    });
  }

  function remove() {
    Delete({
      to: endpoint(GROUP, { id: route.params.id }),
    }).then(() => {
      navigation.goBack();
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

  useEffect(() => {
    loadData(route.params.id);
  }, [route.params.id, loadData]);

  function renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.username}
        description={item.full_name}
        onPress={() => {
          navigation.navigate('ProfileView', { id: item.id });
        }}
        accessory={style => (
          <Button
            size="small"
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
            onPress={() => setVisible(true)}
          />
        }
      />
      <Layout
        style={{
          justifyContent: 'top',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}
      >
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          labelStyle={{ marginTop: 10 }}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          labelStyle={{ marginTop: 10 }}
        />
        <Select
          controlStyle={{ width: '100%' }}
          label="Manager"
          data={members.map(m => {
            return { text: m.username, id: m.id };
          })}
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
            marginBottom: 10,
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
      <List data={members} renderItem={renderItem} />
      <Modal visible={visible} onBackdropPress={() => setVisible(false)}>
        <Layout
          level="3"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 256,
            padding: 16,
            backgroundColor: '#3366FF',
            transform: [{ translateY: '-50%' }],
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
              onPress={() => setVisible(false)}
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
            labelStyle={{ color: 'white' }}
            status="basic"
            data={addables.map(m => {
              return { text: m.username, id: m.id };
            })}
            selectedOption={toAdd}
            onSelect={data => {
              setToAdd(data);
            }}
          />
          <Button style={{ marginTop: 15 }} onPress={add} status="basic">
            Add
          </Button>
        </Layout>
      </Modal>
    </>
  );
}

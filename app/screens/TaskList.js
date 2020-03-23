import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  RangeDatepicker,
  Select,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Loader from '../components/loader';
import { TASKS, USERS } from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Get } from '../utils/api_caller';

const statuses = [
  { text: 'Rejected', id: -1 }, // 0, 1
  { text: 'New', id: 0 }, // 0, 0
  { text: 'To-do', id: 1 }, // 1, 0
  { text: 'On-going', id: 2 }, // 2, 0
  { text: 'Reviewing', id: 3 }, // 3|4, 0
  { text: 'Done', id: 4 }, // 3, 1
  { text: 'Blocked', id: 5 }, // 4, 1
  { text: 'Overdue', id: 6 }, // 5
  { text: 'Closed', id: 7 }, // 1|2, 1
];

export default function TaskList({ navigation }) {
  const [searchValue, setSeachValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const setLoading = useCallback(LoadingContainer.useContainer().setLoading);
  const [range, setRange] = React.useState({});
  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const [selectedAssignees, setSelectedAssignees] = React.useState([]);
  const [selectedAssigners, setSelectedAssigners] = React.useState([]);

  const loadUsers = useCallback(
    function loadUsers() {
      Get({ to: USERS, setLoading })
        .then(res => {
          setUsers(
            res.data.map(u => {
              return { text: u.username, id: u.id };
            })
          );
        })
        .catch(err => {
          console.log('WTF', err.response);
        });
    },
    [setLoading]
  );

  function resetFilter() {
    setRange({});
    setSeachValue('');
    setSelectedStatus([]);
    setSelectedAssigners([]);
    setSelectedAssignees([]);
  }

  const onFilter = useCallback(
    function onFilter() {
      Get({
        to: TASKS,
        setLoading,
        params: {
          status: selectedStatus.map(s => s.id).join(','),
          assignee: selectedAssignees.map(s => s.id).join(','),
          assigner: selectedAssigners.map(s => s.id).join(','),
          deadline:
            range.startDate && range.endDate
              ? `${range.startDate.getTime() / 1000},${range.endDate.getTime() /
                  1000}`
              : '',
        },
      })
        .then(res => {
          setTasks(res.data);
        })
        .catch(err => {
          console.log('WTF', err.response);
        });
    },
    [
      range.endDate,
      range.startDate,
      selectedAssignees,
      selectedAssigners,
      selectedStatus,
      setLoading,
    ]
  );

  useFocusEffect(loadUsers, []);
  useFocusEffect(onFilter, []);

  function onPress(id) {
    navigation.navigate('TaskDetails', { id });
  }

  function renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.name}
        icon={style => <Icon {...style} name="briefcase" />}
        onPress={() => onPress(item.id)}
        description={item.description}
        descriptionStyle={{ fontSize: 12 }}
        accessory={style => <Icon {...style} name="chevron-right" />}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(51, 102, 255)' }}>
      <StatusBar barStyle="light-content" />
      <TopNavigation
        style={{ backgroundColor: 'rgb(51, 102, 255)' }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        title="Tasks"
        alignment="center"
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="reload" />
            )}
            onPress={() => {
              onFilter();
              loadUsers();
            }}
          />
        }
        rightControls={
          <>
            <TopNavigationAction
              icon={style => (
                <Icon
                  {...style}
                  style={{ color: 'white' }}
                  name="filter-remove"
                />
              )}
              onPress={resetFilter}
            />
            <TopNavigationAction
              icon={style => (
                <Icon {...style} style={{ color: 'white' }} name="plus" />
              )}
              onPress={() => navigation.navigate('TaskCreate')}
            />
          </>
        }
      />
      <Layout>
        <Layout
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10,
            marginTop: 20,
          }}
        >
          <RangeDatepicker
            range={range}
            onSelect={setRange}
            style={{ width: '49%' }}
            placeholder="Deadline"
          />
          <Layout style={{ width: '2%' }} />
          <Select
            data={statuses}
            multiSelect
            selectedOption={selectedStatus}
            onSelect={d => setSelectedStatus(d)}
            style={{ width: '49%' }}
            placeholder="Status"
          />
        </Layout>
        <Layout
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: -5,
          }}
        >
          <Select
            data={users}
            multiSelect
            selectedOption={selectedAssigners}
            onSelect={d => setSelectedAssigners(d)}
            style={{ width: '49%' }}
            placeholder="Assigner"
          />
          <Layout style={{ width: '2%' }} />
          <Select
            data={users}
            multiSelect
            selectedOption={selectedAssignees}
            onSelect={d => setSelectedAssignees(d)}
            style={{ width: '49%' }}
            placeholder="Assignee"
          />
        </Layout>
        {/* <Layout
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Button
            style={{
              flexDirection: 'row-reverse',
              width: '15%',
            }}
            onPress={resetFilter}
            icon={style => <Icon {...style} name="filter-remove" />}
          />
          <Layout style={{ width: '2%' }} />
          <Button
            style={{
              flexDirection: 'row-reverse',
              width: '83%',
            }}
            onPress={onFilter}
            icon={style => <Icon {...style} name="filter" />}
          >
            Filter
          </Button>
        </Layout> */}
        <Input
          value={searchValue}
          placeholder="Search..."
          icon={style => <Icon {...style} name="magnify" />}
          onChangeText={setSeachValue}
          style={{ margin: 10 }}
          autoCapitalize="none"
        />
      </Layout>
      <Layout
        style={{
          flex: 1,
        }}
      >
        <Loader />
        <List
          data={tasks.filter(function filter(c) {
            return (
              searchValue === '' ||
              c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              c.description.toLowerCase().includes(searchValue.toLowerCase())
            );
          })}
          renderItem={renderItem}
        />
      </Layout>
    </SafeAreaView>
  );
}

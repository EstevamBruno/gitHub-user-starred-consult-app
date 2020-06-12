import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Keyboard, ActivityIndicator } from 'react-native';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Bio,
  Name,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import api from '../../services/api';

const Main = ({ navigation }) => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsersAsyncStorage() {
      const usersOnAsyncStorage = await AsyncStorage.getItem('users');

      if (usersOnAsyncStorage) setUsers(JSON.parse(usersOnAsyncStorage));
    }

    getUsersAsyncStorage();
  }, []);

  useEffect(() => {
    async function setUsersAsyncStorage() {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }

    setUsersAsyncStorage();
  }, [users]);

  async function submit() {
    setLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers([...users, data]);
    setNewUser('');
    setLoading(false);

    Keyboard.dismiss();
  }

  function navigationToDetails(user) {
    navigation.navigate('User', { user });
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
        />
        <SubmitButton loading={loading} onPress={submit}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => navigationToDetails(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

export default Main;

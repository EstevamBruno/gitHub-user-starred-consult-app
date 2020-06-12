import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  StarsList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

const User = ({ navigation, route }) => {
  const { user } = route.params;
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: user.name });
  }, []);

  useEffect(() => {
    async function getStarredUser() {
      const response = await api.get(`/users/${user.login}/starred`);

      setStarred(response.data);
    }

    getStarredUser();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <StarsList
        data={starred}
        keyExtractor={(star) => String(star.id)}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
};

export default User;

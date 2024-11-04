import { Column } from '@hakit/components';
import { useHass } from '@hakit/core';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

function Home() {
  const { getUser } = useHass();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <Column fullWidth>
      <h2>Hello {user ? user.name : ' there!'}</h2>
      <p>The time below should be updating from home asisstant every minute</p>
      <Dashboard />
    </Column>
  );
}

export default Home;

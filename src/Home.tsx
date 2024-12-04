import { Column } from '@hakit/components';
import { useHass } from '@hakit/core';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { HassUser } from 'home-assistant-js-websocket';

function Home() {
  const { getUser } = useHass();
  const [user, setUser] = useState<HassUser | null>(null);

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
      <Dashboard />
    </Column>
  );
}

export default Home;

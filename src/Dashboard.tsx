import { Column, MediaPlayerCard, TimeCard, WeatherCard } from '@hakit/components';
import { useHass } from '@hakit/core';

function Dashboard() {
  const { getAllEntities } = useHass();
  const entities = getAllEntities();
  console.log(entities);
  return (
    <Column fullWidth>
      <h2>Succesfully Authenticated!</h2>
      <p>The time below should be updating from home asisstant every minute</p>
      <TimeCard />
      <br />
      <WeatherCard entity='weather.forecast_home' />
      <br />
      <MediaPlayerCard entity='media_player.work_station' layout='slim' />
      <p>
        You have <b>{Object.keys(entities).length}</b> entities to start automating with! Have fun!
      </p>
    </Column>
  );
}

export default Dashboard;

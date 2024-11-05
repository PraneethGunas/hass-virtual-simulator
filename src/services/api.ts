import axios from 'axios';

const BASE_URL = 'http://hammock.local:8123';
const VIRTUAL_SEVICE = '/api/virtual';

const ADD_VIRTUAL_DEVICE = `${BASE_URL}${VIRTUAL_SEVICE}/add`;
export const addEntity = async (config: any) => {
  return await axios.post(ADD_VIRTUAL_DEVICE, config, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HA_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

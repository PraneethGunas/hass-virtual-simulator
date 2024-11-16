import axios from 'axios';

const BASE_URL = 'http://hammock.local:8123';
const API = '/api';
const VIRTUAL_SEVICE = '/virtual';

const ADD_VIRTUAL_DEVICE = `${BASE_URL}${API}${VIRTUAL_SEVICE}/add`;
const AUTOMATION_ENTRY = `${BASE_URL}${API}/config/automation/config/entry`;
export const addEntity = async (config: any) => {
  return await axios.post(ADD_VIRTUAL_DEVICE, config, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HA_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

export const createAutomation = async (automationConfig: any) => {
  return await axios.post(AUTOMATION_ENTRY, automationConfig, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HA_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

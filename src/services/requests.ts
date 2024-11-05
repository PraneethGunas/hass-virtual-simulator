import { addEntity } from './api';
import { captureError } from './logger';

export const addLightEntity = async (name: string) => {
  try {
    await addEntity({
      platform: 'light',
      name: name,
      initial_availability: true,
      initial_value: 'on',
      support_brightness: true,
      initial_brightness: 20,
      support_color: true,
      initial_color: [0, 100],
      support_color_temp: true,
      initial_color_temp: 255,
      support_white_value: true,
      initial_white_value: 240,
    });
  } catch (error) {
    captureError(error, 'Failed to add light entity');
  }
};

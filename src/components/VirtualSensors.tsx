import { Column, Group, RangeSlider, SensorCard } from '@hakit/components';
import { useVirtual } from '../Hooks/useVirtual';
import { useCallback } from 'react';
import { useHass } from '@hakit/core';

export const VirtualSensors = () => {
  const { callService } = useHass();
  const { virtualObjects } = useVirtual();
  const sensors = virtualObjects.filter(obj => obj.entity_id.includes('sensor.'));

  const updateTemperature = useCallback((entity_id: string, value: number) => {
    callService({
      domain: 'virtual',
      service: 'set',
      serviceData: {
        value,
      },
      target: {
        entity_id,
      },
    });
  }, []);

  return (
    <Group title='Virtual Sensors'>
      {sensors.map(sensor => (
        <Column fullWidth key={sensor.entity_id}>
          <SensorCard entity={sensor.entity_id} />
          <RangeSlider
            min={-20}
            max={100}
            step={1}
            value={Number(sensor.state)}
            onChange={value => {
              updateTemperature(sensor.entity_id, value);
            }}
          />
        </Column>
      ))}
    </Group>
  );
};

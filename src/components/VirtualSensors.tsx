import { Column, Group, RangeSlider, SensorCard } from '@hakit/components';
import { useVirtual } from '../Hooks/useVirtual';
import { useCallback, useMemo } from 'react';
import { useHass } from '@hakit/core';

export const VirtualSensors = () => {
  const { callService } = useHass();
  const { virtualObjects } = useVirtual();

  const sensors = useMemo(() => virtualObjects.filter(obj => obj.entity_id.includes('sensor.')), [virtualObjects]);

  const updateValue = useCallback((entity_id: string, value?: number) => {
    const isBinary = entity_id.startsWith('binary_sensor');
    callService({
      domain: 'virtual',
      service: isBinary ? 'toggle' : 'set',
      serviceData: {
        ...(value !== undefined && { value }),
      },
      target: {
        entity_id,
      },
    });
  }, []);

  const handleSliderChange = useCallback(
    (sensorId: string, value: number) => {
      updateValue(sensorId, value);
    },
    [updateValue]
  );

  const handleSensorClick = useCallback(
    (sensorId: string) => {
      updateValue(sensorId);
    },
    [updateValue]
  );

  return (
    <Group title='Virtual Sensors'>
      {sensors.map(sensor => (
        <Column fullWidth key={sensor.entity_id}>
          <SensorCard entity={sensor.entity_id} onClick={() => handleSensorClick(sensor.entity_id)} />
          {!sensor.entity_id.startsWith('binary_sensor') && (
            <RangeSlider
              min={-20}
              max={100}
              step={1}
              value={Number(sensor.state)}
              onChange={value => handleSliderChange(sensor.entity_id, value)}
            />
          )}
        </Column>
      ))}
    </Group>
  );
};

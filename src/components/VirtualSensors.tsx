import { Column, FabCard, Group, RangeSlider, SensorCard } from '@hakit/components';
import { useVirtual } from '../Hooks/useVirtual';
import { useCallback, useMemo } from 'react';
import { EntityName, useHass } from '@hakit/core';
import { addSensorEntity } from '../services/requests';

const AddSensorButton = ({ onAdd }) => <FabCard icon='mdi:plus' onClick={onAdd} title='Add sensor' />;
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

  const handleAddSensor = async () => {
    const name = window.prompt('Enter a name for the new sensor:');
    if (!name) return; // Exit if no name is provided
    await addSensorEntity(name); // Use the external service function
  };

  return (
    <Group title='Virtual Sensors'>
      <div>
        <AddSensorButton onAdd={handleAddSensor} />
      </div>
      {sensors.map(sensor => (
        <Column key={sensor.entity_id} fullWidth>
          <SensorCard entity={sensor.entity_id as EntityName} onClick={() => handleSensorClick(sensor.entity_id)} />
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

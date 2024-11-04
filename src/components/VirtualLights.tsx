import { Group, LightControls } from '@hakit/components';
import { useVirtual } from '../Hooks/useVirtual';

export const VirtualLights = () => {
  const { virtualObjects } = useVirtual();
  const lights = virtualObjects.filter(obj => obj.entity_id.includes('light.'));

  return (
    <Group title='Virtual Lights'>
      {lights.map(light => (
        <LightControls entity={light.entity_id} />
      ))}
    </Group>
  );
};

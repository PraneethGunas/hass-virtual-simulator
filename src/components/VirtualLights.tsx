import { CardBase, FabCard, Group, LightControls, Row } from '@hakit/components';
import { useVirtual } from '../Hooks/useVirtual';
import { addLightEntity } from '../services/requests';

const AddLightButton = ({ onAdd }) => <FabCard icon='mdi:plus' onClick={onAdd} title='Add light' />;

const LightCard = ({ light }) => (
  <Row fullWidth={false}>
    <LightControls key={light.entity_id} entity={light.entity_id} />
    <CardBase disableRipples disabled disableActiveState>
      <h3 style={{ padding: '1rem', width: 200 }}>{`${light.attributes.friendly_name}`}</h3>
    </CardBase>
  </Row>
);

export const VirtualLights = () => {
  const { virtualObjects } = useVirtual();
  const lights = virtualObjects.filter(obj => obj.entity_id.includes('light.'));

  const handleAddLight = async () => {
    const name = window.prompt('Enter a name for the new light:');
    if (!name) return; // Exit if no name is provided
    await addLightEntity(name); // Use the external service function
  };

  return (
    <Group title='Virtual Lights'>
      <div>
        <AddLightButton onAdd={handleAddLight} />
      </div>
      {lights.map(light => (
        <LightCard key={light.entity_id} light={light} />
      ))}
    </Group>
  );
};

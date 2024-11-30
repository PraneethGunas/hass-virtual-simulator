import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock';
import { FabCard } from '@hakit/components';
import { createAutomation } from '../services/api';

export const AutomationDiff = ({ automation, isModified, modifiedAutomation, onClose }) => {
  // Handles the creation of the modified automation
  const handleCreateAutomation = async () => {
    if (!modifiedAutomation) return;

    try {
      const { id, ...automationData } = modifiedAutomation; // Exclude `id` from the request payload
      await createAutomation(automationData);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create automation:', error);
    }
  };

  return (
    <div className='overlay' onClick={onClose}>
      <div className='overlay-content'>
        <CodeBlock code={automation} />
        {isModified && <CodeBlock code={modifiedAutomation} />}
      </div>
      {isModified && <FabCard onClick={handleCreateAutomation} icon='mdi:add' />}
    </div>
  );
};

AutomationDiff.propTypes = {
  automation: PropTypes.string.isRequired,
  isModified: PropTypes.bool.isRequired,
  modifiedAutomation: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

AutomationDiff.defaultProps = {
  modifiedAutomation: null,
};

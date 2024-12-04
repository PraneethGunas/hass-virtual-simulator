import { HassEntity } from 'home-assistant-js-websocket';

interface AutomationConfig {
  id: string;
  alias: string;
  description: string;
  triggers: Trigger[];
  conditions: Condition[];
  actions: Action[];
  mode: string;
}

interface Trigger {
  type?: string;
  device_id?: string;
  entity_id?: string | string[];
  domain?: string;
  trigger: string;
  above?: number;
  below?: number;
  to?: string | null;
  from?: string | null;
  event?: string;
  offset?: number;
}

interface Condition {
  condition: string;
  entity_id: string | string[];
  below?: string | number;
  state?: string;
}

interface Action {
  action?: string;
  device_id?: string | string[];
  domain?: string;
  type?: string;
  target?: Target;
  data?: Record<string, any>;
  metadata?: Record<string, any>;
  message?: string;
  title?: string;
}

interface Target {
  device_id?: string[];
}

interface AutomationEntityMap {
  [key: string]: HassEntity;
}

interface SocketMetadata {
  name: string;
  entity_id: string;
  source: string;
}

export type { AutomationConfig, AutomationEntityMap, SocketMetadata };

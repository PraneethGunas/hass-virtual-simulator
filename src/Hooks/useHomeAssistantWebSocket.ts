import { useEffect, useRef, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface HAEvent {
  event_type: string;
  data: {
    entity_id: string;
    [key: string]: any;
  };
}

interface UseHomeAssistantWebSocket {
  sendMessage: (payload: object) => void;
}

export const useHomeAssistantWebSocket = (
  onEvent?: (eventType: string, entityId: string, data: any) => void
): UseHomeAssistantWebSocket => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    // Use WebSocket from browser, not 'ws' package
    try {
      socketRef.current = new WebSocket(import.meta.env.VITE_HA_WS_URL);
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      return;
    }

    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
      // Authenticate immediately after connection
      sendMessage({
        type: 'auth',
        access_token: import.meta.env.VITE_HA_TOKEN,
      });

      // Subscribe to events after authentication
      sendMessage({
        id: 1,
        type: 'subscribe_events',
      });
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed. Attempting to reconnect...');
      // Clear any existing reconnection timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      // Attempt to reconnect after 5 seconds
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };

    socketRef.current.onerror = error => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onmessage = event => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);

        if (data.type === 'event' && onEvent) {
          const haEvent = data.event as HAEvent;
          onEvent(haEvent.event_type, haEvent.data.entity_id, haEvent.data);
        } else {
          console.log('Received message:', data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }, [onEvent]);

  const sendMessage = useCallback((payload: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', payload);
    }
  }, []);

  useEffect(() => {
    connect();

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  return { sendMessage };
};

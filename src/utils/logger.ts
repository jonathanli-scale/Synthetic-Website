// Frontend Event Logger
interface BaseEvent {
  text: string;
  timestamp: string;
  user_id?: string;
  session_id?: string;
}

interface ClickEvent extends BaseEvent {
  type: 'CLICK';
  page_url: string;
  element_identifier: string;
  coordinates: { x: number; y: number };
}

interface ScrollEvent extends BaseEvent {
  type: 'SCROLL';
  page_url: string;
  scroll_x: number;
  scroll_y: number;
}

interface HoverEvent extends BaseEvent {
  type: 'HOVER';
  page_url: string;
  element_identifier: string;
}

interface KeyPressEvent extends BaseEvent {
  type: 'KEY_PRESS';
  page_url: string;
  element_identifier: string;
  key: string;
}

interface NavigationEvent extends BaseEvent {
  type: 'GO_BACK' | 'GO_FORWARD' | 'GO_TO_URL';
  page_url: string;
  target_url?: string;
}

interface StorageEvent extends BaseEvent {
  type: 'SET_STORAGE';
  page_url: string;
  storage_type: 'local' | 'session';
  key: string;
  value: string;
}

interface CustomEvent extends BaseEvent {
  type: 'CUSTOM';
  custom_action: string;
  data: Record<string, any>;
}

type LogEvent = ClickEvent | ScrollEvent | HoverEvent | KeyPressEvent | NavigationEvent | StorageEvent | CustomEvent;

class EventLogger {
  private apiEndpoint = '/api/v1/logs/events';
  private userId?: string;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeUserId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeUserId(): void {
    // Try to get user ID from Redux store or localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.userId = user.id;
      }
    } catch (error) {
      console.warn('Could not retrieve user ID for logging:', error);
    }
  }

  private async sendEvent(event: LogEvent): Promise<void> {
    try {
      const eventWithMetadata = {
        ...event,
        timestamp: new Date().toISOString(),
        user_id: this.userId,
        session_id: this.sessionId,
      };

      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventWithMetadata),
      });
    } catch (error) {
      console.error('Failed to send log event:', error);
      // Store failed events in localStorage for retry later
      this.storeFailedEvent(event);
    }
  }

  private storeFailedEvent(event: LogEvent): void {
    try {
      const failedEvents = JSON.parse(localStorage.getItem('failed_log_events') || '[]');
      failedEvents.push(event);
      localStorage.setItem('failed_log_events', JSON.stringify(failedEvents));
    } catch (error) {
      console.error('Failed to store failed event:', error);
    }
  }

  // Public logging methods
  async logClick(text: string, elementIdentifier: string, coordinates: { x: number; y: number }): Promise<void> {
    const event: ClickEvent = {
      type: 'CLICK',
      text,
      page_url: window.location.href,
      element_identifier: elementIdentifier,
      coordinates,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logScroll(text: string, scrollX: number, scrollY: number): Promise<void> {
    const event: ScrollEvent = {
      type: 'SCROLL',
      text,
      page_url: window.location.href,
      scroll_x: scrollX,
      scroll_y: scrollY,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logHover(text: string, elementIdentifier: string): Promise<void> {
    const event: HoverEvent = {
      type: 'HOVER',
      text,
      page_url: window.location.href,
      element_identifier: elementIdentifier,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logKeyPress(text: string, elementIdentifier: string, key: string): Promise<void> {
    const event: KeyPressEvent = {
      type: 'KEY_PRESS',
      text,
      page_url: window.location.href,
      element_identifier: elementIdentifier,
      key,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logNavigation(text: string, type: 'GO_BACK' | 'GO_FORWARD' | 'GO_TO_URL', targetUrl?: string): Promise<void> {
    const event: NavigationEvent = {
      type,
      text,
      page_url: window.location.href,
      target_url: targetUrl,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logStorage(text: string, storageType: 'local' | 'session', key: string, value: string): Promise<void> {
    const event: StorageEvent = {
      type: 'SET_STORAGE',
      text,
      page_url: window.location.href,
      storage_type: storageType,
      key,
      value,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  async logCustom(text: string, customAction: string, data: Record<string, any>): Promise<void> {
    const event: CustomEvent = {
      type: 'CUSTOM',
      text,
      custom_action: customAction,
      data,
      timestamp: '',
    };
    await this.sendEvent(event);
  }

  // Utility methods
  setUserId(userId: string): void {
    this.userId = userId;
  }

  async retryFailedEvents(): Promise<void> {
    try {
      const failedEvents = JSON.parse(localStorage.getItem('failed_log_events') || '[]');
      if (failedEvents.length === 0) return;

      const retryPromises = failedEvents.map((event: LogEvent) => this.sendEvent(event));
      await Promise.all(retryPromises);
      
      // Clear failed events on successful retry
      localStorage.removeItem('failed_log_events');
    } catch (error) {
      console.error('Failed to retry events:', error);
    }
  }
}

// Global logger instance
export const logger = new EventLogger();

// Hook for React components
export const useEventLogger = () => {
  return logger;
}; 
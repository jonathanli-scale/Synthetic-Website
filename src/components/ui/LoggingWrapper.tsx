'use client';

import React, { useRef, ReactElement, cloneElement } from 'react';
import { useEventLogger } from '../../utils/logger';

interface LoggingWrapperProps {
  children: ReactElement<any>;
  // Click logging
  logClick?: boolean;
  clickDescription?: string;
  elementId?: string;
  
  // Hover logging
  logHover?: boolean;
  hoverDescription?: string;
  
  // Scroll logging (for containers)
  logScroll?: boolean;
  scrollDescription?: string;
  
  // Key press logging
  logKeyPress?: boolean;
  keyPressDescription?: string;
  
  // Custom data to include in logs
  customData?: Record<string, any>;
}

export function LoggingWrapper({
  children,
  logClick = false,
  clickDescription,
  elementId,
  logHover = false,
  hoverDescription,
  logScroll = false,
  scrollDescription,
  logKeyPress = false,
  keyPressDescription,
  customData = {}
}: LoggingWrapperProps) {
  const logger = useEventLogger();
  const elementRef = useRef<HTMLElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    if (logClick) {
      const rect = event.currentTarget.getBoundingClientRect();
      const coordinates = {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
      };
      
      const identifier = elementId || 
                        event.currentTarget.getAttribute('data-testid') || 
                        event.currentTarget.tagName.toLowerCase();
      
      const description = clickDescription || `User clicked on ${identifier}`;
      
      logger.logClick(description, identifier, coordinates);
      
      // Also log as custom event with additional data
      if (Object.keys(customData).length > 0) {
        logger.logCustom(
          `${description} - with custom data`,
          'enhanced_click',
          { ...customData, coordinates, identifier }
        );
      }
    }
    
    // Call original onClick if it exists
    if (children.props?.onClick) {
      children.props.onClick(event);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (logHover) {
      const identifier = elementId || 
                        event.currentTarget.getAttribute('data-testid') || 
                        event.currentTarget.tagName.toLowerCase();
      
      const description = hoverDescription || `User hovered over ${identifier}`;
      
      logger.logHover(description, identifier);
    }
    
    // Call original onMouseEnter if it exists
    if (children.props?.onMouseEnter) {
      children.props.onMouseEnter(event);
    }
  };

  const handleScroll = (event: React.UIEvent) => {
    if (logScroll) {
      const target = event.currentTarget as HTMLElement;
      const scrollX = target.scrollLeft;
      const scrollY = target.scrollTop;
      
      const description = scrollDescription || `User scrolled in container`;
      
      logger.logScroll(description, scrollX, scrollY);
    }
    
    // Call original onScroll if it exists
    if (children.props?.onScroll) {
      children.props.onScroll(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (logKeyPress) {
      const identifier = elementId || 
                        event.currentTarget.getAttribute('data-testid') || 
                        event.currentTarget.tagName.toLowerCase();
      
      const description = keyPressDescription || `User pressed ${event.key} in ${identifier}`;
      
      logger.logKeyPress(description, identifier, event.key);
    }
    
    // Call original onKeyDown if it exists
    if (children.props?.onKeyDown) {
      children.props.onKeyDown(event);
    }
  };

  // Clone the child element with our event handlers
  return cloneElement(children, {
    onClick: handleClick,
    onMouseEnter: logHover ? handleMouseEnter : children.props?.onMouseEnter,
    onScroll: logScroll ? handleScroll : children.props?.onScroll,
    onKeyDown: logKeyPress ? handleKeyDown : children.props?.onKeyDown,
    'data-logging-enabled': 'true',
    'data-testid': elementId || children.props?.['data-testid']
  } as any);
} 
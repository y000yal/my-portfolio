import clarity from '@microsoft/clarity';

// Initialize Clarity with your project ID
// You'll need to get this from your Microsoft Clarity dashboard
const CLARITY_PROJECT_ID = process.env.REACT_APP_CLARITY_PROJECT_ID || 'your-clarity-project-id';

class ClarityService {
  constructor() {
    this.isInitialized = false;
  }

  // Initialize Clarity
  init() {
    if (this.isInitialized || !CLARITY_PROJECT_ID || CLARITY_PROJECT_ID === 'your-clarity-project-id') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Clarity not initialized. Please set REACT_APP_CLARITY_PROJECT_ID in your .env file');
      }
      return;
    }

    try {
      clarity.init(CLARITY_PROJECT_ID);
      this.isInitialized = true;
      if (process.env.NODE_ENV === 'development') {
        console.log('Clarity initialized successfully');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize Clarity:', error);
      }
    }
  }

  // Track custom events
  trackEvent(eventName, data = {}) {
    if (!this.isInitialized) return;
    
    try {
      clarity.event(eventName, data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity event:', error);
      }
    }
  }

  // Track page views
  trackPageView(pageName) {
    if (!this.isInitialized) return;
    
    try {
      clarity.set(pageName);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity page view:', error);
      }
    }
  }

  // Track user interactions
  trackInteraction(action, target, value = null) {
    if (!this.isInitialized) return;
    
    try {
      clarity.event('user_interaction', {
        action,
        target,
        value,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity interaction:', error);
      }
    }
  }

  // Track API requests (useful for your portfolio's API simulation)
  trackApiRequest(endpoint, params = {}) {
    if (!this.isInitialized) return;
    
    try {
      clarity.event('api_request', {
        endpoint,
        params: JSON.stringify(params),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity API request:', error);
      }
    }
  }

  // Track theme changes
  trackThemeChange(theme) {
    if (!this.isInitialized) return;
    
    try {
      clarity.event('theme_change', {
        theme,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity theme change:', error);
      }
    }
  }

  // Track scroll behavior
  trackScroll(section) {
    if (!this.isInitialized) return;
    
    try {
      clarity.event('scroll_to_section', {
        section,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track Clarity scroll:', error);
      }
    }
  }
}

// Create a singleton instance
const clarityService = new ClarityService();

export default clarityService;

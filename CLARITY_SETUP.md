# Microsoft Clarity Setup Guide

This portfolio now includes Microsoft Clarity for user behavior analytics. Follow these steps to set it up:

## 1. Get Your Clarity Project ID

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with your Microsoft account
3. Create a new project for your portfolio
4. Copy your Project ID from the setup page

## 2. Configure Environment Variables

Create a `.env` file in your project root and add your Clarity Project ID:

```env
REACT_APP_CLARITY_PROJECT_ID=your-clarity-project-id-here
```

Replace `your-clarity-project-id-here` with your actual Project ID from step 1.

## 3. What's Being Tracked

The following user interactions are automatically tracked:

### Page Views
- Portfolio home page load

### User Interactions
- Theme changes (dark/light mode)
- Parameter changes in API sections
- Reset button clicks
- Scroll navigation (back to top, next section)

### API Requests
- Experience section API calls
- Skills section API calls
- "Fetch All Portfolio Data" button clicks

### Custom Events
- `portfolio_home` - Page view
- `theme_change` - Theme toggle with new theme value
- `user_interaction` - Various user actions
- `api_request` - API simulation calls
- `scroll_to_section` - Navigation between sections

## 4. Viewing Analytics

1. Go to your Clarity dashboard
2. Select your portfolio project
3. View heatmaps, session recordings, and insights
4. Analyze user behavior patterns

## 5. Privacy Considerations

- Clarity automatically respects user privacy settings
- No personal data is collected
- All tracking is anonymous
- Users can opt-out through browser settings

## 6. Development vs Production

- **Development**: Clarity will log warnings and success messages to help with debugging
- **Production**: No console logs are shown - completely silent operation
- Make sure to set the `REACT_APP_CLARITY_PROJECT_ID` environment variable in production
- The service gracefully handles missing configuration without any console output in production

## 7. Customization

You can extend tracking by using the `clarityService` in other components:

```javascript
import clarityService from '../utils/clarity';

// Track custom events
clarityService.trackEvent('custom_action', { data: 'value' });

// Track user interactions
clarityService.trackInteraction('button_click', 'contact_form', 'submit');
```

## 8. Troubleshooting

- **Development**: Check browser console for Clarity initialization messages and errors
- **Production**: No console messages will appear - check network tab for Clarity API calls instead
- Ensure your Project ID is correctly set in the environment variable
- Verify the Clarity project is active in your dashboard
- Check network tab for Clarity API calls to confirm tracking is working

## 9. Benefits

With Clarity integrated, you can:
- See how users navigate your portfolio
- Identify popular sections and features
- Understand user behavior patterns
- Optimize user experience based on real data
- Track engagement with your API simulation features

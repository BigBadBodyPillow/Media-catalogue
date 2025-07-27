# Frontend Documentation

## Overview

React application built with Vite that provides a user-friendly interface for searching the iTunes Store API.

## Setup

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Component Architecture

### App.jsx

Main application component that manages state and coordinates between components.

**Key Features:**

- JWT token management
- API communication
- State management for search results and favourites
- Error handling

**State Management:**

- `jwtToken`: Current JWT token for API access
- `searchTerm`: Current search input
- `mediaType`: Selected media type filter
- `results`: Search results array
- `favourites`: User's favourite items
- `loading`: Search loading state
- `error`: Error messages
- `showFavourites`: Favourites panel visibility

### SearchBar.jsx

Handles search input, media type selection, and search button.

**Props:**

- `searchTerm`: Current search term
- `setSearchTerm`: Function to update search term
- `mediaType`: Selected media type
- `setMediaType`: Function to update media type
- `onSearch`: Search function
- `loading`: Loading state
- `jwtToken`: Current JWT token
- `tokenLoading`: Token loading state

**Features:**

- Search input with Enter key support
- Media type dropdown
- Search button with loading state
- Disabled state when token is loading

### FavouritesList.jsx

Collapsible favourites section with add/remove functionality.

**Props:**

- `favourites`: Array of favourite items
- `showFavourites`: Panel visibility state
- `setShowFavourites`: Function to toggle visibility
- `removeFavourite`: Function to remove items

**Features:**

- Collapsible panel
- Favourites count display
- Remove functionality
- Empty state message

### ResultCard.jsx

Individual search result display with favourite management.

**Props:**

- `item`: Search result item
- `isFavourite`: Function to check if item is favourited
- `addFavourite`: Function to add to favourites
- `removeFavourite`: Function to remove from favourites

**Features:**

- Album/track information display
- Cover image
- Artist name
- Release date
- iTunes link
- Favourite toggle button

### SearchResults.jsx

Container for displaying search results grid.

**Props:**

- `results`: Array of search results
- `error`: Error message
- `isFavourite`: Function to check favourite status
- `addFavourite`: Function to add to favourites
- `removeFavourite`: Function to remove from favourites

**Features:**

- Responsive grid layout
- Error message display
- Result card rendering

## Styling

### CSS Architecture

- Bootstrap for responsive layout and components
- Custom CSS for specific styling
- Component-specific styles in App.css

### Key CSS Classes

- `.app-container`: Main application wrapper
- `.search-container`: Search bar styling
- `.favourites-container`: Favourites panel styling
- `.results-container`: Search results grid
- `.result`: Individual result card styling

## State Management

### JWT Token Flow

1. **Initial Load**: Check localStorage for existing token
2. **Token Missing**: Fetch new token from `/api/token`
3. **API Requests**: Include token in Authorization header
4. **Token Expired**: Handle 403 errors and refresh token
5. **Persistence**: Store token in localStorage

### Favourites Management

1. **Add Favourite**: Add item to favourites array
2. **Remove Favourite**: Remove item from favourites array
3. **Persistence**: Save to localStorage on changes
4. **Display**: Show in collapsible panel

## Error Handling

### Token Errors

- **403 Forbidden**: Token expired, clear and refresh
- **401 Unauthorized**: Missing token, fetch new one
- **Network Errors**: Display user-friendly messages

### Search Errors

- **Invalid Search**: Show appropriate error message
- **API Errors**: Display error from backend
- **Loading States**: Show loading indicators

## Development

### Dependencies

- `react`: UI library
- `react-dom`: DOM rendering
- `bootstrap`: CSS framework
- `vite`: Build tool and dev server

### File Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── FavouritesList.jsx
│   │   ├── ResultCard.jsx
│   │   ├── SearchResults.jsx
│   │   └── reactbits/
│   │       └── DarkVeil.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── public/
├── package.json
└── vite.config.js
```

## Configuration

### Vite Configuration

- Proxy setup for API requests
- Bootstrap CSS import
- Development server configuration

### Environment Variables

- API base URL configuration
- Development/production mode settings

## Testing

### Manual Testing Checklist

- [ ] Search functionality works
- [ ] Media type filtering works
- [ ] Favourites add/remove works
- [ ] Error handling displays correctly
- [ ] Responsive design works on mobile
- [ ] Token refresh works correctly

## Performance

### Optimization Features

- Component memoization where appropriate
- Efficient re-rendering
- Lazy loading considerations
- Bundle size optimization

## Browser Compatibility

### Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Required Features

- ES6+ support
- localStorage support
- Fetch API support

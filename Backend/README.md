# Backend API Documentation

## Overview

Express.js server that serves as a secure proxy to the iTunes Store API with JWT authentication.

## Setup

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the Backend directory:

```
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Running the Server

```bash
npm start
```

## API Endpoints

### GET /api/token

Generates a new JWT token for API access.

**Request:**

```
GET /api/token
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /api/search

Searches the iTunes Store API with authentication.

**Request:**

```
GET /api/search?term=beatles&media=music
Authorization: Bearer <jwt_token>
```

**Query Parameters:**

- `term` (required): Search term
- `media` (optional): Media type filter

**Response:**

```json
{
  "results": [
    {
      "id": "123456789",
      "albumName": "Abbey Road",
      "trackName": "Come Together",
      "artistName": "The Beatles",
      "coverImage": "https://is1-ssl.mzstatic.com/image/thumb/...",
      "releaseDate": "1969-09-26T07:00:00Z",
      "kind": "song",
      "collectionViewUrl": "https://music.apple.com/us/album/..."
    }
  ]
}
```

## Error Responses

### 401 Unauthorized

Missing or invalid JWT token.

### 403 Forbidden

Expired or invalid JWT token.

### 400 Bad Request

Missing required parameters.

### 500 Internal Server Error

Server error or iTunes API error.

## JWT Token Management

### Generating Tokens

```bash
node generate_jwt.js
```

### Token Expiration

Tokens expire after 1 hour by default.

### Automatic Refresh

The frontend automatically handles token expiration by:

1. Detecting 403 errors
2. Clearing expired tokens
3. Fetching new tokens from `/api/token`

## Security Features

- **JWT Authentication**: All search requests require valid tokens
- **CORS Support**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Validates required parameters

## Development

### Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `jsonwebtoken`: JWT token handling
- `dotenv`: Environment variable management

### File Structure

```
Backend/
├── index.js           # Main server file
├── generate_jwt.js    # JWT token generator
├── package.json       # Dependencies
└── .env              # Environment variables
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Ensure all environment variables are set
3. The server will automatically serve the React build
4. Configure your hosting provider accordingly

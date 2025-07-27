# Media-catalogue

A Fullstack application using the iTunes search API. Built with react and express.js

## Usage Guide

### Searching

1. Enter a search term in the search input
2. Select a media type from the dropdown (optional)
3. Click "Search" or press Enter

### Favourites

1. Click "Add to Favourites" on any search result
2. Access favourites via the collapsible favourites panel
3. Remove items using the "Remove" button in the favourites list or the "Remove Favourite" button in the search result

## Installation

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the repository**

   ```cmd
   git clone https://github.com/BigBadBodyPillow/Media-catalogue.git
   cd Media-catalogue
   ```

2. **Install Backend Dependencies**

   ```cmd
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```cmd
   cd ../Frontend
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the `Backend` directory:

   ```
   JWT_SECRET=<enter_your_secret_key>
   PORT=<enter_port>
   ```

- default port is `3000` if you change the port you might have to change the port in `vite.config.js` in the `Frontend` directory aswell

5. **Start the Backend Server**

   ```cmd
   cd Backend
   npm start
   ```

   The server will run on `http://localhost:5000`

6. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The app will open in your browser at `http://localhost:5173`

### Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `jsonwebtoken`: JWT token handling
- `dotenv`: Environment variable management

#### development

- `nodemon`: Automatic server refreshing

### Backend Endpoints

#### `GET /api/token`

- generates a new api token
- token expires after an hour

#### `GET /api/search`

- searches the [iTunes search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)
- fetches 25 results (limit can be changed)
- returns: `id`,`albumName`,`trackName`, `ArtistName`, `coverImage`, `releaseDate`, `kind`, `collectionViewUrl`

### Frontend Components

#### SearchBar

- Handles search input, media type selection, and search button

#### FavouritesList

- Collapsible favourites section with add/remove functionality

#### ResultItem

- Individual search result display

#### SearchResults

- Container for displaying search results

#### RainbowLine

- A `1px` tall rainbow Line

## Links

API: [iTunes search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)

Background : [React Bits](https://www.reactbits.dev/)

Documentation: [readme.so](https://readme.so/editor)

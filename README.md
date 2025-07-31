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

## Installation (use locally)

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
   PORT=<enter_port> #optional
   ```

- default port is `3000` if you change the port you might have to change the port in `vite.config.js` in the `Frontend` directory aswell

5. **Start the Backend Server**

   ```cmd
   cd Backend
   npm run dev
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The app will open in your browser at `http://localhost:5173`

## credits?

API: [iTunes search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)

Background : [React Bits](https://www.reactbits.dev/)

Icons: [SVG Repo](https://www.svgrepo.com/)

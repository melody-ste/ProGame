# The Hyper ProGame

This project is a **Single Page Application (SPA)** built with **Webpack** and **SASS**.  
It consumes the **RAWG Video Games Database API** to provide journalists with quick access to video game information during live conferences or events.  

The goal is to help journalists — who may not be video game experts — easily find and understand information about the games being discussed.

## Project Objectives

- Provide an overview of the most anticipated video games.
- Allow users to quickly search and access information about a game by:
  - Finding it on the **homepage** (if it is very recent).
  - Navigating to a **PageList template**, where games are listed according to search criteria.
  - Typing its **name in the search bar**. Games with matching or similar names will be displayed in the PageList.
  - Clicking on a game card to open the **Game Detail page**.
  - Exploring the **"Similar Games" section** from a game detail view.

## User Stories

- As a journalist, I can search for a game by its name to quickly access its details, screenshots, and videos.
- As a journalist, I can discover related games through the **Similar Games** section.  
  Note: RAWG provides a limited number of free requests for similar games and YouTube trailers.
- As a journalist, I can click on the **developer's name** or **publisher studio** to see other games created by them.
- As a journalist, I can click on a **genre**, **tag**, or **platform** to explore a PageList of games matching this attribute.  
  For example: clicking on `Genre > Action` redirects to a PageList with 9 action games.
- As a journalist, I can click a link to **purchase the game** on an official platform, if it has been released.

## Tech Stack

- JavaScript (ES6+)
- Webpack
- SASS
- RAWG API

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/the-hyper-progame.git
cd the-hyper-progame
```
2. Install dependencies

```bash
npm install
```

3. Run in development mode

```bash
npm run start
```
43. Build for production

```bash
npm run build
```

## API Key

This project requires a RAWG API key.
Create a src/config.js file and add your key:

```bash
export const API_KEY = '3bd19557798840c49a86987fe10a3501';
```

## Model

The design mockups can be found here:

[Project Model on Google Drive](https://drive.google.com/drive/folders/139LWfGZqvFWKYAWDZnYfQFDSlh2Vc7pG)

## License

This project is for educational purposes only.
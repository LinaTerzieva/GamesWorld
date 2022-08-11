# Architecture 

The site is structured around three main folders (components, lib, and pages )

# Components

The component folder contains all reusable components used in different pages.
Each component has its own folder that contains:
    1) Css file - related to the component
    2) Js file - component in JSX format

# Lib

The lib folder contains reusable functionality separated into files:

1)  AuthenticationContext - Auth context used through out the site.
2)  AuthenticationProvider - Functionality associated with users' AuthenticationContext (login, register, logout).
3)  use(...)Api - The comunication between the client and the server pass through the APIs (for each collection).
4)  useHeaders - Used to add auth token for each request if needed.
5)  useLocalStorage - Used to communicate with the browser storage.

# Pages

This folder contains all the pages specified in the router. Each page will end with Page.js suffix and will be
separated into there own folder that contains: 
    1) Css file - related to the component
    2) Js file - component in JSX format


# Running apps

# Running client app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


# Running server app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

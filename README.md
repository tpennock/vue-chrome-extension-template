# Skedgit Chrome Extension
> Template for quick creation of Chrome extension on Vuejs c hot reloading when developing.

## Installation:
``` bash
# install dependencies and go!
$ npm install # or yarn
$ npm run dev # or yarn dev
```

## Structure
* [backend](https://developer.chrome.com/extensions/background_pages): Background work of your scripts
* [content](https://developer.chrome.com/extensions/content_scripts) Run in the context of web pages 
* popup - The page (window) that will be displayed when the icon is clicked
* tab - Your application will work in a separate tab
* ext - Shared scripts
* [manifest.js](https://developer.chrome.com/extensions/manifest) - Descriptions of the application, its rights and possibilities
# Skedgit Chrome Extension
> Template for quick creation of Chrome extension on Vuejs c hot reloading when developing.

## Installation:
[download and install Node.js and npm](https://developer.chrome.com/extensions/background_pages)

``` bash
# install dependencies and go!
$ npm install # or yarn
$ npm run dev # or yarn dev

# build for dev or prod
$ yarn build:dev # -> dev iframe source "https://skedgit-develop.herokuapp.com/beta"
$ yarn build:prod # -> prod iframe source "https://login.skedgitnow.com/users/sign_in"
```

> Go to chrome://extensions/ in Chrome
> "Load Unpacked"
> Select the folder for the unzipped chrome extension from your computer


## Structure
* [background](https://developer.chrome.com/extensions/background_pages): Background scripts
* [content](https://developer.chrome.com/extensions/content_scripts) Run in the context of web pages 
* [manifest.js](https://developer.chrome.com/extensions/manifest) - Descriptions of the application, its rights and possibilities
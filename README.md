## Project Setup

### Prerequisites

 - [Node.js](https://nodejs.org/en/download/) - **v 10.10.0** (`nvm use 10.10.0`)
 - NPM - Will be installed as part of Node.js
 - [Gulp](http://gulpjs.com/) - Installed globally by running `npm install --global gulp-cli` in Terminal or Command Prompt
 - [Hugo](https://gohugo.io/) - Installed using the following instructions https://gohugo.io/getting-started/installing/

### Initial Project Setup

1. After cloning down the repository navigate to the project's root directory in Terminal or Command Prompt
2. `npm install`
  - Installs the dependencies for this project
  - Can take several minutes.
  
## Typical Development Process

### Starting the Application

To start the website locally run

```sh
$ hugo serve
```

If the website has started correctly it will be accessible at `http://localhost:1313/`.

### Working Locally

To compile all front end assets for development and watch for changes

```sh
$ gulp
```

(❗️ may need to switch to the correct node version e.g. `nvm use 10.10.0`)


To compile all front end assets for production

```sh
$ gulp production

## General Development
For general development the main folders you will need to work within are:

- layout - Contains views for all pages and partials (header, navigation and footer)
- static/src - Contains all the front end assets including SCSS, Javascript and images .etc
- content - Contains all markdown files (pages/content). - for now it is just the contact pages.
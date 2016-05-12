[![Build Status](https://img.shields.io/travis/ascoders/isomorphic-react-redux-app/master.svg?style=flat)](https://travis-ci.org/ascoders/isomorphic-react-redux-app)
[![Coverage Status](https://img.shields.io/coveralls/ascoders/isomorphic-react-redux-app/master.svg?style=flat)](https://coveralls.io/github/ascoders/isomorphic-react-redux-app?branch=master) 

# Isomorphic React Redux App

simple but full front end technology stack, using React and Redux

support **HotLoader** and server auto reload

# Features
- Async server-side rendering
- Async server-side services request
- Hot reloading middleware
- Server auto reload
- Redux DevTools and Logging
- Redux Routing

# Stack

- React.js
- Immutable
- Webpack
- Babel
- Fis3
- Yog2
- Express
- Redux
- Redux-DevTools

# Development Installation

## Environment

- nodejs ^4.1.0
- cnpm ^3.4.0
- fis3 ^3.3.21
- yog2 ^0.6.1

## Start Node Service

In `node-server` directory, run the following commands:

```bash
cnpm install
npm start
```

## Start App Building

In `my-app` directory, run the following commands:

```bash
cnpm install
npm start
```

This command is executed with Webpack, and you can create other app's folder such like `second-app` `sell-system`...

Then visit `http://localhost:8080/my-app`

> Warning: You might see the TS error, we're trying to fix it, it does not prevent development 

## Start App Preview Production Building

In `my-app` directory, run the following commands:

```bash
npm run preview
```

This command is executed with Fis3, use production setting

## Sandbox Development Building

```bash
npm run remote
```

In `my-app` directory, change `host` in `fis-conf.js`, your code will be pushed to remote machine

## Production Building

In `my-app` directory, run the following commands:

```bash
npm run production
```

Then you can find `static-my-app.tar` `my-app.tar` in output dictionary

# Author

2016 By FEX

# React JS

In this lab you will be learning how to create a React JS app. React is a library for building interfaces out of reusable components. It uses the NodeJS platform. It uses the following:

1. NodeJS is the platform used to develop the apps.
2. WebPack is a module builder, it takes all the modules and creates a single bundle.

These are the steps needed to create a new ReactJS app (note that these steps have already been completed in the tutorial exercises).

```shell
$ mkdir hello
$ cd hello
$ npm init
$ npm install react react-dom --save
$ npm install webpack webpack-dev-server webpack-cli --save
$ npm install babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin --save-dev
$ touch index.html App.js main.js webpack.config.js .babelrc
```

## better version

```shell
sudo npm install --global create-web-app
sudo npm install -g serve
npm init react-app my-app
cd my-app/
$ npm run build
  Creating an optimized production build...
  Compiled successfully.

$ serve -s build
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://192.168.0.52:5000   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

https://facebook.github.io/create-react-app/docs/getting-started

## React Router

https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

## References

https://www.kirupa.com/react/introducing_react.htm

https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

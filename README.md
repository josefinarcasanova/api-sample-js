# API Sample JS

- [API Sample JS](#api-sample-js)
  - [About the App](#about-the-app)
  - [Repository Structure](#repository-structure)
  - [Environment variables](#environment-variables)

## About the App

Application routes are:

- `/`. Landing page.
- `/hello`. Displays "Hello $TARGET".
- `/author`. Displays contact information.

## Repository Structure

The repository is structured as follows:

```
.
├── assets/                     # Development assets
├── images/                     # Images used in the present document
├── source/                     # Source code
│   ├── controllers/            # Application behavior    
│   ├── models/                 # Model definition 
│   └── routes/                 # Route definition
└── README.md                   # Present document
```

For more information see [ExpressJS Project Structure](https://dev.to/brianemilius/expressjs-project-structure-2ka4).

## Environment variables

The app uses the following environment variables:

- `HELLO_TARGET`: target the app will say hello to. Default: `Josefina`.
- `PORT`: port the app will run on. Default: `8080`.
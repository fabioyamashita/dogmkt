# DOGMKT
DOGMKT is a project built with Angular. It's a website which you can only buy dogs with love.

Figma: https://www.figma.com/file/Lq5SXN1EkqOUpi4tUcNv7Q?fuid=1050222781352041246

## 🖥️ Getting Started

- Clone the repository:

```
git clone https://github.com/fabioyamashita/dogmkt.git
```

- Run npm install:

```
npm i
```

- Install [JSON Server](https://www.npmjs.com/package/json-server) and [JSON Server Auth](https://github.com/jeremyben/json-server-auth):

```
# NPM
npm install -D json-server json-server-auth

# Yarn
yarn add -D json-server json-server-auth
```

## Run the application
- Navigate to front-end directory
```
cd .\front-end\
```

- Start JSON server (with JSON server Auth as middleware and Guarded Routes):
```
json-server db.json -m ./node_modules/json-server-auth -r routes.json
# with json-server installed globally and json-server-auth installed locally
```

- or... start JSON server (with JSON server Auth as middleware):
```
json-server db.json -m ./node_modules/json-server-auth
# with json-server installed globally and json-server-auth installed locally
```

- Run the Angular dev server:

```
ng serve
```

The app will be running at: `http://localhost:4200/`.

## Tests

Use the following login and password to access the app:
- Login: admin@admin.com
- Password: admin

You can also create new users for tests.

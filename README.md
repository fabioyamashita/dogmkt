# :dog: DOGMKT

![collection-preview](https://user-images.githubusercontent.com/98363297/213941825-10ccfeb4-752c-4997-9fe0-d262be864dd5.png)

## :books: Description

DOGMKT is a project built with Angular. It's a website which you can only buy dogs with love.

- **My Design on Figma**: https://www.figma.com/file/Lq5SXN1EkqOUpi4tUcNv7Q?fuid=1050222781352041246
- **Front-End**: Angular
- **Back-End**: Fake back-end with JSON server. Back-end in node.js coming soon...

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

## 🖥️ Run the application
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

## 🖥️ Tests

For tests purposes, you can login with any user already registered by default.

Use the following login and password as example to access the app:
- Login: maria@gmail.com
- Password: maria

You can also create new users for your tests.

## :tada: Features

### Mobile Friendly

The app was built to work in all devices.

![mobile-friendly](https://user-images.githubusercontent.com/98363297/213942749-b2c85f85-2f06-4995-b1cf-c82102355fa8.png)
<hr>

### Sign-up Page
Sign-up page with the following features:
- Email and Password validations
- Input Checkbox to create a user as a seller

![sign-up-page](https://user-images.githubusercontent.com/98363297/213942581-c7481b9c-3249-4b55-835a-325447c8e942.png)
<hr>

### Login Page
Login page with the following features:
- Email and Password validations
- JWT Authentication

![login-page](https://user-images.githubusercontent.com/98363297/213942874-5459fc94-958a-4d00-a555-bf76493d5dd2.png)
<hr>

### Header
- Dynamic content
- Cart items number updating in real-time (in header)
- Option of Seller's View (in Profile) only showing if the user is also a seller

![header](https://user-images.githubusercontent.com/98363297/213943387-13509495-00c3-4c38-aa4d-4f1eacda7c87.png)
<hr>

### Dog's Collection
Dog's Collection page with the following features:
- List of all dogs in sale
- Sold Out banner
- Search tool
- Redirecting to dog's details if the picture is clicked

![collection-preview](https://user-images.githubusercontent.com/98363297/213943334-98388974-5e97-466c-985b-c301e4088d24.png)
<hr>

### Dog's Details
Dog's Details page with the following features:
- Dog's Info and Details changing information on click
- Add To Cart button
- '+' and '-' buttons
- Max. quantity blocking '+' button when Available is reached
- Button will appear as 'Sold Out' if Available quantity = 0

![dog-details-1](https://user-images.githubusercontent.com/98363297/213943703-91e8157e-b7a9-4b53-bdfe-ef78995f3057.png)

![dog-details-2](https://user-images.githubusercontent.com/98363297/213943712-67b1bb76-fdae-4be7-ae54-cbd063f027f1.png)
<hr>

### Cart
Cart page with the following features:
- Delete item from cart
- Real-time update of Total
- Submit Order button

![cart](https://user-images.githubusercontent.com/98363297/213943826-cd3a653e-2d7a-4f44-b4f1-38b70ec01b9b.png)
<hr>

### User Profile Section
Profile Section page with the following features:
- Edit user button to edit changes
- If the user is alreasy a seller, he can't uncheck the seller checkbox
- Purchase history redirecting to purchase details if the card is clicked

![profile-section](https://user-images.githubusercontent.com/98363297/213943961-c7f13b15-e5e0-480f-9c79-e39c94d8c46c.png)
<hr>

### Purchase History
Purchase History page with the following features:
- Purchase ID and Date on heading
- Purchase Details

![purchase-history](https://user-images.githubusercontent.com/98363297/213944052-db1b80ac-3ec6-44d7-b960-ede939d5bec7.png)
<hr>

### Seller Profile Section
Seller Section page with the following features:
- Edit user button to edit changes
- If the user is alreasy a seller, he can't uncheck the seller checkbox
- List of dogs in sale
- Search tool
- Redirecting to dog's details if the picture is clicked

![seller-profile](https://user-images.githubusercontent.com/98363297/213944157-b8d299b3-60c9-4252-91ac-6e8afacdacb7.png)
<hr>

### Seller Dog's Details
Seller Dog's Details page with the following features:
- Dog's details info
- Edit Ddog button

![seller-dog-details](https://user-images.githubusercontent.com/98363297/213944227-584929df-8f1d-4ad5-a03e-6609b75cf8cc.png)
<hr>

### Edit Dog
Edit Dog page with the following features:
- Data automatically filled

![edit-dog](https://user-images.githubusercontent.com/98363297/213944304-20661ea0-5aba-47b7-8b9f-e3a8cda91a2c.png)
<hr>

### Add A New Dog
Add A New Dog page with the following features:
- Add New Dog button only working if all data is valid
- Input Validations

![add-new-dog](https://user-images.githubusercontent.com/98363297/213944369-30dd1762-9afe-4336-ab82-bd49c651b875.png)
<hr>


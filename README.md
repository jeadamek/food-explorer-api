<div align="center">
   <img src="https://github.com/jeadamek/rocketMovies_backend/assets/78454317/bee3ecf0-0193-4c38-9bec-004d1a679227" width="80px"/>
</div>
<h3 align="center">🚀 Final Project | Backend - Explorer</h3>

<div align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jeadamek/food-explorer-api">

  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/jeadamek/food-explorer-api">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jeadamek/food-explorer-api?color=%231280BF">

 <a href="https://food-explorer-deploy.vercel.app/"> ▶️ Access Deploy </a>
</div>  

## ✏️ About

This is the backend for the final project of the Explorer course at [Rocketseat School](https://www.rocketseat.com.br/). To access the entire course assignments click [this link](https://github.com/jeadamek/explorer-rocketseat). 


In this project, the challenge was to build an API using Node.js, the frontend was developed using Reactjs, to access click on [this link](https://github.com/jeadamek/food-explorer-frontend).

This is an API application for a fictional restaurant that allows administrators to manage dishes and orders, and clients to create accounts, place orders, and manage their profiles.

The database diagram can be seen in the image below:<br/>

![Food Explorer Database Diagram](https://github.com/jeadamek/food-explorer-api/assets/78454317/7e422811-4f4f-4f03-b6e5-6fd59c3a240f)

## ✨ Features
The Restaurant API Application provides the following features:
### For Administrators:
- Add new dishes: Administrators can add new dishes to the restaurant's menu by providing the dish details such as name, description, price, ingredients, and image.
- Edit dishes: Administrators can update the details of existing dishes, including the name, description, price, ingredients, and image.
- List orders: Administrators have access to a list of all the orders placed by clients, along with their details such as order ID, order items, and status.
- Update orders: Administrators can update the status of orders, such as marking them as in progress, ready or delivered.
### For Clients:
- Create an account: Clients can create their accounts by providing their name, email address, and password.
- Update profile: Clients have the ability to update their profile information, including their name, email address, and password.
- Create an order: Clients can place an order by selecting the desired dishes from the menu and specifying the quantity.
- Check order status: Clients can check the status of their orders to see whether they are in progress, ready or delivered.
- Make a dish as favorite: Clients can mark specific dishes as their favorites, allowing them to easily find and reorder them in the future.


## 👩‍💻 Learnings

Developing this project I could practice and study:

- API REST built in NodeJS e ExpressJS;
- SQLite database to save the data;
- Tool Beekeeper Studio;
- Query Builder with Knex.js;
- PM2 Advanced process manager for production Node.js applications;
- JWT with jsonwebtoken;
- Node.js middleware for handling multipart/form data;
- Promises with Async Await;
- Protect sensitive data;
- Classes and events;
- Inheritance and Polymorphism;
- Route mapping;
- Insomnia to register routes and check status codes;
- Asynchronous and promises;
- Object orientation;
- Callbacks Functions;
- ES6 Modules;


## 🛠️ Technologies

<div style="display: inline_block"><br/>
  <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />  
  </br>
  </br>
  <img align="center" alt="Nodejs" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  </br>
  </br>
  <img align="center" alt="SQLITE" src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  </br>
  </br>
  <img align="center" alt="Git" src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
</div>
</br>


## 🚀 Getting started

### Programs to be installed on your system:
- [NodeJS](https://nodejs.org/en/)
- [Insomnia](https://insomnia.rest/download)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)


Clone the project and access the project's folder:

```bash
$ git clone git@github.com:jeadamek/food-explorer-api.git
$ cd food-explorer-api
```

### Install server and run the project

Before run the project define your AUTH_ADMIN_SECRET and AUTH_CLIENT_SECRET in a ```.env``` file, following the example in ```.env.example```

```bash
$ cd food-explorer-api
$ npm install
$ npm run migrate
$ npm run dev
```

The application will be accessible at `http://localhost:3000/`.


## 💻 Usage
Once the API is running, users can interact with the restaurant database by making requests to the following endpoints:

`POST /sessions:` Create a new session

<br />

`POST /users:` Create a new user

`PUT /users:` Update user's information

<br />

`GET /dishes:` Retrieve a list of all dishes

`POST /dishes:` Add a new dish

`GET /dishes/:id:` Retrieve a single dish by ID

`PUT /dishes/image/:id:` Update a dish by ID

`PATCH /dishes/:id:` Upload dish's image

`DELETE /dishes/:id:` Delete a dish by ID

<br />

`GET /orders/admin:` Retrieve a list of all orders

`GET /orders:` Retrieve a list of all user's orders

`POST /orders:` Create a new order

`PUT /orders/:id:` Update a order's status by ID

<br />

`GET /favorites:` Retrieve a list of all favorites

`POST /favorites:` Add a new favorite

`DELETE /favorites/:id` Delete a favorite

## 📝 License

This project is under the MIT license. See the file [LICENSE](LICENSE) for more details.


## 🎯 Author

<p>
	Made by Jessica Adamek. Connect with me! 	
</p>
<div>
  <a href="https://www.linkedin.com/in/jessica-adamek/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="A linkedin badge">
  </a>  
</div>

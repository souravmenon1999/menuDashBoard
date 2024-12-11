# Project Name

## Description
This project is a backend that uses **Node.js**, **Express.js**, and **Prisma**. 

## Setup Instructions

### 1. Clone the Repository
Clone the project repository to your local machine:

```bash
git clone https://github.com/souravmenon1999/menuDashBoard
```

### 2. Install Dependencies
Make sure you have Node.js installed on your machine, then install the required dependencies:

``` bash
npm install
```

### 3. Configure Environment Variables
You will need to set up your environment variables.
your .env file should look like:

``` bash
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority"
PORT=3000
```

Configure .gitignore file too

``` bash
node_modules
.env
```

### 4. Prisma Configuration
After setting up the .env file, generate the Prisma client and apply the schema to the database.

Run the following command to generate the Prisma client:

``` bash

npx prisma generate

```

Push the schema to the database:
``` bash
npx prisma db push
```

### 5. Run the Server
Once your environment is set up and the dependencies are installed, you can start the development server:

``` bash
npm run dev
```




# TDS_Assignment

## Features:

- Implement JWT-based authentication using access token and refresh token.
- Define custom permissions to restrict access based on user type.
- Develop custom view for studios and reservations based on user type.
- Implement image upload and image processing functionality.
- Allow studio owners to create studios.
- Enable customers to create and cancel reservations.

## Technologies

### Database:

- [PostgreSQL](https://www.postgresql.org/)

### Backend:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [express-validator](https://express-validator.github.io/docs)
- [Prisma](https://www.prisma.io/)
- [Multer](https://github.com/expressjs/multer)
- [JWT](https://jwt.io/)

### Frontend

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Axios](https://www.axios.com/)
- [React_Hook_Form](https://react-hook-form.com/)
- [React-router](https://reactrouter.com/en/main)
- [yup](https://github.com/jquense/yup)

## Database Configuration

First you need PostgreSQL installed on your machine. After that open your terminal and type the following to create the databases

```bash
  psql postgres
  CREATE USER tds_user WITH PASSWORD 'password123';
  CREATE DATABASE tds;
  \c tds
  GRANT ALL PRIVILEGES ON DATABASE tds TO tds_user;
```

Now you successfully created the necessary databases to start the project.

## Server configuration

After cloning the repo, open your terminal and type the following commands

```bash
  cd server
  npm install
```

After installation the required packages, we will create .env file

```bash
  touch .env
```

Then add the following in your .env file

```bash
PORT = 3000
NODE_ENV = development
BASE_URL = http://localhost:3000
DATABASE_URL = postgres://<your psql username>:<your psql password>@localhost:5432/<your database name>?
ACCESS_TOKEN_SECRET : xxxxxxxxxxxxx
REFRESH_TOKEN_SECRET : xxxxxxxxxxxxxxx
```

After that we will use prisma to create our schema tables based on schema.prisma file

```bash
npx prisma migrate dev --name init
```

You can see the current database tables by running this command 

```bash
npx prisma studio
```

For image uploading we will need to create uploads folder 

```bash
mkdir uploads
cd uploads 
mkdir studio
```

## Frontend Configuration 

Go back to the root of the repo and type this commands 

```bash
  cd client 
  npm install 
```

After that we will create .env file 

```bash
touch .env
```

Then add the following in your .env file

```bash
VITE_API_URI = http://localhost:3000/api/v1
VITE_IMAGES_URI = http://localhost:3000
```

After follwing this steps you are ready to use the app.
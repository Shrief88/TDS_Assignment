# API Endpoints

## Authentication

- Login

  - Access `Public`
  - HTTP verb `POST`
  - Endpoint:- `/auth/login`
  - Request Body

  ```json
    "email" : "email",
    "password" : "password"
  ```

  - Response Body --

  ```json
    {
      "user" : {
        "id":"user.id",
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      },
      "accessToken" : "XXXXXXXX",
      "refreshToken": "XXXXXXXX"
    },
  ```

- Sign up
  - Access `Public`
  - HTTP verb `POST`
  - Endpoint:- `/auth/signup`
  - Request Body
  ```json
    "fullName": "fullName",
    "type" : "type",
    "email" : "email",
    "password" : "password"
  ```
  - Response Body --
  ```json
    {
      "newUser" : {
        "id":"user.id"
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      },
      "accessToken" : "XXXXXXXX",
      "refreshToken": "XXXXXXXX"
    },
  ```
- Logout

  - Access `Private` only logged in users
  - HTTP verb `GET`
  - Endpoint:- `/auth/logout`
  - Request Body

  ```json

  ```

  - Response Body --

  ```json

  ```

- Refresh
  - Access `Public`
  - HTTP verb `GET`
  - Endpoint:- `/auth/refresh`
  - Request Body
  ```json

  ```
  - Response Body --
  ```json
    {
      "user" : {
        "id":"user.id"
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      },
      "accessToken" : "XXXXXXXX"
    },
  ```

## User

- Index

  - Access `Private` only `Admin`
  - HTTP verb `GET`
  - Endpoint:- `/user`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of users`

  ```json
    {
      "data" : [{
        "id":"user.id"
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      }],
    },
  ```

- User information

  - Access `Private` only the `User (Owner of the acount)`
  - HTTP verb `GET`
  - Endpoint:- `user/me`
  - Request Body

  ```json

  ```

  - Response Body --

  ```json
    {
      "data" : {
        "id":"user.id",
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      }
    },
  ```

- Update Full name
  - Access `Private` only the `User (Owner of the acount)`
  - HTTP verb `PUT`
  - Endpoint:- `user/fullName`
  - Request Body
  ```json
  {
    "fullName": "fullName"
  }
  ```
  - Response Body -- `User`
  ```json
    {
      "data" : {
        "id":"user.id"
        "fullName": "user.fullName",
        "email": "user.email",
        "type": "user.type",
        "createdAt": "user.createdAt",
        "updatedAt": "user.updatedAt",
      }
    },
  ```

## Studio

- Index

  - Access `Public`
  - HTTP verb `GET`
  - Endpoint:- `/studio`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of studios`

  ```json
    {
      "data" : [{
        "id":"studio.id",
        "name": "studio.name",
        "ownerId": "studio.ownerId",
        "startTime": "studio.startTime",
        "endTime": "studio.endTime",
        "address": "studio.address",
        "availableDays": "studio.availableDays",
        "createdAt": "studio.createdAt",
        "updatedAt": "studio.updatedAt",
        "images": "studio.images"
      }],
    },
  ```

- Specific Studio

  - Access `Public`
  - HTTP verb `GET`
  - Endpoint:- `/studio/:id`
  - Request Body

  ```json

  ```

  - Response Body -- `Studio`

  ```json
    {
      "data" : {
        "id":"studio.id",
        "name": "studio.name",
        "ownerId": "studio.ownerId",
        "startTime": "studio.startTime",
        "endTime": "studio.endTime",
        "address": "studio.address",
        "availableDays": "studio.availableDays",
        "createdAt": "studio.createdAt",
        "updatedAt": "studio.updatedAt",
        "images": "studio.images"
      },
    },
  ```

- Get Studios by Owner

  - Access `Private` only `Studio_Owner (Owner of the studio)'.
  - HTTP verb `GET`
  - Endpoint:- `/studio/me`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of Studios`

  ```json
    {
      "data" : [{
        "id":"studio.id",
        "name": "studio.name",
        "ownerId": "studio.ownerId",
        "startTime": "studio.startTime",
        "endTime": "studio.endTime",
        "address": "studio.address",
        "availableDays": "studio.availableDays",
        "createdAt": "studio.createdAt",
        "updatedAt": "studio.updatedAt",
        "images": "studio.images"
      }],
    },
  ```

- Create Studio
  - Access `Private` only `Studio_Owner'.
  - HTTP verb `POST`
  - Endpoint:- `/studio`
  - Request Body
  ```json
  {
    "name": "newStudio.name",
    "ownerId": "newStudio.ownerId",
    "availableDays": "newStudio.availableDays",
    "startTime": "newStudio.startTime",
    "endTime": "newStudio.endTime",
    "address": "newStudio.address",
    "images": "newStudio.images"
  }
  ```
  - Response Body -- `The created Studio`
  ```json
    {
      "data" : {
        "id":"studio.id",
        "name": "studio.name",
        "ownerId": "studio.ownerId",
        "startTime": "studio.startTime",
        "endTime": "studio.endTime",
        "address": "studio.address",
        "availableDays": "studio.availableDays",
        "createdAt": "studio.createdAt",
        "updatedAt": "studio.updatedAt",
        "images": "studio.images"
      },
    },
  ```
- Update Studio

  - Access `Private` only `Studio_Owner (Owner of the studio)'.
  - HTTP verb `PUT`
  - Endpoint:- `/studio/:id`
  - Request Body `All variables are option`

  ```json
  {
    "name": "newStudio.name",
    "ownerId": "newStudio.ownerId",
    "availableDays": "newStudio.availableDays",
    "startTime": "newStudio.startTime",
    "endTime": "newStudio.endTime",
    "address": "newStudio.address",
    "images": "newStudio.images"
  }
  ```

  - Response Body -- `The updated Studio`

  ```json
    {
      "data" : {
        "id":"studio.id",
        "name": "studio.name",
        "ownerId": "studio.ownerId",
        "startTime": "studio.startTime",
        "endTime": "studio.endTime",
        "address": "studio.address",
        "availableDays": "studio.availableDays",
        "createdAt": "studio.createdAt",
        "updatedAt": "studio.updatedAt",
        "images": "studio.images"
      },
    },
  ```

- Delete Studio
  - Access `Private` only `Studio_Owner (Owner of the studio)'.
  - HTTP verb `DELETE`
  - Endpoint:- `/studio/:id`
  - Request Body
  ```json

  ```
  - Response Body
  ```json

  ```

## Reservation

- Index

  - Access `Private` only 'Admin'
  - HTTP verb `GET`
  - Endpoint:- `/reservation`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of reservations`

  ```json
    {
      "data" : [{
        "id":"reservation.id",
        "studio": "reservation.studio",
        "customer": "reservation.customer",
        "startTime": "reservation.startTime",
        "endTime": "reservation.endTime",
        "createdAt": "reservation.createdAt",
        "updatedAt": "reservation.updatedAt",
      }],
    },
  ```

- Get Reservations by user

  - Access `Private` only 'Customer or Studio_owner'
  - HTTP verb `GET`
  - Endpoint:- `/reservation/me`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of reservations`

  ```json
    {
      "data" : [{
        "id":"reservation.id",
        "studio": "reservation.studio",
        "customer": "reservation.customer",
        "startTime": "reservation.startTime",
        "endTime": "reservation.endTime",
        "createdAt": "reservation.createdAt",
        "updatedAt": "reservation.updatedAt",
      }],
    },
  ```

- Get Reservations by Studio

  - Access `Private` only 'Studio_owner (Owner of the studio)'
  - HTTP verb `GET`
  - Endpoint:- `/reservation/studio/:id`
  - Request Body

  ```json

  ```

  - Response Body -- `Array of reservations`

  ```json
    {
      "data" : [{
        "id":"reservation.id",
        "studio": "reservation.studio",
        "customer": "reservation.customer",
        "startTime": "reservation.startTime",
        "endTime": "reservation.endTime",
        "createdAt": "reservation.createdAt",
        "updatedAt": "reservation.updatedAt",
      }],
    },
  ```

- Create Reservation
  - Access `Private` only 'Customer'
  - HTTP verb `POST`
  - Endpoint:- `/reservation`
  - Request Body
  ```json
  {
    "customerId": "customerId",
    "studioId": "studioId",
    "startDate": "startDate",
    "endDate": "endDate"
  }
  ```
  - Response Body -- `Reservation`
  ```json
    {
      "data" : {
        "id":"reservation.id",
        "studio": "reservation.studio",
        "customer": "reservation.customer",
        "startTime": "reservation.startTime",
        "endTime": "reservation.endTime",
        "createdAt": "reservation.createdAt",
        "updatedAt": "reservation.updatedAt",
      },
    },
  ```

- Delete Reservation
  - Access `Private` only 'Customer'
  - HTTP verb `DELETE`
  - Endpoint:- `/reservation/:id`
  - Request Body
  ```json
  ```
  - Response Body -- 
  ```json
  ```

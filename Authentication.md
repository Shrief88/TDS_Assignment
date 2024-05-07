# authentication

## User login or sign up

These routes do not have any restrictions on access. Users can input their information, and if it passes the server validation process, they will receive both an access token and a refresh token. The frontend will save the refresh token in local storage and store the access token in its state.

## User Refreshing the page or re opened

Before sending any requests, the frontend will first check if there is a refresh token in the local storage. If there isn't, the user will continue to use the site as a visitor with limited access. However, if a refresh token is found, the frontend will send a request to the refresh route to obtain a new access token. This ensures that the user doesn't have to sign in again as long as their refresh token is valid.

## Access Token expiration

If a user sends a request with an expired access token, the server should respond with a 401 status code to inform the client that the access information is incorrect. We utilize an axios interceptor to intercept this response and automatically send a request to the refresh route to obtain a new access token. This mechanism ensures that users don't need to sign in again if their access token expires, as long as their refresh token remains valid.

## User logout

The client will remove refresh token from localStorage and go to the login page

## Refresh Token expiration

In case two or three if there is an issue with an invalid refresh token,the client will force the user to log out by removing the refresh token from the local storage and reloading the page.

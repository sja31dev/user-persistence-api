# User Persistence API

An API to manage a user persistence layer.

The following attributes are held for each user:
 * id - A unique user id
 * email - A users email address
 * forename - A users first name
 * surname - A users last name
 * created - The date and time the user was added

Users can be Created, Read, Updated or Deleted using the endpoints described below. The API is RESTful accessed via HTTP. The data is formatted as JSON.

### Add user
Endpoint: /api/user
Method: POST
Request Body:
```json
{
    "email": "email address",
    "forename": "Forename",
    "surname": "Surname"
}
```
Result body:
```json
{
    "id": "ID",
    "email": "email address",
    "forename": "Forename",
    "Surname": "Surname",
    "created": "Creation Date and time"
}
```
Error body:
```json
{
    "error": "Error description"
}
```

### Read user
Endpoint: /api/user?id={id}
Endpoint: /api/user?email={email}
Method: GET
Request Body: Empty
Result body:
```json
{
    "id": "ID",
    "email": "email address",
    "forename": "Forename",
    "Surname": "Surname",
    "created": "Creation Date and time"
}
```
Error body:
```json
{
    "error": "Error description"
}
```

### Update user
Endpoint: /api/user?id={id}
Method: PUT
Request Body, any subset of:
```json
{
    "email": "email address",
    "forename": "Forename",
    "surname": "Surname"
}
```
Result body:
```json
{
    "id": "ID",
    "email": "email address",
    "forename": "Forename",
    "Surname": "Surname",
    "created": "Creation Date and time"
}
```
Error body:
```json
{
    "error": "Error description"
}
```

### Delete user
Endpoint: /api/read?id={id}
Method: DELETE
Request: Empty
Result body:
```json
{
    "message": "User deleted"
}
```
Error body:
```json
{
    "error": "Error description"
}
```

### Installing

The packages required for this application can be installed using `npm install`

The database configuration needs to be set up by creating a file in the `config` directory, named the same as the NODE_ENV environment variable, e.g. production.json (see [config package docs](https://www.npmjs.com/package/config)). This file should contain a json object with an element defining the database URI e.g. :
```json
{
    "DBHost": "mongodb://mongodb.example.com:1234/db-example-name"
}
```

### Running

To run the API:
```
  npm start
```

### Testing

To run the defined tests:
```
  npm test
```

This requires a `config\test.json` to exist containing database URI for testing purposes. This allows a tests to be run using a different database without affecting development or production databases.

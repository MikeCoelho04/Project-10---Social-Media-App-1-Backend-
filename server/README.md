# 🔐 Secure Auth API – User Login & Registration

This project implements a **secure authentication system** for a Social Media backend using **Node.js**, **Express.js**, **MongoDB**, and **JWT (JSON Web Tokens)**.

The goal of this module is to provide a **secure, scalable authentication layer** that allows users to register, login, and access protected resources using authentication tokens.

This project focuses specifically on **secure authentication practices**, including password hashing, token-based authentication, and protected routes.

---

# 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **dotenv**

---

# 🎯 Project Goals

The objective of this project is to implement a **secure authentication API** that allows:

- User registration
- User login
- Secure password storage
- Token-based authentication
- Protected routes using middleware
- Secure user identification using JWT

---

# 🗄️ Database Model

## 👤 User Model

```js
{
  email: String,
  username: String,
  password: String, // hashed with bcrypt
  fullName: String,
  bio: String,
  avatarUrl: String,
  numberOfFollowers: Number,
  numberOfFollowing: Number,
  numberOfPosts: Number,
  createdAt,
  updatedAt
}
```

### Security Rules

- Passwords are **never stored in plain text**
- Passwords are **hashed using bcrypt**
- Password hashes are **never returned in API responses**

---

# 🔑 Authentication Flow

## 1️⃣ User Registration

User creates an account.

```
POST /users/signup
```

### Request Body

```json
{
  "username": "johndoe",
  "fullName": "John Doe",
  "email": "john@email.com",
  "password": "securePassword123"
}
```

### Response

```json
{
  "status": "OK",
  "message": "User registered successfully"
}
```

### Security Steps

- Validate user input
- Check if email already exists
- Hash password using **bcrypt**
- Store user in database

---

## 2️⃣ User Login

Users authenticate with their credentials.

```
POST /users/signin
```

### Request Body

```json
{
  "email": "john@email.com",
  "password": "securePassword123"
}
```

### Response

```json
{
  "status": "OK",
  "token": "JWT_TOKEN"
}
```

---

# 🔐 JWT Token

After successful login, the server generates a **JSON Web Token (JWT)**.

The token contains the user's identity and is used to authenticate future requests.

Example token payload:

```json
{
  "id": "64fa...",
  "username": "johndoe"
}
```

Token settings:

- Signed using **JWT_SECRET**
- Short expiration time for security

---

# 🛡️ Protected Routes

Protected routes require a valid **JWT token**.

The client must send the token in the **header**:

```
Authorization: Bearer <token>
```

---

# 🔑 Authentication vs Authorization

Authentication → Who the user is

Authorization → What the user is allowed to do

---

---

# 🔐 Authorization & Middleware

To ensure that only authorized users can perform certain actions, the API implements several middleware functions responsible for validating authentication and permissions.

These middlewares act as a **security layer** between the request and the controller logic.

---

## 🧾 Authentication Middleware

### `isUserLoggedIn`

This middleware verifies whether a user is authenticated.

It checks if the request contains a valid **JWT token** in the `Authorization` header.

```
Authorization: Bearer <token>
```

If the token is valid:

- The token is verified using `jwt.verify`
- The user payload is decoded
- User information is attached to `req.user`

Example:

```js
req.user = {
  id: "user_id",
  username: "username"
}
```

If the token is missing or invalid, the request is rejected with:

```
401 Unauthorized
```

---

### `isUserLoggedOff`

This middleware ensures that only **unauthenticated users** can access certain routes.

It is typically used in authentication endpoints such as:

- `/users/signup`
- `/users/signin`

If a valid token is already present, the request will be rejected to prevent already authenticated users from accessing login or signup routes.

---

# 👤 Ownership Authorization

Some actions should only be performed by the **owner of a resource**.

The following middlewares enforce these ownership rules.

---

## 👤 `isProfileOwner`

Ensures that a user can only modify **their own profile**.

Example protected actions:

- Updating profile information
- Deleting account
- Updating avatar or bio

Logic:

```
req.user.id === req.params.userId
```

If the authenticated user is not the profile owner:

```
403 Forbidden
```

---

## 📝 `isPostOwner`

Ensures that only the **author of a post** can modify or delete it.

Example protected actions:

- Editing a post
- Deleting a post

The middleware checks whether the authenticated user matches the post's `authorId`.

```
req.user.id === post.authorId
```

If the user is not the owner:

```
403 Forbidden
```

---

## 💬 `isCommentOwner`

Ensures that only the **author of a comment** can modify or delete that comment.

Example protected actions:

- Editing a comment
- Deleting a comment

The middleware verifies:

```
req.user.id === comment.authorId
```

If the user is not the owner:

```
403 Forbidden
```

---

# 🛡️ Security Benefits

These middleware layers ensure that:

- Only authenticated users can access protected resources
- Users cannot impersonate other users
- Users cannot modify or delete resources that they do not own
- Authentication and authorization logic is centralized and reusable

This approach follows best practices for **secure API design**.

---

# 🛡️ Security Measures Implemented

This project implements several security practices:

### Password Hashing

Passwords are hashed using **bcrypt** before being stored in the database.

```
bcrypt.hash(password, saltRounds)
```

---

### JWT Authentication

JWT tokens are used for stateless authentication.

Benefits:

- No server-side session storage
- Secure identification of users
- Scalable authentication system

---

### Protected Routes

Sensitive operations require a valid authentication token.

This prevents unauthorized users from accessing protected resources.

---

### Environment Variables

Sensitive values such as the JWT secret and database connection are stored in `.env` files.

---

# ⚠️ Error Handling

The API returns meaningful HTTP status codes.

| Status Code | Meaning |
|------|------|
| 400 | Invalid request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 500 | Internal server error |

---

# 📸 API Testing Snapshots

Postman snapshots of the main authentication routes are included to demonstrate:

- Successful registration
- Successful login
- Invalid credentials
- Unauthorized access to protected routes

These screenshots confirm that the authentication flow works correctly.

---

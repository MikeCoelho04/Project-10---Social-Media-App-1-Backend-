# 📱 Social Media App – Backend

A RESTful backend API for a Social Media application built with **Node.js**, **Express.js**, and **MongoDB**.

This project manages users, posts, comments, likes, and follow relationships while ensuring data consistency and cascade deletion logic.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API Architecture
- MVC Pattern

---

# 📂 Project Structure

```
src/
│
├── controllers/
│   ├── user.controllers.js
│   ├── post.controllers.js
│   ├── comment.controllers.js
│   ├── like.controllers.js
│   └── follow.controllers.js
│
├── models/
│   ├── user.models.js
│   ├── post.models.js
│   ├── comment.models.js
│   ├── like.models.js
│   └── follow.models.js
│
├── routes/
│   ├── user.routes.js
│   ├── post.routes.js
│   ├── comment.routes.js
│   ├── like.routes.js
│   └── follow.routes.js
│
│
├── index.js

```

---

# 🗄️ Database Models

## 👤 User

```js
{
  username: String,
  fullName: String,
  email: String,
  numberOfPosts: { type: Number, default: 0 },
  numberOfFollowers: { type: Number, default: 0 },
  numberOfFollowing: { type: Number, default: 0 },
  createdAt,
  updatedAt
}
```

---

## 📝 Post

```js
{
  authorId: { type: ObjectId, ref: "User" },
  content: String,
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  createdAt,
  updatedAt
}
```

---

## 💬 Comment

```js
{
  postId: { type: ObjectId, ref: "Post" },
  authorId: { type: ObjectId, ref: "User" },
  content: String,
  createdAt,
  updatedAt
}
```

---

## ❤️ Like

```js
{
  postId: { type: ObjectId, ref: "Post" },
  userId: { type: ObjectId, ref: "User" },
  createdAt
}
```

---

## 🔄 Follow

```js
{
  followerId: { type: ObjectId, ref: "User" },
  followingId: { type: ObjectId, ref: "User" },
  createdAt
}
```

### Unique Constraint

```
{ followerId: 1, followingId: 1 }  // prevents duplicate follows
```

---

# 📌 API Endpoints

---

# 👤 Users

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /users | Create a user |
| GET    | /users | Get all users |
| GET    | /users/:id | Get single user |
| PATCH  | /users/:id | Update a user |
| DELETE | /users/:id | Delete user (cascade delete) |

### Deleting a User will:

- Delete all user's posts
- Delete all user's comments
- Delete all user's likes
- Delete all follow relationships
- Update follower/following counters
- Update like/comment counters in affected posts

---

# 📝 Posts

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /posts     | Create post |
| GET    | /posts     | Get all posts |
| GET    | /posts/:id | Get single posts |
| PATCH  | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete post |

### Deleting a Post will:

- Delete all comments of that post
- Delete all likes of that post
- Decrement author's `numberOfPosts`

---

# 💬 Comments

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /posts/:postId/comments | Create comment |
| GET    | /posts/:postId/comments | Get post comments |
| GET    | /comments/:commentId | Get comment |
| PATCH  | /comments/:commentId | Update comment |
| DELETE | /comments/:id | Delete comment |

Deleting a comment updates:
- `commentCount` of the related post

---

# ❤️ Likes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /posts/:postId/like | Toggle like |

Features:
- One like per user per post
- Updates `likeCount`

---

# 🔄 Follows

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /users/:id/follow-toggle | Follow / Unfollow user |
| GET  | /users/:id/followers | Get followers |
| GET  | /users/:id/following | Get following |

Features:
- Prevents self-follow
- Prevents duplicate follows
- Maintains follower/following counters
- Uses populate to return `username` and `fullName`

---

# 🛡️ Error Handling

| Status Code | Meaning |
|------------|---------|
| 400 | Invalid request or ObjectId |
| 500 | Internal server error |

---

# 🔥 Data Integrity & Consistency

This project ensures:

- Unique follow relationships
- Unique likes per post
- Cascade deletion logic
- Counter synchronization
- Proper ObjectId validation
- Clean separation of concerns (MVC)

---

# 📈 Performance Considerations

- Indexed foreign keys
- Compound unique indexes
- Efficient `updateMany`
- Lean queries
- Controlled field population

---

# 🧠 Architectural Decisions

- MVC structure
- RESTful routing
- Relational collections (Follow, Like) instead of large arrays
- Counter fields for optimized reads
- Cascade deletion handled at controller level

---

# 🎯 Features Implemented

- User management
- Post management
- Comment system
- Like system
- Follow system
- Toggle follow logic
- Cascade deletion
- Counter synchronization
- Proper REST structure

---

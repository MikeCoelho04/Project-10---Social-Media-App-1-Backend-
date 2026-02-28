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
│   └── follow.controllers.js
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Like.js
│   └── Follow.js
│
├── routes/
│   ├── user.routes.js
│   ├── post.routes.js
│   ├── comment.routes.js
│   └── follow.routes.js
│
├── config/
│   └── db.js
│
├── app.js
└── server.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone <repository_url>
cd social-media-backend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Create a `.env` file in the root directory

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/social-media-app
```

## 4️⃣ Start the server

```bash
npm run dev
```

or

```bash
npm start
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
| POST   | /posts | Create post |
| GET    | /posts | Get all posts |
| GET    | /posts/:id | Get single post |
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
| DELETE | /comments/:id | Delete comment |

Deleting a comment updates:
- `commentCount` of the related post

---

# ❤️ Likes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /posts/:postId/like | Toggle like |
| GET    | /posts/:postId/likes | Get post likes |

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
| 404 | Resource not found |
| 409 | Conflict (duplicate follow/like) |
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

# 🧪 Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

Make sure to:
- Use valid MongoDB ObjectIds
- Include required headers (e.g., `x-user-id` for follow/like actions)

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

# 📌 Future Improvements

- JWT Authentication
- Pagination (cursor-based)
- User feed endpoint
- Search functionality
- Rate limiting
- Docker support
- Unit and integration tests

---

# 👨‍💻 Author

Developed for academic purposes using:

**Node.js + Express.js + MongoDB**

---

# 📄 License

This project is for educational purposes only.
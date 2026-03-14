# Fronde Social Media App

Fronde is a full-stack social media application with a React frontend and an Express + MongoDB backend. It includes authentication, a social feed, user profiles, friend discovery, friend requests, comments, likes, and in-app search.

## Overview

This project is split into two parts:

- `client/`: React + Vite frontend
- `server/`: Express API with MongoDB, JWT authentication, cookies, and file uploads

The app is built around a classic social platform flow: users create accounts, sign in, publish posts, interact with other users, manage their profile, and discover new people to follow.

## Core Features

### Authentication and Session Flow

- User registration with:
  - email
  - username
  - full name
  - password + repeated password validation
  - optional bio
  - optional profile picture upload
- User login with client-side validation
- Secure session handling with JWT stored in an HTTP-only cookie
- Logout support from the account menu and mobile hamburger menu
- Auth check endpoint to validate active sessions
- Public route guard so authenticated users cannot access `/login` or `/register`
- Protected frontend route flow for authenticated areas

### User Profiles

- Current user profile page
- Profile header with:
  - avatar
  - full name
  - username
  - followers count
  - following count
  - post count
- Edit profile modal for updating:
  - full name
  - username
  - bio
- Profile content area showing:
  - the user's own posts
  - the user's uploaded photos
  - followed users

### Posts

- Create a new post from the navbar modal
- Posts can contain:
  - text
  - media
  - text + media
- Post feed sorted by most recent first
- Post cards include:
  - author info
  - profile picture or generated avatar placeholder
  - post content
  - optional image/media preview
  - like count
  - comment count
  - publish date formatting
- Edit your own posts from the profile area
- Backend support for deleting posts and cleaning related likes/comments

### Likes

- Like / unlike posts
- Like state is reflected in the UI
- Like count updates in the Redux store without requiring a full reload

### Comments

- Open comments in a popup modal
- Load all comments for a post
- Create a new comment
- Edit your own comments
- Backend support for deleting comments
- Comment author information is shown with avatar/name metadata

### Social Features

- Follow / unfollow users
- Followers and following counts are updated in the backend
- Suggested friends system based on users you do not already follow
- Dismiss suggestions and fetch more suggestions
- Send friend requests
- View received friend requests
- Accept friend requests
- Reject friend requests
- Follow back pending friend requests
- Friends dashboard with tabs for:
  - all friends
  - friend requests
  - suggested friends

### Search

- Active global search bar in the navbar
- Search by username to find users
- Search by post description/content to find posts
- Search results replace the normal `Main` content while a query is active
- Clearing the search restores the normal page content

### Navigation and Routing

- Pages available for:
  - login
  - register
  - home
  - profile
  - friends
- 404 / not found page for invalid routes
- Navbar automatically hidden on auth pages
- Mobile hamburger menu with navigation items and logout

### Media Uploads

- Profile picture upload during registration
- Post media upload for image-based posts
- Uploaded files are served from the backend through `/uploads`

## Sidebar and Dashboard Widgets

The application also includes side widgets and dashboard sections such as:

- friend suggestions
- recent friend requests
- profile summary links
- quick links
- recent activity area
- memories cards
- messages panel

Note:
Some widgets are currently static/presentation-oriented UI sections rather than fully connected real-time features. In particular, the messages panel, memories cards, and some navbar items like Explore and Settings currently behave more like placeholders than fully implemented modules.

## Backend Capabilities

The backend provides:

- Express REST API
- MongoDB with Mongoose models
- JWT-based authentication
- cookie-based session persistence
- authorization middleware for:
  - authenticated users
  - profile owners
  - post owners
  - comment owners
- multipart file uploads via `multer`
- endpoints for:
  - users
  - authentication check
  - posts
  - comments
  - likes
  - follows
  - friend requests

## Frontend Stack

- React
- Vite
- React Router
- Redux
- Redux Thunk
- Axios

## Backend Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- multer
- cors

## Project Structure

```text
client/
  src/
    Pages/
    components/
    context/
    store/
server/
  src/
    controllers/
    middlewares/
    models/
    routes/
  uploads/
```

## API Summary

Main route groups:

- `POST /users/signup`
- `POST /users/signin`
- `POST /users/logout`
- `GET /auth/check`
- `GET /users`
- `GET /users/me`
- `PATCH /users/:id`
- `GET /posts`
- `POST /posts`
- `PATCH /posts/:postId`
- `DELETE /posts/:postId`
- `POST /posts/:postId/comments`
- `GET /posts/:postId/comments`
- `PATCH /comments/:commentId`
- `DELETE /comments/:commentId`
- `POST /posts/:postId/like`
- `POST /users/:followingId/follow-toggle`
- `GET /follow/suggested-friends`
- `POST /friend-request/send`
- `PATCH /friend-request/accept/:requestId`
- `PATCH /friend-request/reject/:requestId`
- `PATCH /friend-request/follow-back/:requestId`
- `GET /friend-request/received`

## Current State

Implemented and working areas are centered around:

- authentication
- profiles
- posts
- likes
- comments
- search
- follows
- friend requests
- responsive navigation
- basic route guarding

UI sections that can still be expanded include:

- direct messaging
- memories module behavior
- explore page behavior
- settings page behavior
- deeper post management from the UI
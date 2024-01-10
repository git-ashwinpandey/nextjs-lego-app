This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
This Next.js application is designed for Lego enthusiasts. It uses React Bootstrap, Mongoose, NextAuth, and bcrypt to offer a robust platform for managing a collection of Lego data.

## Features
- **User Registration:** Register at `/register`. Passwords are encrypted using bcrypt.
- **Authentication:** Login managed through NextAuth.
- **Data Management:** Retrieve and modify Lego collection in MongoDB. Available for logged-in users.

## Installation
1. Clone the repository.
2. `npm install`
3. Set up environment variables.
4. `npm run dev`

## Usage
- `/register` to create an account.
- Log in to view and modify the Lego collection.

## Technologies Used
- Next.js
- React Bootstrap
- Mongoose
- NextAuth
- bcrypt

# AMAR IT - A Modern full-stack ISP platform

![Website HomePage](./Amar%20IT%20Banner.png)

## Overview

A modern full-stack web application based on `Nextjs 13.5.5` and `TypeScript` with `JWT` authentication and `Stripe` payment processing.

This backend-heavy application follows the modern modular pattern. Robust linting and formatting rules are followed to ensure code quality. The backend is built with `Express` and `Prisma` ORM. The frontend is built with `Nextjs` and `React`. The database is `PostgreSQL`. `Cloudinary` is used for image hosting. `Stripe` is used for payment processing. `Winston` is used for logging. `Zod` is used for schema validation. `Husky` and `Lint Staged` are used for git hooks. `Prettier` and `ESLint` are used for code formatting and linting respectively.

## Table of Contents

-   [Overview](#overview)
-   [Links](#links)
-   [Features](#features)
-   [Future Improvements](#future-improvements)
-   [Built with](#built-with)

---

## Links

-   Live Site Link: [Click Here](https://amar-it-frontend.vercel.app/) to see the Live website.
-   Backend Live Site Link: [Click Here](https://amar-it-frontend.vercel.app/) to see the Live backend website.
-   Fronted Github Repo: [Click Here](https://github.com/kamrulsaad/amar-it-frontend) to check the frontend github repo for this project.
-   Backend Github Repo: [Click Here](https://github.com/kamrulsaad/amar-it-backend) to check the backend github repo for this project.

## Demo Credentials

-   Super Admin:
    -   Username: `super_admin`
    -   Password: `123456`
-   Admin:
    -   Username: `admin123`
    -   Password: `123456`
-   Customer:
    -   Username: `customer1`
    -   Password: `123456`


---

## Features

Users should be able to:

-   See a beautiful and responsive landing page
-   Login and Signup using username and password
-   Choose a service and pay for it using Stripe
-   See their booking status and other details in the dashboard
-   Cancel or reschedule their booking from the dashboard
-   See or update their profile details in the dashboard

Super Admins should be able to:

-   Manage admins and admin permissions
-   Manage services
-   Manage bookings
-   Manage customers
-   Manage Contents of the landing page
-   Manage their own profile

Admins should be able to:

-   Manage services
-   Manage bookings
-   Manage customers
-   Manage Contents of the landing page
-   Manage their own profile

## Future Improvements

I have tried to implement the project in the best way possible. However, there are many opportunities to improve in this project. Some of them are listed below:

-   Automated testing can be implemented.
-   Ticketing features can be added to the dashboard.
-   Service Feedback features can be added.
-   Features like live notifications can be added.
-   Role based permissions can be implemented.

## Built With

-   [TypeScript](https://www.typescriptlang.org/) - JS Superset
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password Hashing
-   [Cloudinary](https://cloudinary.com/) - Image Hosting
-   [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - Cookie Parsing
-   [Cors](https://www.npmjs.com/package/cors) - Cross Origin Resource Sharing
-   [Dotenv](https://www.npmjs.com/package/dotenv) - Environment Variable Management
-   [Express](https://expressjs.com/) - Nodejs Framework
-   [Json Web Token](https://www.npmjs.com/package/jsonwebtoken) - JWT Authentication
-   [Multer](https://www.npmjs.com/package/multer) - File Uploading
-   [Multer Storage Cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) - Cloudinary Storage for Multer
-   [Prisma](https://www.prisma.io/) - ORM
-   [Stripe](https://stripe.com/) - Payment Processing
-   [Winston](https://www.npmjs.com/package/winston) - Logging
-   [Zod](https://www.npmjs.com/package/zod) - Schema Validation
-   [Prettier](https://prettier.io/) - Code Formatter
-   [ESLint](https://eslint.org/) - Code Linter
-   [Husky](https://www.npmjs.com/package/husky) - Git Hooks
-   [Lint Staged](https://www.npmjs.com/package/lint-staged) - Git Hooks
-   [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) - Typescript Runtime

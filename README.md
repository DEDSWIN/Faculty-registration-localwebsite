
---

# Faculty Registration Website

## Overview

The Faculty Registration Website is a database course project developed to facilitate the registration process of faculty members at IIT Patna. This website collects user data across various webpages, stores it in a MySQL database, and allows users to print a registration application form with all the details they have filled in. The project runs in a local environment using Docker.

## Project Structure

The project is structured into the following main directories and files:

- `frontend/`: Contains the frontend code built with Next.js using TypeScript.
- `backend/`: Contains the backend code built with Node.js and Express.js.
- `docker-compose.yml`: Defines the Docker services and their configurations.
- `init.sql`: SQL script for initializing the MySQL database.

## Video Demonstration

For a detailed walkthrough of the Faculty Registration Website, please watch the following video:

[![Watch the video](https://img.youtube.com/vi/ljjtaA0QRGY/0.jpg)](https://youtu.be/ljjtaA0QRGY)

## Features

- **Frontend**: Built with Next.js and TypeScript for a robust and scalable user interface.
- **Backend**: Implemented using Node.js and Express.js for handling API requests and business logic.
- **Database**: MySQL database for storing faculty registration data.
- **Authentication**: Firebase authentication for secure user login and registration.
- **File Storage**: Firebase storage for handling file uploads.
- **Docker**: Dockerized setup for consistent development and deployment environments.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd faculty-registration-website
   ```

2. **Initialize Docker containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8080`
   - MySQL Database: `localhost:3307` (username: `root`, password: `root`)

## Usage

1. Navigate to the frontend URL and start the registration process.
2. Fill in the required details across the various forms.
3. Upon completion, preview and print the registration application form.



## Contributors

[Harshvardhan](https://github.com/DEDSWIN)

[Ammar Ahmad](https://github.com/ammarahmad)


---

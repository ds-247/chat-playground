# ChatQt

A simple chat application built with React ,  Node Js and MQTT Protocol.This is an unofficial project solely intended for personal learning and exploration of technologies



## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Git installed.
- MongoDB installed and set up locally.

## Installation

1. **Clone the repository :**

   ```bash
   git clone https://github.com/ds-247/chat-playground.git

2. **Installing dependencies :**

   ```bash
   cd chat-playground

   npm install
   # or
   yarn install


## Usage

1. **Starting the Server :**
   ```bash
   nodemon index.js
2. **Starting the MongoDB :**
   ```bash
      mongod
3. **Starting the Application :**
   ```bash
      npm run dev
4. **Open the application in the default browser :**
   ```bash
      o
### Detailed Process for Using the Application

To use or test this application, follow these steps:

1. Start MongoDB by running the following command in the terminal:
   ```bash
   mongod
2. After starting the MongoDB server, navigate to the backend folder in the terminal and start the application server with either of the following commands:
   ```bash
   node index.js

   # or if you have nodemon installed:
   mongod
3. Open two separate instances of the frontend part of the application by starting servers in two different terminal windows. Use the following command:
   ```bash
   npm run dev
   # Press 'o' to open the application in the default browser.

4. Once the two instances are opened in two tabs of the default browser, go through the login/registration process for the application. After successfully registering or logging in, navigate to the participants to choose someone to chat.

5. If both users are authenticated successfully, the chat window opens, and you're ready to start chatting.
## Features

- **Real-time chat using MQTT**
- **Light Weight Chat Application**
- **Interactive and user friendly UI**

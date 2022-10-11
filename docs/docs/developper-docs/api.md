---
sidebar_position: 1
---

# API Documentation

General information about the API.

What you'll find here is a documentation of all available routes for the backend API.

I'll try to be as clear as possible on how to use each route :

- Method
- Header (if any required)
- Body content (if any required)
- Return body

## General information

All responses from the API will be made in the JSON format.

All validation errors come from the NPM Joi package.

Check their documentation for error messages explanation: [Joi Documentation](https://joi.dev/api/?v=17.6.1)

All responses will be described using the following format :

![HTTP Status Codes Descriptions](./img/http_status_codes.jpeg)

For those of you who didn't understand the picture use the following comparative list :

- Information (HTTP status codes 1xx) : you'll find them under "Hold on"
- Success (HTTP status codes 2xx) : you'll find them under "Here you go"
- Redirection (HTTP status codes 3xx) : you'll find them under "Go away"
- Client error (HTTP status codes 4xx) : you'll find them under "You fucked up"
- Server error (HTTP status codes 5xx) : you'll find them under "I fucked up"
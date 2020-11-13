# AT Insurance [![Build Status](https://travis-ci.com/abhithube/insurance-portal-angular.svg?branch=master)](https://travis-ci.com/abhithube/insurance-portal-angular) ![Uptime Robot status](https://img.shields.io/uptimerobot/status/m786310905-dccf1688865bc88700ab80f5)
AT Insurance is a health insurance member portal. It’s a web-based application that allows users to create accounts, browse available benefit plans, and manage their enrollment in their active plan. The code is written in Java and JavaScript. In particular, the Spring Boot framework is used for the backend, and the Angular framework on the front end. The database of choice is MongoDB.

## Website Link
The application is available at https://app.at-insurance.com.

Note: To save on AWS server costs, the application is only up during the day. I set up a cron job scheduler on AWS auto-scaling to terminate all of the EC2 instances every night, and start them up again in the morning. The "status" badge at the top indicates if the application is currently up.

## Features
- Account Management: Users can register for accounts and login to view their personal details. The profile page will display their account information, enrollment status, and full billing history.
- Browsing: The plans page will display the available benefit plans, with information such as cost and deductibles. This page is accessible to all visitors to the site, but only members will be able to enroll in plans.
- Enrollment: Members can enroll in a plan of their choice. Payment (currently) uses the subscription model, so members will be charged immediately and every 30 days thereafter.

## Technologies
- Programming Languages: Java, JavaScript
- Frameworks: Spring Boot, Angular
- DBMS: MongoDB
- Messaging: Kafka
- Testing: JUnit, Mockito
- Build: Maven, npm
- CI/CD: Travis CI
- Deployment: Docker, AWS

## Microservices
The backend was designed using the microservices architecture. Each service is written, tested, and deployed independently. A combination of REST APIs and Kafka allows for service communication. Data is retrieved and persisted with the help of REST calls and other services are notified about it via Kafka messaging.

The services are listed below, each containing a link to its corresponding repo. Each service's README contains a link to its API documentation, if applicable.
- [Member Details Service](https://github.com/abhithube/member-details-service): REST API for retrieving and updating a member’s profile
- [Plan Details Service](https://github.com/abhithube/plan-details-service): REST API for retrieving plan details
- [Enrollment Service](https://github.com/abhithube/enrollment-service): REST API for updating a member’s enrollment status, and Stripe API webhook endpoints for receiving payment invoices
- [Notifications Service](https://github.com/abhithube/notifications-service): Kafka listeners to send messages to the member’s dashboard once the member’s account has been modified (registration, enrollment, payment)

## CI/CD Workflow
Docker and Travis CI make up the CI/CD aspect of the project. The workflow consists of pushing code to a dev branch, upon which Travis CI will run unit tests. If the tests pass, the branch is merged into master. Travis CI will build a Docker image, which builds the source code and runs tests. Upon success, the image is pushed to the Amazon container registry.

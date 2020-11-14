# AT Insurance [![Build Status](https://travis-ci.com/abhithube/insurance-portal-angular.svg?branch=master)](https://travis-ci.com/abhithube/insurance-portal-angular) ![Uptime Robot status](https://img.shields.io/uptimerobot/status/m786310905-dccf1688865bc88700ab80f5)
AT Insurance is a health insurance member portal. It’s a web-based application that allows users to create accounts, browse available benefit plans, and manage their enrollment in their active plan. The code is written in Java and JavaScript. In particular, the Spring Boot framework is used for the backend, and the Angular framework on the front end. The database of choice is MongoDB.

## Website Link
The application is available at https://app.at-insurance.com.

Note: To save on AWS server costs, the application is only up during the day. A cron job scheduler on AWS auto-scaling terminates all of the EC2 instances every night, and starts them up again in the morning. The "status" badge above indicates if the application is currently up.

## Features
- Account Management: Users can register for accounts and login to view their personal details. The profile page will display their account information, enrollment status, and full billing history.
- Browsing: The plans page will display the available benefit plans, with information such as cost and deductibles. This page is accessible to all visitors to the site, but only members will be able to enroll in plans.
- Enrollment: Members can enroll in a plan of their choice. Payment (currently) uses the subscription model, so members will be charged immediately and every 30 days thereafter.

## Technologies
- **Programming Language**: Java, JavaScript
- **Framework**: Spring Boot, Angular
- **DBMS**: MongoDB
- **Messaging**: Kafka
- **Testing**: JUnit, Mockito
- **Build**: Maven, npm
- **CI/CD**: Travis CI, Docker, AWS

## Microservices
The backend was designed using the microservices architecture. Each service is written, tested, and deployed independently. A combination of REST APIs and Kafka allows for service communication. Data is retrieved and persisted with the help of REST calls and other services are notified about it via Kafka messaging.

The services are listed below, each containing a link to its corresponding repo. Each service's README contains a link to its API documentation, if applicable.
- [Member Details Service](https://github.com/abhithube/member-details-service): REST API for retrieving and updating a member’s profile
- [Plan Details Service](https://github.com/abhithube/plan-details-service): REST API for retrieving plan details
- [Enrollment Service](https://github.com/abhithube/enrollment-service): REST API for updating a member’s enrollment status, and Stripe API webhook endpoints for receiving payment invoices
- [Notifications Service](https://github.com/abhithube/notifications-service): Kafka listeners to send messages to the member’s dashboard once the member’s account has been modified (registration, enrollment, payment)

## UI
Angular is used for dynamic HTML templating, form validation, routing, and making REST calls. Bootstrap offers some very basic styling to make the application a bit more modern. AWS Amplify, a JS library, connects to a user pool on AWS Cognito and provides functionality to register and authenticate users. An authentication guard is set up to protect certain page routes, redirecting to the login page if the current user is not authenticated.

## CI/CD Workflow
The workflow consists of pushing code to a dev branch, upon which Travis CI will run unit tests. If the tests pass, the branch is merged into master. Travis CI will create a Docker image, which consists of building the source code and running tests against that build. Upon success, the image is pushed to the Amazon container registry.

## AWS Setup
Amazon's container-orchestration service, ECS, is responsible for pulling Docker images from the container registry and firing up containers. Two clusters have been created for this project.

#### Application Cluster
The main cluster orchestrates the application's containers. The container services have been configured for load-balancing and auto-scaling. The frontend and backend each have their own load balancer. The load balancers are responsible for routing traffic to the individual containers in a round-robin fashion. By default, only one container for each microservice is fired up, and will be scaled up to two instances based on CPU utilization. The load balancers also use health checks to verify the status of their containers. If the route they have been configured to ping returns anything other than a 200 HTTP response code, the container will be shut down and a new one will take its place. The services in this cluster are divided among a couple of EC2 instances, which are active during the day (as indicated above).

#### Kafka Cluster
[This](https://hub.docker.com/r/wurstmeister/kafka) Kafka image and [this](https://hub.docker.com/r/wurstmeister/zookeeper) Zookeeper image are used to start up a simple Kafka broker. This Kafka cluster runs on its own EC2 instance, which is always active. A static IP has been assigned to this EC2 instance, which the Spring Boot services use to connect to the Kafka broker.

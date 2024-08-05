# GrowthHub API Documentation

## Overview

GrowthHub is a platform designed to motivate community members to contribute to community-wide projects. It allows communities to reward and recognize active contributors with NFTs and Tokens. The API supports a project management system, offering endpoints for actions such as user registration, project creation, milestone updates, and reward creation. Additionally, it includes inspection endpoints for querying data about users, projects, and contributions.

## Endpoints

### Advanced Handlers

All advanced handlers require a JSON payload in the body. The JSON payload must include a `method` field specifying the action to be performed. The structure of the payload and the required fields vary based on the method. These endpoints take transactions from a user's wallet.

#### Simulating Advanced Calls

To simulate these calls, use the `cartesi send` command, which allows you to send payloads as transactions.

### Methods

1. **register**

   - **Description**: Registers a new user.
   - **Required Fields**:
     - `username`: The username of the new user.
   - **Example Payload**:
     ```json
     {
       "method": "register",
       "data": {
         "username": "newUser"
       }
     }
     ```

2. **createProject**

   - **Description**: Creates a new project.
   - **Required Fields**:
     - `url`: The URL of the project.
   - **Example Payload**:
     ```json
     {
       "method": "createProject",
       "data": {
         "url": "http://example.com"
       }
     }
     ```

3. **addProject**

   - **Description**: Adds a user to an existing project as a contributor.
   - **Required Fields**:
     - `projectId`: The ID of the project.
   - **Example Payload**:
     ```json
     {
       "method": "addProject",
       "data": {
         "projectId": "12345"
       }
     }
     ```

4. **createMilestones**

   - **Description**: Creates milestones for a project.
   - **Required Fields**:
     - `projectId`: The ID of the project.
     - `milestoneDetails`: An array of milestone details.
   - **Example Payload**:
     ```json
     {
       "method": "createMilestones",
       "data": {
         "projectId": "12345",
         "milestoneDetails": [
           {
             "description": "Complete initial design",
             "achievement": {
               "metric": "contribCount",
               "value": 10
             }
           },
           {
             "description": "Reach project impact score of 100",
             "achievement": {
               "metric": "impact",
               "value": 100
             }
           }
         ]
       }
     }
     ```

5. **updateMilestone**

   - **Description**: Updates milestones for a project.
   - **Required Fields**:
     - `projectId`: The ID of the project.
     - `milestoneDetails`: An array of updated milestone details.
   - **Example Payload**:
     ```json
     {
       "method": "updateMilestone",
       "data": {
         "projectId": "12345",
         "milestoneDetails": [
           {
             "description": "Complete initial design",
             "achievement": {
               "metric": "contribCount",
               "value": 10
             }
           },
           {
             "description": "Reach project impact score of 100",
             "achievement": {
               "metric": "impact",
               "value": 100
             }
           }
         ]
       }
     }
     ```

6. **createReward**

   - **Description**: Creates a reward for a project.
   - **Required Fields**:
     - `projectId`: The ID of the project.
     - `contractAddress`: The contract address for the reward.
     - `description`: A description of the reward.
   - **Optional Fields**:
     - `type`: The type of reward.
     - `amount`: The amount of the reward.
   - **Example Payload**:
     ```json
     {
       "method": "createReward",
       "data": {
         "projectId": "12345",
         "contractAddress": "0xABC123",
         "description": "Reward for completion",
         "type": "Token",
         "amount": 100
       }
     }
     ```

7. **processMergedRequest**

   - **Description**: Processes a merged request for a project.
   - **Required Fields**:
     - `projectId`: The ID of the project.
     - `username`: The username of the user.
     - `taskComplexity`: The complexity of the task.
   - **Example Payload**:
     ```json
     {
       "method": "processMergedRequest",
       "data": {
         "projectId": "12345",
         "username": "contributorUser",
         "taskComplexity": 5
       }
     }
     ```

### Inspect Handlers

These handlers respond to GET requests and retrieve various types of data from the system.

#### Base Path

`/inspect/`

#### Endpoints

1. **inspect/users**

   - **Description**: Retrieves a list of users.
   - **Query Parameters**:
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
   - **Example Request**:
     ```
     GET /inspect/users?page=1&page_size=50
     ```

2. **inspect/projects**

   - **Description**: Retrieves a list of projects.
   - **Query Parameters**:
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
   - **Example Request**:
     ```
     GET /inspect/projects?page=1&page_size=50
     ```

3. **inspect/stat**

   - **Description**: Retrieves statistics for a user or project.
   - **Query Parameters**:
     - `address`: The address of the user.
     - `projectId`: The ID of the project.
   - **Example Request**:
     ```
     GET /inspect/stat?address=0xABC123&projectId=12345
     ```

4. **inspect/rewards**

   - **Description**: Retrieves rewards for a project.
   - **Query Parameters**:
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
     - `projectId`: The ID of the project.
   - **Example Request**:
     ```
     GET /inspect/rewards?projectId=12345&page=1&page_size=50
     ```

5. **inspect/contributions**

   - **Description**: Retrieves contributions made by a user.
   - **Query Parameters**:
     - `address`: The address of the user.
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
   - **Example Request**:
     ```
     GET /inspect/contributions?address=0xABC123&page=1&page_size=50
     ```

6. **inspect/managing**

   - **Description**: Retrieves projects managed by a user.
   - **Query Parameters**:
     - `address`: The address of the user.
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
   - **Example Request**:
     ```
     GET /inspect/managing?address=0xABC123&page=1&page_size=50
     ```

7. **inspect/user**

   - **Description**: Retrieves information about a specific user.
   - **Query Parameters**:
     - `id`: The ID of the user.
   - **Example Request**:
     ```
     GET /inspect/user?id=12345
     ```

8. **inspect/project**

   - **Description**: Retrieves information about a specific project.
   - **Query Parameters**:
     - `id`: The ID of the project.
   - **Example Request**:
     ```
     GET /inspect/project?id=12345
     ```

9. **inspect/milestones**

   - **Description**: Retrieves milestones for a project.
   - **Query Parameters**:
     - `projectId`: The ID of the project.
     - `page`: The page number for pagination.
     - `page_size`: The number of items per page.
   - **Example Request**:
     ```
     GET /inspect/milestones?projectId=12345&page=1&page_size=50
     ```

10. **inspect/accomplishments**

    - **Description**: Retrieves accomplishments of a user.
    - **Query Parameters**:
      - `address`: The address of the user.
      - `page`: The page number for pagination.
      - `page_size`: The number of items per page.
    - **Example Request**:
      ```
      GET /inspect/accomplishments?address=0xABC123&page=1&page_size=50
      ```

## Steps to Testing GrowthHub

To run and test GrowthHub locally, follow these steps. This guide will walk you through cloning the repository, installing necessary dependencies, running the application, and testing the full range of functionality using various API endpoints.

### Prerequisites

Ensure you have the following installed on your system:

- **Git**: For cloning the repository.
- **Node.js**: For running JavaScript on the server.
- **Docker**: Required for running Cartesi. Refer to the [Cartesi installation docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/installation/) for full details.

### Step 1: Clone the Repository

```sh
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Install Cartesi CLI

Install Cartesi CLI globally using npm:

```sh
npm install -g @cartesi/cli
```

### Step 3: Build and Run the Application

Build and run the Cartesi environment:

```sh
cartesi build
cartesi run
```

### Step 4: Register a User

Use the `cartesi send` command to register a new user:

```sh
cartesi send
```

payload

```
'{
  "method": "register",
  "data": {
    "username": "testUser"
  }
}'
```

### Step 5: Create a Project

Create a new project:

```sh
cartesi send
```

payload

```
'{
  "method": "createProject",
  "data": {
    "url": "http://example.com/project"
  }
}'
```

### Step 6: Deploy an NFT Reward

Connect your MetaMask to Remix and deploy the smart contract using the local foundry node created when running `cartesi run`. After deployment, create an NFT reward:

```sh
cartesi send
```

payload

```
'{
  "method": "createReward",
  "data": {
    "projectId": "12345",
    "contractAddress": "0xYourContractAddress",
    "type": "NFT",
    "amount": 1,
    "description": "Reward for the first milestone"
  }
}'
```

### Step 7: Create a Milestone

Create a milestone for the first contribution made:

```sh
cartesi send
```

payload

```
 '{
  "method": "createMilestones",
  "data": {
    "projectId": "12345",
    "milestoneDetails": [
      {
        "description": "First Contribution",
        "achievement": {
          "metric": "contribCount",
          "value": 1
        }
      }
    ]
  }
}'
```

### Step 8: Register Another User

Register another user:

```sh
cartesi send
```

payload

```
'{
  "method": "register",
  "data": {
    "username": "anotherUser"
  }
}'
```

### Step 9: Get List of Available Projects

Fetch the list of available projects:

```sh
curl "http://localhost:5000/inspect/projects?page=1&page_size=50"
```

### Step 10: Add a Project to Contribute To

Add a project to the list of projects you will contribute to:

```sh
cartesi send
```

payload

```
'{
  "method": "addProject",
  "data": {
    "projectId": "12345"
  }
}'
```

### Step 11: Simulate Merged Request

Simulate a successful merge request using the `processMergedRequest` endpoint:

```sh
cartesi send
```

payload

```
'{
  "method": "processMergedRequest",
  "data": {
    "username": "testUser",
    "projectId": "12345",
    "taskComplexity": 3
  }
}'
```

### Step 12: Check Application State

Check the state of the application by making GET requests in your browser:

- **Get Users**: `http://localhost:5000/inspect/users?page=1&page_size=50`
- **Get Projects**: `http://localhost:5000/inspect/projects?page=1&page_size=50`
- **Get Stat**: `http://localhost:5000/inspect/stat?address=0xYourAddress&projectId=12345`
- **Get Rewards**: `http://localhost:5000/inspect/rewards?projectId=12345&page=1&page_size=50`
- **Get Contributions**: `http://localhost:5000/inspect/contributions?address=0xYourAddress&page=1&page_size=50`
- **Get Managing Projects**: `http://localhost:5000/inspect/managing?address=0xYourAddress&page=1&page_size=50`
- **Get User**: `http://localhost:5000/inspect/user?id=1`
- **Get Project**: `http://localhost:5000/inspect/project?id=12345`
- **Get Milestones**: `http://localhost:5000/inspect/milestones?projectId=12345&page=1&page_size=50`
- **Get Accomplishments**: `http://localhost:5000/inspect/accomplishments?address=0xYourAddress&page=1&page_size=50`

You can also check out the notices and vouchers called using the graphQL endpoint, find out more about that in the [Cartesi docs](https://docs.cartesi.io/cartesi-rollups/1.3/rollups-apis/graphql/overview/)

By following these steps, you should be able to fully test the functionality of GrowthHub.

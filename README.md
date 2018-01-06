# [Protontype Framework](https://github.com/protontype/protontype) Sample using [protontype-sequelize](https://github.com/protontype/protontype-sequelize) module

## Run example
 - open terminal
 - git clone https://github.com/protontype/protontype-sequelize-sample.git
 - npm install
 - npm run build
 - npm start

### Endpoints availables
#### GET Method
- http://localhost:3000/tasks  (List all tasks)
- http://localhost:3000/tasks/:id (Get task by id)
- http://localhost:3000/users (List all users)
- http://localhost:3000/users/:id (Get user by id)
 
#### POST Method
- http://localhost:3000/tasks (Creates task)
- http://localhost:3000/users (Creates user)

#### DELETE Method
- http://localhost:3000/tasks/:id (Remove task)
- http://localhost:3000/users/:id (Remove user)

#### PUT Method
- http://localhost:3000/tasks/:id (Update task)
- http://localhost:3000/users/:id (Update user)

### Request body
#### Tasks
```json
{
  "title": "Make something",
  "done": false,
  "userId": 1
}
```

#### Users
```json
{
  "name": "Bob",
  "password": "123456",
  "email": "bob@mail.com"
}
```

## Development environment (linked module)

**Cloning ProtonType module**

- git clone https://github.com/protontype/protontype.git
- npm install
- npm link

**Cloning and install example**

 - git clone https://github.com/protontype/protontype-sequelize-sample.git
- npm install
- npm link protontype
- tsc
- npm start

## Requirements
NodeJS 6.x or later

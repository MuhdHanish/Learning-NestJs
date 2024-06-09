# NestJS Notes

## 1. Modules

- Each application has at least one module - the root module, which serves as the starting point.
- Modules effectively organize components based on closely related capabilities (e.g., per feature).
- It's a good practice to have a folder per module, containing the module's components.
- Modules are singletons, meaning a module can be imported by multiple other modules.

### Defining a Module

To define a module in NestJS, use the `@Module` decorator. This decorator provides metadata that NestJS uses to organize the application structure.

#### @Module Decorator Properties

- **providers**: Array of providers available within the module via dependency injection.
- **controllers**: Array of controllers instantiated within the module.
- **exports**: Array of providers to export to other modules.
- **imports**: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

Example of a basic module definition:

```typescript
import { Module } from '@nestjs/common';
import { SomeService } from './some.service';
import { SomeController } from './some.controller';

@Module({
  imports: [],                       // List of imported modules
  controllers: [SomeController],     // List of controllers
  providers: [SomeService],          // List of providers
  exports: [SomeService],            // List of providers to be exported for other modules to use
})
export class SomeModule {}
```

## 2. Controllers

- Responsible for handling incoming requests and returning responses to the client.
- Bound to a specific path (e.g., "/tasks" for the task resource).
- Contain handlers, which manage endpoints and request methods (GET, POST, DELETE...).
- Can take advantage of dependency injection to consume providers within the same module.

### Defining a Controller

To define a controller in NestJS, use the `@Controller` decorator. This decorator accepts a string, which is the path to be handled by the controller.

Example of a basic controller definition:

```typescript
import { Controller } from '@nestjs/common';

@Controller('/example')
export class SomeController {
  // ...
}
```

This `SomeController` handles requests at the "/example" endpoint.

### Defining a Handler

Handlers are methods within the controller class, decorated with decorators such as `@Get`, `@Post`, `@Delete`...

Example of a basic handler definition:

```typescript
import { Controller, Get, Post } from '@nestjs/common';

@Controller('/example')
export class SomeController {
  @Get()
  getSomething() {
    return ...;
  }
  @Post()
  createSomething() {
    return ...;
  }
}
```

Certainly! Here's the updated section with the HTTP request incoming diagram added:

```markdown
# NestJS Notes

## 1. Modules

- Each application has at least one module - the root module, which serves as the starting point.
- Modules effectively organize components based on closely related capabilities (e.g., per feature).
- It's a good practice to have a folder per module, containing the module's components.
- Modules are singletons, meaning a module can be imported by multiple other modules.

### Defining a Module

To define a module in NestJS, use the `@Module` decorator. This decorator provides metadata that NestJS uses to organize the application structure.

#### @Module Decorator Properties

- **providers**: Array of providers available within the module via dependency injection.
- **controllers**: Array of controllers instantiated within the module.
- **exports**: Array of providers to export to other modules.
- **imports**: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

Example of a basic module definition:

```typescript
import { Module } from '@nestjs/common';
import { SomeService } from './some.service';
import { SomeController } from './some.controller';

@Module({
  imports: [],                       // List of imported modules
  controllers: [SomeController],     // List of controllers
  providers: [SomeService],          // List of providers
  exports: [SomeService],            // List of providers to be exported for other modules to use
})
export class SomeModule {}
```

## 2. Controllers

- Responsible for handling incoming requests and returning responses to the client.
- Bound to a specific path (e.g., "/tasks" for the task resource).
- Contain handlers, which manage endpoints and request methods (GET, POST, DELETE...).
- Can take advantage of dependency injection to consume providers within the same module.

### Defining a Controller

To define a controller in NestJS, use the `@Controller` decorator. This decorator accepts a string, which is the path to be handled by the controller.

Example of a basic controller definition:

```typescript
import { Controller } from '@nestjs/common';

@Controller('/example')
export class SomeController {
  // ...
}
```

This `SomeController` handles requests at the "/example" endpoint.

### Defining a Handler

Handlers are methods within the controller class, decorated with decorators such as `@Get`, `@Post`, `@Delete`...

Example of a basic handler definition:

```typescript
import { Controller, Get, Post } from '@nestjs/common';

@Controller('/example')
export class SomeController {
  @Get()
  getSomething() {
    return ...;
  }
  @Post()
  createSomething() {
    return ...;
  }
}
```

### HTTP Request Incoming Diagram

- **First Request**: When a request comes in, it is routed to the appropriate controller based on the defined routes.
- **Controller**: The controller receives the request and passes it to the appropriate handler method.
- **Handler**: The handler method is called with any required arguments. NestJS parses the relevant request data, making it available in the handler.
- **Handler Processing**: The handler processes the request, which may involve interactions with services such as retrieving data from a database.
- **Response**: Once the handler has completed its operations, it returns a response. This response can be of any type, including an exception. NestJS wraps the return value as an HTTP response and sends it back to the client.
```
                                      +---------------------------+
                                      |                           |
                                      |   Incoming HTTP Request   |
                                      |                           |
                                      +--------------+------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |        Route Resolution      |
                                     |                              |
                                     |  - Determine appropriate    |
                                     |    controller and handler   |
                                     |    based on defined routes  |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |        Controller            |
                                     |                              |
                                     |  - Receive request          |
                                     |  - Pass request to handler  |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |        Handler Method        |
                                     |   - Parse Request Data      |
                                     |   - Execute Business Logic  |
                                     |   - Retrieve Data           |
                                     |   - Return Response         |
                                     |   - Handle Exceptions       |
                                     |                              |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |      Request Processing      |
                                     |                              |
                                     |  - Handler processes       |
                                     |    the request             |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |       Response Sent          |
                                     |                              |
                                     |  - Handler returns response |
                                     +-------------------------------+

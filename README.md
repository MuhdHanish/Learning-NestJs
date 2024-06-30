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
                                     |  - Determine appropriate     |
                                     |    controller and handler    |
                                     |    based on defined routes   |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |        Controller            |
                                     |                              |
                                     |  - Receive request           |
                                     |  - Pass request to handler   |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |        Handler Method        |
                                     |                              |
                                     |   - Parse Request Data       |
                                     |   - Execute Business Logic   |
                                     |   - Retrieve Data            |
                                     |   - Return Response          |
                                     |   - Handle Exceptions        |
                                     |                              |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |      Request Processing      |
                                     |                              |
                                     |  - Handler processes         |
                                     |    the request               |
                                     +---------------+--------------+
                                                     |
                                                     v
                                     +---------------+--------------+
                                     |                              |
                                     |       Response Sent          |
                                     |                              |
                                     |  - Handler returns response  |
                                     +------------------------------+
```

## 3. Providers

- Can be injected into constructors if decorated as an `@Injectable`, via dependency injection.
- Can be a plain value, a class, sync/async fatctor etc.
- Provider must be provided to a module for them to be usable.
- Can be exported from a module - and then be available to other modules that import it.

### What is a Service ?

- Defined as a provider. **Not all providers are services**.
- Common concept within software development and are not exclusive NestJS, JavaScript or back-end development.
- Singleton when wrapped with `@Injectable()` are provided to a module. That means, the same instance will be the shared across the application acting as a single source of truth.
- The services are the main source of business logic. For example, a service will be called from a controller to validate data, create an item in the database and return a response.

Example of Providers in Modules:

```typescript
import { Module } from '@nestjs/common';
import { SampleOneService, SampleTwoService } from './some.service';
import { SomeController } from './some.controller';

@Module({
  controllers: [SomeController],  
  providers: [SampleOneService, SampleTwoService],  
})
export class SomeModule {}
```

## 4. Dependency Injection In NestJS

- Any component within the NestJS ecosystem can inject a provider that is decorated with the `@Injectable`.
- We define the dependencies in the constructor of the class. NestJS will take care of the injection for us, and it will then be available as a class property.

Example demonstrating the usage of dependency injection in a NestJS controller:

```typescript
import { Controller, Get, Post } from '@nestjs/common';
import { SomeService } from './some.service';

@Controller('/example')
export class SomeController {
  constructor(private someService: SomeService){}
  @Get()
  getSomething() {
    return await this.someService.someting();
  }
}
```

In this example:
- The `SomeController` class has a dependency on the `SomeService`, which is injected into its constructor.
- The `SomeService` instance is then available as a property (`this.someService`) within the `SomeController`.
- We can now call methods or access properties of the `SomeService` instance from within the `SomeController`, such as in the `getSomething` method.


## 5. Data Transfer Object (DTO)

- Common concept in software development that is not specific to NestJS.
- Result in more bulletproof code, as it can be used as a TypeScript type.
- Do not have any behavior except for storage, retrieval, serialization, and deserialization of their own data.
- Result in increased performance (although negligible in small applications).
- Can be useful for data validation.
- A DTO is *not* a model definition. It defines the shape of the data for a specific case, for example, creating a task.
- Can be defined using an interface or a class.

### Definitions

- A Data Transfer Object (DTO) is an object that carries data between processes (Wikipedia).
- A DTO is used to encapsulate data and transfer it from one subsystem of an application to another (StackOverflow).
- A DTO defines how data will be sent over the network (NestJS Documentation).

### Class VS Interface for DTO's

- Data Transfer Object's (DTO's) can be defined as classes or interfaces.
- The recommended approach is to use classes, also clearly documented in the NestJS documentation.
- The reason is that interfaces are a part of TypeScript and therefore are not preserved post-compilation.
- Classes allow us to do more, and since they are a part of JavaScript, they will be preserved post-compilation.
- NestJS cannot refer interfaces in run-time, but can refer to classes.


### Important Note!

- Data Transfer Objects are **NOT** mandatory.
- You can still develop application without using DTO's.
- However, the value they add makes it worthwhile to use them when applicable.
- Applying the DTO pattern as soon as possible will make it easy for you to maintain and refractor your code.

## 6. NestJS Pipes

Pipes in NestJS operate on the **arguments** that are to be processed by the route handler, right before the handler is called. Pipes can perform two primary functions:

1. **Data Transformation:** Transforming the data into the desired format.
2. **Data Validation:** Validating the data against certain criteria.

Pipes can return either the original or modified data to be passed on to the route handler. If the data is invalid or an error occurs, pipes can throw exceptions, which are handled by NestJS and turned into appropriate error responses. Notably, pipes can also be asynchronous.

### Default Pipes in NestJS

NestJS provides several useful pipes within the `@nestjs/common` module:

#### ValidationPipe

This pipe validates an entire object against a class, making it especially useful with Data Transfer Objects (DTOs). If any property cannot be properly mapped (e.g., due to a type mismatch), the validation will fail. This built-in validation pipe is highly beneficial for common use cases.

#### ParseIntPipe

Since arguments are strings by default, this pipe validates that an argument is a number. If successful, the argument is transformed into a **Number** and passed on to the handler.

### Custom Pipe Implementation

To create a custom pipe in NestJS:

1. **Class and Decorator:** Pipes are classes annotated with the `@Injectable()` decorator.
2. **Implement `PipeTransform`:** Pipes must implement the `PipeTransform` generic interface, requiring a **transform()** method.
3. **Parameters of `transform()`:** The `transform()` method takes two parameters:
   - **value:** The value of the processed argument.
   - **metadata** (optional): An object containing metadata about the argument.
4. **Return Value or Exception:** The `transform()` method returns data to be passed to the route handler or throws an exception to be sent back to the client.

### Using Pipes

Pipes can be applied in different ways:

#### Handler-Level Pipes

Defined at the handler level using the `@UsePipes()` decorator. These pipes process all parameters for the incoming request.

```typescript
import { Post, UsePipes, Body } from '@nestjs/common';

@Post()
@UsePipes(SomePipe)
createSomething(
  @Body('something') something
) {
  // ...
}
```

#### Parameter-Level Pipes

Defined at the parameter level. Only the specific parameter for which the pipe is specified will be processed.

```typescript
import { Post, Body } from '@nestjs/common';

@Post()
createSomething(
  @Body('something', SomePipe) something
) {
  // ...
}
```

#### Global Pipes

Defined at the application level and applied to all incoming requests.

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

#### Parameter-Level vs. Handler-Level Pipes: Which One?

**It depends**.

**Parameter-level pipes** tend to be slimmer and cleaner. However, they often result in extra code added to handlers, which can get messy and hard to maintain.

**Handler-level pipes** require some more code but provide some great benefits:

- They do not require extra code at the parameter level.
- They are easier to maintain and expand. If the shape of the data changes, it is easy to make the necessary changes within the pipe only.
- The responsibility of identifying the arguments to process is shifted to one central file - the pipe file.
- They promote the usage of DTOs (Data Transfer Objects), which is a very good practice.
```
                                    +------------------------------+
                                    |                              |
                                    |   Incoming HTTP Request      |
                                    |   Method - POST              |
                                    |   Body - {                   |
                                    |    "title": "example"        |
                                    |   }                          |
                                    |                              |
                                    +----------------+-------------+
                                                     |
                                                     v
                                    +---------------+--------------+
                                    |                              |
                                    |     Handler is identified    |
                                    |                              |
                                    +---------------+--------------+
                                                    |
                                                    v
                                    +---------------+--------------+
                                    |                              |
                                    |            Pipe              |
                                    |                              |
                                    |  - Validates arguments       |
                                    |  - Transforms data           |
                                    |                              |
                                    +---------------+--------------+
                                                    |
                                                    v
                       +----------------------------+-------------------------+
                       |                                                      |
                       v                                                      v
         +-------------+------------------+                      +------------+---------------+
         |                                |                      |                            | 
         |         Validation             |                      |        Validation          |
         |         Successful             |                      |        Failed              |
         |                                |                      |                            |
         +-------------+------------------+                      +------------+---------------+
                       |                                                      |
                       v                                                      v
         +-------------+------------------+                      +------------+---------------+
         |                                |                      |                            |
         |  Handler is called             |                      |    BadRequestException     |
         |  SomeController.create()       |                      |    is thrown               |
         |                                |                      |                            |
         +-------------+------------------+                      +------------+---------------+
                       |                                                      |
                       v                                                      v
         +-------------+------------------+                      +------------+---------------+
         |                                |                      |                            |
         |    HTTP Response Sent          |                      |   HTTP Response Sent       |
         |    Status: 201                 |                      |   Status: 400              |
         |                                |                      |                            |
         +--------------------------------+                      +----------------------------+
```
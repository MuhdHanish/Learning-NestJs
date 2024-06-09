# NestJS Notes

## 1. Modules

- Each application has at least one module - the root module. That is the starting point of the application.
- Modules are an effective way to organize components by a closely related set of capabilities (e.g., per feature).
- It is a good practice to have a folder per module, containing the module's components.
- Modules are singletons; therefore, a module can be imported by multiple other modules.

### Defining a Module

To define a module in NestJS, use the `@Module` decorator. This decorator provides metadata that NestJS uses to organize the application structure.

#### @Module Decorator Properties

- **providers**: Array of providers to be available within the module via dependency injection.
- **controllers**: Array of controllers to be instantiated within the module.
- **exports**: Array of providers to export to other modules.
- **imports**: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

Example of a basic module definition:

```typescript
import { Module } from '@nestjs/common';
import { SomeService } from './some.service';
import { SomeController } from './some.controller';

@Module({
  imports: [],                      // List of imported modules
  controllers: [SomeController],    // List of controllers
  providers: [SomeService],         // List of providers
  exports: [SomeService],           // List of providers to be exported for other modules to use
})
export class SomeModule {}
```

## 2. Controllers

- Responsible for handling incoming requests and returning responses to the client.
- Bound to a specific path (for example, "/tasks" for the task resource).
- Contain handlers, which handle endpoints and request methods (GET, POST, DELETE...).
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
# NestJs Notes

## 1. Modules

1. Each application has at least one module - the root module. That is the starting point of the application.
2. Modules are an effective way to organize components by a closely related set of capabilities (e.g., per feature).
3. It is a good practice to have a folder per module, containing the module's components.
4. Modules are singletons; therefore, a module can be imported by multiple other modules.

### Defining a Module

To define a module in NestJs, use the `@Module` decorator. This decorator provides metadata that NestJs uses to organize the application structure.

### @Module Decorator Properties

- **providers**: Array of providers to be available within the module via dependency injection.
- **controllers**: Array of controllers to be instanciated within the module.
- **exports**: Array of providers to export to other modules.
- **imports**: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

Example of a basic module definition:

```typescript
import { Module } from '@nestjs/common';
import { SomeService } from './some.service';
import { SomeController } from './some.controller';

@Module({
  imports: [],              // List of imported modules
  controllers: [SomeController],  // List of controllers
  providers: [SomeService], // List of providers
  exports: [SomeService],   // List of providers to be exported for other modules to use
})
export class SomeModule {}
```
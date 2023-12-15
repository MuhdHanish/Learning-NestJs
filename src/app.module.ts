/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    /* "forRoot" is configuring the ConfigModule to load environment variables from the .env file,
      and isGlobal: true makes the configuration available throughout the entire application.*/
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// forRoot
/* forRoot is used when you want to set up the module globally in your application,
 providing the module configuration options.*/

// forFeature 
/* forFeature is typically used when you want to import a module with configuration
 options scoped to a specific feature or part of your application. */
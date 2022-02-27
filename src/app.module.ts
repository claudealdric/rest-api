import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'oregon-postgres.render.com',
      port: 5432,
      username: 'claude',
      password: process.env.DB_PASSWORD,
      database: 'rest_api',
      entities: [User],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
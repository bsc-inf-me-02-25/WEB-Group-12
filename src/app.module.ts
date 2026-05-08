import { ResultsModule } from './results/results.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1521'),
      

      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      serviceName: process.env.DB_SERVICE,

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    SubjectsModule,
    ClassesModule,
    StudentsModule,
    ReportsModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
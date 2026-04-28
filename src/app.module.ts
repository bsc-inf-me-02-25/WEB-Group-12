import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [SubjectsModule, ClassesModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

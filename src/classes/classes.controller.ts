import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { AssignStudentDto } from './dto/assign-student.dto';

@Controller('api/v1/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  //  Create class
  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.classesService.create(dto);
  }

  // View all classes
  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  // Assign student
  @Post(':id/assign')
  assignStudent(@Param('id') id: string, @Body() dto: AssignStudentDto) {
    return this.classesService.assignStudent(Number(id), dto);
  }

  // View students in class
  @Get(':id/students')
  getStudents(@Param('id') id: string) {
    return this.classesService.getStudents(Number(id));
  }
}
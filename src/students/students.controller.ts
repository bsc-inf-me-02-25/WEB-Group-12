import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // POST /students
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // GET /students?grade=Grade 4&stream=A&search=john&isActive=true
  @Get()
  @ApiOperation({ summary: 'Get all students with optional filters' })
  @ApiQuery({ name: 'grade', required: false, description: 'Filter by grade' })
  @ApiQuery({ name: 'stream', required: false, description: 'Filter by stream' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name or student number' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @ApiResponse({ status: 200, description: 'List of students' })
  findAll(
    @Query('grade') grade?: string,
    @Query('stream') stream?: string,
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
  ) {
    return this.studentsService.findAll({
      grade,
      stream,
      search,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
    });
  }

  // GET /students/stats/by-grade
  @Get('stats/by-grade')
  @ApiOperation({ summary: 'Get statistics by grade' })
  @ApiResponse({ status: 200, description: 'Statistics data' })
  getStatsByGrade() {
    return this.studentsService.getStatsByGrade();
  }

  // GET /students/by-number/:studentNumber
  @Get('by-number/:studentNumber')
  @ApiOperation({ summary: 'Find student by student number' })
  @ApiParam({ name: 'studentNumber', description: 'Student number' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findByStudentNumber(@Param('studentNumber') studentNumber: string) {
    return this.studentsService.findByStudentNumber(studentNumber);
  }

  // GET /students/:id
  @Get(':id')
  @ApiOperation({ summary: 'Find student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  // PATCH /students/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  // PATCH /students/:id/deactivate
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deactivated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.deactivate(id);
  }

  // DELETE /students/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deleted' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }
}
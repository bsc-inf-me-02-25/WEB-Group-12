import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { AssignStudentDto } from './dto/assign-student.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  // ✅ Create class
  async create(dto: CreateClassDto) {
    const newClass = this.classRepo.create({
      ...dto,
      studentIds: [],
    });
    return await this.classRepo.save(newClass);
  }

  // ✅ View all classes
  async findAll() {
    return await this.classRepo.find();
  }

  // ✅ Find one class
  async findOne(id: number) {
    const cls = await this.classRepo.findOneBy({ id });
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  // ✅ Assign student to class
  async assignStudent(id: number, dto: AssignStudentDto) {
    const cls = await this.findOne(id);

    if (!cls.studentIds) cls.studentIds = [];

    // avoid duplicate
    if (!cls.studentIds.includes(dto.studentId)) {
      cls.studentIds.push(dto.studentId);
    }

    return await this.classRepo.save(cls);
  }

  // ✅ View students in class
  async getStudents(id: number) {
    const cls = await this.findOne(id);
    return cls.studentIds || [];
  }
}
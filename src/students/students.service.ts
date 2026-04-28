import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const existing = await this.studentRepository.findOne({
      where: { studentNumber: createStudentDto.studentNumber },
    });

    if (existing) {
      throw new ConflictException(
        `Student with number "${createStudentDto.studentNumber}" already exists.`,
      );
    }

    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async findAll(query?: {
    grade?: string;
    stream?: string;
    search?: string;
    isActive?: boolean;
  }): Promise<Student[]> {
    const where: any = {};

    if (query?.grade) where.grade = query.grade;
    if (query?.stream) where.stream = query.stream;
    if (query?.isActive !== undefined) where.isActive = query.isActive;

    if (query?.search) {
      // Search by name or student number
      return this.studentRepository.find({
        where: [
          { firstName: Like(`%${query.search}%`), ...where },
          { lastName: Like(`%${query.search}%`), ...where },
          { studentNumber: Like(`%${query.search}%`), ...where },
        ],
        order: { grade: 'ASC', stream: 'ASC', lastName: 'ASC' },
      });
    }

    return this.studentRepository.find({
      where,
      order: { grade: 'ASC', stream: 'ASC', lastName: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }
    return student;
  }

  async findByStudentNumber(studentNumber: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentNumber },
    });
    if (!student) {
      throw new NotFoundException(
        `Student with number "${studentNumber}" not found.`,
      );
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    // If studentNumber is being changed, check for conflicts
    if (
      updateStudentDto.studentNumber &&
      updateStudentDto.studentNumber !== student.studentNumber
    ) {
      const conflict = await this.studentRepository.findOne({
        where: { studentNumber: updateStudentDto.studentNumber },
      });
      if (conflict) {
        throw new ConflictException(
          `Student number "${updateStudentDto.studentNumber}" is already taken.`,
        );
      }
    }

    Object.assign(student, updateStudentDto);
    return this.studentRepository.save(student);
  }

  async remove(id: string): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
    return { message: `Student "${student.firstName} ${student.lastName}" has been deleted.` };
  }

  async deactivate(id: string): Promise<Student> {
    const student = await this.findOne(id);
    student.isActive = false;
    return this.studentRepository.save(student);
  }

  async getStatsByGrade(): Promise<{ grade: string; total: number }[]> {
    const result = await this.studentRepository
      .createQueryBuilder('student')
      .select('student.grade', 'grade')
      .addSelect('COUNT(*)', 'total')
      .where('student.isActive = :isActive', { isActive: true })
      .groupBy('student.grade')
      .orderBy('student.grade', 'ASC')
      .getRawMany();

    return result.map((r) => ({ grade: r.grade, total: Number(r.total) }));
  }
}
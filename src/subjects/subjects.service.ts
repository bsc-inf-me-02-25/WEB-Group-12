import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  //  Create Subject
  async create(dto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(dto);
    return await this.subjectRepository.save(subject);
  }

  //  Get All Subjects
  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  //  Get One Subject
  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({id});
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  //  Update Subject
  async update(id: number, dto: CreateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, dto);
    return await this.subjectRepository.save(subject);
  }

  //  Delete Subject
  async remove(id: number): Promise<{ message: string }> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
    return { message: 'Subject deleted successfully' };
  }
}
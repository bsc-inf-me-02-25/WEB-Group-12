import { Repository } from 'typeorm';
import { Mark } from './marks.entity';
import { CreateMarkDto } from './dto/create-mark.dto';
export declare class ResultsService {
    private markRepo;
    constructor(markRepo: Repository<Mark>);
    addMark(dto: CreateMarkDto): Promise<Mark>;
    updateMark(id: number, score: number): Promise<Mark | null>;
    getStudentResults(studentId: number): Promise<Mark[]>;
    getAllResults(): Promise<Mark[]>;
}

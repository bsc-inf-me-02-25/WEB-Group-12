import { ResultsService } from './results.service';
import { CreateMarkDto } from './dto/create-mark.dto';
export declare class ResultsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
    addMark(dto: CreateMarkDto): Promise<import("./marks.entity").Mark>;
    updateMark(id: number, score: number): Promise<import("./marks.entity").Mark | null>;
    getStudentResults(id: number): Promise<import("./marks.entity").Mark[]>;
    getAllResults(): Promise<import("./marks.entity").Mark[]>;
}

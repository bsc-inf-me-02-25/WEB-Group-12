"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const marks_entity_1 = require("./marks.entity");
let ResultsService = class ResultsService {
    markRepo;
    constructor(markRepo) {
        this.markRepo = markRepo;
    }
    async addMark(dto) {
        const mark = this.markRepo.create(dto);
        return this.markRepo.save(mark);
    }
    async updateMark(id, score) {
        await this.markRepo.update(id, { score });
        return this.markRepo.findOneBy({ id });
    }
    async getStudentResults(studentId) {
        return this.markRepo.find({
            where: { studentId },
        });
    }
    async getAllResults() {
        return this.markRepo.find();
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(marks_entity_1.Mark)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResultsService);
//# sourceMappingURL=results.service.js.map
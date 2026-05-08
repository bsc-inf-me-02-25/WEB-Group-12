import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller('results')
export class ResultsController {

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Get()
  findAll() {
    return [];
  }
}
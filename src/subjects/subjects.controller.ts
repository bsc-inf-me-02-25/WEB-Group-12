import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller('subjects')
export class SubjectsController {

  @Post()
  create(@Body() body: any) {
    console.log(body);
    return { message: 'Subject created', data: body };
  }

  @Get()
  findAll() {
    return [{ id: 1, name: 'Math' }];
  }
}
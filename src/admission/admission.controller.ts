import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdmissionsService } from './admission.service.js';
import { CreateAdmissionDto } from './dto/create-admission.dto.js';

@Controller('admissions')
export class AdmissionsController {
    constructor(private readonly admissionsService: AdmissionsService) { }

    @Post()
    submitAdmission(@Body() dto: CreateAdmissionDto) {
        return this.admissionsService.create(dto);
    }

    @Get('stats')
    getStats() {
        return this.admissionsService.getPublicStats();
    }

    @Get()
    getAllAdmissions() {
        return this.admissionsService.findAll();
    }

    @Patch(':id/confirm')
    confirm(@Param('id') id: string) {
        return this.admissionsService.confirmAdmission(id);
    }
}

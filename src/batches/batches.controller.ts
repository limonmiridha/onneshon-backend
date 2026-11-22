import { Body, Controller, Get, Post } from '@nestjs/common';
import { BatchesService } from './batches.service.js';
import { CreateBatchDto } from './dto/batches.dto.js';

@Controller('batches')
export class BatchesController {
    constructor(private readonly batchesService: BatchesService) { }

    @Post()
    createBatch(@Body() createBatchDto: CreateBatchDto) {
        return this.batchesService.create(createBatchDto);
    }

    @Get()
    getAllBatches() {
        return this.batchesService.findAll();
    }
}

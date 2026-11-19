import { Controller, Get } from '@nestjs/common';
import { BatchesService } from './batches.service.js';

@Controller('batches')
export class BatchesController {
    constructor(private readonly batchesService: BatchesService) { }

    @Get()
    getAllBatches() {
        return this.batchesService.findAll();
    }
}

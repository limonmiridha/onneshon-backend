import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchesController } from './batches.controller.js';
import { BatchesService } from './batches.service.js';
import { Batch, BatchSchema } from './schemas/batches.schema.js';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Batch.name, schema: BatchSchema }]),
    ],
    controllers: [BatchesController],
    providers: [BatchesService],
    exports: [BatchesService],
})
export class BatchesModule { }

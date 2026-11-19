import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admission, AdmissionSchema } from './schemas/admission.schema.js';
import { BatchesModule } from '../batches/batches.module.js';
import { AdmissionsController } from './admission.controller.js';
import { AdmissionsService } from './admission.service.js';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Admission.name, schema: AdmissionSchema },
        ]),
        BatchesModule,
    ],
    controllers: [AdmissionsController],
    providers: [AdmissionsService],
})
export class AdmissionsModule { }

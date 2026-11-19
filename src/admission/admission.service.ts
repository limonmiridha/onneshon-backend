import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admission } from './schemas/admission.schema.js';
import { CreateAdmissionDto } from './dto/create-admission.dto.js';
import { BatchesService } from '../batches/batches.service.js';


@Injectable()
export class AdmissionsService {
    constructor(
        @InjectModel(Admission.name) private admissionModel: Model<Admission>,
        private readonly batchesService: BatchesService,
    ) { }

    async create(dto: CreateAdmissionDto) {
        const trackingId = `ONN-${Math.floor(1000 + Math.random() * 9000)}`;
        const created = await this.admissionModel.create({
            ...dto,
            trackingId,
        });
        return created;
    }

    // হোম পেজের লাইভ স্ট্যাটাস সেকশনের জন্য
    async getPublicStats() {
        const [totalFormSubmissions, batches] = await Promise.all([
            this.admissionModel.countDocuments({ status: { $ne: 'cancelled' } }),
            this.batchesService.findAll(),
        ]);

        const totalSeats = batches.reduce((sum, b) => sum + b.totalSeats, 0);
        const confirmedEnrollments = batches.reduce(
            (sum, b) => sum + b.filledSeats,
            0,
        );

        return {
            totalFormSubmissions,
            confirmedEnrollments,
            totalSeats,
            remainingSeats: totalSeats - confirmedEnrollments,
            batches,
        };
    }

    // অ্যাডমিন প্যানেল থেকে ভর্তি কনফার্ম করলে আসন সংখ্যা ১ বাড়বে
    async confirmAdmission(id: string) {
        const admission = await this.admissionModel.findByIdAndUpdate(
            id,
            { status: 'confirmed' },
            { new: true },
        );

        if (admission) {
            await this.batchesService.incrementFilledSeats(admission.selectedBatch);
        }

        return admission;
    }

    async findAll() {
        return this.admissionModel.find().sort({ createdAt: -1 }).lean();
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Batch } from './schemas/batches.schema.js';
import { CreateBatchDto } from './dto/batches.dto.js';

@Injectable()
export class BatchesService implements OnModuleInit {
    constructor(@InjectModel(Batch.name) private batchModel: Model<Batch>) { }

    async onModuleInit() {
        const count = await this.batchModel.countDocuments();
        if (count === 0) {
            await this.batchModel.insertMany([
                {
                    slug: 'junior-foundation',
                    title: 'জুনিয়র ফাউন্ডেশন',
                    category: 'academic',
                    targetGroup: 'ষষ্ঠ — অষ্টম শ্রেণি',
                    totalSeats: 25,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৪ দিন (বিকাল ৩:৩০ – ৫:০০)',
                },
                {
                    slug: 'ssc-science-academic',
                    title: 'এসএসসি একাডেমিক',
                    category: 'academic',
                    targetGroup: 'নবম — দশম শ্রেণি',
                    totalSeats: 18,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৫ দিন (বিকাল ৪:০০ – ৬:০০)',
                },
                {
                    slug: 'hsc-ict-special',
                    title: 'এইচএসসি আইসিটি',
                    category: 'skill',
                    targetGroup: 'একাদশ — দ্বাদশ শ্রেণি',
                    totalSeats: 15,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৩ দিন (সকাল বা বিকাল ব্যাচ)',
                },

            ]);
        }
    }

    async findAll() {
        return this.batchModel.find({ isActive: true }).lean();
    }

    async incrementFilledSeats(slug: string) {
        return this.batchModel.findOneAndUpdate(
            { slug },
            { $inc: { filledSeats: 1 } },
            { new: true },
        );
    }

    async create(createBatchDto: CreateBatchDto) {
        const newBatch = new this.batchModel(createBatchDto);
        return newBatch.save();
    }
}

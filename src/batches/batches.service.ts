import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Batch } from './schemas/batches.schema.js';

@Injectable()
export class BatchesService implements OnModuleInit {
    constructor(@InjectModel(Batch.name) private batchModel: Model<Batch>) { }

    async onModuleInit() {
        const count = await this.batchModel.countDocuments();
        if (count === 0) {
            await this.batchModel.insertMany([
                {
                    slug: 'junior-foundation',
                    title: 'জুনিয়র ফাউন্ডেশন ও মেধা বিকাশ ব্যাচ',
                    category: 'academic',
                    targetGroup: 'ষষ্ঠ — অষ্টম শ্রেণি',
                    totalSeats: 25,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৪ দিন (বিকাল ৩:৩০ – ৫:০০)',
                },
                {
                    slug: 'ssc-science-academic',
                    title: 'এসএসসি একাডেমিক ও সৃজনশীল ব্যাচ',
                    category: 'academic',
                    targetGroup: 'নবম — দশম শ্রেণি',
                    totalSeats: 18,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৫ দিন (বিকাল ৪:০০ – ৬:০০)',
                },
                {
                    slug: 'hsc-ict-special',
                    title: 'এইচএসসি আইসিটি ও প্রোগ্রামিং ফাউন্ডেশন',
                    category: 'skill',
                    targetGroup: 'একাদশ — দ্বাদশ শ্রেণি',
                    totalSeats: 15,
                    filledSeats: 0,
                    schedule: 'সপ্তাহে ৩ দিন (সকাল বা বিকাল ব্যাচ)',
                },
                {
                    slug: 'curiosity-stem-club',
                    title: 'অন্বেষণ কিউরিওসিটি ও কম্পিউটার বেসিকস',
                    category: 'skill',
                    targetGroup: 'যেকোনো শ্রেণির আগ্রহী শিক্ষার্থী',
                    totalSeats: 15,
                    filledSeats: 0,
                    schedule: 'প্রতি শুক্রবার (সকাল ৯:৩০ – ১১:৩০)',
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
}

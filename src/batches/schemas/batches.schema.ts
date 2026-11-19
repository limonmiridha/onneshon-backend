import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Batch extends Document {
    @Prop({ required: true, unique: true })
    slug: string; // e.g., 'junior-foundation', 'hsc-ict-special'

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, enum: ['academic', 'skill'] })
    category: string;

    @Prop({ required: true })
    targetGroup: string;

    @Prop({ required: true })
    totalSeats: number;

    @Prop({ default: 0 })
    filledSeats: number;

    @Prop({ required: true })
    schedule: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const BatchSchema = SchemaFactory.createForClass(Batch);

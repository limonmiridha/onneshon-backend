import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Admission extends Document {
    @Prop({ required: true, unique: true })
    trackingId: string;

    @Prop({ required: true })
    studentName: string;

    @Prop({ required: true })
    studentClass: string;

    @Prop({ required: true })
    institutionName: string;

    @Prop({ required: true })
    selectedBatch: string; // Batch slug

    @Prop({ default: 'বিকাল ব্যাচ' })
    preferredShift: string;

    @Prop({ required: true })
    guardianName: string;

    @Prop({ required: true })
    guardianPhone: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    notes?: string;

    @Prop()
    offerCode?: string; // e.g., 'early-bird-dec15'

    @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] })
    status: string;
}

export const AdmissionSchema = SchemaFactory.createForClass(Admission);

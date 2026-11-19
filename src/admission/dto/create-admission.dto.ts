import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdmissionDto {
    @IsString()
    @IsNotEmpty()
    studentName: string;

    @IsString()
    @IsNotEmpty()
    studentClass: string;

    @IsString()
    @IsNotEmpty()
    institutionName: string;

    @IsString()
    @IsNotEmpty()
    selectedBatch: string;

    @IsString()
    @IsOptional()
    preferredShift?: string;

    @IsString()
    @IsNotEmpty()
    guardianName: string;

    @IsString()
    @IsNotEmpty()
    guardianPhone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsString()
    @IsOptional()
    offerCode?: string;
}

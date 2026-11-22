export class CreateBatchDto {
    slug: string;
    title: string;
    category: string;
    targetGroup: string;
    totalSeats: number;
    filledSeats?: number;
    schedule: string;
    isActive?: boolean;
}

export class CreateTemperatureRecordDto {
  constructor(
    public readonly zone: string,
    public readonly timestamp: string,
    public readonly temperature: number,
  ) {}
}

export class CreateTemperatureRecordResponseDto {
  constructor(
    public readonly id: string,
    public readonly zone: string,
    public readonly timestamp: Date,
    public readonly temperature: number,
    public readonly createdAt: Date,
  ) {}
}

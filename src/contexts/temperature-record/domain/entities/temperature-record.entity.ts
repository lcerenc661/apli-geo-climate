import { v4 as uuidv4 } from 'uuid';
import { InvalidEntityFieldError } from 'src/contexts/shared/error/entity-errors';

export class TemperatureRecord {
  constructor(
    public readonly id: string,
    public readonly zoneId: string,
    public readonly timestamp: Date,
    public readonly temperature: number,
    public readonly createdAt: Date,
  ) {
    this.validateZone(zoneId);
  }

  private validateZone(zone: string): void {
    if (!zone || zone.trim() === '') {
      throw new InvalidEntityFieldError(
        'TemperatureRecord',
        'zone',
        zone,
        'Zone is required and cannot be empty',
      );
    }
  }

  static create(
    zone: string,
    timestamp: Date,
    temperature: number,
  ): TemperatureRecord {
    const generatedId = uuidv4();
    const createdAt = new Date();
    return new TemperatureRecord(
      generatedId,
      zone,
      timestamp,
      temperature,
      createdAt,
    );
  }
}

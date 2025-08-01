import { TemperatureRecord } from '../../../../domain/entities/temperature-record.entity';
import { calculateAnomalies } from '../in-memory.temperature-record.utils';

describe('calculateAnomalies', () => {
  const createRecord = (
    id: string,
    zoneId: string,
    timestamp: Date,
    temperature: number,
  ): TemperatureRecord => {
    return new TemperatureRecord(
      id,
      zoneId,
      timestamp,
      temperature,
      new Date(),
    );
  };

  it('should return empty array if less than 3 records', async () => {
    const now = new Date();
    const records = [
      createRecord('1', 'zone-1', new Date(now.getTime()), 20),
      createRecord('2', 'zone-1', new Date(now.getTime() + 1000), 21),
    ];

    const result = await calculateAnomalies(records);
    expect(result).toEqual([]);
  });

  it('should return one anomaly group if 3+ increasing by 1.5+', async () => {
    const now = new Date();
    const records = [
      createRecord('1', 'zone-1', new Date(now.getTime()), 20),
      createRecord('2', 'zone-1', new Date(now.getTime() + 1000), 21.5),
      createRecord('3', 'zone-1', new Date(now.getTime() + 2000), 23),
    ];

    const result = await calculateAnomalies(records);
    expect(result.length).toBe(1);
    expect(result[0].length).toBe(3);
  });

  it('should detect multiple anomaly groups', async () => {
    const now = new Date();
    const records = [
      createRecord('1', 'zone-1', new Date(now.getTime()), 10),
      createRecord('2', 'zone-1', new Date(now.getTime() + 1000), 11.6),
      createRecord('3', 'zone-1', new Date(now.getTime() + 2000), 14.2),
      createRecord('4', 'zone-1', new Date(now.getTime() + 3000), 14),
      createRecord('5', 'zone-1', new Date(now.getTime() + 4000), 15.6),
      createRecord('6', 'zone-1', new Date(now.getTime() + 5000), 18),
      createRecord('7', 'zone-1', new Date(now.getTime() + 6000), 20.6),
    ];

    const result = await calculateAnomalies(records);
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(4);
  });

  it('should return [] if no consecutive differences >= 1.5', async () => {
    const now = new Date();
    const records = [
      createRecord('1', 'zone-1', new Date(now.getTime()), 20),
      createRecord('2', 'zone-1', new Date(now.getTime() + 1000), 20.5),
      createRecord('3', 'zone-1', new Date(now.getTime() + 2000), 21),
    ];

    const result = await calculateAnomalies(records);
    expect(result).toEqual([]);
  });
});

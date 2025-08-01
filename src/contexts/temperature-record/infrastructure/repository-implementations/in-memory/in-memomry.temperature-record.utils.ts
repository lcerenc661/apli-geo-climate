import { TemperatureRecord } from 'src/contexts/temperature-record/domain/entities/temperature-record.entity';

export function calculateAverageTemperature(
  records: TemperatureRecord[],
): number {
  if (records.length === 0) return 0;
  const sum = records.reduce((acc, r) => acc + r.temperature, 0);
  return parseFloat((sum / records.length).toFixed(2));
}

export function calculateMinTemperature(records: TemperatureRecord[]): number {
  return records.length === 0
    ? 0
    : Math.min(...records.map((r) => r.temperature));
}

export function calculateMaxTemperature(records: TemperatureRecord[]): number {
  return records.length === 0
    ? 0
    : Math.max(...records.map((r) => r.temperature));
}

export async function calculateAnomalies(
  temperatureRecords: TemperatureRecord[],
): Promise<TemperatureRecord[][]> {
  if (temperatureRecords.length < 3) return [];

  const sortedRecords = temperatureRecords.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  const anomalies: TemperatureRecord[][] = [];
  let window: TemperatureRecord[] = [];

  for (let i = 0; i < sortedRecords.length; i++) {
    if (window.length === 0) {
      window.push(sortedRecords[i]);
      continue;
    }
    const diff = Math.abs(
      sortedRecords[i].temperature - window[window.length - 1].temperature,
    );
    if (diff >= 1.5) {
      window.push(sortedRecords[i]);
    } else {
      if (window.length >= 3) {
        anomalies.push([...window]);
      }
      window = [sortedRecords[i]];
    }
  }
  if (window.length >= 3) {
    anomalies.push([...window]);
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Anomalies found: ${anomalies.length}`);
      resolve(undefined);
    }, 200);
  });

  return anomalies;
}

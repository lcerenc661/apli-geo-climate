import { v4 as uuidv4 } from 'uuid';
import { InvalidTimestampError } from '../error/timestamp-errors';

export function generateUUID(): string {
  return uuidv4();
}

export function generateCreatedAt(): Date {
  return formatDateTime(new Date());
}

export function formatDateTime(date: string | Date): Date {
  let response: Date;
  if (typeof date === 'string') {
    response = new Date(date);
  } else if (date instanceof Date) {
    response = date;
  } else {
    throw new Error('Invalid date format');
  }

  if (isNaN(response.getTime())) {
    throw new InvalidTimestampError(
      date.toString(),
      'The provided date is not a valid timestamp, please provide a valid date string or Date object.',
    );
  }

  return response;
}

export const simulateAsync = (delay: number = 1000): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};

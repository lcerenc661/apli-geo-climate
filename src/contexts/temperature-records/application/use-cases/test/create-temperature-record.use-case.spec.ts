/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  InvalidNumberError,
  TemperatureOutOfRangeError,
} from 'src/contexts/shared/error/number-errors';
import { CreateTemperatureRecordUseCase } from '../create-temperature-records.use-case';
import {
  CreateTemperatureRecordDto,
  CreateTemperatureRecordResponseDto,
} from '../../dtos/temperature-records.dto';

describe('CreateTemperatureRecordUseCase', () => {
  let useCase: CreateTemperatureRecordUseCase;
  let temperatureRepositoryMock: any;
  let validateZoneUseCaseMock: any;

  beforeEach(() => {
    temperatureRepositoryMock = {
      save: jest.fn(),
    };
    validateZoneUseCaseMock = {
      execute: jest.fn(),
    };

    useCase = new CreateTemperatureRecordUseCase(
      temperatureRepositoryMock,
      validateZoneUseCaseMock,
    );
  });

  it('should call validateZoneUseCase.execute with the zone', async () => {
    const request: CreateTemperatureRecordDto = {
      zone: 'zone1',
      temperature: 20,
      timestamp: new Date(),
    };
    temperatureRepositoryMock.save.mockResolvedValue({
      id: 'id123',
      zoneId: request.zone,
      temperature: request.temperature,
      timestamp: request.timestamp,
      createdAt: new Date(),
    });

    await useCase.execute(request);

    expect(validateZoneUseCaseMock.execute).toHaveBeenCalledWith(request.zone);
  });

  it('should throw InvalidNumberError if temperature is NaN', async () => {
    const request: CreateTemperatureRecordDto = {
      zone: 'zone1',
      temperature: NaN,
      timestamp: new Date(),
    };

    await expect(useCase.execute(request)).rejects.toThrow(InvalidNumberError);
  });

  it('should throw TemperatureOutOfRangeError if temperature < -50', async () => {
    const request: CreateTemperatureRecordDto = {
      zone: 'zone1',
      temperature: -51,
      timestamp: new Date(),
    };

    await expect(useCase.execute(request)).rejects.toThrow(
      TemperatureOutOfRangeError,
    );
  });

  it('should throw TemperatureOutOfRangeError if temperature > 70', async () => {
    const request: CreateTemperatureRecordDto = {
      zone: 'zone1',
      temperature: 71,
      timestamp: new Date(),
    };

    await expect(useCase.execute(request)).rejects.toThrow(
      TemperatureOutOfRangeError,
    );
  });

  it('should save the temperature record and return a response DTO', async () => {
    const request: CreateTemperatureRecordDto = {
      zone: 'zone1',
      temperature: 25,
      timestamp: new Date('2025-08-01T10:00:00Z'),
    };

    const savedRecord = {
      id: 'record123',
      zoneId: request.zone,
      temperature: request.temperature,
      timestamp: request.timestamp,
      createdAt: new Date('2025-08-01T10:01:00Z'),
    };

    temperatureRepositoryMock.save.mockResolvedValue(savedRecord);

    const response = await useCase.execute(request);

    expect(response).toBeInstanceOf(CreateTemperatureRecordResponseDto);
    expect(response).toEqual(
      new CreateTemperatureRecordResponseDto(
        savedRecord.id,
        savedRecord.zoneId,
        savedRecord.timestamp,
        savedRecord.temperature,
        savedRecord.createdAt,
      ),
    );

    expect(temperatureRepositoryMock.save).toHaveBeenCalledWith({
      zoneId: request.zone,
      temperature: request.temperature,
      timestamp: request.timestamp,
    });
  });
});

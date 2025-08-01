import { Body, Controller, Post } from '@nestjs/common';
import { CreateTemperatureRecordUseCase } from 'src/contexts/temperature-record/application/use-cases/create-temperature-records.use-case';
import { CreateTemperatureRecordHttpDto } from './temperature-record.http-dto';
import { CreateTemperatureRecordResponseDto } from 'src/contexts/temperature-record/application/dtos/temperature-records.dto';

@Controller('records')
export class TemperatureRecordController {
  constructor(
    private readonly createTemperatureRecordUseCase: CreateTemperatureRecordUseCase,
  ) {}

  @Post()
  async post(
    @Body() createTemperatureRecordHttpDto: CreateTemperatureRecordHttpDto,
  ): Promise<CreateTemperatureRecordResponseDto> {
    return await this.createTemperatureRecordUseCase.execute({
      zone: createTemperatureRecordHttpDto.zone,
      timestamp: createTemperatureRecordHttpDto.timestamp,
      temperature: createTemperatureRecordHttpDto.temperature,
    });
  }
}

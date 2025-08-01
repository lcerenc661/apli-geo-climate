import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTemperatureRecordUseCase } from 'src/contexts/temperature-records/application/use-cases/create-temperature-records.use-case';
import { CreateTemperatureRecordHttpDto } from './temperature-record.http-dto';
import { CreateTemperatureRecordResponseDto } from 'src/contexts/temperature-records/application/dtos/temperature-records.dto';
import { JwtAuthGuard } from 'src/contexts/auth/guards/jwt-auth.guards';

@Controller('records')
export class TemperatureRecordController {
  constructor(
    private readonly createTemperatureRecordUseCase: CreateTemperatureRecordUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
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

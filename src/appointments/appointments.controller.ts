import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateDto } from './dtos/create.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfirmDto } from './dtos/confirm.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  @ApiBody({ type: CreateDto })
  createAppointment(@Body() createDto: CreateDto) {
    return this.service.createAppointment(createDto);
  }

  @Post('/confirm')
  @ApiBody({ type: ConfirmDto })
  confirmAppointment(@Body() confirmDto: ConfirmDto) {
    return this.service.confirmAppointment(confirmDto);
  }
}

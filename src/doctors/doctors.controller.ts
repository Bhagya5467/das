import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';


@Controller('doctors')
export class DoctorController {
  constructor(private readonly service: DoctorService) {}
}

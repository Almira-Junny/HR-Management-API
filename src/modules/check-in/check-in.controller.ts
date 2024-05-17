import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Check-in')
@Controller('/check-in')
export class CheckInController {
  constructor() {}
}

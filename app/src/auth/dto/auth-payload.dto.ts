import { PickType } from '@nestjs/mapped-types';
import { AuthResponseDto } from './auth-response.dto';

export class AuthPayloadDto extends PickType(AuthResponseDto, [
  'id',
  'email',
  'role',
] as const) {}

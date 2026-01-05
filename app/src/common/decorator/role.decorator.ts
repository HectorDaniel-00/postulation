import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constant/role.constant';

export const Roles = (...role: string[]) => SetMetadata(ROLES_KEY, role);

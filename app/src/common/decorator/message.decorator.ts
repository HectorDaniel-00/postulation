import { SetMetadata } from '@nestjs/common';
import { MESSAGE_KEY } from '../constant';

export const Message = (msg: string) => SetMetadata(MESSAGE_KEY, msg);

import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CurrentUser, Message, Roles } from 'src/common/decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Role } from 'src/common/enum';
import { AuthRoleGuard } from 'src/common/guard/role.guard';

@ApiTags('Apply')
@ApiBearerAuth()
@Controller('apply')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Message('Se aplico con exito a la vacante')
  @ApiOperation({ summary: 'Aplicar a una vacante' })
  @ApiResponse({ status: 201, description: 'Aplicación exitosa.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Post(':vacancyId/')
  @Roles(Role.USER)
  @UseGuards(AuthRoleGuard)
  async applyToVacancy(
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.applicationService.apply(user.id, vacancyId);
  }
}

import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CurrentUser, Roles } from 'src/common/decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('vacancies')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({ summary: 'Aplicar a una vacante' })
  @ApiResponse({ status: 201, description: 'Aplicación exitosa.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Post(':vacancyId/apply')
  @Roles('USER')
  async applyToVacancy(
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.applicationService.apply(user.id, vacancyId);
  }
}

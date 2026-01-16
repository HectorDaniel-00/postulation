import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let service: Partial<Record<keyof VacancyService, jest.Mock>>;

  const mockVacancy = {
    id: 1,
    title: 'Test Vacancy',
    description: 'Desc',
    seniority: 'Junior',
    softSkills: [],
    location: 'Remote',
    modality: 'Full-time',
    salaryRange: '50k-60k',
    company: 'Acme',
    tecnologies: [],
    isActive: true,
    maxApplicants: 10,
  } as any;

  beforeEach(async () => {
    service = {
      create: jest.fn().mockResolvedValue(mockVacancy),
      findAll: jest.fn().mockResolvedValue([mockVacancy]),
      findOne: jest.fn().mockResolvedValue(mockVacancy),
      update: jest.fn().mockResolvedValue(mockVacancy),
      toggleActive: jest.fn().mockResolvedValue(mockVacancy),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [{ provide: VacancyService, useValue: service }],
    }).compile();

    controller = module.get<VacanciesController>(VacanciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate to service.create', async () => {
      const dto = { title: 'New' } as any;
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockVacancy);
    });
  });

  describe('findAll', () => {
    it('should return all vacancies', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockVacancy]);
    });
  });

  describe('findOne', () => {
    it('should return vacancy by id', async () => {
      const result = await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockVacancy);
    });
    it('should propagate BadRequestException', async () => {
      // @ts-ignore
      service.findOne.mockImplementation(() => {
        throw new BadRequestException();
      });
      await expect(controller.findOne(undefined as any)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should propagate NotFoundException', async () => {
      service.findOne.mockResolvedValue(null);
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should delegate to service.update', async () => {
      const dto = { title: 'Updated' } as any;
      const result = await controller.update(1, dto);
      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockVacancy);
    });
  });

  describe('toggleActive', () => {
    it('should delegate to service.toggleActive', async () => {
      const result = await controller.toggleActive(1);
      expect(service.toggleActive).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockVacancy);
    });
  });
});

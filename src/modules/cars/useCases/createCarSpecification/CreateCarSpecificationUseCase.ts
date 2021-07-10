import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,

    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists')
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);

    car.specifications = specifications;

    return car;
  }
}

export { CreateCarSpecificationUseCase }

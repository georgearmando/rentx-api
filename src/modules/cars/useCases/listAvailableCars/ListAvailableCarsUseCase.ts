import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { inject, injectable } from "tsyringe";

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const availableCars = await this.carsRepository.findAvailableCars(
      name,
      brand,
      category_id
    );

    return availableCars;
  }
}

export { ListCarsUseCase }

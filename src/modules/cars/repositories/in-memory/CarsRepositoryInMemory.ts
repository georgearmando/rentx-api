import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand
  }: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailableCars(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available);

    if (name) availableCars = availableCars.filter(car => car.name === name);
    if (brand) availableCars = availableCars.filter(car => car.brand === brand);
    if (category_id) availableCars = availableCars.filter(car => car.category_id === category_id);

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }
}

export { CarsRepositoryInMemory }

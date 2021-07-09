import { ICreateCarDto } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailableCars(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository }

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car 1",
      "description": "Car description",
      "daily_rate": 20000,
      "license_plate": "License Plate",
      "fine_amount": 5000,
      "brand": "Brand1",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car Name",
      "description": "Car description",
      "daily_rate": 20000,
      "license_plate": "License Plate",
      "fine_amount": 5000,
      "brand": "Brand",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({
      name: 'Car Name'
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car Name",
      "description": "Car description",
      "daily_rate": 20000,
      "license_plate": "License Plate",
      "fine_amount": 5000,
      "brand": "Brand",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Brand'
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car Name",
      "description": "Car description",
      "daily_rate": 20000,
      "license_plate": "License Plate",
      "fine_amount": 5000,
      "brand": "Brand",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id'
    });

    expect(cars).toEqual([car]);
  });
});

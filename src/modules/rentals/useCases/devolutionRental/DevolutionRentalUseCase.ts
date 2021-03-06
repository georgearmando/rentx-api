import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  id: string;
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }
  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();
    const minimum_daily = 1;
    let total = 0;

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase }

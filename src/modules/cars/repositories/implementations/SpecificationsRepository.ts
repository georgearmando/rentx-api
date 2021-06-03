import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Repository<Specification>

  constructor() {
    this.specification = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specification.create({
      name,
      description
    });

    await this.specification.save(specification);
  }

  findByName(name: string): Promise<Specification> {
    const specification = this.specification.findOne({
      name
    });

    return specification;
  }
}

export { SpecificationsRepository }

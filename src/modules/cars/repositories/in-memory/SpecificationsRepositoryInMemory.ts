import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { convertCompilerOptionsFromJson } from "typescript";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description
    });

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Promise<Specification> {
    throw new Error("Method not implemented.");
  }

  async findByIds(specifications_id: string[]): Promise<Specification[]> {
    /*let allSpecifications: Specification[] = [];

    specifications_id.forEach(id => {
      allSpecifications = this.specifications.filter(specification =>
        id === specification.id
      );
    });*/

    const allSpecifications = this.specifications.filter(specification =>
      specifications_id.includes(specification.id)
    );

    return allSpecifications;
  }

}

export { SpecificationsRepositoryInMemory }

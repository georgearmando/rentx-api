import { getRepository, Repository } from 'typeorm';
import { Category } from "../../entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.repository = getRepository(Category);
  }

  /**
   * SINGLETON
   * Este método cria uma instância de CategoriesRepository caso não exista nenhuma instância criada
   * Se existir uma instância ele retorna esta instância existente
   *
   * Este método serve para não permitir a criação de várias instâncias do repositório
   */
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    //select * from categories where name = name limit 1
    const category = this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };

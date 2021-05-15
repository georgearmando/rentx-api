import { Category } from "../../models/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
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

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoriesRepository };

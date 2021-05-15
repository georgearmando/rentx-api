import { Category } from "../../models/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";


class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) { }

  execute(): Category[] {
    const allCategories = this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase }

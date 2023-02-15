import DbModels from "../config/db.models.config";
import ProductHandler from "./handlers/product.handler";
import ProductRepo from "./repos/product.repo";
import ProductUsecase from "./usecases/product.usecase";


export default {
   ProductService: new ProductHandler(new ProductUsecase(new ProductRepo(DbModels))),
}
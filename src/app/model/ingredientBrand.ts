import {Brand} from "./brand";
import {Ingredient} from "./ingredient";

export interface IngredientBrand{
  id : number;
  ingredient: Ingredient
  brand: Brand;
  price: number;
  quantity: number;
  expiration: string;
}

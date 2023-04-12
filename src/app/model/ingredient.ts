import {Brand} from "./brand";
import {UnitOfMeasure} from "./unitOfMeasure";

export interface Ingredient {
  id : number; //
  name: string;
  price: number;
  quantity: number;
  unitOfMeasure: UnitOfMeasure;
  brand: Brand;
  expiration: string;
}

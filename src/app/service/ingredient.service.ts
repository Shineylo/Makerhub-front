import {Injectable, PipeTransform} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  delay, map, NEVER,
  Observable,
  of,
  Subject, Subscription,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {Ingredient} from "../model/ingredient";
import {DecimalPipe} from "@angular/common";
import {Brand} from "../model/brand";
import {UnitOfMeasure} from "../model/unitOfMeasure";

interface SearchResult {
  ingredients: Ingredient[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}


function matches(ingredient: Ingredient, term: string, pipe: PipeTransform) {
  return (
    ingredient.name.toLowerCase().includes(term.toLowerCase()) ||
    ingredient.unitOfMeasure.name.includes(term)
  );
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _ingredients$ = new BehaviorSubject<Ingredient[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _ingredient?:Ingredient[];

  private _state: State = {
    page: 1,
    pageSize: 14,
    searchTerm: '',
  };

  constructor(
    private readonly _httpClient: HttpClient,
    private pipe: DecimalPipe
  ) {
    this.getAll().subscribe(ingredients => this._ingredient = ingredients);
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._ingredients$.next(result.ingredients);
        this._total$.next(result.total);
      });
    this._search$.next();
  }

  get listingredients(){
    return this._ingredient;
  }
  get ingredients$() {
    return this._ingredients$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;


    if(!this._ingredient)
      return of({ingredients: [], total: 0});

    // 1. sort
    let ingredients = this._ingredient;

    // 2. filter
    ingredients = ingredients.filter((ingredient) => matches(ingredient, searchTerm, this.pipe));
    const total = ingredients.length;

    // 3. paginate
    ingredients = ingredients.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ ingredients, total });
  }

  // private _search(): Observable<SearchResult> {
  //   const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
  //   return this.getAll().pipe(
  //     // sort
  //     map( ingredients => {
  //       console.log(ingredients);
  //
  //       ingredients = sort(ingredients, sortColumn, sortDirection );
  //       ingredients = ingredients.filter((ingredient) => matches(ingredient, searchTerm, this.pipe));
  //       ingredients = ingredients.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  //       const total = ingredients.length;
  //       return {ingredients, total}
  //     })
  //   );
  // }

  getAll(){
    return this._httpClient.get<any[]>('http://localhost:8080/api/ingredient/all').pipe(
      tap(ings => this._ingredient = ings),
      catchError((error) => {
        return throwError(() => new Error("ERREUR"))
      })
    )
  }

  create(form: any){
    return this._httpClient.post<any>('http://localhost:8080/api/ingredient/new',form).pipe();
  }

  getAllBrand(){
    return this._httpClient.get<Brand[]>('http://localhost:8080/api/brand/all')
      .pipe(
        map((brands: Brand[]) => {
          const newBrand = brands.map((brand: Brand) => {
            return {id: brand.id, name:  brand.name}
          });
          return brands;
        }),
        // Gestion de l'erreur
        catchError((error) => {
          return throwError(() => new Error("ERREUR"))
        })
      );
  }
  getAllUOfM(){
    return this._httpClient.get<UnitOfMeasure[]>('http://localhost:8080/api/unitofmeasure/all')
      .pipe(
        map((unitOfMeasures: UnitOfMeasure[]) => {
          const newBrand = unitOfMeasures.map((unitOfMeasure: UnitOfMeasure) => {
            return {id: unitOfMeasure.id, name:  unitOfMeasure.name}
          });
          return unitOfMeasures;
        }),
        // Gestion de l'erreur
        catchError((error) => {
          return throwError(() => new Error("ERREUR"))
        })
      );
  }

}

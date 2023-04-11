import {Injectable, PipeTransform} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  delay, map, NEVER, never,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {Ingredient} from "../model/ingredient";
import {SortColumn, SortDirection} from "../directive/sorttable.directive";
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
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Brand | UnitOfMeasure, v2: string | number| Brand | UnitOfMeasure) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(ingredients: Ingredient[], column: SortColumn, direction: string): Ingredient[] {
  if (direction === '' || column === '') {
    return ingredients;
  } else {
    return [...ingredients].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(ingredient: Ingredient, term: string, pipe: PipeTransform) {
  return (
    ingredient.name.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(ingredient.price).includes(term) ||
    pipe.transform(ingredient.quantity).includes(term)||
    pipe.transform(ingredient.unitOfMeasure).includes(term) ||
    pipe.transform(ingredient.brand).includes(term)||
    pipe.transform(ingredient.expiration).includes(term)
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

  private _state: State = {
    page: 1,
    pageSize: 15,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private readonly _httpClient: HttpClient,
    private pipe: DecimalPipe
  ) {

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
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    if(!this._ingredient)
      return of({ingredients: [], total: 0});

    // 1. sort
    let ingredients = sort(this._ingredient, sortColumn, sortDirection);

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

  private _ingredient?: Ingredient[];
  getAll(){
    return this._httpClient.get<any[]>('http://localhost:8080/api/ingredient/all').pipe(
      catchError((error) => {
        return throwError(() => new Error("ERREUR"))
      })
    )
  }

  create(form: any){
    return this._httpClient.post<any>('http://localhost:8080/api/ingredient/new',form).pipe();
  }
}

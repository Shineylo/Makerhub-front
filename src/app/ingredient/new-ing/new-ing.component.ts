import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Brand} from "../../model/brand";
import {IngredientService} from "../../service/ingredient.service";
import {IngredientBrand} from "../../model/ingredientBrand";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

function inFutureDays( days:number ): ValidatorFn{
  return (control: AbstractControl) => {
    let minDate = new Date()
    minDate.setDate( minDate.getDate()+days )
    minDate = new Date( minDate.getFullYear(), minDate.getMonth(), minDate.getDate() )
    const inputValue = new Date(control.value);

    if( inputValue >= minDate )
      return null;
    return {
      notInFuture :"Date was not in the future"
    }
  }
}

@Component({
  selector: 'app-new-ing',
  templateUrl: './new-ing.component.html',
  styleUrls: ['./new-ing.component.scss']
})
export class NewIngComponent implements OnInit{
  form!: FormGroup;
  formNewBrand!: FormGroup;
  formExistingBrand!: FormGroup;
  brands:Brand[] = [];
  ingredientBrands:IngredientBrand[] = [];
  ingredientId =0;
  brandId = 0;
  newBrand!: boolean ;

  constructor(readonly _ingredientService: IngredientService,private readonly _activatedRoute: ActivatedRoute,private readonly _router: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((param)=>{
      this.ingredientId = param['id'];
    })
    this._ingredientService.getAllIngredientBrand(this.ingredientId).subscribe({
      next:(resp)=> {
        this.ingredientBrands = resp;
        this._ingredientService.getBrandAvailable(this.ingredientId).subscribe({
          next: (resp)=> {
            this.brands = resp.filter((b) => {
              const idsBrand = this.ingredientBrands.map(ib => ib.brand.id);
              return !idsBrand.includes(b.id);
            })
          }
        });
      }
    });
    this.form = new FormGroup({
      'brandId' : new FormControl('',[Validators.required]),
    });
    this.formNewBrand = new FormGroup({
      'brandName' : new FormControl('',[Validators.required]),
      'quantity' : new FormControl('',[Validators.required,Validators.min(1)]),
      'expiration' : new FormControl('',[Validators.required,inFutureDays(3)]),
      'price' : new FormControl('',[Validators.required,Validators.min(0.01)]),
    });
    this.formExistingBrand = new FormGroup({
      'quantity' : new FormControl('',[Validators.required,Validators.min(1)]),
      'expiration' : new FormControl('',[Validators.required,inFutureDays(3)]),
      'price' : new FormControl('',[Validators.required,Validators.min(0.01)]),
    });
  }

  onBrandChoice() {
    if( this.form.valid ) {
      if(this.form.value.brandId == 0){
        this.newBrand = true;
      }else{
        this.brandId = this.form.value.brandId;
        this.newBrand = false;
      }
    }
  }

  onCreateExistingBrand() {
    if( this.formExistingBrand.valid ){
      const data = {
        ...this.formExistingBrand.value,
        ingredientId : this.ingredientId,
        brandId : this.brandId
      }
      console.log(data);
      this._ingredientService.createIngExistingBrand( data ).subscribe({
        next:value => this._router.navigateByUrl("ingredient/home")
      })
    }
  }

  onCreateNewBrand() {
    if( this.formNewBrand.valid ){
      const data = {
        ...this.formNewBrand.value,
        ingredientId : this.ingredientId,
      }
      this._ingredientService.createIngNewBrand( data ).subscribe({
        next:value => this._router.navigateByUrl("ingredient/home")
      })
    }
  }
}

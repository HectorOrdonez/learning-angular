import {Component, OnDestroy, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from './store/shopping-list.actions'
import * as fromApp from '../store/appReducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  // private ingredientsChangedSubscription: Subscription

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')

    // this.ingredients = this.slService.getIngredients();
    // this.ingredientsChangedSubscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  ngOnDestroy(): void {
    // this.ingredientsChangedSubscription.unsubscribe()
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}

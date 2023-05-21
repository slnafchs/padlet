import {RouterModule, Routes} from "@angular/router";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {NgModule} from "@angular/core";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {LoginComponent} from "./login/login.component";
import {MypadletListComponent} from "./mypadlet-list/mypadlet-list.component";
import {PrivatepadletListComponent} from "./privatepadlet-list/privatepadlet-list.component";
import {EntrieFormComponent} from "./entrie-form/entrie-form.component";

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full'},
  { path: 'public', component: PadletListComponent},
  { path: 'mypadlets', component: MypadletListComponent},
  { path: 'private', component: PrivatepadletListComponent},
  { path: 'padlets/:id', component: PadletDetailsComponent},
  { path: 'addPadlet', component: PadletFormComponent},
  { path: 'addPadlet/:id', component: PadletFormComponent},
  { path: 'addEntrie/:padlet_id', component: EntrieFormComponent},
  { path: 'addEntrie/:padlet_id/:entrie_id', component: EntrieFormComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

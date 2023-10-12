import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DataGridComponent} from './components/datagrid/datagrid.component'

const routes: Routes = [
  { path: '', component: DataGridComponent }, // Example route for another component
  { path: 'user/:id', component: UserDetailsComponent }, // Define a route with a parameter for user ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StockComponent } from './components/stock/stock.component';
import { StockCreateComponent } from './components/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock-edit/stock-edit.component';
import { ReportComponent } from './components/report/report.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "stock", component: StockComponent },
  { path: "stock/create", component: StockCreateComponent },
  { path: "stock/edit/:id", component: StockEditComponent },
  { path: "report", component: ReportComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

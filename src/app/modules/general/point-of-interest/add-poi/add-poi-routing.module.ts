import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddPoiComponent} from './add-poi.component';

const routes: Routes = [{path: '', component: AddPoiComponent, data:{package_id:''}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPoiRoutingModule {
}

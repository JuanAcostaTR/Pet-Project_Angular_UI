import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { PagenotfoundComponent} from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ path: '', component: MaincomponentComponent },
	//Wild Card Route for 404 request
	{ path: '**', pathMatch: 'full',
		component: PagenotfoundComponent },

];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  


   { path: '', redirectTo: '/login', pathMatch: 'full' },
   
   {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    }

    ,{ path: 'tabs',
       loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) 
  }, 

  { path: '**', redirectTo: '/login' }


  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

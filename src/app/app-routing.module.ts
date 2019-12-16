import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
   { path: '', redirectTo: '/login', pathMatch: 'full' },

   {
     path: 'register', 
     loadChildren:() => import('./register/register.module').then( m => m.RegisterPageModule)
    
   },
  
   {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    }

    ,{ path: 'tabs',
       loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) 
  }, 

  { path: '**', redirectTo: '/login' },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }


  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

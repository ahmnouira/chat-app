import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


   { path: '', redirectTo: '/login', pathMatch: 'full' },

   {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    }

    ,{ path: 'tabs',
       loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) 
  }, 


  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'chat-view',
    loadChildren: () => import('./pages/chat-view/chat-view.module').then( m => m.ChatViewPageModule)
  },

  { path: '**', redirectTo: '/login' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

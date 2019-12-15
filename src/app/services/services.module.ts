import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UtilService } from './util/util.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, UserService, UtilService]
})
export class ServicesModule { }

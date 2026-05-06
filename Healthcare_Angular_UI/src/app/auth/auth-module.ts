import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ Import standalone login component
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: Login },
      { path: 'register', component: Register }  // Add route for registration if needed
    ])
  ],
  declarations: [
  ]
})
export class AuthModule {}

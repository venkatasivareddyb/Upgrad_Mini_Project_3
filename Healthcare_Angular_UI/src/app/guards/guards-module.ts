import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ✅ Import functional guards
import { authGuard } from './auth-guard';
import { roleGuard } from './role-guard';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Register guards so they can be injected in routes
    { provide: 'authGuard', useValue: authGuard },
    { provide: 'roleGuard', useValue: roleGuard }
  ]
})
export class GuardsModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: FrameComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'frame',
          },
          {
            path: 'frame',
            loadChildren: () => import('./frame/frame.module').then((m) => m.FrameModule),
          }
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

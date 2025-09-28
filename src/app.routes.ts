import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MentorDetailComponent } from './components/mentor-detail/mentor-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'mentors/:id', component: MentorDetailComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any other route
];

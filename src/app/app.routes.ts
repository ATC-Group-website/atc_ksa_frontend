import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProTrainingComponent } from './pages/pro-training/pro-training.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
  {
    path: 'services',
    title: 'Services',
    component: ServicesComponent,
  },
  { path: 'insights', component: InsightsComponent },
  { path: 'pro-training', component: ProTrainingComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'careers', component: CareersComponent },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];

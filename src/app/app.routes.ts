import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProTrainingComponent } from './pages/pro-training/pro-training.component';
import { InsightDetailsComponent } from './pages/insights/insight-details/insight-details.component';
// import { LoginComponent } from './dashboard/login/login.component';
// import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
// import { AddNewPostComponent } from './dashboard/add-new-post/add-new-post.component';
import { adminGuard } from './dashboard/admin.guard';
// import { EditSinglePostComponent } from './dashboard/edit-single-post/edit-single-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
  {
    path: 'services',
    title: 'Services',
    component: ServicesComponent,
  },
  { path: 'insights', component: InsightsComponent, title: 'Insights' },
  {
    path: 'insights/:id',
    component: InsightDetailsComponent,
    title: 'Insights',
  },
  {
    path: 'pro-training',
    component: ProTrainingComponent,
    title: 'ATC Pro Training',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,

    // loadComponent: () =>
    //   import('./pages/contact-us/contact-us.component').then(
    //     (mod) => mod.ContactUsComponent,
    //   ),
    title: 'Contact Us',
  },
  { path: 'careers', component: CareersComponent, title: 'Careers' },
  {
    path: 'dashboard/login',
    // component: LoginComponent,
    loadComponent: () =>
      import('./dashboard/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    title: 'Admin Login',
  },
  {
    path: 'dashboard/home',
    // component: AdminHomeComponent,
    loadComponent: () =>
      import('./dashboard/admin-home/admin-home.component').then(
        (mod) => mod.AdminHomeComponent,
      ),
    title: 'Admin Dashboard',
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/new-post',
    // component: AddNewPostComponent,
    loadComponent: () =>
      import('./dashboard/add-new-post/add-new-post.component').then(
        (mod) => mod.AddNewPostComponent,
      ),
    title: 'Admin | New Post',
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/edit-post/:id',
    // component: EditSinglePostComponent,
    loadComponent: () =>
      import('./dashboard/edit-single-post/edit-single-post.component').then(
        (mod) => mod.EditSinglePostComponent,
      ),
    title: 'Admin | Edit Post',
    canActivate: [adminGuard],
  },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];

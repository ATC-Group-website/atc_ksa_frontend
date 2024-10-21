import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InsightDetailsComponent } from './pages/insights/insight-details/insight-details.component';
import { adminGuard, loginGuard } from './dashboard/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  {
    path: 'services',
    title: 'Services',
    component: ServicesComponent,
  },
  { path: 'insights', component: InsightsComponent },
  {
    path: 'insights/:id',
    component: InsightDetailsComponent,
  },

  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  { path: 'careers', component: CareersComponent },
  {
    path: 'dashboard/login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./dashboard/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    title: 'Dashboard Login',
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/home/home.component').then(
            (mod) => mod.HomeComponent,
          ),
        title: 'Dashboard Admin Home',
      },
      {
        path: 'add-new-post',
        loadComponent: () =>
          import('./dashboard/add-new-post/add-new-post.component').then(
            (mod) => mod.AddNewPostComponent,
          ),
        title: 'Dashboard | New Post',
      },
      {
        path: 'edit-post/:id',
        loadComponent: () =>
          import(
            './dashboard/edit-single-post/edit-single-post.component'
          ).then((mod) => mod.EditSinglePostComponent),
        title: 'Dashboard | Edit Post',
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./dashboard/articles/articles.component').then(
            (mod) => mod.ArticlesComponent,
          ),
        title: 'Dashboard | Articles',
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./dashboard/news/news.component').then(
            (mod) => mod.NewsComponent,
          ),
        title: 'Dashboard | News',
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./dashboard/blogs/blogs.component').then(
            (mod) => mod.BlogsComponent,
          ),
        title: 'Dashboard | Blogs',
      },
      {
        path: 'emails',
        loadComponent: () =>
          import('./dashboard/emails/emails.component').then(
            (mod) => mod.EmailsComponent,
          ),
        title: 'Dashboard | emails',
      },
      {
        path: 'send-email',
        loadComponent: () =>
          import('./dashboard/send-emails/send-emails.component').then(
            (mod) => mod.SendEmailsComponent,
          ),
        title: 'Dashboard | send emails',
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];

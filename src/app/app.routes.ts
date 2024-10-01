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
  {
    path: 'pro-training',
    component: ProTrainingComponent,
    title: 'ATC Pro Training',
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
    loadComponent: () =>
      import('./dashboard/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    canActivate: [loginGuard],
  },
  // {
  //   path: 'dashboard/home',
  //   loadComponent: () =>
  //     import('./dashboard/home/home.component').then(
  //       (mod) => mod.HomeComponent,
  //     ),
  //   title: 'Dashboard',
  // },
  // {
  //   path: 'dashboard/articles',
  //   loadComponent: () =>
  //     import('./dashboard/articles/articles.component').then(
  //       (mod) => mod.ArticlesComponent,
  //     ),
  //   title: 'Articles Dashboard',
  // },
  // {
  //   path: 'dashboard/news',
  //   loadComponent: () =>
  //     import('./dashboard/news/news.component').then(
  //       (mod) => mod.NewsComponent,
  //     ),
  //   title: 'Articles Dashboard',
  // },
  // {
  //   path: 'dashboard/blogs',
  //   loadComponent: () =>
  //     import('./dashboard/blogs/blogs.component').then(
  //       (mod) => mod.BlogsComponent,
  //     ),
  //   title: 'Articles Dashboard',
  // },
  // {
  //   path: 'dashboard/new-post',
  //   loadComponent: () =>
  //     import('./dashboard/add-new-post/add-new-post.component').then(
  //       (mod) => mod.AddNewPostComponent,
  //     ),
  //   title: 'Admin | New Post',
  // },
  // {
  //   path: 'dashboard/edit-post/:id',
  //   loadComponent: () =>
  //     import('./dashboard/edit-single-post/edit-single-post.component').then(
  //       (mod) => mod.EditSinglePostComponent,
  //     ),
  //   title: 'Admin | Edit Post',
  // },
  {
    path: 'dashboard',
    canActivate: [adminGuard], // Protect all child routes
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/home/home.component').then(
            (mod) => mod.HomeComponent,
          ),
        title: 'Dashboard',
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
    ],
  },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];

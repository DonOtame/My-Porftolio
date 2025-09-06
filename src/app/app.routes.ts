import { Routes } from '@angular/router';

const loadHome = () => import('@features/home/home.component');
const loadAbout = () => import('@features/about/about.component');
const loadProjects = () => import('@features/projects/projects.component');
const loadSkills = () => import('@features/skills/skills.component');
const loadContact = () => import('@features/contact/contact.component');

export const routes: Routes = [
  {
    path: '',
    loadComponent: loadHome,
  },
  {
    path: 'about',
    loadComponent: loadAbout,
  },
  {
    path: 'projects',
    loadComponent: loadProjects,
  },
  {
    path: 'skills',
    loadComponent: loadSkills,
  },
  {
    path: 'contact',
    loadComponent: loadContact,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

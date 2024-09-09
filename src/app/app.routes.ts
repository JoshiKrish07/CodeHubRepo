import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CreateSnippetComponent } from './components/create-snippet/create-snippet.component';
import { authGuard } from './authguard/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    // {
    //     path:"",
    //     redirectTo:"/login",
    //     pathMatch: "full"
    // },
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"snippet/:id",
        component: CreateSnippetComponent,
        canActivate: [authGuard]
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "about",
        loadComponent: () =>import("./components/about/about.component").then((m) => m.AboutComponent),
    },
    {
        path: "create-snippet",
        component: CreateSnippetComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",  // wildcard component
        component: NotFoundComponent
    }
];

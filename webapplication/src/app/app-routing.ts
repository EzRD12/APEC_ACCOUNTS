import { Routes } from "@angular/router";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { CreateCompetitionComponent } from "./competition/create-competition/create-competition.component";
import { ShowCompetitionComponent } from "./competition/show-competition/show-competition.component";
import { CreateLanguageComponent } from "./language/create-language/create-language.component";
import { ShowLanguageComponent } from "./language/show-language/show-language.component";
import { CreateTrainingComponent } from "./training/create-training/create-training.component";
import { ShowTrainingComponent } from "./training/show-training/show-training.component";
import { CreatePositionComponent } from "./position/create-position/create-position.component";
import { ShowPositionComponent } from "./position/show-position/show-position.component";
import { LoginComponent } from "./login/login.component";
import { CreateWorkExperienceComponent } from "./work-experience/create-work-experience/create-work-experience.component";
import { ShowWorkExperienceComponent } from "./work-experience/show-work-experience/show-work-experience.component";
import { CreateCandidateComponent } from "./candidate/create-candidate/create-candidate.component";
import { CreateEmployeeComponent } from "./employee/create-employee/create-employee.component";
import { EmployeeReportComponent } from "./employee/employee-report/employee-report.component";

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'employee',
        component: AppLayoutComponent,
        children: [{
            path: 'competition/create',
            component: CreateCompetitionComponent
        },
        {
            path: 'competition/show',
            component: ShowCompetitionComponent
        },
        {
            path: 'language/create',
            component: CreateLanguageComponent
        },
        {
            path: 'language/show',
            component: ShowLanguageComponent
        },
        {
            path: 'training/create',
            component: CreateTrainingComponent
        },
        {
            path: 'training/show',
            component: ShowTrainingComponent
        },
        {
            path: 'position/create',
            component: CreatePositionComponent
        },
        {
            path: 'position/show',
            component: ShowPositionComponent
        },
        {
            path: 'evaluation',
            component: CreateEmployeeComponent
        },
        {
            path: 'report',
            component: EmployeeReportComponent
        }
        ]
    },
    {
        path: 'visit',
        component: AppLayoutComponent,
        children: [{
            path: 'work-experience/create',
            component: CreateWorkExperienceComponent
        },
        {
            path: 'work-experience/show',
            component: ShowWorkExperienceComponent
        },
        {
            path: 'candidate/create',
            component: CreateCandidateComponent
        }
    ]
    },
    { path: '**', component: LoginComponent }
]
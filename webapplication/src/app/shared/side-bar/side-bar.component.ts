import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { WorkExperienceService } from '../../../services/work-experience.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isLoged: boolean = false;
  
  constructor(private router: Router, private loginService: LoginService, private workExperienceService: WorkExperienceService) { }

  ngOnInit() {
    this.setLoginStatus();
  }

  onSubmit(){
    this.workExperienceService.setWorkExperiences(null);
    this.router.navigate(['/login']);
  }

  setLoginStatus(){
    this.loginService.currentLogedSource.subscribe(loginStatus => this.isLoged = loginStatus);
  }
}

import { Component, OnInit } from '@angular/core';
import { Language } from '../../../models/language';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-show-language',
  templateUrl: './show-language.component.html',
  styleUrls: ['./show-language.component.css']
})
export class ShowLanguageComponent implements OnInit {

  languages: Language[] = [];
  visible = false;
  displayData = [ ...this.languages ];
  searchValue = '';

  constructor(private languageService: LanguageService) { }

  ngOnInit() { 
    this.showData();
  } 

  showData(){
    this.languageService.getLanguages().then((data: Language[]) => {
      this.languages = data;
      this.displayData = [...this.languages];
    }).catch((error) => console.log(error));
  }

  onDelete(id: string){
    this.languageService.removeLanguage(id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.id !== id)
  }

  search() {
    this.displayData = this.languages.filter(languages => {
      return Object.keys(languages).some(keys => languages[keys] != null &&
        languages[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}

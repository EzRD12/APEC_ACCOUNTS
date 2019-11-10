import { Component, OnInit, Input } from '@angular/core';
import { LanguageStatus } from '../../../enums/languageStatus';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';

@Component({
  selector: 'app-language-update-drawer',
  templateUrl: './language-update-drawer.component.html',
  styleUrls: ['./language-update-drawer.component.css']
})
export class LanguageUpdateDrawerComponent implements OnInit {

  @Input()
  visible: boolean = false;

  languageId: string = '';
  status: string[] = [];
  state: LanguageStatus = LanguageStatus.Required;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.getStatusValues();
  }

  getStatusValues() {
    this.status = Object.keys(LanguageStatus).filter(value => !(Number.parseInt(value) > 0));
  }

  updateCompetition(name: string) {
    const language: Language = {
      name: name,
      status: this.state
    };

    this.languageService.updateLanguage(this.languageId, language).then((data) => console.log(data))
    .catch((error) => console.log(error));

    this.visible = false;
  }

  onSelect(state: string) {
    if (state === 'Required') {
      this.state = LanguageStatus.Required;
    } else {
      this.state = LanguageStatus.Unrequired;
    }
    console.log(this.state);
  }

  close(): void {
    this.visible = false;
  }

  open(id: string): void {
    this.visible = true;
    this.languageId = id;
  }
}

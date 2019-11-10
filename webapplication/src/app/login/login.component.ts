import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { AccountingEntryComponent } from '../accounting-entry/accounting-entry.component';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidUser: boolean;
  accountingEntries: any[] = [];
  auxiliaryAccounts: any[] = [];
  currencyTypes: any[] = [];
  showCreateAccountingEntry = false;
  @ViewChild('accountingEntry') accountingEntry: AccountingEntryComponent;
  accountingIdSelected: number;

  constructor(private loginService: LoginService,
              private router: Router,
              private generalService: GeneralService,
              private modal: NzModalService,
              private notification: NzNotificationService) {
    this.invalidUser = true;
  }

  ngOnInit() {
    this.getAccountingEntries();
    this.getAuxiliaryAccounts();
    this.generalService.getCurrencyTypes().then( (data) => {
      this.currencyTypes = data;
    });
  }

  private getAccountingEntries() {
    this.generalService.getAccounting().then((data) => this.accountingEntries = data);
  }

  setCreateAccountingEntry(visibility: boolean) {
    this.showCreateAccountingEntry = visibility;
  }

  private getAuxiliaryAccounts() {
    this.generalService.getActiveAuxiliaryAccounts().then( (data) => {
      this.auxiliaryAccounts = data;
    }).catch(error => console.log(error));
  }

  getAuxiliaryAccountDescription(id) {
    const auxiliary: any = this.auxiliaryAccounts.find(account => account.id === id);
    return auxiliary !== undefined ? auxiliary.description : 'Desconocida';
  }

  handleCancel() {
    this.showCreateAccountingEntry = false;
    this.getAccountingEntries();
  }

  deleteAccounting() {
    this.generalService.deleteAccounting(this.accountingIdSelected).then( (result) => {
      this.notification.success('Operacion exitosa', 'Entrada borrada');
      this.getAccountingEntries();
    }).catch( (error) => {
      this.notification.error('Error', 'Un error ha ocurrido:' + error);
    });
  }

  showDeleteConfirm(accountingId: number) {
    this.accountingIdSelected = accountingId;
    this.modal.confirm({
      nzTitle: 'Borrar registro de entrada',
      nzContent: 'Está seguro de borrar esta entrada del registro? \n NOTA: Tenga en' +
      'cuenta que al borrar una entrada, automaticamente se borrará ' +
      'su complementaria entrada debito/credito segun corresponda',
      nzOnOk: () => this.deleteAccounting()
    });
  }

  handleOk() {
    this.accountingEntry.saveForm();
  }
}

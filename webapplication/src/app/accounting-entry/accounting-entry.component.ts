import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { GeneralService } from 'src/services/general.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-accounting-entry',
  templateUrl: './accounting-entry.component.html',
  styleUrls: ['./accounting-entry.component.css']
})
export class AccountingEntryComponent implements OnInit {

  auxiliaryAccounts: any[] = [];
  currencyTypes: any[] = [];
  validateForm: FormGroup;
  @Output() created = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private generalService: GeneralService,
              private notification: NzNotificationService) {
    this.getAuxiliaryAccounts();
    this.getCurrencyTypes();
               }

  ngOnInit() {
    this.buildForm();
    this.getAuxiliaryAccounts();
  }

  public buildForm() {
    this.validateForm = this.formBuilder.group({
      debitDescription: ['', Validators.required],
      creditDescription: ['', Validators.required],
      debitAccount: ['', Validators.required],
      creditAccount: ['', Validators.required],
      period: [null, Validators.required],
      amount: ['', Validators.required],
      currencyTypeId: [null, [Validators.required, Validators.min(1)]],
      debitAuxiliaryAccountId: [null, [Validators.required, Validators.min(1)]],
      creditAuxiliaryAccountId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  private getAuxiliaryAccounts() {
    this.generalService.getActiveAuxiliaryAccounts().then( (data) => {
      this.auxiliaryAccounts = data;
    }).catch(error => console.log(error));
  }

  private getCurrencyTypes() {
    this.generalService.getCurrencyTypes().then( (data) => {
      this.currencyTypes = data;
    }).catch(error => console.log(error));
  }

  saveForm() {
    if (this.validateForm.invalid) {
      this.notification
      .warning('Formulario invalido', 'Debe completar el formulario con los datos minimos aceptables y de manera correcta.');
      return;
    }

    const mainRequest = this.validateForm.getRawValue();
    const debitRequest = {
      description: mainRequest.debitDescription,
      account: mainRequest.debitAccount,
      period: mainRequest.period,
      movementType: 1,
      amount: mainRequest.amount,
      currencyTypeId: mainRequest.currencyTypeId,
      auxiliaryAccountId: mainRequest.debitAuxiliaryAccountId
    };

    const creditRequest = {
      description: mainRequest.creditDescription,
      account: mainRequest.creditAccount,
      period: mainRequest.period,
      movementType: 2,
      amount: mainRequest.amount,
      currencyTypeId: mainRequest.currencyTypeId,
      auxiliaryAccountId: mainRequest.creditAuxiliaryAccountId
    };

    this.generalService.storeAccounting([debitRequest, creditRequest]).then((result) => {
      this.notification.success('Operacion exitosa', 'La cuenta fue creada exitosamente');
      this.created.emit();
      this.validateForm.reset();
    }).catch(response => {
      this.notification.error('Error', 'Operacion invalida por la siguiente excepcion' + response);
    });
  }
}

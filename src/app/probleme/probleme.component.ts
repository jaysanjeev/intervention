import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidateur } from '../shared/longeur-minimum/longeur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component.spec';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent {
   problemeForm: FormGroup;
  typeproblemeService: ITypeProbleme[];
  errorMessage: String;
   constructor(private fb: FormBuilder,private typeprobleme: TypeproblemeService) {}
   ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [ZonesValidateur.longueurMinimum(3), Validators.required]],
       nom: ['' , [ZonesValidateur.longueurMinimum(3), Validators.required]],
       noTypeProbleme: ['', Validators.required], 
       courrielGroup: this.fb.group({
           courriel: [{value: '', disabled: true}],
           courrielConfirmation: [{value: '', disabled: true}],
         }),
       telephone: [{value: '', disabled: true}],
       notification:['pasnotification'],
       noUnite:[],
       descriptionProbleme:['',Validators.required]

    });

    this.typeprobleme.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typeproblemeService = typesProbleme,
                   error => this.errorMessage = <any>error); 


    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value));
   }
   save(): void {
   }

   appliquerNotifications(notifyVia: string): void {
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');
    
    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    telephoneControl.clearValidators();
    telephoneControl.reset(); 
    telephoneControl.disable();

    if (notifyVia === 'courriel') {
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.setValidators([Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmationControl.enable();
      } else {
      if (notifyVia === 'telephone') {
      telephoneControl.setValidators([Validators.required, Validators.minLength(10),  Validators.maxLength(10), Validators.pattern('[0-9]+')]);
      telephoneControl.enable();
      }
      
      courrielControl.updateValueAndValidity();
      courrielConfirmationControl.updateValueAndValidity();
      telephoneControl.updateValueAndValidity();
      }
      }
}
   



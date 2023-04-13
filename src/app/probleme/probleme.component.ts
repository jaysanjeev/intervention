import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidateur } from '../shared/longeur-minimum/longeur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

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
    });

    this.typeprobleme.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typeproblemeService = typesProbleme,
                   error => this.errorMessage = <any>error); 

   }
   save(): void {
   }

   appliquerNotifications(): void {
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
}
   }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent {
   problemeForm: FormGroup;
   constructor(private fb: FormBuilder) {
    this.problemeForm = this.fb.group({
       prenom:['',[Validators.minLength(3),Validators.required]]
    });

   }
   save(): void {
   }
  
}



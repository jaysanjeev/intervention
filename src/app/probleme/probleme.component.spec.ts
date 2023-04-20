import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaxLengthValidator, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ZonesValidateur } from '../shared/longeur-minimum/longeur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], 
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champs prenom invalide avec moins de 2 caractere',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy();
  });

  it('champs prenom doit au moins avoir 3 caractere',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('champs prenom valide avec 200 caractere',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('champs prenom invalide si vide',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    expect(zone.invalid).toBeTruthy();
  });

  it('champs prenom valide avec 10 espace',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.invalid).toBeTruthy();
  });

  it('champs prenom valide avec 1 caractere et 2 espace',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a  ');
    expect(zone.invalid).toBeTruthy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier',() => {
   component.appliquerNotifications('courriel');

   let zone = component.problemeForm.get('telephone')
   expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('telephone')
    zone.setValue('');
    expect(zone.clearValidators).toBeTruthy();
   });

   it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications('telephone');
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTrue();
   });

   it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications('telephone');
 
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
   });

   it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.enabled).toBeTrue();
   });

   it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.enabled).toBeTrue();
   });

   it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.enabled).toBeTrue();
   });

   it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.value).toBeNull();
   });

   it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.value).toBeNull();
   });

   it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    zone.setValue("aaa");
    let error = zone.errors || {};
    expect(error["pattern"]).toBeTruthy();
   });

   it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    let zoneConfirmer = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zoneConfirmer.setValue("abcd@gmail.com");
    expect(zone.invalid).toBeTrue();
   });

   it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null',() => {
    component.appliquerNotifications('courriel');
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    zone.setValue('abc@gmail.com')
    let zoneConfirmer = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zoneConfirmer.invalid).toBeTrue();
   });

   it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel')
    let zoneConfirmer = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone.setValue('abc@gmail.com')
    zoneConfirmer.setValue('abcd@gmail.com')
    let group = component.problemeForm.get('courrielGroup')
    expect(group.invalid).toBeTrue();
   });

   it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel',() => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel')
    let zoneConfirmer = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone.setValue('abc@gmail.com')
    zoneConfirmer.setValue('abc@gmail.com')    
    let group = component.problemeForm.get('courrielGroup')
    expect(group.valid).toBeTrue();
   });

   it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone')
    expect(zone.enable).toBeTruthy();
   });

   it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTrue();
   });

   it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
   });
   it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("");
    expect(zone.invalid).toBeTrue();
   });
   it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue(![0-9]);
    expect(zone.invalid).toBeTrue();
   });
   it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('5'.repeat(9));
   
    expect(zone.invalid).toBeTrue();
   });
   it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('5'.repeat(11));
    
    
    expect(zone.invalid).toBeTrue();
   });
   it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue(5144445555)
    expect(zone.valid).toBeTrue();
   });

  

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

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
   component.appliquerNotifications();

   let zone = component.problemeForm.get('telephone')
   expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier',() => {
    component.appliquerNotifications();
 
    let zone = component.problemeForm.get('telephone')
    zone.setValue('');
    expect(zone.clearValidators).toBeTruthy();
   });

   it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications();
 
    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTrue();
   });

   it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications();
 
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
   });

  

});

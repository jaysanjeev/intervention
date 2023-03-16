import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
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
    expect(zone.valid).toBeTruthy();
  });

  it('champs prenom valide avec 1 caractere et 2 espace',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a  ');
    expect(zone.valid).toBeTruthy();
  });


});

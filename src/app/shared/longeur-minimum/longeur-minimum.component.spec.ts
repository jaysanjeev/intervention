import { AbstractControl } from "@angular/forms";
import { ZonesValidateur } from "./longeur-minimum.component";

describe('Zones Validator', () => {
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#8 | Une phrase avec des mots est valide', () => {
        let control = { value: 'Vive Angular' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: '   Vive Angular   ' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        let control = { value: ' xx' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value: '  x' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        let control = { value: '   xxx' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value: '     xxxxx     ' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#14 | Une chaîne nulle est invalide', () => {
        let control = { value: '' }
        let validatorFn =  ZonesValidateur.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      
});
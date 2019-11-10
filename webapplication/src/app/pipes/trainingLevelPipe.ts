import { Pipe, PipeTransform } from '@angular/core';
import { TrainingLevel } from '../../enums/trainingLevel';
@Pipe({
    name: 'trainingLevel'
})
export class TrainingLevelPipe implements PipeTransform {
    transform(val: TrainingLevel): string {

        if (val === TrainingLevel.Grade) {
            return 'Grado';
        } else if (val === TrainingLevel.PostGrade) {
            return 'Post-Grado';
        } else if (val === TrainingLevel.Masters) {
            return 'Master';
        } else if (val === TrainingLevel.Doctorate) {
            return 'Doctorado';
        } else if (val === TrainingLevel.Technical) {
            return 'Tecnico';
        } else if (val === TrainingLevel.Management) {
            return 'Manager';
        }
    }
}
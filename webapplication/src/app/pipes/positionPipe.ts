import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../../models/position';
@Pipe({
    name: 'positionName'
})
export class PositionPipe implements PipeTransform {
    transform(val: Position): string {
        return val.name
    }
}
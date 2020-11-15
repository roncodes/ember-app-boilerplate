import isModel from './is-model';
import { isArray } from '@ember/array';

export default function isArrayOfModels(arr) {
    if (!isArray(arr)) {
        return false;
    }
    return arr.every((e) => isModel(e));
}

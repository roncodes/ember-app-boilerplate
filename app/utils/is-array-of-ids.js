import isUuid from './is-uuid';
import { isArray } from '@ember/array';

export default function isArrayOfIds(arr) {
    if (!isArray(arr)) {
        return false;
    }
    return arr.every((e) => isUuid(e));
}

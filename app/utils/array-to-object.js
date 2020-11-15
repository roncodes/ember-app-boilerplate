import { isArray } from '@ember/array';

export default function arrayToObject(arr = []) {
    if (!isArray(arr)) {
        return {};
    }

    const obj = arr.reduce(function (acc, cur) {
        acc[cur] = null;
        return acc;
    }, {});

    return { ...obj };
}

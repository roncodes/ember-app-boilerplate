import isUuid from './is-uuid';

export default function isCommaDelimitedIds(v) {
    if (typeof v !== 'string' || !v.includes(',')) {
        return false;
    }

    const arr = v.split(',');
    const is = arr.every((e) => isUuid(e));

    return is ? arr : false;
}

import { helper } from '@ember/component/helper';

export default helper(function nA([value, placeholder = 'No value']) {
    return value || placeholder;
});

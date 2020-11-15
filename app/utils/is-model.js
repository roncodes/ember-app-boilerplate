import Model from '@ember-data/model';

export default function isModel(obj) {
    return obj instanceof Model;
}

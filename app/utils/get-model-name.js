import isModel from './is-model';
import { getWithDefault } from '@ember/object';

export default function getModelName(model) {
    if (isModel(model)) {
        return getWithDefault(model, '_internalModel.modelName', 'resource');
    }

    return 'resource';
}

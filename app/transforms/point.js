import Transform from '@ember-data/serializer/transform';
import Terraformer from 'terraformer';

export default class PointTransform extends Transform {
    deserialize(serialized) {
        return new Terraformer.Point(serialized);
    }

    serialize(deserialized) {
        return new Terraformer.Point(deserialized);
    }
}

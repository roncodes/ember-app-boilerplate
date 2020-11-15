import Transform from '@ember-data/serializer/transform';

export default class ArrayTransform extends Transform {
    deserialize(serialized) {
        return Array.from(serialized);
    }

    serialize(deserialized) {
        return Array.from(deserialized);
    }
}

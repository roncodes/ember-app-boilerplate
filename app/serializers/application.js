import RESTSerializer from '@ember-data/serializer/rest';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import isModel from '@boilerplate/dashboard/utils/is-model';

export default class ApplicationSerializer extends RESTSerializer {
    /**
     * Default primary keys to uuid
     *
     * @var {string}
     */
    // primaryKey = 'uuid';

    /**
     * Customize serializer so that any attributes that are instances of Models or objects
     * that are to accept and ID get serialized into the id only
     *
     * @param {Snapshot} snapshot
     * @param {Object} options
     * @return {Object} json
     */
    serialize(snapshot) {
        const json = super.serialize(...arguments);
        const attributes = { ...snapshot.attributes() };

        for (let property in attributes) {
            if (property.includes('uuid') && typeof attributes[property] === 'object' && !isEmpty(attributes[property])) {
                if (isModel(attributes[property])) {
                    json[property] = get(attributes[property], 'id');
                } else {
                    json[property] = get(attributes[property], 'uuid') || get(attributes[property], 'id');
                }
            } else if (!isEmpty(attributes[property])) {
                json[property] = attributes[property];
            }
        }

        return json;
    }

    /**
     * We only want to save dirty/changed model attributes
     *
     * @param {Snapshot} snapshot
     * @param {Object} json
     * @param {String} key
     * @param {Array} attributes
     */
    serializeAttribute(snapshot, json, key, attributes) {
        if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
            return super.serializeAttribute(snapshot, json, key, attributes);
        }
    }

    /**
     * Helper function to check if relationship set on model matches the id attribute
     *
     * @param {Object} json
     * @param {Model|Object} relation
     * @param {String} id
     */
    relationMatchesId(json, relation, id) {
        return typeof json[relation] === 'object' && !isEmpty(json[relation]) && get(json, `${relation}.uuid`) === get(json, id);
    }
}

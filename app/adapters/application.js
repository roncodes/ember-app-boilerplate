import RESTAdapter from '@ember-data/adapter/rest';
import ENV from '@boilerplate/dashboard/config/environment';
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';
import { get } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
    /**
     * The default namespace for the adapter
     *
     * @var {String}
     */
    get host() {
        return get(ENV, 'API.host');
    }

    /**
     * The default namespace for adapter
     *
     * @var {String}
     */
    get namespace() {
        return get(ENV, 'API.namespace');
    }

    /**
     * Credentials
     *
     * @var {String}
     */
    credentials = 'include';

    /**
     * Format the path for the model endpoint
     *
     * @param {String} modelName
     *
     * @return {String}
     */
    pathForType(modelName) {
        return pluralize(dasherize(modelName));
    }

    /**
     * Configure AJAX options for request, return as options hash
     *
     * @param {String} url
     * @param {String} type The request type GET, POST, PUT, DELETE etc.
     * @param {Object} options
     *
     * @return {Object}
     */
    ajaxOptions(url, type, options) {
        const ajaxOptions = super.ajaxOptions(url, type, options);
        ajaxOptions.credentials = this.credentials;
        return ajaxOptions;
    }
}

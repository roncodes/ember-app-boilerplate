import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { isBlank } from '@ember/utils';
import { dasherize } from '@ember/string';
import { storageFor } from 'ember-local-storage';
import isCommaDelimitedIds from '@boilerplate/dashboard/utils/is-comma-delimited-ids';
import isArrayOfIds from '@boilerplate/dashboard/utils/is-array-of-ids';
import isModel from '@boilerplate/dashboard/utils/is-model';
import ENV from '@boilerplate/dashboard/config/environment';
import download from 'downloadjs';
import fetch from 'fetch';
import moment from 'moment';

export default class FetchService extends Service {
    /**
     * The default namespace for the fetch service
     *
     * @var {String}
     */
    get host() {
        return get(ENV, 'API.host');
    }

    /**
     * The default namespace for the fetch service
     *
     * @var {String}
     */
    get namespace() {
        return get(ENV, 'API.namespace');
    }

    /**
     * The request headers
     *
     * @var {Object}
     */
    headers = {
        'Content-Type': 'application/json',
    };

    /**
     * Credentials
     *
     * @var {String}
     */
    credentials = 'include';

    /**
     * Inject the `store` service
     *
     * @var {Service}
     */
    @service store;

    /**
     * Inject the `session` service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Local cache for some static requests
     *
     * @var StorageObject
     */
    @storageFor('local-cache') localCache;

    /**
     * Normalizes a model response from fetch to a ember data model
     *
     * @param  {Object} payload   A response from a network request
     * @param  {String} modelType The type of model to be normalized too
     *
     * @return {Model}            An ember model
     */
    normalizeModel(payload, modelType = null) {
        if (modelType === null) {
            const modelTypeKeys = Object.keys(payload);
            modelType = modelTypeKeys.length ? modelTypeKeys.firstObject : false;
        }
        if (typeof modelType !== 'string') return false;
        const type = dasherize(modelType);
        const normalized = this.store.push(this.store.normalize(type, payload[modelType]));
        return normalized;
    }

    /**
     * Parses the JSON returned by a network request
     *
     * @param  {Object} response A response from a network request
     * @return {Object}          The parsed JSON, status from the response
     *
     * @return {Promise}
     */
    parseJSON(response) {
        return new Promise((resolve, reject) =>
            response
                .json()
                .then((json) =>
                    resolve({
                        statusText: response.statusText,
                        status: response.status,
                        ok: response.ok,
                        json,
                    })
                )
                .catch(() => {
                    reject(new Error('Oops! Something went wrong when handling your request.'));
                })
        );
    }

    /**
     * The base request method
     *
     * @param {String} path
     * @param {String} method
     * @param {Object} data
     * @param {Object} options
     *
     * @return {Promise}
     */
    request(path, method = 'GET', data = {}, options = {}) {
        return new Promise((resolve, reject) => {
            return fetch(`${this.host}/${this.namespace}/${path}`, {
                method,
                credentials: this.credentials,
                headers: {
                    ...(this.headers || {}),
                    ...(options.headers || {}),
                },
                ...data,
            })
                .then(this.parseJSON)
                .then((response) => {
                    if (response.ok) {
                        if (options.normalizeToEmberData) {
                            return resolve(this.normalizeModel(response.json, options.modelType));
                        }
                        return resolve(response.json);
                    }
                    return reject(new Error(response.json.error || response.statusText));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Makes a GET request with fetch
     *
     * @param {String} path
     * @param {Object} query
     * @param {Object} options
     *
     * @return {Promise}
     */
    get(path, query = {}, options = {}) {
        return this.request(`${path}?${!isBlank(query) ? new URLSearchParams(query).toString() : ''}`, 'GET', options);
    }

    /**
     * Makes a GET request with fetch, but if the fetch is stored in local cache,
     * retrieve from storage to prevent unnecessary netwrok request
     *
     * @param {String} path
     * @param {Object} query
     * @param {Object} options
     *
     * @return {Promise}
     */
    cachedGet(path, query = {}, options = {}) {
        const pathKey = dasherize(path);
        const pathKeyVersion = moment().format('DDMMYYYY');
        // check to see if in storage already
        if (this.localCache.get(pathKey)) {
            return new Promise((resolve) => {
                // get cached data
                const data = this.localCache.get(pathKey);
                // get the path key version value
                const version = this.localCache.get(`${pathKey}-version`);
                // if the version is older than 3 days clear it
                if (!version || moment().diff(moment(version, 'DDMMYYYY'), 'days') > 3 || options.clearData === true) {
                    this.localCache.set(pathKey, undefined);
                    this.localCache.set(`${pathKey}-version`, undefined);
                }
                // return cached response
                return resolve(data);
            });
        }
        // if no cached data request from server
        return this.get(path, query, options).then((response) => {
            // cache the response
            this.localCache.set(pathKey, response);
            this.localCache.set(`${pathKey}-version`, pathKeyVersion);
            // return response
            return response;
        });
    }

    /**
     * Makes a POST request with fetch
     *
     * @param {String} path
     * @param {Object} data
     * @param {Object} options
     *
     * @return {Promise}
     */
    post(path, data = {}, options = {}) {
        return this.request(path, 'POST', { body: JSON.stringify(data) }, options);
    }

    /**
     * Makes a PUT request with fetch
     *
     * @param {String} path
     * @param {Object} data
     * @param {Object} options
     *
     * @return {Promise}
     */
    put(path, data = {}, options = {}) {
        return this.request(path, 'PUT', { body: JSON.stringify(data) }, options);
    }

    /**
     * Makes a DELETE request with fetch
     *
     * @param {String} path
     * @param {Object} data
     * @param {Object} options
     *
     * @return {Promise}
     */
    delete(path, data = {}, options = {}) {
        return this.request(path, 'DELETE', { body: JSON.stringify(data) }, options);
    }

    /**
     * Makes a PATCH request with fetch
     * @param {String} path
     * @param {Object} data
     * @param {Object} options
     *
     * @return {Promise}
     */
    patch(path, data = {}, options = {}) {
        return this.request(path, 'PATCH', { body: JSON.stringify(data) }, options);
    }

    /**
     * Makes a upload request with fetch
     *
     * @param {String} path
     * @param {Array} files
     * @param {Object} options
     *
     * @return {Promise}
     */
    upload(path, files = [], options = {}) {
        const body = new FormData();
        files.forEach((file) => {
            body.append('file', file);
        });
        return this.request(path, 'POST', { body }, options);
    }

    /**
     * Downloads blob of the request path to user
     *
     * @param {String} path
     * @param {Object} query
     * @param {Object} options
     *
     * @return {Promise}
     */
    download(path, query = {}, options = {}) {
        if (isModel(path)) {
            path = `files/download/${path.id}`;
        }
        return new Promise((resolve, reject) => {
            return fetch(`${this.host}/${this.namespace}/${path}?${!isBlank(query) ? new URLSearchParams(query).toString() : ''}`, {
                method: 'GET',
                credentials: this.credentials,
                headers: {
                    ...(this.headers || {}),
                    ...(options.headers || {}),
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    return resolve(download(blob, options.fileName, options.mimeType));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Load multiple or single model given id or array of ids, or comma delimited ids
     *
     * @param {String} modelName
     * @param {Mixed} ids
     *
     * @return {Promise}
     */
    loadModels(modelName, ids) {
        return new Promise(async (resolve) => {
            let model = null,
                models = [];

            // if value is array already load it
            if (isArrayOfIds(ids)) {
                for (let i = 0; i < ids.length; i++) {
                    model = await this.store.findRecord(modelName, ids[i]);
                    models.pushObject(model);
                }
            }

            // load the model
            if (typeof ids === 'string') {
                model = await this.store.findRecord(modelName, ids);
            }

            // if comma delimited string of ids
            if ((ids = isCommaDelimitedIds(ids))) {
                for (let i = 0; i < ids.length; i++) {
                    model = await this.store.findRecord(modelName, ids[i]);
                    models.pushObject(model);
                }
            }

            resolve(models.length ? models : model);
        });
    }
}

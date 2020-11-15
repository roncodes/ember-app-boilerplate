import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class ApiAuthenticator extends Base {
    /**
     * Inject the fetch service
     *
     * @var {Service}
     */
    @service fetch;

    /**
     * Restore session from server
     *
     * @param {object} data
     * @return {Promise}
     */
    restore(data) {
        return this.fetch.get('auth/session').then((response) => {
            if (get(response, 'restore') === false) {
                return Promise.reject(new Error(response));
            } else if (get(response, 'token') === get(data, 'token')) {
                return response;
            }
        });
    }

    /**
     * Authenticates a users credentials
     *
     * @param {object} credentials
     * @param {boolean} remember
     * @param {string} path
     */
    authenticate(credentials = {}, remember = false, path = 'auth/login') {
        return this.fetch.post(path, { ...credentials, remember });
    }

    /**
     * Invalidates the current session
     *
     * @param {object} _data
     */
    invalidate(_data) {
        return this.fetch.post('auth/logout');
    }
}

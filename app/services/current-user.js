import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { storageFor } from 'ember-local-storage';

export default class CurrentUserService extends Service {
    /**
     * Inject the session service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Inject the store service
     *
     * @var {Service}
     */
    @service store;

    /**
     * User options in localStorage
     *
     * @var StorageObject
     */
    @storageFor('user-options') options;

    /**
     * Alias for current user id
     *
     * @var {String}
     */
    @alias('user.id') id;

    /**
     * Alias for current user name
     *
     * @var {String}
     */
    @alias('user.name') name;

    /**
     * Loads the current authenticated user
     *
     * @void
     */
    load() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (this.session.isAuthenticated) {
                let user = await this.store.queryRecord('user', { me: true });
                this.set('user', user);
                resolve(user);
            } else {
                reject(new Error('User not authenticated.'));
            }
        });
    }
}

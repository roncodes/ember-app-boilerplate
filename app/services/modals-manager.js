import EmberBootstrapModalsManager from 'ember-bootstrap-modals-manager/services/modals-manager';
import { set } from '@ember/object';

export default class ModalsManagerService extends EmberBootstrapModalsManager {
    /**
     * Same as onClickConfirm but allows a handler to run then resolve by user
     *
     * @param {EbmmModalOptions} v
     */
    onClickConfirmWithDone(v) {
        const done = this.done.bind(this, v);
        if (this.options.confirm && typeof this.options.confirm === 'function') {
            const response = this.options.confirm(this, done);
            if (response && typeof response.then === 'function') {
                return response.finally(() => {
                    done();
                });
            }
            return;
        }
        return done(v);
    }

    /**
     * Same as onClickDecline but allows a handler to run then resolve by user
     *
     * @param {EbmmModalOptions} v
     */
    onClickDeclineWithDone(v) {
        const done = () => {
            set(this, 'modalIsOpened', false);
            this.modalDefer?.resolve(v);
            this.clearOptions();
        };
        if (this.options.decline && typeof this.options.decline === 'function') {
            const response = this.options.decline(this, done);
            if (response && typeof response.then === 'function') {
                return response.finally(() => {
                    return done();
                });
            }
            return;
        }
        return done(v);
    }

    /**
     * Closes the modal and cleans up
     *
     * @void
     */
    done(v = {}) {
        return new Promise((resolve) => {
            set(this, 'modalIsOpened', false);
            this.modalDefer?.resolve(v);
            this.clearOptions();
            resolve(true);
        });
    }

    /**
     * Shows `confirm`-modal
     *
     * @method confirm
     * @param {object} options
     * @return {RSVP.Promise}
     */
    confirm(options) {
        return this.show(`modals/confirm`, options);
    }

    /**
     * Retrieves an option
     *
     * @param {String} key
     * @return {Mixed}
     */
    getOption(key) {
        return this.options[key] || null;
    }

    /**
     * Updates an option in the service
     *
     * @param {String} key
     * @param {Mixed} value
     * @void
     */
    setOption(key, value) {
        this.options = {
            ...this.options,
            [key]: value,
        };
    }

    /**
     * Allows multiple options to be updated
     *
     * @param {Object} options
     * @void
     */
    setOptions(options = {}) {
        this.options = {
            ...this.options,
            ...options,
        };
    }

    /**
     * Alias to start loading indicator on modal
     *
     * @void
     */
    startLoading() {
        this.setOption('isLoading', true);
    }

    /**
     * Alias to stop loading indicator on modal
     *
     * @void
     */
    stopLoading() {
        this.setOption('isLoading', false);
    }
}

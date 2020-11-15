import EmberNotificationsService from 'ember-cli-notifications/services/notifications';

export default class NotificationsService extends EmberNotificationsService {
    /**
     * Handles errors from the server
     *
     * @param {Error} error
     * @void
     */
    serverError(error, fallbackMessage = 'Oops! Something went wrong with your request.', options) {
        // eslint-disable-next-line no-prototype-builtins
        if (typeof error === 'object' && error.hasOwnProperty('message')) {
            return this.error(error.message || fallbackMessage, options);
        }
        return this.error(fallbackMessage, options);
    }
}

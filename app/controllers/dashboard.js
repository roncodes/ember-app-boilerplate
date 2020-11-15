import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from '@boilerplate/dashboard/config/environment';

export default class DashboardController extends Controller {
    /**
     * Inject the `session` service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Welcome message
     *
     * @var {String}
     */
    get welcomeMessage() {
        return `${config.greeting}! This is an Ember.js Dashboard Boilerplate!`;
    }

    /**
     * Invalidates the users session
     * 
     * @void
     */
    @action
    logout() {
        this.session.invalidate();
    }
}

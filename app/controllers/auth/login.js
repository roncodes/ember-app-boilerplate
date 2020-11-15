import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthLoginController extends Controller {
    /**
     * Authenticate the user
     *
     * @void
     */
    @action
    async login() {
        // get user credentials
        const { email, password, rememberMe } = this;

        // set credentials
        const credentials = { email, password };

        // start timeout
        this.timeout = setTimeout(this.slowConnection, 1500);

        // start loader
        this.isLoading = true;

        try {
            await this.session.authenticate('authenticator:api', credentials, rememberMe);
        } catch (error) {
            return this.failure(error);
        }

        if (this.session.isAuthenticated) {
            this.success();
        }
    }

    /**
     * Inject the session service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Inject the session service
     *
     * @var {Service}
     */
    @service notifications;

    /**
     * Users email
     *
     * @var {String}
     */
    @tracked email = 'me@ron.dev';

    /**
     * Users password
     *
     * @var {String}
     */
    @tracked password = 'test';

    /**
     * User's option to remember session
     *
     * @var {Boolean}
     */
    @tracked rememberMe = false;

    /**
     * Login is processing
     *
     * @var {Boolean}
     */
    @tracked isLoading = false;

    /**
     * Login is validating
     *
     * @var {Boolean}
     */
    @tracked isValidating = false;

    /**
     * If the connection or requesst it taking too long
     *
     * @var {Boolean}
     */
    @tracked isSlowConnection = false;

    /**
     * Interval to determine when to timeout the request
     *
     * @var {Integer}
     */
    @tracked timeout = null;

    /**
     * Handles the authentication success
     *
     * @void
     */
    success() {
        this.reset('success');
        // return this.transitionToRoute('dashboard');
    }

    /**
     * Handles the authentication failure
     *
     * @param {String} error An error message
     * @void
     */
    failure(error) {
        this.notifications.serverError(error);
        this.reset('error');
    }

    /**
     * Handles the request slow connection
     *
     * @void
     */
    slowConnection() {
        this.notifications.error('Experiencing connectivity issues.');
    }

    /**
     * Reset the login form
     *
     * @param {String} type
     * @void
     */
    reset(type) {
        // reset login form state
        this.isLoading = false;
        this.isSlowConnection = false;
        // reset login form state depending on type of reset
        switch (type) {
            case 'success':
                this.identity = null;
                this.password = null;
                this.isValidating = false;
                break;
            case 'error':
            case 'fail':
                this.password = null;
                break;
        }
        clearTimeout(this.timeout);
    }
}

import SimpleAuthSessionService from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';

export default class SessionService extends SimpleAuthSessionService {
    /**
     * Inject the router service
     *
     * @var {Service}
     */
    @service router;

    /**
     * Inject the current user service
     *
     * @var {Service}
     */
    @service currentUser;

    /**
     * Set where to transition to
     *
     * @var {String}
     */
    redirectTo = 'dashboard';

    /**
     * Overwrite the handle authentication method
     *
     * @void
     */
    async handleAuthentication() {
        this.router.transitionTo(this.redirectTo);
    }

    /**
     * Loads the current authenticated user
     *
     * @void
     */
    async loadCurrentUser() {
        try {
            const user = await this.currentUser.load();
            return user;
        } catch (err) {
            await this.session.invalidate();
        }
    }

    /**
     * Set the redirect route after authentication
     *
     * @void
     */
    setRedirect(whereTo = 'dashboard') {
        this.redirectTo = whereTo;
    }
}

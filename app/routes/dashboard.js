import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';

export default class DashboardRoute extends Route {
    /**
     * Inject the `currentUser` service
     *
     * @var {Service}
     */
    @service currentUser;

    /**
     * Inject the `session` service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Inject the `theme` service
     *
     * @var {Service}
     */
    @service theme;

    /**
     * Initialize dashboard theme and layout
     *
     * @return true
     */
    @action
    didTransition() {
        // after render init layout and menu
        // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
        scheduleOnce('afterRender', this, () => {
            this.theme.initLayout();
        });
        return true; // Bubble the didTransition event
    }

    /**
     * Check and only allow authenticated users in dashboard
     *
     * @void
     */
    beforeModel(transition) {
        this.session.requireAuthentication(transition, 'auth.login');
        return this.loadCurrentUser();
    }

    /**
     * Loads the current authenticated user
     *
     * @void
     */
    async loadCurrentUser() {
        try {
            await this.currentUser.load();
        } catch (err) {
            await this.session.invalidate();
        }
    }
}

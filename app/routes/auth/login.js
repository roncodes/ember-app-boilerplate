import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthLoginRoute extends Route {
    /**
     * Inject the session service
     *
     * @var {Service}
     */
    @service session;

    /**
     * If user is authentication redirect to dashboard
     *
     * @void
     */
    beforeModel() {
        this.session.prohibitAuthentication('dashboard');
    }
}

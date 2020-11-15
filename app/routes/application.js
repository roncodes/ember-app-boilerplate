import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    /**
     * Inject the theme service
     *
     * @var {Service}
     */
    @service theme;

    /**
     * On application route activation
     *
     * @void
     */
    activate() {
        this.theme.initialize();
    }
}

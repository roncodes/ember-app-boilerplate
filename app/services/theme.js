import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { dasherize } from '@ember/string';
import { get } from '@ember/object';
import { isArray } from '@ember/array';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import config from '@boilerplate/dashboard/config/environment';

export default class ThemeService extends Service {
    /**
     * Inject the headData service
     *
     * @var {Service}
     */
    @service headData;

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
     * Parse the module prefix into an app name to append to body class
     *
     * @var {String}
     */
    get appName() {
        const modulePrefix = get(config, 'modulePrefix').replace(/[^\w\s]/gi, ' ').trim();
        return dasherize(modulePrefix);
    }

    /**
     * The current active theme, uses the system preffered mode to set default
     * refers to the theme in headData service
     *
     * @var {String}
     */
    get activeTheme() {
        const userSetTheme = this.currentUser.options.get(`${this.currentUser.id}_theme`);
        if (userSetTheme) {
            return userSetTheme;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Set the activeTheme in the headData service
     */
    set activeTheme(theme) {
        this.set('headData.activeTheme', theme);
    }

    /**
     * Current theme, defaults to light, active theme represents the theme set by user OS
     *
     * @var {String}
     */
    currentTheme = 'light';

    /**
     * Current section title, which defaults to "Dashboard"
     *
     * @var {String}
     */
    sectionTitle = 'Dashboard';

    /**
     * The current route name as style class
     *
     * @var {String}
     */
    get routeClassName() {
        return dasherize(typeof this.router.currentRouteName === 'string' ? this.router.currentRouteName.replace(/\./g, ' ') : this.appName);
    }

    /**
     * The current route
     *
     * @var Route
     */
    get currentRoute() {
        return getOwner(this).lookup(`route:${this.router.currentRouteName}`);
    }

    /**
     * The current route
     *
     * @var Route
     */
    get currentRouteBodyClasses() {
        if (this.currentRoute && this.currentRoute.bodyClassNames && isArray(this.currentRoute.bodyClassNames)) {
            return this.currentRoute.bodyClassNames;
        }

        return [];
    }

    /**
     * The current route
     *
     * @var Route
     */
    get currentRouteSectionTitle() {
        if (this.currentRoute && this.currentRoute.sectionTitle && typeof this.currentRoute.sectionTitle === 'string') {
            return this.currentRoute.sectionTitle;
        }

        return null;
    }

    /**
     * Hook for handling when route does change
     *
     * @void
     */
    routeDidChange() {
        this.setRoutebodyClassNames(this.currentRouteBodyClasses);
        this.setSectionTitle();
    }

    /**
     * Hook for handling when route does change
     *
     * @void
     */
    routeWillChange() {
        this.removeRoutebodyClassNames(this.currentRouteBodyClasses);
    }

    /**
     * Initialize theme configurations
     *
     * @void
     */
    initialize(options = {}) {
        this.setTheme(this.activeTheme);
        this.resetScroll();
        this.setRoutebodyClassNames(options.bodyClassNames && isArray(options.bodyClassNames) ? options.bodyClassNames : []);
        // on every subsequent transition set the body class
        this.router.on('routeDidChange', this.routeDidChange.bind(this));
        // remove route class as exiting
        this.router.on('routeWillChange', this.routeWillChange.bind(this));
        // after render only
        // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
        scheduleOnce('afterRender', this, () => {
            this.initLayout();
        });
    }

    /**
     * Resets window scroll
     *
     * @void
     */
    resetScroll() {
        window.scrollTo(0, 0);
    }

    /**
     * Appends the current route name to body
     *
     * @void
     */
    setRoutebodyClassNames(classes = []) {
        document.body.classList.add(...[this.routeClassName, this.currentTheme, ...classes]);
    }

    /**
     * Remove thes current route name from body
     *
     * @void
     */
    removeRoutebodyClassNames(classes = []) {
        document.body.classList.remove(...[this.routeClassName, this.currentTheme, ...classes]);
    }

    /**
     * Toggle the activeTheme between light and dark, and returns the toggled them
     *
     * @return string
     */
    toggleTheme() {
        const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(nextTheme);
        return nextTheme;
    }

    /**
     * Set the theme to the headData
     *
     * @void
     */
    setTheme(theme = 'light') {
        document.body.classList.remove(this.currentTheme);
        document.body.classList.add(theme);
        this.setProperties({ activeTheme: theme, currentTheme: theme });
    }

    /**
     * Helper function to set the "sectionTitle"
     *
     * @void
     */
    setSectionTitle(sectionTitle = null) {
        if (sectionTitle === null) {
            sectionTitle = this.currentRouteSectionTitle;
        }
        // if no sectionTitle then keep the current one
        if (!sectionTitle) return;
        this.setProperties({ sectionTitle });
    }

    /**
     * Initialize the overall layout
     *
     * @void
     */
    initLayout() {
        const body = document.querySelector('body');

        if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            body.classList.add('enlarged');
        } else if (body.dataset['keep-enlarged'] !== true) {
            body.classList.remove('enlarged');
        }
    }
}

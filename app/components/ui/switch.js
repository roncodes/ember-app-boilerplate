import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';

export default class UiSwitchComponent extends Component {
    /**
     * The active color of the toggle
     *
     * @var {String}
     */
    activeColor = 'green';

    /**
     * The active color class
     *
     * @var {String}
     */
    @computed('activeColor') get activeColorClass() {
        return `bg-${this.activeColor}-400`;
    }

    /**
     * If the toggle is on or off
     *
     * @var {Boolean}
     */
    @tracked isToggled = false;

    /**
     * Event for on/of toggle
     *
     * @void
     */
    @action
    toggle(isToggled) {
        this.isToggled = isToggled === false ? true : false;
        if (typeof this.args.onToggle === 'function') {
            this.args.onToggle(this.isToggled);
        }
    }
}

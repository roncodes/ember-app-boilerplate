import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class UiCheckboxComponent extends Component {
    /**
     * Generates a unique ID for this checkbox instance
     *
     * @var {String}
     */
    get id() {
        return guidFor(this);
    }

    /**
     * Whether this checkbox is checked or not
     *
     * @param {Boolean} checked
     */
    @tracked checked = false;

    /**
     * The color class to use for the checkbox
     *
     * @param {String} colorClass
     */
    @tracked colorClass = 'text-blue-500';

    /**
     * Toggles the checkbox and sends up an action
     *
     * @void
     */
    @action
    toggle(event) {
        this.checked = event.target.checked;
        // trigger toggle action if any
        if (this.args.onToggle && typeof this.args.onToggle === 'function') {
            this.args.onToggle(this.checked, event);
        }
    }
}

import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { not, equal } from '@ember/object/computed';

export default class UiButtonComponent extends Component {
    /**
     * Determines if the button should be disabled
     *
     * @var {Boolean}
     */
    @computed('args.{isLoading,disabled}')
    get isDisabled() {
        return this.args.isLoading || this.args.disabled;
    }

    /**
     * Determines if the button should be disabled
     *
     * @var {Boolean}
     */
    @equal('args.type', 'secondary') isSecondary;

    /**
     * Determines if the button should be disabled
     *
     * @var {Boolean}
     */
    @not('isSecondary') isNotSecondary;

    /**
     * Determines if the button is in a loading state
     *
     * @var {Boolean}
     */
    @not('args.isLoading') isNotLoading;

    /**
     * Determines if icon be displayed
     *
     * @var {Boolean}
     */
    @computed('args.{icon,isLoading}', 'isNotLoading')
    get displayIcon() {
        return this.args.icon && this.isNotLoading;
    }
}

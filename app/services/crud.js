import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import getModelName from '@boilerplate/dashboard/utils/get-model-name';
import humanize from '@boilerplate/dashboard/utils/humanize';

export default class CrudService extends Service {
    /**
     * Inject the `fetch` service
     *
     * @var {Service}
     */
    @service fetch;

    /**
     * Inject the `modalsManager` service
     *
     * @var {Service}
     */
    @service modalsManager;

    /**
     * Inject the `notifications` service
     *
     * @var {Service}
     */
    @service notifications;

    /**
     * Inject the `store` service
     *
     * @var {Service}
     */
    @service store;

    /**
     * Closes a current modal then opens another modal action
     *
     * @void
     */
    @action
    next() {
        const args = [...arguments];
        const nextAction = args[0];

        // shift off the action
        args.shift();

        this.modalsManager.done().then(() => {
            if (typeof this[nextAction] === 'function') {
                this[nextAction](...args);
            }
        });
    }

    /**
     * Generic deletion modal with options
     *
     * @void
     */
    @action
    delete(model, options = {}) {
        this.modalsManager.confirm({
            title: `Are you sure to delete this ${humanize(getModelName(model)).toLowerCase()}?`,
            confirm: (modal) => {
                modal.startLoading();
                model.destroyRecord().then((model) => {
                    this.notifications.success(`'${model.name}' has been deleted.`);
                    modal.done();

                    if (typeof options.onConfirm === 'function') {
                        options.onConfirm(...arguments);
                    }
                });
            },
            decline: (modal) => {
                modal.done().then(() => {
                    if (typeof options.onDecline === 'function') {
                        return options.onDecline(...arguments);
                    }
                });
            },
            ...options,
        });
    }
}

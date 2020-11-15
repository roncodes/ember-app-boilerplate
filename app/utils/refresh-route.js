import Controller from '@ember/controller';

export default function refreshRoute(controller) {
    if (controller instanceof Controller) {
        return controller.target.targetState.router.refresh();
    }
    return new Error(`Invalid controller provided.`);
}

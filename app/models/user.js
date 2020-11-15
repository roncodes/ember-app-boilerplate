import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import moment from 'moment';

export default class User extends Model {
    @attr('string') uuid;
    @attr('string') name;
    @attr('string') email;
    @attr('string') phone;
    @attr('string') password;
    @attr('string') type;
    @attr('string') status;
    @attr('date') email_verified_at;
    @attr('date') deleted_at;
    @attr('date') created_at;
    @attr('date') updated_at;

    @computed('last_login')
    get lastLogin() {
        return moment(this.last_login).format('LLL');
    }

    @computed('created_at')
    get memberSince() {
        return moment(this.created_at).format('ll');
    }

    @computed('updated_at')
    get updatedAgo() {
        return moment(this.updated_at).fromNow();
    }

    @computed('updated_at')
    get updatedAt() {
        return moment(this.updated_at).format('DD MMM YYYY');
    }

    @computed('created_at')
    get createdAgo() {
        return moment(this.created_at).fromNow();
    }

    @computed('created_at')
    get createdAt() {
        return moment(this.created_at).format('DD MMM YYYY');
    }
}

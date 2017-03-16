import _ from 'lodash';
import moment from 'moment';
import config from '../../../config';

/*
vk post item model
 */
export default class NewsItem {
    constructor (item, groups, profiles) {
        this.id = _.get(item, 'id');
        this.ownerId = _.get(item, 'owner_id');
        this.date = _.get(item, 'date');
        this.publishedBy = this.getPublishedBy(item, groups, profiles);
        this.text = this.getText(item);
        this.likesCount = _.get(item, 'likes.count');
        this.photos = this.getPhotos(item);
    }

    /*
    get formatted item date
    @param {string} format momentjs date format string
     */
    getItemDate (format) {
        return moment.unix(this.date).format(format);
    }

    /*
    get short post text
     */
    getShortItemText () {
        if (this.text.length <= config.shortTextLength) {
            return this.text
        }
        return _.join(_.slice(this.text, 0, config.shortTextLength), '') +
            (this.text.length > config.shortTextLength ? '...' : '');
    }

    /*
    parse vk api post item to get post text
    @param {Object} api post item
     */
    getText (item) {
        let text = _.get(item, 'text');
        if (text) {
            return text;
        } else {
            let attachments = _.get(item, 'attachments');
            let isMultimedia = _.find(attachments, (attachment) => {
                let type = _.get(attachment, 'type');
                return  type === 'video' || 'audio';
            });
            return isMultimedia ? 'mmedia' : '';
        }
    }

    /*
    parse vk api post item to get publisher name
     @param {Object} api post item
     @groups {Array} vk groups objects array
     @profiler {Array} vk profiles array
     */
    getPublishedBy (item, groups, profiles) {
        let fromId = _.get(item, 'from_id');
        if (fromId) {
            if (fromId < 0) {
                let group = _.find(groups, { id: Math.abs(fromId) });
                if (group) {
                    return _.get(group, 'name');
                }
            } else {
                let profile = _.find(profiles, { id: fromId });
                if (profile) {
                    return `${_.get(profile, 'first_name')} ${_.get(profile, 'last_name')}`;
                }
            }
        }
        return '';
    }

    /*
     parse vk api post item to get photos
     @param {Object} api post item
     */
    getPhotos (item) {
        let attachments = _.get(item, 'attachments');
        attachments = _.filter(attachments, (attachment) => {
            return _.get(attachment, 'photo');
        });
        return _.map (attachments, (attachment) => {
            let photo = _.get(attachment, 'photo');
            let smallUrl = null;
            let url = null;
            _.each(config.imagesWidths, (width) => {
                let currentPhoto = _.get(photo, `photo_${width}`);
                if (!smallUrl) {
                    smallUrl = currentPhoto;
                }
                url = currentPhoto;
            });
            return {
                smallUrl,
                url
            }
        });
    }
}

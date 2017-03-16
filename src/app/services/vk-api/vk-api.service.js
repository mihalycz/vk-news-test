import _ from 'lodash';
import config from '../../../config';
import NewsItem from '../../models/news-item/news-item.model';

/**
 * Vk-api Service
 */
export default class VkApiService {
    constructor($q) {
        this.q = $q;
        this.vk = window.VK;
        this.initialized = false;
        if (this.vk) {
            this.vk.init({ apiId: config.appId });
            this.initialized = true;
        }
    }

    /*
    get vk user login status
     */
    getLoginStatus () {
        let deferred = this.q.defer();
        if (this.initialized) {
            this.vk.Auth.getLoginStatus(this.onAuthComplete.bind(this, deferred));
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    /*
    init vk authorization widget
    @param {string} containerId  widget container id
     */
    initAuthWidget (containerId) {
        let deferred = this.q.defer();
        if (this.initialized) {
            this.vk.Widgets.Auth(containerId, { onAuth: this.onAuthComplete.bind(this, deferred)});
        }
        return deferred.promise;
    }

    /*
    get vk post by owner and post ids
    @param {number} id post id
    @param {number} owner id
     */
    getPostById (id, ownerId) {
        let deferred = this.q.defer();
        let searchParams = {
            v: config.apiVersion,
            posts: `${ownerId}_${id}`,
            extended: 1
        };
        if (this.initialized) {
            this.vk.Api.call('wall.getById', searchParams, this.onGetPostSuccess.bind(this, deferred));
        }
        return deferred.promise;
    }

    /*
    get vk posts by query string
    @param {string} query request query
    @param {string} next posts page id
     */
    getNews (query, startFrom) {
        let deferred = this.q.defer();
        let searchParams = {
            v: config.apiVersion,
            q: query,
            start_from: startFrom,
            extended: 1,
            count: startFrom ? config.newsPageCount : config.initialNewsPageCount
        };
        if (this.initialized) {
            this.vk.Api.call('newsfeed.search', searchParams, this.onGetNewsSuccess.bind(this, deferred));
        }
        return deferred.promise;
    }

    /*
    on get wall post success
     @param {Object} deferred promise to resolve track operation
     @param {Object} operation response
     */
    onGetPostSuccess (deferred, response) {
        let items = _.get(response, 'response.items', []);
        let groups = _.get(response, 'response.groups', []);
        let profiles = _.get(response, 'response.profiles', []);
        deferred.resolve(new NewsItem(_.head(items), groups, profiles));
    }

    /*
     on search news success
     @param {Object} deferred promise to resolve track operation
     @param {Object} operation response
     */
    onGetNewsSuccess (deferred, response) {
       let items = _.get(response, 'response.items', []);
       let groups = _.get(response, 'response.groups', []);
       let profiles = _.get(response, 'response.profiles', []);
       let nextFrom = _.get(response, 'response.next_from');
       items = _.map(items, (item) => new NewsItem(item, groups, profiles));
       deferred.resolve({
           items: items,
           nextFrom: nextFrom
       });
    }

    /*
     on user authorization complete
     @param {Object} deferred promise to resolve track operation
     @param {Object} operation response
     */
    onAuthComplete (deferred, response) {
        deferred.resolve(_.get(response, 'session'));
    }
}

VkApiService.$inject = ['$q'];

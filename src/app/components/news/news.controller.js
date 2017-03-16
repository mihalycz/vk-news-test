import BaseController from '../base/base.controller';
import _ from 'lodash';

/*
Post Detail Page Controller
 */
export default class NewsController extends BaseController{
    constructor(...parentDependencies) {
        super(...parentDependencies);
        this.id = null;
        this.ownerId = null;
        this.scope.item = null;
        this.scope.isLoading = true;
        this.scope.onBackClick = this.onBackClick.bind(this);
        this.queryString.decodeQuery(window.location.search).then(this.onQueryParse.bind(this));
    }

    /*
    on page query parse comolete
    @param {Object} page search parameters
     */
    onQueryParse (params) {
        super.onQueryParse(params);
        params = _.split(_.get(params, 'query'), ',');
        this.id = _.get(params, '[0]');
        this.ownerId =  _.get(params, '[1]');
        this.getPost();
    }

    /*
    on get vk post data success
    @param {NewsItem} post data item
     */
    onGetPostSuccess (response) {
        if (response) {
            this.scope.item = response;
        }
        this.scope.isLoading = false;
    }

    /*
    get vk post data item
     */
    getPost () {
        if (this.id && this.ownerId) {
            this.vkApi.getPostById (this.id, this.ownerId).then(this.onGetPostSuccess.bind(this));
        }
    }
}

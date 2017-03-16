import _ from 'lodash';
import BaseController from '../base/base.controller';

/*
Result page controller
 */
export default class ResultController extends BaseController{
    constructor(...parentDependencies) {
        super(...parentDependencies);
        this.scope.searchValue = '';
        this.scope.items = [];
        this.scope.onItemClick = this.onItemClick.bind(this);
        this.scope.onBackClick = this.onBackClick.bind(this);
        this.scope.$on('lazyLoading', this.getNews.bind(this));
        this.nextFrom = null;
        this.queryString.decodeQuery(window.location.search).then(this.onQueryParse.bind(this));
    }

    /*
    on result item click handler
    @param {number} id  vk post id
    @param {number} ownerId vk post wall owner id
     */
    onItemClick(id, ownerId) {
        if (id && ownerId) {
            this.queryString.encodeQuery(id, ownerId).then((encoded) => {
                window.location = `/news.html?q=${encoded}`;
            });
        }
    }

    /*
     on page query parse comolete
     @param {Object} page search parameters
     */
    onQueryParse (params) {
        super.onQueryParse(params);
        this.scope.searchValue = _.get(params, 'query');
        this.getNews();
    }

    /*
    on get vk posts data success
    @param {Object} response object contains items and last page item id
     */
    onGetNewsSuccess (response) {
        this.nextFrom = _.get(response, 'nextFrom');
        this.scope.items = _.concat(this.scope.items, _.get(response, 'items'));
        this.scope.$broadcast('lazyLoadingFinished');
        if(!this.nextFrom) {
            this.scope.$broadcast('allLoaded');
        }
    }

    /*
    get vk posts by query string
     */
    getNews () {
        if (this.scope.searchValue) {
            this.vkApi.getNews(this.scope.searchValue, this.nextFrom).then(this.onGetNewsSuccess.bind(this));
        }
    }
}

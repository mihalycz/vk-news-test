import _ from 'lodash';

/*
Base Controller
 */
export default class BaseController {
    constructor($scope, vkApi, queryString, requestTrack) {
        this.scope = $scope;
        this.vkApi = vkApi;
        this.queryString = queryString;
        this.requestTrack = requestTrack;
        this.prevPage = null;
    }

    /*
    on back button click handler
     */
    onBackClick () {
        if (this.prevPage) {
            window.location = this.prevPage;
        }
    }

    /*
    on page query parse complete handler
     @param {Object} query parameters
     */
    onQueryParse (params) {
        this.prevPage = _.get(params, 'prevPage');
    }
}

BaseController.$inject = ['$scope', 'vkApi', 'queryString', 'requestTrack'];

import _ from 'lodash';

/**
 * Request Track Service
 */
export default class RequestTrackService {
    constructor($q, $http) {
        this.q = $q;
        this.http = $http;
    }

    /*
    track vk api request
    @param {string} query string
     */
    track (query) {
        let deferred = this.q.defer();
        let onTrackComplete = this.onTrackComplete.bind(this, deferred);
        this.http({
            method: 'POST',
            url: 'http://ft.dev.hismith.ru/stat/create/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `query=${query}`
        }).then(onTrackComplete, onTrackComplete);
        return deferred.promise;
    }

    /*
    on track success
     @param {Object} deferred promise to resolve track operation
     @param {Object} operation response
     */
    onTrackComplete (deferred, response) {
        let isOk = _.get(response, 'data.success[0]');
        deferred.resolve(isOk);
    }
}

RequestTrackService.$inject = ['$q', '$http'];

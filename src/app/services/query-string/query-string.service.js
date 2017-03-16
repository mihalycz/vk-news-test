import _ from 'lodash';

/**
 * Query String Service
 */
export default class QueryStringService {
    constructor($q) {
        this.q = $q;
    }

    /*
    encode query parameters
    @param {Array} query query parameters
     */
    encodeQuery (...query) {
        return encodeURIComponent(`${window.location.pathname}${window.location.search}|${query}`);
    }

    /*
     parse and decode page search parameter
     */
    decodeQuery () {
        let deferred = this.q.defer();
        let params =_.split(decodeURIComponent(location.search.replace('?q=', '')), '|');
        let query = params.pop();
        deferred.resolve({
            prevPage: _.join(params, ''),
            query: query
        });

        return deferred.promise;
    }
}

QueryStringService.$inject = ['$q'];


import _ from 'lodash';
import base64 from 'js-base64';
import queryParser from 'query-string';

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
        let deferred = this.q.defer();
        let encoded = base64.Base64.encode(`${window.location.pathname}${window.location.search}|${query}`);
        deferred.resolve(encoded);
        return deferred.promise;
    }

    /*
     parse and decode page search parameter
     */
    decodeQuery () {
        let deferred = this.q.defer();
        let search = queryParser.parse(location.search);
        let decoded = base64.Base64.decode(_.get(search, 'q'));
        let params = _.split(decoded, '|');
        deferred.resolve({
            prevPage: _.get(params, '[0]'),
            query: _.get(params, '[1]')
        });

        return deferred.promise;
    }
}

QueryStringService.$inject = ['$q'];


import BaseController from '../base/base.controller';

/*
Search form controller
 */
export default class SearchController extends BaseController{
    constructor(...parentDependencies) {
        super(...parentDependencies);
        this.scope.isSearching = false;
        this.scope.searchValue = '';
        this.scope.onSearchClick = this.onSearchClick.bind(this);
    }

    /*
    on search button click handler, runs search
     */
    onSearchClick () {
        let query = this.scope.searchValue;
        if (query && !this.scope.isSearching) {
            this.scope.isSearching = true;
            this.requestTrack.track(query).then((isOk) => {
                if (!isOk) {
                    console.log('tracking has failed');
                }
                this.queryString.encodeQuery(query).then((encoded) => {
                    window.location = `/results.html?q=${encoded}`;
                });
            });
        }
    }
}


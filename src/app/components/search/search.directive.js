import './search.view.less';

export default function search() {
    return {
        restrict: 'E',
        template: require('./search.view.html'),
        controller: 'SearchController',
        controllerAs: 'context'
    }
}
import './news.view.less';

export default function news() {
    return {
        restrict: 'E',
        template: require('./news.view.html'),
        controller: 'NewsController',
        controllerAs: 'context'
    }
}


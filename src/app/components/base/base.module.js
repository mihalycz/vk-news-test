import 'angular-lazyload';
import carousel from 'angular-ui-bootstrap/src/carousel/index-nocss';
import services from '../../services/base/base.module';

import SearchController from '../search/search.controller';
import searchDirective from '../search/search.directive';

import ResultsController from '../results/results.controller';
import resultsDirective from '../results/results.directive';

import NewsController from '../news/news.controller';
import newsDirective from '../news/news.directive';

import VkAuthController from '../vk-auth/vk-auth.controller';
import vkAuthDirective from '../vk-auth/vk-auth.directive';

import imagePopupDirective from '../image-popup/image-popup.directive';

export default angular.module('components', [services, 'lazyload', carousel])
    .controller('SearchController', SearchController)
    .controller('NewsController', NewsController)
    .controller('ResultsController', ResultsController)
    .controller('VkAuthController', VkAuthController)
    .directive('imagePopup', imagePopupDirective)
    .directive('news', newsDirective)
    .directive('search', searchDirective)
    .directive('results', resultsDirective)
    .directive('vkAuth', vkAuthDirective)
    .name;




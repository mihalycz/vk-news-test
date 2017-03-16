import VkApiService from '../vk-api/vk-api.service';
import QueryStringService from '../query-string/query-string.service';
import RequestTrackService from '../request-track/request-track.service';

export default angular.module('services', [])
    .service('vkApi', VkApiService)
    .service('queryString', QueryStringService)
    .service('requestTrack', RequestTrackService)
    .name;
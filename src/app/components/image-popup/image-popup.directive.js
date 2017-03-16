import $ from 'jquery';
import 'magnific-popup';

export default function imagePopup() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $(elem).click(function() {
                $.magnificPopup.open({
                    items: {
                        src: attrs.imagePopup
                    },
                    type: 'image'
                });
            });
        }
    }
}

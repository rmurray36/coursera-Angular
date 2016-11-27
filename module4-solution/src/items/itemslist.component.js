(function () {
    'use strict';

    angular.module('MenuApp')

    .component("menuItems",
        {
            templateUrl: 'src/items/itemslist_template.html',
            bindings: {
              menuitems: '<'
            }
        })

    // .directive("menuItems", MenuItems);
    // function MenuItems() {
    //     var ddo = {
    //       templateUrl: '/src/items/itemslist_template.html',
    //       scope: {
    //         menuitems: '<'
    //       }
    //     };
    //     return ddo;
    // }


})();

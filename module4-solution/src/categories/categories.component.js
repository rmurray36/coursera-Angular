(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categoriesList',
        {
            templateUrl: '/src/categories/categorieslist_template.html',
            bindings: {
                categories: '<',
                categoriessn: '<'
            }
        })

        //---------------------------------------------------------------------------//
        // I found that the categoriesList_template.html must use $ctrl where I was  //
        // using "this" when I used the DIRECTIVE and "this" didn't work with the    //
        // controller.                                                               //
        //---------------------------------------------------------------------------//
        // .directive('categoriesList', Categories)
        // function Categories() {
        //     var ddo = {
        //       templateUrl: '/src/categories/categorieslist_template.html',
        //       scope: {
        //         categories: '<',
        //         categoriessn: '<'
        //       }
        //     };
        //     return ddo;
        // }
})();

(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.inject = ['$http','ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function() {
            var promise = $http({method:"GET", url:ApiBasePath+"/categories.json"});
            return promise;
        }

        service.getItemsForCategory = function (category) {
            var promise = $http({method:"GET", url:ApiBasePath+"/menu_items.json?category="+category});
            return promise;
        }
    }

})();

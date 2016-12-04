(function () {
"use strict";

    angular.module('common')
    .service('MenuService', MenuService);


    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
      var service = this;
      service.favoriteMenuItemDescription = "";
      service.favoriteMenuItemError = "";
      service.personInfo = [];

      service.getCategories = function () {
          return $http.get(ApiPath + '/categories.json').then(function (response) {
            return response.data;
        });
      };


      service.getMenuItems = function (category) {
        var config = {};
        if (category) {
          config.params = {'category': category};
        }

        return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
          return response.data;
        });
      };

      service.getMenuItem = function (shortName) {
          console.log("SHORT NAME=", shortName);
          if (shortName == null) {
              return;
          }
          var url = ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json'
          var promise =  $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json').then(
              function (response) {
                  service.favoriteMenuItemDescription = response.data;
                  return response.data;
              }
          ).catch(
              function (error) {
                  service.favoriteMenuItemError = shortName + " -No such menu number exists."
                  return error;
              }
          );

          return promise;
      }

      service.setPersonInfo = function (personInfo) {
          service.personInfo = personInfo;
          service.firstName = personInfo[0];
          service.lastName = personInfo[1];
          service.email = personInfo[2];
          service.phone = personInfo[3];
          service.shortName = personInfo[4]; // Menu item short name
      }

      service.getPersonInfo = function () {
          return service.personInfo;
      }

      service.getShortName = function () {
          return service.shortName;
      }
}



})();

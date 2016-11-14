(function() {
    'use strict';

    angular.module('ChineseMenuServer', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuItemsService', MenuItemsService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems);

  function FoundItems() {
      var ddo = {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
          foundItems: '<foundItems',
          onRemove: '&'
        }
      };
      return ddo;
  }

  NarrowItDownController.$inject = ['MenuItemsService'];
  function NarrowItDownController(MenuItemsService) {
      var CMC = this;
      CMC.menuListItems = [];
      CMC.found = [];
      CMC.itemFilter = "";
      CMC.itemsRetrieved = false;

      //--------------------------------//
      // HTML calls this 'narrow'       //
      //--------------------------------//
      this.narrow = function () {
          CMC.found = [];
          CMC.found = MenuItemsService.getMatchedMenuItems(CMC.itemFilter);
          CMC.found.then(this.promiseResponse).catch(this.promiseError);
      };

      this.promiseResponse = function (response) {
          console.log("PROMISE RESPONSE:", response.data);
          console.log("PROMISE RESPONSE LENGTH: ", response.data.length);
          CMC.found = response.data;
          CMC.itemsRetrieved = true;
      }
      this.promiseError = function () {
          console.log("ERROR");
      }

      this.onRemove = function (index) {
          CMC.found.splice(index,1);
      }
  }

  //====================================================//
  // MenuCategoriesService                              //
  //====================================================//
  MenuItemsService.$inject = ['$http', 'ApiBasePath'];
  function MenuItemsService($http, ApiBasePath, menuController) {
      var service = this;

      //----------------------------------------------------//
      // Retrieve all the menu items and apply the filter  //
      //---------------------------------------------------//
      service.getMatchedMenuItems = function(filter) {
          service.filter = filter;
          var foundItems = [];

          //------------------------------------------------------------------//
          // Here we call $http which returns a promise. The promise is to    //
          // get the data asynchronously.  I then apply the filter and return //
          // the promise 'of the filtered data' to the caller.                //
          //------------------------------------------------------------------//
          var promise = $http({method:"GET", url:ApiBasePath+"/menu_items.json"});
          promise.then(service.applyFilter).catch(service.error);

          //------------------------------------------------------------------//
          // Now, I'm not returning foundItems here because I've separated    //
          // out the service.applyFilter from the promise.then above. You will//
          // see it below. I think this reads better.                         //
          //------------------------------------------------------------------//
          return promise;
      }

      //-------------------------------------------------//
      // APPLY filter                                    //
      //-------------------------------------------------//
      service.applyFilter = function(response) {
          var filteredItemList = [];
          var filter = service.filter;
          var items = response.data;

          //----------------------------------------------//
          // If there is no filter then return empty list //
          // in the response.                             //
          //----------------------------------------------//
          if (filter == "" ) {
              response.data = filteredItemList;
              return response;
          }

          // Create new filteredItemList after applying filter. //
          filter = filter.toLowerCase();
          for (var i=0; i<items.menu_items.length; i++) {
              var item = items.menu_items[i].name.toLowerCase();
              if (item.indexOf(filter) != -1) {
                   filteredItemList.push(items.menu_items[i]);
              }
          }

          // Response data now contains the filtered list.  //
          response.data = filteredItemList;
          return response.data;
      }

      service.error = function () {
          console.log("Error.");
      }

  };

}) ();

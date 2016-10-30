(function () {
  'use strict';
  const listThreshold = 4;

   angular.module("LunchChecker", [])
   .controller('LunchCheckerController', LunchCheckerController);

   LunchCheckerController.$inject = ['$scope'];

   function LunchCheckerController($scope) {
    $scope.items = "";

     $scope.checkList = function() {
         var numberOfItems = parseList($scope);

         if (numberOfItems < listThreshold)
         {
             if (numberOfItems == 0)
             {
                 $scope.message = "Please enter data first.";
             }
             else
             {
                 $scope.message = "Enjoy!";
             }
         }
         else
         {
           $scope.message = 'Too Much!'
         }
     }

   }

   function parseList(scope)
   {
     var results = scope.items;
     if (results==""){return 0};

     var menuItems = results.split(",");
     var index,count = 0;

     for (index=0; index<menuItems.length;++index)
     {
         if (menuItems[index] != "") count++;
     }

     return count;
   }

})();

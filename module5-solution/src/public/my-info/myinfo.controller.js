(function () {
    'use strict';

    angular.module('restaurant')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService', 'ApiPath'];
    function MyInfoController (MenuService, ApiPath) {
        var $ctrl = this;
        $ctrl.basePath = ApiPath;

        if (MenuService.personInfo.length==0){
            console.log("You have not registered.");
        }else{
            $ctrl.personInfo = MenuService.getPersonInfo();
            $ctrl.firstName = $ctrl.personInfo[0];
            $ctrl.lastName = $ctrl.personInfo[1];
            $ctrl.email = $ctrl.personInfo[2];
            $ctrl.phone = $ctrl.personInfo[3];
            $ctrl.shortName = $ctrl.personInfo[4];
        }

        $ctrl.isRegistered = function ()
        {
            if (MenuService.personInfo.length==0) {
                return false;
            }
            else{
                return true;
            }
        }
    }


})();

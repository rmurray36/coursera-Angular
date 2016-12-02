(function () {
    'use strict';

    angular.module('restaurant')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];
    function SignupController (MenuService) {
        var signupController = this;
        signupController.valid = false;
        signupController.submitDisabled = false;

        signupController.go = function () {
            // Ask the MenuService to retrieve the info on the menu item selected.  //
            var promise = MenuService.getMenuItem(signupController.menuNumber);
            promise.then(signupController.getMenuItemResponse).catch(signupController.getMenuItemError);
        }

        signupController.getMenuItemResponse = function (response) {
            MenuService.setPersonInfo([signupController.firstName,
                                       signupController.lastName,
                                       signupController.email,
                                       signupController.phone,
                                       response]);
            signupController.valid = true;
        }

        signupController.getMenuItemError = function () {
            console.log("ERROR");
        }

        signupController.checkMenuNumberValid  = function () {
            var promise = MenuService.getMenuItem(signupController.menuNumber);
            promise.then(signupController.checkMenuItemResponse).catch(signupController.checkMenuItemError);

            return promise;
        }

        signupController.checkMenuItemResponse = function (response) {
            try {
                if (response.data.status="500"){
                    signupController.menuItemValid = false;
                    signupController.submitDisabled = true;
                }
            }
            catch(err) {
                signupController.menuItemValid = true;
                signupController.submitDisabled = false;
            }
        }

        signupController.checkMenuItemError = function () {
            signupController.menuItemValid = false;
        }

        signupController.isMenuNumberValid = function() {
            return signupController.menuItemValid;
        }


    }


})()

(function() {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);


    RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'src/categories/categories.html',
            controller: 'CategoriesController as categoriesCtlr',
            resolve: {
                categoryItems: [
                    'MenuDataService',
                    function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }
                ]
            }
        })

        .state('items', {
            url: '/items/{itemId}',
            templateUrl: 'src/items/items.html',
            controller: 'ItemsController as itemsCtlr',
            resolve: {
                items: [
                    '$stateParams',
                    'MenuDataService',
                    function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.itemId);
                    }
                ]
            }

        });

    }

}) ();

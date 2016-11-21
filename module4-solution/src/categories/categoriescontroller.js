(function () {
    'use strict';

    angular.module('MenuApp')
    .directive('categories', Categories)
    .controller('CategoriesController', CategoriesController);

    function Categories() {
        var ddo = {
          restrict: 'E',
          templateUrl: 'src/categories/categorieslist.html',
          scope: {
            categories: '<',
            categoriessn: '<'
          }
        };
        return ddo;
    }

    CategoriesController.$inject = ['categoryItems'];
    function CategoriesController (categoryItems) {
        var catController = this;
        this.categories = categoryItems;
        var categories = [];
        var categoriesSN = [];
        this.selectedCategory = "";

        for (var i=0; i<catController.categories.data.length; i++){
            var category = this.categories.data[i];
            categories.push(category.name);
            categoriesSN.push(category.short_name);
        }

        this.categories = categories;
        this.categoriesSN = categoriesSN;

        this.setCategories = function (selection) {
            this.selectedCategory = selection;
        }
    }

})();

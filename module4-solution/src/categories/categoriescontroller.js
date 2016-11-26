(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);

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

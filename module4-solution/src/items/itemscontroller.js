(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];
    function ItemsController (items) {
        var itemsController = this;
        this.items = items;
        var items = [];

        for (var i=0; i<itemsController.items.data.menu_items.length; i++){
            var item = this.items.data.menu_items[i];
            items.push(item.name);
        }

        this.items = items;
    }

}) ();

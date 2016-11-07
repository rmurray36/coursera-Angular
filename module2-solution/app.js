(function() {
    'use strict';

    angular.module('CheckOffShoppingList', [])
    .controller('BuyListController', BuyListController)
    .controller('BoughtListController', BoughtListController)
    .service('ListService', ListService);

    //----------------------------------//
    // BUY list controller              //
    //----------------------------------//
    BuyListController.$inject = ['ListService'];
    function BuyListController(ListService) {

        // Initialize list of items to purchase.  //
        this.buyList = ListService.getBuyListItems();

        //------------------------------------------------------------//
        // BUY - AKA - REMOVE from list.                              //
        //------------------------------------------------------------//
        this.buyItem = function(index) {
            // Remove the item from the buy list.    //
            ListService.addItemToBoughtList(this.buyList[index].name, this.buyList[index].quantity);
            this.buyList = ListService.removeItemFromBuyList(index);
        }

        //------------------------------------------------------------//
        // return the SIZE of the list.                               //
        //------------------------------------------------------------//
        this.getSize = function() {
            return ListService.getSizeOfBuyList();
        }
    }

    //----------------------------------//
    // BOUGHT list controller           //
    //----------------------------------//
    BoughtListController.$inject = ['ListService'];
    function BoughtListController(ListService) {

        this.boughtList = ListService.getBoughtListItems();

        this.returnItem = function(index) {
            this.buyList = ListService.addItemToBuyList(this.boughtList[index].name, this.boughtList[index].quantity);
            this.boughtList = ListService.removeItemFromBoughtList(index);
        }

        this.getSize = function() {
            return ListService.getSizeOfBoughtList();
        }
    }

    //----------------------------------//
    // LIST service                     //
    //----------------------------------//
    function ListService() {
        this.boughtListItems = [];
        // // BUY list   //
        this.buyListItems = [
            {
                name: "Bananas",
                quantity: "5"
            },
            {
                name: "Oatmeal",
                quantity: "1"
            },
            {
                name: "Honey",
                quantity: "1"
            },
            {
                name: "Soy Milk",
                quantity: "2"
            },
            {
                name: "Lettuce",
                quantity: "1"
            },
        ];

        this.addItemToBuyList = function (itemName, quantity) {
            var item = {name:itemName, quantity:quantity};
            this.buyListItems.push(item);
            return this.buyListItems;
        };

        this.removeItemFromBuyList = function (index) {
            this.buyListItems.splice(index, 1);
            return this.buyListItems;
        };

        this.getSizeOfBuyList = function () {
            return this.buyListItems.length;
        }

        this.getBuyListItems = function () {
            return this.buyListItems;
        }

        this.addItemToBoughtList = function (itemName, quantity) {
            var item = {name:itemName, quantity:quantity};
            this.boughtListItems.push(item);
            return this.boughtListItems;
        };

        this.removeItemFromBoughtList = function (index) {
            this.boughtListItems.splice(index, 1);
            return this.boughtListItems;
        };

        this.getSizeOfBoughtList = function () {
            return this.boughtListItems.length;
        }

        this.getBoughtListItems = function () {
            return this.boughtListItems;
        }
    }



}) ();

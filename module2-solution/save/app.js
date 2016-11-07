(function() {
    'use strict';

    angular.module('CheckOffShoppingList', [])
    .controller('BuyListController', BuyListController)
    .service('BuyListService', BuyListService)
    .service('BoughtListService', BoughtListService);

    // // BUY list   //
    var toBuyList = [
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

    //----------------------------------//
    // controller                       //
    //----------------------------------//
    BuyListController.$inject = ['BuyListService','BoughtListService'];
    function BuyListController(BuyListService, BoughtListService) {
        this.buyList = toBuyList;
        this.boughtList = [];

        // Initialize list of items to purchase.  //
        BuyListService.setItems(this.buyList);

        //------------------------------------------------------------//
        // function to call to remove a purchased item from the list  //
        // and ADD to the purchased List.                             //
        //------------------------------------------------------------//
        this.buyItem = function(index) {
            // Add the item to the purchased list.    //
            this.boughtList = BoughtListService.addItem(this.buyList[index].name, this.buyList[index].quantity);
            // Remove the item from the buy list.    //
            this.buyList = BuyListService.removeItem(index);
        }

        this.returnItem = function(index) {
            this.buyList = BuyListService.addItem(this.boughtList[index].name, this.boughtList[index].quantity);
            this.boughtList = BoughtListService.removeItem(index);
            this.boughtList = BoughtListService.getItems();
        }

        this.getSizeOfBuyList = function() {
            return BuyListService.getSize();
        }

        this.getSizeOfBoughtList = function() {
            return BoughtListService.getSize();
        }
    }

    //----------------------------------//
    // TO BUY service                   //
    //----------------------------------//
    function BuyListService() {
        var listItems = [];

        this.setItems = function (items){
            this.listItems = items;
        }

        this.addItem = function (itemName, quantity) {
            var item = {name:itemName, quantity:quantity};
            this.listItems.push(item);
            return this.listItems;
        };

        this.removeItem = function (index) {
            this.listItems.splice(index, 1);
            return this.listItems;
        };

        this.getSize = function () {
            return this.listItems.length;
        }
    }

    //----------------------------------//
    // BOUGHT service                   //
    //----------------------------------//
    function BoughtListService() {
        this.listItems = [];

        this.addItem = function (itemName, quantity) {
            var item = {
                name:itemName,
                quantity:quantity
            };

            this.listItems.push(item);
            return this.listItems;
        };

        this.removeItem = function (index) {
            this.listItems.splice(index, 1);
            return this.listItems;
        };

        this.getItems = function() {
            return this.listItems;
        }

        this.getSize = function() {
            return this.listItems.length;
        }
    }

}) ();

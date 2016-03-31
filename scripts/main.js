var app = angular.module('register', []);
app.factory('cart', function() {
  var items = {
    Burger: {price: 10.99, count: 0},
    Cheeseburger: {price: 11.99, count: 0},
    Pizza: {price: 9.99, count: 0},
  };
  cart = {};
  cart.addItem = function(name, price) {
    if (name && price && !items[name]) {
      items[name] = {price: price, count: 0}
    }
  }
  cart.removeItem = function(name) {
    if (name && items[name]) {
      delete items[name];
    }
  }
  cart.resetCount = function(name) {
    if (name) {
      items[name].count = 0;
    } else {
      var itemKeys = Object.keys(items);
      itemKeys.forEach(function(itemKey) {
        items[itemKey].count = 0;
      });
    }
  }
  cart.increaseCount = function(name) {
    if (name && items[name]) {
      items[name].count++;
    }
  }
  cart.decreaseCount = function(name) {
    if (name && items[name] && items[name].count != 0) {
      items[name].count -= 2;
    }
  }
  cart.get = function(name) {
    if (name && items[name]) {
      return items[name];
    }
    if (!name) {
      return items;
    }
  }
  cart.receipt = function() {
    var returner = {};
    var total = 0;
    var tax = 0;
    var itemKeys = Object.keys(items);
    itemKeys.forEach(function(name) {
      var info = items[name];
      if (info.count == 1) {
        returner[name] = info.price;
        total += info.price;
      } else if (info.count != 0) {
        returner[name + ' x' + info.count] = info.price * info.count;
        total += info.price * info.count;
      }
    })
    if (total != 0) {
      returner['Tax'] = total * 0.0765
      returner['Total'] = total * 1.0765;
    }
    return returner;
  }
  cart.isEmpty = function() {
    return Object.keys(cart.receipt()).length;
  }
  return cart;
});
app.controller('cart', function($scope, cart) {
  $scope.cart = cart;
});

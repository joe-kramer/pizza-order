//FRONTEND
$(document).ready(function() {
  var order = new Order();

  $("form#address").submit(function(event) {
    event.preventDefault();
    var name = $("input#name").val();
    var street = $("input#street").val();
    var city = $("input#city").val();
    var state = $("input#state").val();
    var zip = $("input#zip").val();
    var address = new Address(name, street, city, state, zip);
    order.addAddress(address);
    $(".introPage").hide();
    $(".pizzaPage").show();
  });

  $("form#pizza").submit(function(event) {
    event.preventDefault();
    var pizza = new Pizza();
    var size = $("input:radio[name=size]:checked").val();
    pizza.size = size;
    $("input:checkbox[name=topping]:checked").each(function(){
      var topping = $(this).val();
      pizza.addTopping(topping);
    });
    order.addPizza(pizza);
    $(".pizzaPage").hide();
    $(".resultPage").show();
    $("span#orderName").text(order.address.name);
    $(".addressInfo").text(order.address.street + "\n" + order.address.city + "," + order.address.state + " " + order.address.zip);
    order.pizzas.forEach(function(pizza) {
      $("#listPizzas").append("<li class='pizzaItem'>" + pizza.size + "</li>");
    });
    $("#cost").text(order.finalCost());
  });

  $(".pizzaItem").click(function() {
    $(".pizzaDetails").show();
    $(".pizzaDetails h4").text(this.size)
    this.toppings.forEach(function(topping) {
      $("#toppingsDisplay").append(topping);
    });
  });

  $("#addPizza").click(function() {
    $(".resultPage").hide();
    $(".pizzaPage").show();
    $("input:checkbox[name=topping]:checked").prop('checked', false);
    $("input:radio[name=size]:checked").prop('checked', false);
    $("#listPizzas").text("");
  });
});

//BACKEND
function Order() {
  this.address;
  this.pizzas = [];
}

function Address(name, street, city, state, zip) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

function Pizza() {
  this.toppings = [];
  this.size;
}

Order.prototype.finalCost = function() {
  var cost = 0;
  this.pizzas.forEach(function(pizza) {
    if (pizza.size === "Large") {
      cost += 8;
    } else if (pizza.size === "Medium") {
      cost += 6;
    } else if (pizza.size === "Small") {
      cost += 5;
    }
    pizza.toppings.forEach(function(topping) {
      if (topping === "Pepperoni") {
        cost += 1.5;
      }
      if (topping === "Sausage") {
        cost += 1.5;
      }
      if (topping === "Ham") {
        cost += 1.5;
      }
      if (topping === "Bacon") {
        cost += 1.5;
      }
      if (topping === "Onions") {
        cost += 1.5;
      }
      if (topping === "Peppers") {
        cost += 1.5;
      }
      if (topping === "Mushrooms") {
        cost += 1.5;
      }
      if (topping === "Olives") {
        cost += 1.5;
      }
      if (topping === "Pineapple") {
        cost += 1.5;
      }
    });
  });
  return cost;
}

Order.prototype.addAddress = function(address) {
  this.address = address;
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

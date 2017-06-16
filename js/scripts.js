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

Order.prototype.addAddress = function(address) {
  this.address = address;
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

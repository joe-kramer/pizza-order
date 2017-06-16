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
    $(".addressInfo").text(order.address.street + "</br>" + order.address.city + "," + order.address.state + order.address.zip);
    order.pizzas.forEach(function(pizza) {
      $("#listPizzas").append("<li class='pizzaItem'>" + pizza.size + "</li>");
    });
  });

  $(".pizzaItem").click(function() {
    $(".pizzaDetails").show();
    $(".pizzaDetails h4").text(this.size)
    this.toppings.forEach(function(topping) {
      $("#toppingsDisplay").append(topping);
    });
  })
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

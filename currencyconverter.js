(function(){
'use strict';

  angular.module('MyCurrencyApp',[])
  .controller('CurrencyController',CurrencyController)
  .service('CurrencyService',CurrencyService);

  CurrencyController.$inject=['CurrencyService'];

  function CurrencyController(CurrencyService){
      var currency=this;
      currency.from="";
      currency.to="";
      currency.quantity="";
      currency.getCurrency = function(){
      var promise=CurrencyService.getCurrencyRates(currency.from,currency.to,currency.quantity);
      promise.then(function(response){
        currency.currencyData=response.data;
      });
        return currency.currencyData;
    };
}

CurrencyService.$inject=['$http'];

function CurrencyService($http){
  var service=this;
  service.getCurrencyRates= function(from,to,quantity){

    var response = $http({

        method:"GET",
        url:" https://forex.1forge.com/1.0.2/convert?from=" + from + "&to=" + to + "&quantity=" + quantity + "&api_key=8od06yHAdRgWEEZNyU7xbkRMjvRNHKMe"

    });

    return response;
  };
}

})();

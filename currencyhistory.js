(function(){
'use strict';

  angular.module('MyCurrencyApp',[])
  .controller('CurrencyController',CurrencyController)
  .service('CurrencyService',CurrencyService);

  CurrencyController.$inject=['CurrencyService'];

  function CurrencyController(CurrencyService){
      var currency=this;
      currency.date="";
      currency.currencyName="";
      currency.flag=false;
      currency.getCurrency = function(){
        currency.flag=true;
      var promise=CurrencyService.getCurrencyRates(currency.date,currency.currencyName);
      promise.then(function(response){
        currency.currencyData=response.data.rates;
      });
        return currency.currencyData;
    };
}

CurrencyService.$inject=['$http'];

function CurrencyService($http){
  var service=this;
  service.getCurrencyRates= function(date,currencyName){

    var response = $http({

        method:"GET",
        url:"http://api.fixer.io/" + date + "?base=" + currencyName

    });

    return response;
  };
}

})();

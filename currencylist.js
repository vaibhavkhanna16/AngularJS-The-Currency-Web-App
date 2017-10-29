(function(){
'use strict';

  angular.module('MyCurrencyApp',[])
  .controller('CurrencyController',CurrencyController)
  .service('CurrencyService',CurrencyService);

  CurrencyController.$inject=['CurrencyService','$filter'];

  function CurrencyController(CurrencyService,$filter){
      var currency=this;
      currency.currencyName="";
      currency.flag=false;
      currency.getCurrency = function(){
        currency.flag=true;
        currency.currencyName=$filter('uppercase')(currency.currencyName);
      var promise=CurrencyService.getCurrencyRates(currency.currencyName);
      promise.then(function(response){
        currency.currencyData=response.data.rates;
      });
        return currency.currencyData;
    };
}

CurrencyService.$inject=['$http'];

function CurrencyService($http){
  var service=this;
  service.getCurrencyRates= function(currencyName){

    var response = $http({

        method:"GET",
        url:"http://api.fixer.io/latest?base=" + currencyName

    });

    return response;
  };
}

})();

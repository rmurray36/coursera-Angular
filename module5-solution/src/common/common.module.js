(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://rmurray36-module5-2.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();

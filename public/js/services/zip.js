/*global angular*/
angular.module('zipApp')
.factory('Zip', ['$resource',function($resource){
    return {
        all: function() {
            return $resource('/api/zips').query().$promise;
        }
    }
}]);
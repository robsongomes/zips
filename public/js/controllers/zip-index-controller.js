/*global angular*/
angular.module('zipApp')

.controller('ZipIndexController',['Zip', 
    function(Zip) {
        
        this.zips = [];
        
        Zip.all()
            .then((zips) => {
                console.log("Zip was found");
                //I can use 'this' safely here because arrow function :D
                this.zips = zips;
            })
            .catch((err) => {
               console.log(err); 
            });
    }
]);
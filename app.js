var titleDictionary = {
  "about" : "About",
  "artshow": "Art show",
  "contact" : "Contact",
  "dealers": "Dealers",
  "gaming": "Gaming",
  "guest_bios": "Guest bios",
  "guests": "Guests",
  "hotel": "Hotel",
  "policies": "Policies",
  "program_book": "Program Book",
  "register": "Register",
  "sched": "Detailed Schedule",
  "writers_workshop": "Writers' workshop"};

angular
    .module('app', [
		    'ngRoute',
		    'ui.bootstrap'
])

.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'about.html',
                controller  : 'mainController'
                //controller  : 'slidesController'
            })
            .when('/about', {
                templateUrl : 'about.html',
                controller  : 'mainController'
            })

            .when('/artshow', {
                templateUrl : 'artshow.html',
		controller  : 'mainController'
            })

            .when('/contact', {
                templateUrl : 'contact.html',
	        controller  : 'mainController'
            })

            .when('/contact/:receivedMode', {
                templateUrl : 'contact.html',
		controller  : 'mainController'
            })

            .when('/dealers', {
                templateUrl : 'dealers.html',
		controller  : 'mainController'
            })

            .when('/gaming', {
                templateUrl : 'gaming.html',
		controller  : 'mainController'
            })

            .when('/grid', {
                templateUrl : 'grid.html',
		controller  : 'mainController'
            })

            .when('/guest_bios', {
                templateUrl : 'guest_bios.html',
		controller  : 'mainController'
            })

            .when('/guests', {
                templateUrl : 'guests.html',
		controller  : 'mainController'
            })

            .when('/hotel', {
                templateUrl : 'hotel.html',
		controller  : 'mainController'
            })

            .when('/policies', {
                templateUrl : 'policies.html',
	        controller  : 'mainController'
            })

            .when('/program_book', {
                templateUrl : 'programBook.html',
	        controller  : 'mainController'
            })

            .when('/register', {
                templateUrl : 'register.html',
		controller  : 'mainController'
            })

            .when('/sched', {
                templateUrl : 'sched.html',
		controller  : 'mainController'
            })

            .when('/writers_workshop', {
                templateUrl : 'writers_workshop.html',
		controller  : 'mainController'
            });
  })
.run(function ($rootScope, $location) { //Insert in the function definition the dependencies you need.
    //$rootScope.$on("$locationChangeStart",function(event, next, current){
    $rootScope.$on("$routeChangeStart",function(event, obj){
	var origPath = obj.$$route.originalPath;
	//console.log("app.run: route changing to:" + origPath); 
	var postscribeTheCounter = false;
	if ((origPath === "") || (origPath === "/")) {
	  if (!$rootScope.title) {
	    $rootScope.title = "Home";
	    postscribeTheCounter = true;
	    var carouselDiv = document.getElementsByClassName(".carousel");
	    var carouselIndicatorsOL = document.getElementsByClassName(".carousel-indicators");
	  }
	}
	else {
	  //$rootScope.title = titleDictionary[locationParts[locationParts.length - 1]];
	  var pathLastPart = origPath.substring(1);
	  $rootScope.title = titleDictionary[pathLastPart];
	  postscribeTheCounter = true;
	}

	if (postscribeTheCounter) { 
	  sc_project=2721969;	
	  sc_invisible=0;
	  sc_security="5cfe5782";

	  var scURL = 'http://www.statcounter.com/counter/counter.js';

	  var scImg = 'http://c29.statcounter.com/2721969/0/5cfe5782/0/';
	  //postscribe('#statcounterInd', '');
	  angular.element(document.getElementById('statcounterInd')).empty();
	  postscribe('#statcounterInd', '<script src="' + scURL + '"><img class="statcounter" src="' + scImg + '" alt="free hit counter"><\/script>');
	}
    });
});

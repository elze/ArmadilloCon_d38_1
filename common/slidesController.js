var bigRandomNumber = 0;

/*********
angular.module('app').filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
*********/

angular
.module('app')
.controller('slidesController' , slidesController);
/***
.directive('armadCarousel', function(uibCarouselDirective) {
    return angular.extend({}, uibCarouselDirective[0], { templateUrl: 'carouselWithIndicators.html' });
  });
*****/
/***
.directive('focusInput', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
          element.parent().parent().find('input')[0].focus();
      });
    }
  };
})
*****/

var imagePaths = ['http://2015.armadillocon.org/sites/default/files/images/MaryDoriaRussellCake2_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/p0000240VingeElizMoon_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/P0000530RobLandleyMakesLiquidNitrogenIceCream_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/P518CatConradDrawing_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/CIMG0169StrossMcCarthy_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/CIMG0171JuliaMandala_600.jpg',
	      'http://2015.armadillocon.org/sites/default/files/images/CIMG0161BrobdingnagianBardsRieSheridan_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG0172RobersonStrossMinz_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG0190JuliaMandalaLindaDonahue_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG0194CarolineSpectorGuitar_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG0206InflatableAstronauts_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG0237StrossRingelBroderick2_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG3718GrantKruger_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6766RobersonAndKenner_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6826SharynNovemberLouiseMarley_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6860PurpleAlien_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6863GreyAlien_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6905BillCriderJoeLansdale_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6954ShaiMarkHall_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/CIMG6994KlagesMarleyShinn_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010542JohnScalziWritersWorkshop_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010575DavidLeeAndersonCutsCake_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010593ScalziRobersonFinnGibbons_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010604CJMillsPicacioScalzi_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010617BrustScalziWells_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010671PatriceSarath_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010730PattyWellsWillCutCake_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1010761BiomechActionFigures_600.jpg',
		  'http://2015.armadillocon.org/sites/default/files/images/P1060901TroyceMarthaWellsNancy_600.jpg',
		  ];

var numberOfImages = imagePaths.length;

var imageCaptions = ['Guest of Honor, author <a href="http://pic.geekitude.com/v/sf/armadillocon2000/MaryDoriaRussellCake2.jpg.html">Mary Doria Russell presented with a birthday cake</a> on her 50th birthday at ArmadilloCon 2000',
	     'Authors <a href="http://pic.geekitude.com/v/sf/armadillocon2003/p0000240VernorVingeElizabethMoon.jpg.html">Vernor Vinge (Guest of Honor) and Elizabeth Moon</a> at the <a href="http://sf.geekitude.com/content/building-alien-society-ground-armadillocon-2003-panel">"Building An Alien Society From The Ground up"</a> panel at ArmadilloCon 2003',
	     'Rob Landley makes liquid nitrogen ice cream in the ConSuite at ArmadilloCon 2004',
	     'Artist R. Cat Conrad and his rendition of fantasy world at <a href="http://sf.geekitude.com/content/interactive-fantasy-world-building-armadillocon-2004-panel">Interactive Fantasy World Building panel</a> at ArmadilloCon 2004',
	     '<a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0169StrossMcCarthy.jpg.html">Guest of honor Charles Stross (right) is talking with Wil McCarthy</a>, scientist, science fiction author, and popularizer of programmable matter idea at ArmadilloCon 2005',
	     '<a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0171JuliaMandala.jpg.html">Texas author Julia Mandala at ArmadilloCon 2005</a>',
	     '<a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0161Bards.jpg.html">Celtic band Brobdingnagian Bards and author Rie Sheridan</a> at their performance at ArmadilloCon 2005',
		 'Chris Roberson, author GoH Charles Stross, and editor GoH Jim Minz <a href=" http://sfragments.blogspot.com/2005/08/armadillocon-2005-opening-ceremony-and.html#space_opera">on the Space Opera panel</a> at ArmadilloCon 2005',
		 '<a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0190BlackAndRed.jpg.html">Texas authors Julia Mandala (left) and Linda Donahue</a> at ArmadilloCon 2005',
		 'Texas authors <a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0194SpectorGuitar.jpg.html">Brad Denton (left) and Caroline Spector</a> play in their band Two-Headed Baby at ArmadilloCon 2005',
		 '<a href="http://pic.geekitude.com/v/sf/armadillocon2005/CIMG0206InflatableAstronauts.jpg.html">Inflatable spaceships and astronauts</a> at a room party at ArmadilloCon 2005',
		 'GoH Charles Stross, Faye Ringel, and Damien Broderick on the <a href="http://sfragments.blogspot.com/2005/08/new-weird-movement-in-sf-literature.html">The New Weird Movement in SF Literature panel</a> at ArmadilloCon 2005',
		 '<a href="http://pic.geekitude.com/v/sf/armadillocon2006/CIMG3716GrantKrugerOpenCerem.jpg.html">Fan Guest of Honor Grant Kruger</a> at ArmadilloCon 2006',
		 'Authors Chris Roberson and Julie Kenner, <a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6766RobersonAndKenner.jpg.html">teachers at the ArmadilloCon 2007 writers workshop</a>, are having too much fun',
		 '<a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6826SharynNovemberLouiseMarley.jpg.html">Editor GoH Sharyn November and author Louise Marley</a> at ArmadilloCon 2007',
		     'Robot Group booth with a <a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6860PurpleAlien.jpg.html">purple alien robot</a> at ArmadilloCon 2007',
		     'Robot Group booth with a <a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6863GreyAlien.jpg.html">grey alien robot</a> at ArmadilloCon 2007',
		     '<a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6904ReismanCriderLansdale.jpg.html">Bill Crider (left) and author Joe Lansdale</a> at ArmadilloCon 2007',
		     'ApolloCon organizers <a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6954ShaiMarkHall.jpg.html">Shai Fenwick and Mark Hall</a> at the traditional ApolloCon room party Houston fans always throw at ArmadilloCon',
		     'Left to right: authors <a href="http://pic.geekitude.com/v/sf/armadillocon2007/CIMG6994KlagesMarleyShinnRenee.jpg.html">Ellen Klages, Louise Marley, and Sharon Shinn</a> at ArmadilloCon 2007',
		     '<a href="http://sf.geekitude.com/wwscalzi">GoH John Scalzi at the writers workshop</a>, speaking to aspiring writers about <a href="http://sf.geekitude.com/wwscalzi#suck">the Power of Suck</a> at ArmadilloCon 2008',
		     'The artist Guest of Honor David Lee Anderson <a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010575DavidLeeAndersonCutsCake.jpg.html">cuts the ArmadilloCon 30th anniversary cake</a> at ArmadilloCon 2008; first row from the right: Kurt Baty, Rocky Kelley (with a camera), fan GoH Kelly Persons',
		     'Left to right: author GoH <a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010593ScalziRobersonFinnGibbons.jpg.html">John Scalzi, Chris Roberson, Mark Finn and John Gibbons</a> at ArmadilloCon 2008. John Scalzi established a No Lurkers rule. Whoever stopped by the circle of fans that surrounded him, had to join the circle and participate in conversation.',
		     'Left to right: <a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010604CJMillsPicacioScalzi.jpg.html">author C. J. Mills, artist John Picacio, and author GoH John Scalzi</a> on the Space Opera panel at ArmadilloCon 2008',
		     'Authors Steven Brust, GoH John Scalzi, and Martha Wells on <a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010609SpectorBrustScalzi.jpg.html">Creating A Character panel</a> at ArmadilloCon 2008',
		     '<a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010671PatriceSarath.jpg.html">Austin author Patrice Sarath writes flash fiction</a> at a party thrown by the Space Squid fanzine at ArmadilloCon 2008. The party involved a flash fiction contest.',
		     'Patty Wells, a fan Guest of Honor at ArmadilloCon 2008, is about to cut the cake at a <a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010730PattyWellsWillCutCake.jpg.html">Reno Worldcon bid party</a>',
		     '<a href="http://pic.geekitude.com/v/sf/armadillocon2008/P1010761BiomechActionFigures.jpg.html">Biomechanical action figures</a>, created by Marvin Niebuhr from an Austin organization Robot Group, and exhibited in the ArmadilloCon 2008 dealer room',
		     'Texas author <a href="http://pic.geekitude.com/v/sf/armadillocon2009/P1060901TroyceMarthaWellsNancy.jpg.html">Martha Wells (center), surrounded by Troyce Wilson and Nancy Hightower</a> at ArmadilloCon 2009'
		     ];

var imageWidths = ['600px', '600px', '600px', '593px', '600px', '600px', '591px', '600px', '323px', '600px', '600px', '600px', '600px', '600px', '600px', '600px', '375px', '600px', '600px', '600px', '600px', '480px', '600px', '600px', '600px', '600px', '600px', '600px', '600px'];

function slidesController($scope, $location, $routeParams, $rootScope, $http, $timeout) { 

  $scope.elements = [ {name: 'n1', value: 1}, {name: 'n2', value: 2}];

$scope.$on('$viewContentLoaded', function(event) {
     $timeout(function() {
  console.log("content loaded");
  var carouselDiv = document.getElementsByClassName(".carousel");
  var carouselIndicatorsOL = document.getElementsByClassName(".carousel-indicators");
      },0);
});

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    $scope.addSlide = function(ind) {
      slides.push({
	image: imagePathsRotated[ind],
	    text: imageCaptionsRotated[ind],
	    width: imageWidthsRotated[ind]
	    });
    };

	
  var random = Math.random();
  bigRandomNumber = Math.floor(Math.random() * 1000);

  var randomStartingIndex = bigRandomNumber % numberOfImages;
  var imagePathsRotated = [];
  //var smallImageElementsRotated = [];
  var imageCaptionsRotated = [];
  var imageWidthsRotated = [];
  for (var i=0; i < numberOfImages; i++) {
        var randomIndexWithinBounds = (bigRandomNumber + i) % numberOfImages;
	imagePathsRotated[i] = imagePaths[randomIndexWithinBounds];
	imageCaptionsRotated[i] = imageCaptions[randomIndexWithinBounds];
	imageWidthsRotated[i] = imageWidths[randomIndexWithinBounds];
	//smallImagePathsRotated[i] = smallImagePaths[randomIndexWithinBounds];
	//smallImageElementsRotated[i] = smallImageElements[randomIndexWithinBounds];
  }
  
	
  for (var i=0; i < numberOfImages; i++) {
    $scope.addSlide(i);
  }
  
    angular.element(document).ready(function () {
	var carouselDiv = document.getElementsByClassName(".carousel");
	var carouselIndicatorsOL = document.getElementsByClassName(".carousel-indicators");

	/*****
	var indicatorsElem = angular.element(document.querySelectorAll('.carousel-indicators'));
	var indicators = indicatorsElem[0].children;
	var smallImageElementsSelected = angular.element(document.querySelectorAll('.hover-image'));
	var smallImageCaptionsSelected = angular.element(document.querySelectorAll('.hover-small-caption'));
	for (var ind=0; ind < indicators.length; ind++) { 
	  var randomIndexWithinBounds = (bigRandomNumber + ind) % numberOfImages;
	  indicators[ind].addEventListener("mouseover", handleMouseOver(smallImageElementsSelected, smallImageCaptionsSelected, randomIndexWithinBounds));
	  indicators[ind].addEventListener("mouseout", handleMouseOut(smallImageElementsSelected, smallImageCaptionsSelected, randomIndexWithinBounds));

	}
	*************/
      });	
}


function handleMouseOver(smallImageElementsSelected, smallImageCaptionsSelected, indicatorIndex) {
    return function(e) {
      var pageX = e.pageX;
      var pageY = e.pageY;

      var thisSmallImage = new Image();
      thisSmallImage.src = smallImageElementsSelected[indicatorIndex].src;
      var imgWidth = thisSmallImage.width;
      var imgHeight = thisSmallImage.height;

      var positionTopImg = pageY - imgHeight - 10;
      var positionTopCaption = pageY - imgHeight - 50;
      smallImageElementsSelected[indicatorIndex].style.position = "absolute";
      smallImageElementsSelected[indicatorIndex].style.left = pageX + 'px';
      smallImageElementsSelected[indicatorIndex].style.top = positionTopImg + 'px';
      smallImageElementsSelected[indicatorIndex].style.display = "block";


      smallImageCaptionsSelected[indicatorIndex].style.position = "absolute";
      smallImageCaptionsSelected[indicatorIndex].style.left = pageX + 'px';
      smallImageCaptionsSelected[indicatorIndex].style.top = positionTopCaption + 'px';
      smallImageCaptionsSelected[indicatorIndex].style.display = "block";



    };
}

function handleMouseOut(smallImageElementsSelected, smallImageCaptionsSelected, indicatorIndex) {
    return function(e) {
      smallImageElementsSelected[indicatorIndex].style.display = "none";
      smallImageCaptionsSelected[indicatorIndex].style.display = "none";
    };
}

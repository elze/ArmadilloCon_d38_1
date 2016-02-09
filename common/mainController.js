angular
  .module('app')
  .controller('mainController' , mainController);

function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
	newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    };


angular.module('app').filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
  }).directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick && attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});


function mainController($scope, $location, $routeParams, $rootScope, $http) { 

  $scope.setTitle = function(newTitle) {
    $scope.title = newTitle;
  }

    $scope.closeThis = function () {
        //console.log('closing');

      for (var topLevelMenuKey in $scope.menuIsOpen) {
	  if ($scope.menuIsOpen[topLevelMenuKey])
	    $scope.menuIsOpen[topLevelMenuKey] = false;
      }
    }

    $scope.featured_guests = {
				  "chu": {person:'Wesley Chu', aname: "Wesley_Chu", shortname: "Chu", title:"Guest of Honor", website: "wesleychu.com", bio: "Wesley Chu is the bestselling author of the Tao series from Angry Robot Books and a two-time nominee for the John W. Campbell Award for Best New Writer. His debut, <i>The Lives of Tao</i>, won the Young Adult Library Services Association Alex Award and was a finalist for the Goodreads Choice Awards for Best Science Fiction. His next series, <i>Time Salvager</i>, published by Tor books, is out now.<br/>A consultant and former banking executive, Wesley is a Kung-Fu master and member of the Screen Actors Guild, and recently returned from summiting Kilimanjaro. He lives in Chicago with his wife Paula and their Airedale Terrier, Eva."},
				  "hess": {person:'Christina Hess', aname: "Christina_Hess", shortname: "Hess", title:"Artist Guest", website: "", bio: ""},
				  "keller": {person:'Ken Keller', aname: "Ken_Keller", shortname: "Keller", title:"Fan Guest", website: "", bio: ""}
    };

    $scope.featured_guest_names_sorted = Object.keys($scope.featured_guests).sort();
    var indexGoH = $scope.featured_guest_names_sorted.indexOf("chu");
    $scope.featured_guest_names_sorted.splice(indexGoH, 1);
    $scope.featured_guest_names_sorted.unshift("chu");

    $scope.names = {
      "abell": {person:'Paul Abell', website: "", aname: "Paul_Abell", shortname: "Abell", bio: "Dr. Paul Abell is the Lead Scientist for Planetary Small Bodies in the Astromaterials Research and Exploration Science Division at the NASA Johnson Space Center in Houston, Texas. His main areas of interest are physical characterization of near-Earth objects via ground-based and spacecraft observations, examination of NEOs for future robotic and human exploration, and identification of potential resources within the NEO population for future resource utilization. Paul has been studying potentially hazardous asteroids and near-Earth objects for over 15 years. Asteroid 8139 (1980 UM1) is named Paulabell in recognition of Paul's contributions to NEO research and exploration studies."},
      "allen": {person:'Sanford Allen', aname: "Sanford_Allen", shortname: "Allen", website: "sanfordallen.com", bio: "Sanford Allen, at various times, has worked as a newspaper reporter, a college journalism instructor and a touring musician. He is the author of the horror novel <i>Deadly Passage</i> and his short fiction has appeared in anthologies including <i>Horror Library 5</i>, <i>Rayguns Over Texas</i>, <i>Truth or Dare</i> and <i>That Ain't Right: Historic Accounts of the Miskatonic Valley</i>. He divides his creative energy between writing tales of horror/sf/dark fantasy and his band Hogbitch, which wallows in the murky swamp between doom metal and space rock. He lives in San Antonio, Texas."},
      "antonelli": {person:'Lou Antonelli', aname: "Lou_Antonelli", shortname: "Antonelli", website: "louantonelli.blogspot.com", bio: "Lou Antonelli has had 93 short stories and three collections published in the past eleven years. SFWA-pro publications were in <i>Asimov's</i>, <i>Daily Science Fiction</i> (2x), <i>Buzzy Mag</i> and <i>Jim Baen's Universe</i>. He has eleven honorable mentions in <i>The Year's Best Science Fiction</i>. He was a finalist in 2013 for the Sidewise Award in Alternate History for \"Great White Ship\" (Daily Science Fiction - 2012).<br/>His collections include <i>Fantastic Texas</i> published in 2009; <i>Texas & Other Planets</i> published in 2010; and <i>The Clock Struck None</i> and <i>Letters from Gardner</i>, both published in 2014."},
      "bakutis": {person:'T. Eric Bakutis', aname: "Eric_Bakutis", shortname: "Bakutis", website: "tebakutis.com", bio: "T. Eric Bakutis is an author and professional videogame designer based in Maryland. His first fantasy novel, <i>Glyphbinder</i>, was a finalist for the 2014 Compton Crook Award. Its sequel, <i>Demonkin</i>, is due in December 2015. His short fiction has appeared in a number of markets, all of which you can find on his professional website, www.tebakutis.com. You'll also find links to his blog (topics include writing, game design, and virtual reality), Facebook, Twitter, and Wattpad."},
      "benjamin": {person:'Paul Benjamin', aname: "Paul_Benjamin", shortname: "Benjamin", website: "paulbenjaminwrites.com", bio: "Paul Benjamin is a <i>New York Times</i> bestselling author who has written and produced comics and video games for diverse properties including many Marvel characters such as Hulk, Spider-Man, and Wolverine, as well as Star Wars, Star Trek, Starcraft, World of Warcraft, the Muppets, Monsters, Inc., G.I. Joe, and more. His first prose short story appeared in <i>The Protectors</i> anthology. His original manga series <i>Pantheon High</i> was a YALSA Great Graphic Novels for Teens nominee." },
      "bey": {person:'Matthew Bey', aname: "Matthew_Bey", shortname: "Bey", website: "spacesquid.com", bio: "Matthew Bey is a failed sci-fi writer who has come out of retirement to pull off one last daring heist. You may have seen his short stories in places such as <i>Ray Guns Over Texas</i>, <i>Pseudopod</i>, or <i>The Drabblecast</i>, but you probably didn't. He's a founding member of <i>Space Squid</i>, a literary publication which has saved genre fiction from itself for a decade."},
      "blaschke": {person:'Jayme Lynn Blaschke', aname: "Jayme_Lynn_Blaschke", shortname: "Blaschke", website: "JaymeBlaschke.com", bio: "Jayme Lynn Blaschke's short fiction has appeared in such diverse publications as <i>Interzone</i>, <i>Fast Ships Black Sails</i>, <i>Cross Plains Universe</i>, <i>Electric Velocipede</i>, and the <i>Thackery T. Lambshead Cabinet of Curiosities</i>, among others. Some of his many genre-related interviews have been collected in <i>Voices of Vision: Creators of Science Fiction & Fantasy Speak</i>. He's written an extensive history of the infamous La Grange Chicken Ranch and hopes to announce a publication date any minute now. Blaschke is currently writing a YA novel inspired by the classic Winston Science Fiction Series titled <i>Sailing Venus</i>. His website may be found at JaymeBlaschke.com"},
      "bobo": {person:'Scott Bobo', aname: "Scott_Bobo", shortname: "Bobo", bio: "Scott Bobo was Co Fan Guest of Honor at ArmadilloCon 24, is a charter member of F.A.C.T., and has attend SF/F cons since 1975. Along with Kurt Baty, he did a 10-year stint at writing party reviews for the WorldCon daily newszine. He is often seen with a martini in hand."},
      "bracken": {person:'Michael Bracken', aname: "Michael_Bracken", shortname: "Bracken", website: "CrimeFictionWriter.com", bio: "Michael Bracken is the author of several books, including <i>All White Girls</i>, <i>Canvas Bleeding</i>, <i>Psi Cops</i>, and <i>Tequila Sunrise</i>, though he is better known as the author of more than 1,100 short stories published in <i>Ellery Queen's Mystery Magazine</i>, <i>Espionage</i>, <i>Fantastic</i>, <i>Fifty Shades of Green</i>, <i>Midnight</i>, <i>Northern Horror</i>, <i>Hot Blood: Strange Bedfellows</i>, <i>Oui</i>, <i>Specters in Coal Dust</i>, <i>Sun</i>, <i>True Story</i>, <i>Young World</i>, and many other publications. A full-time freelancer, he lives and writes in Waco."},
      "brown": {person:'Christopher Brown', aname: "Christopher_Brown", shortname: "Brown", website: "christopherbrown.com", bio: "Christopher Brown writes science fiction and criticism in Austin, where he also practices technology law. He coedited, with Eduardo Jiménez Mayo, <i>Three Messages and a Warning: Contemporary Mexican Short Stories of the Fantastic</i>, which was a finalist for the 2013 World Fantasy Award. His stories and essays frequently focus on issues at the nexus of technology, politics, and economics.  Notable recent work has appeared in <i>The Baffler</i>, the <i>MIT Technology Review</i> anthology <i>Twelve Tomorrows</i>, <i>25 Minutos en el Futuro: Nueva Ciencía Ficción Norteamericana</i>, <i>Review: Literature and Arts of the Americas</i>, <i>Castálida</i>, and <i>The New York Review of Science Fiction</i>."},
      "brust": {person:'Steven Brust', aname: "Steven_Brust", website: "dreamcafe.com", bio: "Steven Brust, fantasy author, is best known for his books about the assassin Vlad Taltos. Brust has also written a swashbuckling series (<i>The Khaavren Romances</i>) and standalone novels about vampires (<i>Agyar</i>), time travel (<i>Cowboy Feng's Space Bar and Grille</i>), and the devil (<i>To Reign in Hell</i>). He most recent books are <i>The Incrementalists</i>, a collaboration with Skyler White, and <i>Hawk</i>, the 14th book in the Taltos series."},
      "burton": {person:'Elizabeth Burton', aname: "Elizabeth_Burton", shortname: "Burton", bio: "In the 50-odd years since she first put pen to paper and wrote a novel that went on and on and... well, you get the idea... Liz Burton has been a journalist, a single parent, an information & referral agent (which explains her obsession with finding out things) and, eventually, a published author, professional editor and, willy-nilly, a publisher. That is all she will admit to."},
      "cheney": {person:'J. Kathleen Cheney', aname: "Kathleen_Cheney", shortname: "Cheney", website: "jkathleencheney.com", bio: "J. Kathleen Cheney has taught mathematics ranging from 7th grade to Calculus, with a brief stint as a Gifted and Talented Specialist.  Her short fiction has been published in <i>Jim Baen's Universe</i>, <i>Writers of the Future</i>, and <i>Fantasy Magazine</i>, among others, and her novella \"Iron Shoes\" was a 2010 Nebula Award Finalist.  Her novel, <i>The Golden City</i> was a Finalist for the 2014 Locus Awards (Best First Novel). The final book in the series, <i>The Shores of Spain</i> will come out July 2015, with a new series debuting February 2016 with <i>Dreaming Death</i>." },
      "dimond": {person:'Rose Dimond', aname: "Madeleine_Rose_Dimond", shortname: "Dimond", website: "", bio: "Rose Dimond is a writer, fabric artist, musician, florist, publication editor and designer, and cat rescuer. She has several stories published, though what she really wants to do is write novels (and is working hard at it). She is a veteran of Taos Toolbox, Viable Paradise, and Clarion."},
      "griffin": {person:'Peni Griffin', aname: "Peni_Griffin", shortname: "Griffin", website: "penigriffin.blogspot.com", bio: "Born in Texas, raised an Air Force Brat, I live in San Antonio, where history leaks through into the present and affects what I write. My long fiction is for young people and my short fiction runs long but is still for people who are growing their brains. Time travel a specialty with a side of practical fantasy. The things people may have heard of are <i>Switching Well</i>, <i>The Ghost Sitter</i>, and <i>11,000 Years Lost</i>."},
      "jacobs": {person:'John Hornor Jacobs', aname: "John_Hornor_Jacobs", shortname: "Jacobs", website: "johnhornorjacobs.com", bio: "John Hornor Jacobs, is an award-winning author of adult and YA fiction. His first novel, <i>Southern Gods</i>, was shortlisted for a Bram Stoker Award for Excellence in a First Novel.<br/>2014 saw the publication of Jacobs's first fantasy novel, <i>The Incorruptibles</i>. Pat Rothfuss has said of this book, \"One part ancient Rome, two parts wild west, one part Faust. A pinch of Tolkien, of Lovecraft, of Dante. This is strange alchemy, a recipe I've never seen before. I wish more books were as fresh and brave as this.\"<br/>Jacobs resides in the American South. Learn more about him at johnhornorjacobs.com."},
      "juday": {person:'Jennifer Juday', aname: "Jennifer_Juday", shortname: "Juday"},
      "kimbriel": {person:'Katharine Eliska Kimbriel', aname: "Katharine_Eliska_Kimbriel", shortname: "Kimbriel", website: "bookviewcafe.com/bookstore/bvc-author/katharine-eliska-kimbriel", bio: "In the beginning Katharine Eliska \"Cat\" Kimbriel was nominated for the Campbell Award for Best New SF/Fantasy Writer. Kimbriel writes literate, character-driven SF & Fantasy.  Then she became ill and tried to die.  Do you know that if you win the throw with Death, you become a wizard?<br/>The <i>Chronicles of Nuala</i> and <i>Night Calls</i> novels are available in e-book from Book View Cafe. The latest book is <i>Spiral Path</i>; the Alfreda novels are also in trade paperback. Cat is revising a mystery with ghosts and charting an urban fantasy based in Austin, TX that begins with an old curse."},
      "mancusi": {person:'Mari Mancusi', aname: "Mari_Mancusi", shortname: "Mancusi", website: "marimancusi.com", bio: "Mari Mancusi always wanted a dragon as a pet. Unfortunately the fire insurance premiums proved a bit too large and her house a bit too small--so she chose to write about them instead. Today she works as an award-winning author for adults and teens and freelance television producer, for which she has won two Emmys. When not writing, Mari enjoys traveling, cosplay, watching cheesy (and scary) horror movies, and her favorite guilty pleasure -- playing videogames. A graduate of Boston University, she lives in Austin, Texas, with her husband, Jacob, and young daughter."},
      "mills": {person:'C. J. Mills', aname: "C_J_Mills", shortname: "Mills", bio: "C. J. Mills grew up in Yankee lands and has only been living in Texas since 2000 (but she was coming down for ArmadilloCon for years before that). A writer by inheritance as well as inclination -- her mother and her mother's mother were both journalists; her paternal grandmother and aunt both wrote short stories -- and she has six novels published; one of these was nominated for a best-first-novel award by the Western Writers' Association. She has two grown sons, who stayed in Minnesota. Her hobbies are music, vintage and foreign doll collecting, and language collecting."},
      "moyer": {person:'Jaime Lee Moyer', aname: "Jaime_Lee_Moyer", shortname: "Moyer", website: "jaimeleemoyer.com", bio: "Jaime Lee Moyer lives in a land of cactus, cowboys, and rhinestones, while dreaming of tall trees and the ocean. She writes novels about murder and betrayal, friendship, ghosts and magic, and she feels it's only fair to warn you that all her books are kissing books. Her cats approve all of this, including the kissing. She writes a lot. She reads as much as she can."},
      "osborne": {person:'Cary Osborne', aname: "Cary_Osborne", shortname: "Osborne", website: "iroshioftheglaive.blogspot.com", bio: "Cary Osborne has six novels recently re-issued as eBooks. They are science fiction and fantasy genres: <i>Iroshi</i>, <i>The Glaive</i>, <i>Persea</i>, <i>Deathweave</i>, <i>Darkloom</i>, and <i>Winter Queen</i>. Two new novels will be published this year, one mystery, <i>Oklahoma Winds</i>, and a fantasy, <i>When God Was Stolen</i>. Osborne also has 19 short stories in FSF and horror published. Current projects include the final Iroshi novel, titled <i>Beyond the Void</i>, a follow-up to the mystery, set again in Oklahoma, and several short stories. Having lived in several parts of the country, Osborne has settled back in Oklahoma and now writes full-time."},
      "reisman": {person:'Jessica Reisman', aname: "Jessica_Reisman", shortname: "Reisman", website: "storyrain.com", bio: "Jessica Reisman's stories have appeared in numerous magazines and anthologies. Her first novel, <i>The Z Radiant</i>, published by Five-Star Speculative Fiction, was described as, \"thinking reader's sci-fi\". She was a Michener Fellow in Fiction in graduate school and is a graduate of Clarion West."},
      "rylander": {person:'K. B. Rylander', aname: "K_B_Rylander", shortname: "Rylander", website: "kbrylander.com", bio: "K.B. Rylander spends way too much time thinking up odd questions and tracking down the answers. When she's not writing, you can find her sipping fine bourbon or playing Legos with her kids, though hopefully not at the same time. She won the 2015 Jim Baen Memorial Short Story Contest and is a member of the Codex writing community."},
      "sarath": {person:'Patrice Sarath', aname: "Patrice_Sarath", shortname: "Sarath", website: "patricesarath.com", bio: "Patrice Sarath is an author and editor living in Austin, Texas. Her novels include the fantasy series, Books of the Gordath (<i>Gordath Wood</i>, <i>Red Gold Bridge</i>, and <i>The Crow God's Girl</i>) and the romance <i>The Unexpected Miss Bennet</i>. She has been published by Penguin in the US and Robert Hale Ltd. in the UK. Her short stories that have appeared in several magazines and anthologies, including <i>Weird Tales</i>, <i>Black Gate</i>, <i>Alfred Hitchcock Mystery Magazine</i>, <i>Realms of Fantasy</i>, and many others. Her short story \"A Prayer for Captain La Hire\" was included in <i>Year's Best Fantasy of 2003</i> compiled by David Hartwell and Katherine Cramer. Her story \"Pigs and Feaches\", originally published in Apex Digest, was reprinted in 2013 in <i>Best Tales of the Apocalypse</i> by Permuted Press."},
      "stoddard": {person:'James Stoddard', aname: "James_Stoddard", shortname: "Stoddard", website: "sff.net/people/james-stoddard", bio: "James Stoddard's stories have appeared in publications such as <i>Amazing Stories</i> and <i>FSF</i>. \"The Battle of York\" was included in Eos Books <i>Year's Best SF 10</i>; \"The First Editions\" appeared in <i>The Year's Best Fantasy 9</i> from Tor. His novel <i>The High House</i> won the Compton Crook Award for best fantasy by a new novelist, and was nominated for several other awards. A sequel, <i>The False House</i>, followed. Both books and a third in the series will be out this summer. His rewrite of William Hope Hodgson's <i>The Night Land</i> was released in 2010." },
      "thomas": {person:'Lee Thomas', aname: "Lee_Thomas", shortname: "Thomas", website: "leethomasauthor.com", bio: "Lee Thomas is the two-time Lambda Literary Award- and Bram Stoker Award-winning author of <i>Stained</i>, <i>The Dust of Wonderland</i>, <i>The German</i>, <i>Torn</i>, <i>Ash Street</i>, <i>Like Light for Flies</i>, and <i>Butcher's Road</i>, among others. Lee lives in Austin, Texas, with his husband John, and their family of animals."},
      "waldrop": {person:'Howard Waldrop', aname: "Howard_Waldrop", shortname: "Waldrop", bio: "Howard Waldrop lives in Austin, Texas, and has been a professional writer for over 30 years. His fiction has won the Nebula and World Fantasy Awards. Gardner Dozois has called him a \"National Treasure\". Forthcoming works include <i>The Moone Worlde</i> and <i>The Search for Tom Purdue</i>."},
      "wood": {person:'Ernie Wood', aname: "Ernie_Wood", shortname: "Wood", website: "erniewood.com", bio: "Author of the time travel novel <i>One Red Thread</i>, Ernie Wood grew up in Chapel Hill, North Carolina, received his undergraduate degree in English Literature from Hamilton College in New York, returned to his home state to work in newspaper journalism, and arrived in Austin in 1984 as a magazine writer. Over a long career, he has been an award-winning author of non-fiction books, documentary film, advertising and journalism. Since the early 1990s, he has been a writer and manager of writers at a number of Austin advertising agencies and high-tech companies."},
      "wright": {person:'Barbara Ann Wright', aname: "Barbara_Ann_Wright", website: "barbaraannwright.wordpress.com", bio: "Barbara Ann Wright writes fantasy and science fiction novels and short stories when not ranting on her blog. Her short fiction has appeared twice in <i>Crossed Genres Magazine</i> and once made <i>Tangent Online</i>'s recommended reading list. Her first novel, <i>The Pyramid Waltz</i>, was one of Tor.com's Reviewer's Choice books of 2012, was a Foreword Review Book of the Year Award Finalist, a Goldie finalist, and won the 2013 Rainbow Award for Best Lesbian Fantasy. Her newest work, <i>Thrall: Beyond Gold and Glory</i>, is a Viking-esque fantasy due to release in September."},
      "yoachim": {person:'Caroline M. Yoachim', aname: "Caroline_Yoachim", website: "carolineyoachim.com", bio: "Caroline M. Yoachim lives in Seattle and loves cold cloudy weather. She is the author of dozens of short stories, appearing in <i>Asimov's</i>, <i>FSF</i>, <i>Clarkesworld</i>, <i>Lightspeed</i>, and <i>Daily Science Fiction</i>, among other places."}
    };

    $scope.guest_names_sorted = Object.keys($scope.names).sort();
    $scope.chunkedData = chunk($scope.guest_names_sorted, 3);

    $scope.locations =  {"D": "Ballroom D",
			"E": "Ballroom E",
			"F": "Ballroom F",
			"B": "Southpark B",
			"CC": "Conference Center",
			 "L": "Lobby"};


    $scope.timeslots = [
			{timeslot_id: "Fr1600", weekday: "Fri", timelong: "4:00 PM - 5:00 PM", 
			 panels: [
      {location: "D", panel_id: "Welcome_to_ArmadilloCon", panel_title: "Welcome to ArmadilloCon", description: "Our panelists will talk about the essential elements of sf cons in general and ArmadilloCon in particular. Learn about all the can't-miss events you should attend to get the most out of our con.", 
       panelists: ["Scott_Bobo", "Elizabeth_Burton", "Jennifer_Juday", "Jessica_Reisman"],
       moderator: "Jennifer_Juday"}
				  ]
			},
			{timeslot_id: "Fr1700", weekday: "Fri", timelong: "5:00 PM - 6:00 PM", 
			 panels: [
      {location: "D", panel_id: "Alternate_History", panel_title: "Alternate History", description: "Why is this genre so fascinating, and how does it relate to the rest of speculative fiction? What special challenges does it pose for the writer -- and reader?", 
       panelists: ["Lou_Antonelli", "Christopher_Brown", "Madeleine_Rose_Dimond", "Katharine_Eliska_Kimbriel", "C_J_Mills", "Howard_Waldrop"],
      moderator: "Christopher_Brown"},
      {location: "E", panel_id: "Researching_Your_Book", panel_title: "Researching Your Book", description: "Where to look, who to ask, what to do? How much is too much? What do you do with all the research that doesn't fit in the book?", 
       panelists: ["Jayme_Lynn_Blaschke", "Kathleen_Cheney", "Jaime_Lee_Moyer", "Cary_Osborne", "Lee_Thomas", "Ernie_Wood"],
       moderator: "Kathleen_Cheney"},
      {location: "F", panel_id: "Growing_Next_Generation_Readers", panel_title: "Growing the Next Generation of Readers", description: "Dicussing current works for young readers, and older books that are still relevant.", 
       panelists: ["Peni_Griffin", "John_Hornor_Jacobs", "Mari_Mancusi", "K_B_Rylander", "Patrice_Sarath", "James_Stoddard"],
       moderator: "Patrice_Sarath"}
				  ]
			}
			];

    $scope.send_email = function () {
      var payload = "form_type=contact_form&sender_name=" + $scope.sender_name + "&email_from=" + $scope.email_from + "&subject=" + $scope.subject + "&category=" + $scope.category + "&message=" + $scope.message;
      $http.post("http://armadillocon.org/d38/emailForm.php",
		 payload)
      .then(function(response) {
	  $scope.email_sent = "Thank you. We received your email.";
	  $scope.receivedMode = true;
	}, function (response) {
	  $scope.email_sent = "An error occurred while trying to send your email: " + response.error;
	  $scope.receivedMode = true;
	});

    };

    $scope.send_permission_form = function () {
      var payload = "form_type=permission_slip&sender_name=" + $scope.sender_name + "&email_from=" + $scope.email_from + "&manuscript_title=" + $scope.manuscript_title + "&subject=" + $scope.subject;
      $http.post("http://armadillocon.org/d38/emailForm.php",
		 payload)
      .then(function(response) {
	  $scope.email_sent = "Thank you. We received your permission slip.";
	  $scope.receivedMode = true;
	}, function (response) {
	  $scope.email_sent = "An error occurred while trying to send your permission slip: " + response.error;
	  $scope.receivedMode = true;
	});

    };

    
    $scope.setTheNeedToValidate = function () {
      $scope.rightMomentToValidate = true;
    };

    $scope.removeTheNeedToValidate = function () {
      $scope.rightMomentToValidate = false;
    }


    $scope.try_php = function () { 
      $http.get("http://armadillocon.org/testang/jsonTest.php")
	.success(function(response) {
	    $scope.meowData = response.data.cat;
	  });
    };

    $scope.menuIsOpen = {};
    $scope.menuIsOpen['about'] = false;
    $scope.menuIsOpen['contact'] = false;
    $scope.menuIsOpen['participate'] = false;
    $scope.menuIsOpen['program_book'] = false;
    $scope.menuIsOpen['programming'] = false;
    $scope.menuIsOpen['register'] = false;

    $scope.topLevelUL = "top-level-ul-hidden";

    $scope.processMenuEvents = function ($event) {
      var aID = $event.target.id;
      for (var topLevelMenuKey in $scope.menuIsOpen) {
	if (aID === topLevelMenuKey) {
	  if ($scope.menuIsOpen[topLevelMenuKey])
	    $scope.menuIsOpen[topLevelMenuKey] = false;
	  else
	    $scope.menuIsOpen[topLevelMenuKey] = true;
	}
	else
	  $scope.menuIsOpen[topLevelMenuKey] = false;
      }
    }

    $scope.toggleMenu = function($event) {
      //$scope.showTopLevelMenu = !$scope.showTopLevelMenu;
      if ($scope.topLevelUL == "top-level-ul-visible")
	$scope.topLevelUL = "top-level-ul-hidden";
      else 
	$scope.topLevelUL = "top-level-ul-visible";
    }

}

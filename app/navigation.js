/*jslint browser: true*/
/*global $, jQuery, Waypoint, alert*/

$(document).ready(function () {
  'use strict';
  
  //allow navigation through the page
  //will run an instance for each link
  function navigate(link) {
    var navbarHeight = $(".navbar").outerHeight(false);
    $("." + link + "-link").click(function () {
      if (link === "home") {
        $('html,body').animate({
          scrollTop: 0
        }, 400);
      } else {
        $("html,body").animate({
          scrollTop: $("#" + link + "-container").offset().top - navbarHeight
        }, 400);
      }
      
      //collapse menu after click on mobile
      if ($(".navbar-collapse").css("display") !== "none") {
        $(".navbar-collapse").collapse('hide');
      }
    });
  }
  
  
  //function to animate/unhide sections during scroll
  //will run an instance in each scroll even handler
  function showSection(section) {
    $("#" + section).show();
  }

  //also adjust the nav buttons based on where the user is on the page
  function changeNavIndicators(section) {
    $(".nav .btn").removeClass("active");
    $(".nav" + " ." + section + "-link").addClass("active");
  }
  
  //function to hide all the sections when you scroll back to the top
  function hideAll() {
    $("#about, #work, #contact").fadeOut(400);
    //and remove the active class from any nav btn
    $(".nav .btn").removeClass("focus active");
  }
  
  //listener for scroll events
  function showOnScroll(section) {
    var waypointShow,
      waypointNavDown,
      waypointNavUp;
    
    waypointShow = new Waypoint({
      element: document.getElementById(section + "-container"),
      handler: function () {
        showSection(section);
      },
      offset: $(window).height() * 0.75
    });
    
    waypointNavDown = new Waypoint({
      element: document.getElementById(section + "-container"),
      handler: function (direction) {
        if (direction === "down") {
          changeNavIndicators(section);
        }
      },
      offset: 100
    });

    waypointNavUp = new Waypoint({
      element: document.getElementById(section + "-container"),
      handler: function (direction) {
        if (direction === "up") {
          changeNavIndicators(section);
        }
      },
      offset: 0
    });
  }
  
  //listener for scroll back to top event
  function hideOnScroll() {
    var waypoint = new Waypoint({
      element: document.getElementById("jumbotron"),
      handler: function (direction) {
        if (direction === "up") {
          hideAll();
        }
      }
    });
  }
  
  //enable touch navigation on carousel
  function touchNav() {
    $("#work-carousel-mobile").on("swipeleft", function () {
      $(".right.carousel-control").trigger("click");
    });
    $("#work-carousel-mobile").on("swiperight", function () {
      $(".left.carousel-control").trigger("click");
    });
  }
  
  //run the event handlers
  showOnScroll("about");
  showOnScroll("work");
  showOnScroll("contact");
  hideOnScroll();
  navigate("about");
  navigate("work");
  navigate("contact");
  navigate("home");
  touchNav();
});
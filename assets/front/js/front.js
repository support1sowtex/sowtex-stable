      (function($) { // Begin jQuery
         $(function() { // DOM ready
            // If a link has a dropdown, add sub menu toggle.cat-head
            $('.extra-nav-menu ul li a:not(:only-child)').click(function(e) {
               $(this).siblings('.nav-dropdown').toggle();
               // Close one dropdown when selecting another
               $('.nav-dropdown').not($(this).siblings()).hide();
               e.stopPropagation();
            });
            // Clicking away from dropdown will remove the dropdown class
            $('html').click(function() {
               $('.nav-dropdown').hide();
            });
            // Toggle open and close nav styles on click
            $('#nav-toggle').click(function() {
               $('.extra-nav-menu ul').slideToggle();
            });
            // Hamburger to X toggle
            $('#nav-toggle').on('click', function() {
               this.classList.toggle('active');
            });
         }); // end DOM ready
      })(jQuery); // end jQuery
          var windowwidth = $(window).width();
        if (windowwidth < 900) {
         $('#cat-head').attr('href', '');
        $('#stock-head').attr('href', '');
       }
       $(document).ready(function () {
        $(".js-menu-icon").on("click touchstart", { passive: true }, function (e) {
            e.preventDefault();
            // alert("here");
            $(this).toggleClass("fa-times fa-bars");
            $(".menu .container").removeClass("container--is-visible");
            $(".menu li").removeClass("is-selected");
            $(".js-navbar").toggleClass("navbar--is-visible");
            $(".extraMenuForMob, .extraMenuForMobEnq").toggleClass("d-none");
        });
    
        $(".menu li").on("click", function (e) {
            // e.preventDefault();
            var $this = $(this);
            $this.toggleClass("is-selected");
    
            var $currentContainer = $(this).find(".container");
            $currentContainer.toggleClass("container--is-visible");
    
            $(".menu .container")
                .not($currentContainer)
                .removeClass("container--is-visible");
            $(".menu li").not($this).removeClass("is-selected");
        });
    });
    $(document).ready(function () {
        $("ul.tabs li").click(function () {
            var tab_id = $(this).attr("data-tab");
    
            $("ul.tabs li").removeClass("current");
            $(".tab-content").removeClass("current");
    
            $(this).addClass("current");
            $("#" + tab_id).addClass("current");
        });
    });
    
    $(document).ready(function () {
        $("ul.taba li").click(function () {
            var tab_id = $(this).attr("data-tab");
    
            $("ul.taba li").removeClass("current");
            $(".tab-contenta").removeClass("current");
            $(".tab-contenta").addClass("tab-slider-loader");
            setTimeout(function () {
                $(".tab-contenta").removeClass("tab-slider-loader");
            }, 2200);
    
            $(this).addClass("current");
            $("#" + tab_id).addClass("current");
            // $(".tab-slider").slick("refresh");
        });
    });
    
    $(".search-header a").click(function () {
        $(".search-filter-tab").addClass("on");
    });
    
    $(".all-categories-tab-overlay").click(function () {
        $(".search-filter-tab").removeClass("on");
    });
    $(document).ready(function () {
        function checkScreenSize() {
            if ($(window).width() > 675) {
                $(".extraMenuForMob, .extraMenuForMobEnq").addClass("d-none");
                // Your code here
            }
        }
    
        // Initial check
        checkScreenSize();
    
        // Check on window resize
        $(window).resize(function () {
            checkScreenSize();
        });
    });
    $(document).ready(function () {
        $(".js-menu-icon").on("click touchstart", { passive: true }, function (e) {
            e.preventDefault();
            // alert("here");
            $(this).toggleClass("fa-times fa-bars");
            $(".menu .container").removeClass("container--is-visible");
            $(".menu li").removeClass("is-selected");
            $(".js-navbar").toggleClass("navbar--is-visible");
            $(".extraMenuForMob, .extraMenuForMobEnq").toggleClass("d-none");
        });
    
        $(".menu li").on("click", function (e) {
            // e.preventDefault();
            var $this = $(this);
            $this.toggleClass("is-selected");
    
            var $currentContainer = $(this).find(".container");
            $currentContainer.toggleClass("container--is-visible");
    
            $(".menu .container")
                .not($currentContainer)
                .removeClass("container--is-visible");
            $(".menu li").not($this).removeClass("is-selected");
        });
    });
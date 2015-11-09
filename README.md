# jQuery-nav-plugin
a jQuery plugin can be used to create a flexible one page scroll with parallex effect

# Install
git clone https://github.com/EgAlexDeveloper/jQuery-nav-plugin.git

# How To Use
1- add jquery.js, msNav.js and style.css to your project

    <!-- the site styles -->
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <!-- the site scripts -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/msNav.js"></script>
    
2- attach them to the html file you use
3- be sure from adding the nav container to the html and a unique id for each element you use like this

    <!-- Nav Bar container -->
    <ul id="nav" class="scroller-nav"></ul>
    <!-- Page Elements -->
    <div id="firstDiv"></div>
    <div class="parallex first-parallex"></div>
    <div id="secondDiv"></div>
    <div class="parallex second-parallex"></div>
    <div id="lastDiv"></div>
    
4- in the jquery ready function applay the plugin to the document and add all plugins paramaters

    <script type="text/javascript">
        (function($) {
            $(document).MSNAV({
                // the elements than we need to applay the nav plugin on it
                elements: ["#firstDiv", "#secondDiv", "#lastDiv"],
                // optional just required in case you have a parallex sections with background image and you need to animate this image with scrolling
                parallex: [".first-parallex", ".second-parallex"],
                // the element that will wrap the bullets
                nav: $('#nav'),
                // the active class name
                currentClass: "current",
                // the scrolling speed
                scrollSpeed: 750
            });
        }(jQuery));
    </script>

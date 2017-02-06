// content.js

(function() {

    var Def = function() {
        return constructor.apply(this, arguments);
    }

    function constructor() {

        var plugin = this;
        var modyoVersion = $('meta[name=modyo-version]').attr("content");

        if (!modyoVersion) {
            return false;
        }

        console.log('ModyoSuperpowers', 'init');

        //ToDo: Optimize calls
        // $("html").bind("DOMSubtreeModified", function() {
        //     plugin.makeBetterSnippets();
        // });


        $(document).on('click', "a[href='#snippets']", function() {
            console.log("test");
            plugin.makeBetterSnippets();
        });


        $(document).keydown(function(event) {

            //Ctrl+w
            if ((event.ctrlKey || event.metaKey) && event.which == 87) {
                plugin.closeTab();
                event.preventDefault();
                return false;
            }

            // CMD+S or CTRL+S
            // If Control or Command key is pressed and the S key is pressed
            // run save function. 83 is the key code for S.
            if ((event.ctrlKey || event.metaKey) && event.which == 83) {
                // Save Function
                plugin.saveAll();
                event.preventDefault();
                return false;
            };
        });
    }


    makeBetterSnippets = function() {
        var plugin = this;

        if (!$('#snippet-list-container') || $('#snippet-list-container snippet-item').hasClass('superpowers')) {
            return;
        } else {
            $('#snippet-list-container snippet-item').addClass('superpowers');
        }


        // //Change snippets order
        //$("#snippets").append($('#snippets .accordion'));

        //Close accordion
        $("#snippets .show-hide:contains('[-]')").click();

        //Search
        if($('#snippets-search').length == 0){
            $('#snippet-list-container').prepend("<input type='text' id='snippets-search' placeholder='Buscar Snippet' class='span-col-half search'> ");
            $('#snippets-search').keyup(function(){
                console.log('Its alive');
                plugin.findSnippet();
            });
        }
        

        $('#snippet-list-container').find('.snippet-item').each(function(i, e) {

            var item = $(e).find("a").first();
            var data = item.data('id').split('_');
            var icon = item.find("i");

            //Add color 
            icon.removeClass("icon-file-alt");

            switch (data[0]) {
                case 'style':
                    icon.addClass("icon-css3");
                    icon.css("color", "green");
                    item.attr('href', item.attr('href').replace("template_type=html", "template_type=css"));
                    break;

                case 'script':
                    icon.addClass("icon-code");
                    icon.css("color", "blue");
                    break;

                case 'ng':
                    icon.addClass("icon-code");
                    icon.css("color", "red");
                    break;

                case 'html':
                    icon.addClass("icon-file-alt");
                    break;

                default:
                    icon.addClass("icon-file-alt");
            }



        });
    }

    saveAll = function() {
        $(".form-actions button:last-child").click();
    }

    closeTab = function() {
        console.log("Close tab");
        $(".header-tabs .active a")[0].click();
    }

    findSnippet = function() {

        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('snippets-search');
        filter = input.value.toUpperCase();
        ul = document.getElementById("snippet-list-container");
        li = ul.getElementsByTagName('div');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }


    //Init
    Def();
})();

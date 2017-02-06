// content.js

(function() {

    var Def = function() {
        return constructor.apply(this, arguments); 
    }

    function constructor() {

        var plugin = this;
        var modyoVersion = $('meta[name=modyo-version]').attr("content");
        
        if(!modyoVersion){
            return false;
        }

        console.log('ModyoSuperpowers', 'init');

        plugin.makeBetterSnippets();


        // CMD+S or CTRL+S
        $(document).keydown(function(event) {
            // If Control or Command key is pressed and the S key is pressed
            // run save function. 83 is the key code for S.
            if ((event.ctrlKey || event.metaKey) && event.which == 83) {
                // Save Function
                plugin.dummySave();
                event.preventDefault();
                return false;
            };
        });
    }


    makeBetterSnippets = function() {
        console.log('makeBetterSnippets');
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

    dummySave = function() {
        //Experimental
        $(".form-actions button:last-child").click();
    }

    findSnippet = function(){
        
    }


    //Init
    Def();
})();

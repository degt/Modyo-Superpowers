// content.js
$('#snippet-list-container').find('.snippet-item').each(function(i, e){
    
    var item = $(e).find("a").first();
    var data = item.data('id').split('_');
    var icon = item.find("i");

    //Add color 
    icon.removeClass("icon-file-alt");

    switch(data[0]){
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
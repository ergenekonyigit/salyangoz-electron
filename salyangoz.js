$(document).ready(function() {
    var salyangoz = $.getJSON('https://salyangoz.me/recent.json', function(salyangoz) {
        $.each(salyangoz.posts, function(key, value) {
            var li = $("<li>");
            var imagediv = $('<div/>').attr({
                class: 'image'
            });
            var contentdiv = $('<div/>').attr({
                class: 'content'
            });
            var profile =
                $('<img />').attr({
                    src: this['user'].profile_image,
                });
            var link = $("<h2/>");
            var a = $('<a />').attr({
                href: this['url'],
                target: '_blank'
            }).text(this['title']);
            link.append(a);
            var info = $('<h6/>')
            var t = new Date(this['updated_at']);
            var e = moment(t).fromNow();
            info.text(e + "  |  " + this['user'].user_name);
            imagediv.append(profile);
            contentdiv.append(link).append(info);
            li.append(imagediv).append(contentdiv)
            $("ul.icerik").append(li);
        });
    });

    $(document).on('click', 'a[href^="http"]', function(event) {
        const shell = require('electron').shell;
        event.preventDefault();
        shell.openExternal(this.href);
    });
});

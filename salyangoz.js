$(document).ready(function() {

    function salyangoz(e) {
        if (!e) {
            $('ul.icerik').css({
                'marginTop': '0px',
                opacity: 0
            });
        }

        var salyangoz = '';
        salyangoz = $.getJSON('https://salyangoz.me/recent.json', function(salyangoz) {
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
                info.text(this['user'].user_name + " · " + this['visit_count'] + " View" + " · " + e);
                imagediv.append(profile);
                contentdiv.append(link).append(info);
                li.append(imagediv).append(contentdiv)
                $("ul.icerik").append(li);
            });

        }).done(function() {
            $('ul.icerik').animate({
                'marginTop': '55px',
                opacity: 1
            }, 500)
        })

    }
    salyangoz();

    $('.refresh').on('click', function(e) {
        e.preventDefault();
        $('ul.icerik').animate({
            opacity: 0,
            'marginTop': '0px'
        },400).css({
            'marginTop': '0px',
            opacity: 0
        })
        salyangoz('a');

    })
    $(document).on('click', 'a[href^="http"]', function(event) {
        const shell = require('electron').shell;
        event.preventDefault();
        shell.openExternal(this.href);
    });
});

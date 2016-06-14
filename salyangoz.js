$(document).ready(function() {

    function salyangoz(e) {
        if (!e) {
            $('ul.icerik').css({
                'marginTop':'0px',
                opacity:0
            });
        }

        var salyangoz = '';
        $.ajaxSetup({ cache: false });
        salyangoz = $.ajax({
            url:'https://salyangoz.me/recent.json',
            cache:false,
            beforeSend:function(){

            },
            success:function(salyangoz){
              $('ul.icerik').empty();
              var post = '';
              post = salyangoz.posts;
                $.each(post, function(key, value) {
                    var li = $("<li>").attr({'id':this['id']});
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

                $('ul.icerik').animate({
                    'marginTop':'50px',
                    opacity:1
                },500);
                $('ul.icerik').scrollTop(0);
            }
        })

    }
    salyangoz();

    $('.refresh').on('click', function(e) {
        e.preventDefault();
        $('ul.icerik').animate({
            opacity:0,
            'marginTop':'0px'
        },400).css({
            'marginTop':'0px',
            opacity:0
        });
        salyangoz('a');
    })
    $(document).on('click', 'a[href^="http"]', function(event) {
        const shell = require('electron').shell;
        event.preventDefault();
        shell.openExternal(this.href);
    });
});

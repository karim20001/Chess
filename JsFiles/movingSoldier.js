function moveSoldier(id, className, dark_or_white, hit_dark_or_white, piece_color){
    
        let save_the_col = parseInt(className[className.length - 1]);

        let save_the_row = className.charCodeAt(className.length - 2) - 97;

        let temp = $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`);
        let temp1 = $(`.${rows[save_the_row - (1 * dark_or_white)]}${className[className.length - 1]}`)
        
        let temp2 = $(`.${rows[save_the_row - (2 * dark_or_white)]}${className[className.length - 1]}`)
        let child_class = $(`#${id}`).attr('class')
        let saver = $(`#${id}`).parent();
        $(`#${id}`).parent().html('');

        // check soldier can hit dark chess piece & not white ones
        // if (moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id)){
            
            if (save_the_col != 1){
                let rr = temp.children().attr('class')
                let u = temp.children().attr('id')
                // alert(rr)
                if ( temp.html() != '' && rr.search(`${hit_dark_or_white}`) != -1){
                    if (u.search('k') == -1)
                    if (if_check(rr.split(" "), hit_dark_or_white, piece_color))
                        temp.addClass('hit')
                }
            }
                   
            if (save_the_col != 8)
                if ( $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                    if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('id').search('k') == -1)
                    if (if_check($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).attr('class').split(" "), hit_dark_or_white, piece_color))
                        $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).addClass('hit')
                }
        // }
        //-------------------------------------------

        // check soldier can move forward
        
        
            if (temp1.html() == ''){
                if (if_check(temp1.attr('class').split(" "), hit_dark_or_white, piece_color))
                    temp1.addClass('active');
                
                if (temp2.html() == '' && (child_class === 'light-mohre' || child_class === 'dark-mohre')){
                    if (if_check(temp1.attr('class').split(" "), hit_dark_or_white, piece_color))    
                        temp2.addClass('active');
                }
            }
        //-------------------------------------------
        // console.log(id)
        saver.html(`<p class="${child_class}" id=${id}>♟</p>`);
        if (child_class === 'light-mohre'){
            $(".light-mohre").prop("onclick", null).off("click");
            $(`.${child_class}`).click(light_clicked)
        }
        else {
            $(".dark-mohre").prop("onclick", null).off("click");
            $(".dark-mohre").click(dark_clicked)
        }
        //animating moves
        
        $('.active, .hit').click(function (e) { 
            e.preventDefault();
            
            // the class & id object should go
            let class_name = e.target.className.split(" ");
            let id_obj = e.target.id;
            //alert(class_name.length)

            if (class_name.length < 2  || class_name[1] == 'second-move'){
                class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
            }

            animatingMoves(className, class_name, id, piece_color, '♟', ' second-move');
        });
}
function moveSoldier(id, className, dark_or_white, hit_dark_or_white, piece_color){
    
        let save_the_col = parseInt(className[className.length - 1]);

        let save_the_row = className.charCodeAt(className.length - 2) - 97;

        let temp = $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`);
        let state = true;

        // check soldier can hit dark chess piece & not white ones
        if (moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id)){
            if (save_the_col != 1)
                if ( temp.html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                    if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('id').search('k') == -1)
                        temp.addClass('hit')
                }
                        
            if (save_the_col != 8)
                if ( $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                    if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('id').search('k') == -1)
                        $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).addClass('hit')
                }
        }
        //-------------------------------------------

        // check soldier can move forward
        let temp1 = $(`.${rows[save_the_row - (1 * dark_or_white)]}${className[className.length - 1]}`)
        let temp2 = $(`.${rows[save_the_row - (2 * dark_or_white)]}${className[className.length - 1]}`)
                
        if (temp1.html() == ''){

            temp1.addClass('active');

            if (temp2.html() == '' && ($(`#${id}`).attr('class') === 'light-mohre' || $(`#${id}`).attr('class') === 'dark-mohre')){
                        
                temp2.addClass('active');
            }
        }
        //-------------------------------------------

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
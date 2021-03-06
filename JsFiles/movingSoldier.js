let pusan_checker = [null, null];

function moveSoldier(id, className, dark_or_white, hit_dark_or_white, piece_color, check_mate){
    
    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className.charCodeAt(className.length - 2) - 97;

    // let temp = document.getElementById(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`)
    let temp1 = $(`.${rows[save_the_row - (1 * dark_or_white)]}${className[className.length - 1]}`)
    
    let temp2 = $(`.${rows[save_the_row - (2 * dark_or_white)]}${className[className.length - 1]}`)
    let child_class = $(`#${id}`).attr('class')
    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');

    let sss = $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`);

    let check_for_check_mate = false;
    let y = false;

    if (save_the_col != 8){

        if (!check_mate)
            y = pusan_checker[0] != null && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).attr('class').split(" ")[1][1] == pusan_checker[0][1] && rows[rows.findIndex((a) => {return a == pusan_checker[0][0]}) - dark_or_white] == $(`.${rows[save_the_row -  dark_or_white]}${save_the_col + 1}`).attr('class').split(" ")[1][0];
        
        if (y || $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
            if ((y && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() == '') || $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('id').search('k') == -1)
            if (if_check($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).attr('class').split(" "), hit_dark_or_white, piece_color)){
                if (!check_mate)
                    $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).addClass('hit')
                else
                    check_for_check_mate = true;
            }   
        }
    }
    if (save_the_col != 1){
        
        if (!check_mate)
            y = pusan_checker[0] != null && sss.attr('class').split(" ")[1][1] == pusan_checker[0][1] && rows[rows.findIndex((a) => {return a == pusan_checker[0][0]}) - dark_or_white] == sss.attr('class').split(" ")[1][0];
        
        if (y || (sss.html() != '' && sss.children().attr('class').search(`${hit_dark_or_white}`) != -1)){
            if ((y && sss.html() == '') || sss.children().attr('id').search('k') == -1)
            if (if_check(sss.attr('class').split(" "), hit_dark_or_white, piece_color)){
                if (!check_mate)
                    sss.addClass('hit')
                else 
                    check_for_check_mate = true;
            }
        }
    }
    //-------------------------------------------

    // check soldier can move forward
    
    if (temp1.html() == ''){
        if (if_check(temp1.attr('class').split(" "), hit_dark_or_white, piece_color)){
            if (!check_mate)
                temp1.addClass('active');
            else 
                check_for_check_mate = true;
        }
        
        if (temp2.html() == '' && (child_class === 'light-mohre' || child_class === 'dark-mohre')){
            if (if_check(temp2.attr('class').split(" "), hit_dark_or_white, piece_color)){   
                if (!check_mate)
                    temp2.addClass('active');
                else 
                    check_for_check_mate = true;
            }
        }
    }
    //-------------------------------------------
    saver.html(`<p class="${child_class}" id=${id}>???</p>`);

    if (piece_color == 'light-mohre'){
        $(".dark-mohre").prop("onclick", null).off("click");
        $(".light-mohre").prop("onclick", null).off("click");
        $(".light-mohre").click(light_clicked)
    }
    else {
        $(".light-mohre").prop("onclick", null).off("click");
        $(".dark-mohre").prop("onclick", null).off("click");
        $(".dark-mohre").click(dark_clicked)
    }
    if (check_mate)
        return check_for_check_mate;
    //animating moves
    
    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        kish = false;

        if (pressed_undo)
            redo.makeNull();
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }
        if (class_name[2] == 'hit' && $(`.${class_name[1]}`).html() == ''){
            pusan_checker[1] = true;
        }
        else {
            pusan_checker[1] = false;
        }

        animatingMoves(className, class_name, id, piece_color, '???', ' second-move');

        if (piece_color == 'light-mohre'){
            
            if (className.split(" ")[1][0] != 'b'){
                setTimeout (function (){
                    if_check_then_checkMate(id, hit_dark_or_white, piece_color)
                }, 500)
            }
        }
        else {
            if (className.split(" ")[1][0] != 'g'){
                setTimeout (function (){
                    if_check_then_checkMate(id, hit_dark_or_white, piece_color)
                }, 500)
            }
        }
    });
}
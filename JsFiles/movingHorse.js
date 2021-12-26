function moveHorse (id, className, hit_dark_or_white, piece_color, check_mate){

    // save col position of horse
    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className.charCodeAt(className.length - 2) - 97;

    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');
    //--------------------------

    let check_for_check_mate = false;
    // if (moving_piece_notIn_same_col(className.split(" "), piece_color, id) && moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id))

    //check wich homes horse can go
    for (let j = save_the_row - 2; j <= save_the_row + 2; j++){

        if (j >= 0 && j < 8 && j != save_the_row){

            for (let k = save_the_col - 2; k <= save_the_col + 2; k++){

                if (k > 0 && k < 9){

                    if ( k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - save_the_row) < 2) && (Math.abs(k - save_the_col) != 1 || Math.abs(j - save_the_row) != 1)){
                        if (if_check($(`.${rows[j]}${k}`).attr('class').split(" "), hit_dark_or_white, piece_color)){
                            if ($(`.${rows[j]}${k}`).html() == ''){
                                if (!check_mate)
                                    $(`.${rows[j]}${k}`).addClass('active')
                                else 
                                    check_for_check_mate = true;
                            }
                            else if ($(`.${rows[j]}${k}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                                if ($(`.${rows[j]}${k}`).children().attr('id').search('k') == -1){
                                    if (!check_mate)
                                        $(`.${rows[j]}${k}`).addClass('hit')
                                    else
                                        check_for_check_mate = true;
                                }
                            }
                        }
                    }
                }

                    // if ($(`.${rows[j]}${k}`).children().attr('class').search('dark-mohre') != -1 && k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - i) < 2)){
                    //     $(`.${rows[j]}${k}`).addClass('hit')
                    // }
            }
        }
    }
    saver.html(`<p class = "${piece_color}" id = ${id}>♞</p>`);
    if (piece_color == 'light-mohre'){
        // console.log(666)
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
    //---------------------------------------------
    //animating

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

        animatingMoves(className, class_name, id, piece_color, '♞', '');
        setTimeout (function (){
            if_check_then_checkMate(id, hit_dark_or_white, piece_color)
        }, 500)

    });
}
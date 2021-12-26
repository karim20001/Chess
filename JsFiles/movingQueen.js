function moveQueen (id , className, hit_dark_or_white, piece_color, check_mate){

    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;

    // using rookh and bshop logic for queen

    // if (moving_piece_notIn_same_col(className.split(" "), piece_color) && moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id) && !check_oppenet){
        // if (rook_col_row){
        //     doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, className, id);
        //     doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, className, id);
        // }
        // if (!rook_col_row) {
        //     doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color,className, id);
        //     doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, className, id);
        // }
        // if (rook_col_row == undefined){
    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');

    let check_for_check_mate = false;

    if (!check_mate){
        doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color,false);
        doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, false);
        doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, false);
        doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, false);
            // }
            // saver.html(`<p class = "${piece_color}" id = ${id}>♛</p>`);
            // rook_col_row = undefined;
        // }
        // $(`#${id}`).parent().html('');
        doingBishop_logic(-1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color, false);
        doingBishop_logic(-1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color, false);
        doingBishop_logic(1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color, false);
        doingBishop_logic(1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color, false);
    }

    else {
        check_for_check_mate = (doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, true));

        check_for_check_mate = (doingBishop_logic(-1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color, true)|| doingBishop_logic(-1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color, true) || doingBishop_logic(1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color, true) || doingBishop_logic(1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color, true));
    }




    saver.html(`<p class = "${piece_color}" id = ${id}>♛</p>`);
    if (piece_color === 'light-mohre'){
        $(".light-mohre").prop("onclick", null).off("click");
        $(".light-mohre").click(light_clicked)
    }
    else {
        $(".dark-mohre").prop("onclick", null).off("click");
        $(".dark-mohre").click(dark_clicked)
    }

    if (check_mate)
        return check_for_check_mate;
    

    //------------------------------------------------------

    // animating part
    $('.active, .hit').click(function (e) { 
        e.preventDefault();

        kish = false;
        if (pressed_undo)
            redo.makeNull();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♛', '')
        setTimeout (function (){
            if_check_then_checkMate(id, hit_dark_or_white, piece_color)
        }, 500)
        
    });
}
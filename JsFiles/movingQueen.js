function moveQueen (id , className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;

    // using rookh and bshop logic for queen

    doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color);

    doingBishop_logic(-1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(-1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color);

    //------------------------------------------------------

    // animating part
    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♛', '')
    });
}
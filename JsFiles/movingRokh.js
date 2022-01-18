const check_secondRookh_move = [0, 0, 0, 0];
let rook_col_row = undefined;

function moveRokh(id, className, hit_dark_or_white, piece_color, check_mate){

    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;

    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');
    
    let check_for_check_mate = false;
    
    // if (moving_piece_notIn_same_col(className.split(" "), piece_color) && moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id)  && !check_oppenet){
    //     if (rook_col_row){
    //         doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, className, id);
    //         doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, className, id);
    //     }
    //     if (!rook_col_row) {
    //         doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color,className, id);
    //         doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, className, id);
    //     }
    //     if (rook_col_row == undefined){
        if (!check_mate){
            
            doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color, false);
            doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, false);
            doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, false);
            doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, false);
        }
        if (check_mate){
            
            check_for_check_mate = (doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color, true) || doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color, true));
        }
        saver.html(`<p class = "${piece_color}" id = ${id}>♜</p>`);
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
                
        $('.active, .hit').click(function (e) { 
            e.preventDefault();
            // set second move for rookh
            kish = false;

            if (pressed_undo)
                redo.makeNull();

            let tempory = 0;
            if (piece_color == 'dark-mohre')
                tempory = 2;
            check_secondRookh_move[parseInt(id[2]) - 1 + tempory]++;
            // the class & id object should go
            let class_name = e.target.className.split(" ");
            let id_obj = e.target.id;

            if (class_name.length < 2 || class_name[1] == 'second-move'){
                class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
            }

            animatingMoves(className, class_name, id, piece_color, '♜', '')
            
            setTimeout (function (){
                if_check_then_checkMate(id, hit_dark_or_white, piece_color)
            }, 500)
            
        });
    //alert(check_oppenet)
    
}

function doingRokh_logic (save_the_row, save_the_col, is_row, is_col, hit_dark_or_white, piece_color, check_mate){

        let cheker;

        for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col){
            cheker = true;
            var temp = $(`.${rows[i]}${j}`);

            
            if ( temp.html() == ''){
                // if (!id && !check_possible_kish_moves){
                    // if (true){
                        
                        if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color)){
                            if (!check_mate)
                                temp.addClass('active');
                            else
                                return true;
                            cheker = false;
                        }
                        else
                            cheker = false
                    // }
                    
                    // else {
                    //     temp.addClass('active');
                    //     cheker = false;
                    // }
                // }
                // else 
                // cheker = false
            }
            else if (temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){

                // if (true){

                    if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color)){
                        if (temp.children().attr('id').search('k') == -1){
                            if (!check_mate)
                                temp.addClass('hit');
                            else
                                return true;
                        }
                        
                    } 
                // }
                // else {
                //     if (temp.children().attr('id').search('k') == -1 && !id)
                //             temp.addClass('hit');
                //         if (temp.children().attr('id').search('k') != -1 && id){
                //             if (piece_color == 'white-mohre')
                //                 kish_white = true;
                //             else
                //                 kish_black = true;
                //             return false;
                //         }
                // }
                    
                
                break;
            }
            if (cheker && temp.children().attr('class').search(`${piece_color}`) != -1)
                break;
        }
        return false;
}
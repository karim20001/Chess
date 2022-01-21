const king_second_move = [0, 0]
function moveKing (id, className, hit_dark_or_white, piece_color, check_mate){

    if (kish)
        className = className.substring(0, className.length - 5);

    $('.cascade').prop('onclick', null).off('click');
    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;
    let cheker;

    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');

    let check_for_check_mate = false;

    for (let i = save_the_row - 1; i < save_the_row + 2; i++){
        
        if (i < 8 && i >= 0){
            for (let j = save_the_col - 1; j < save_the_col + 2; j++){

                if (j < 9 && j > 0 && (i != save_the_row || j != save_the_col)){
                    cheker = true;
                    var temp = $(`.${rows[i]}${j}`);

                    if ( temp.html() == ''){
                        temp.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);
                        if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color)){
                            if (!check_mate)
                                temp.addClass('active');
                            else 
                                check_for_check_mate = true;
                        }
                        cheker = false;
                        temp.html('')
                    }
                    if (cheker && temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
                        if (temp.children().attr('id').search('k') == -1){
                            let save_the_place = temp.html();
                            temp.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);
                            if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color)){
                                if (!check_mate)
                                    temp.addClass('hit');
                                else
                                    check_for_check_mate = true;
                            }

                            temp.html(save_the_place);
                        }
                    }
                }
            }
        }
    }

    let tempory = 0;
    let tempory_for_king = 0;

    if (!kish){
        // check castliing with rooks
        
        if (piece_color == 'dark-mohre'){
            tempory = 2;
            tempory_for_king = 1;
        }

        for (let i = save_the_col - 1; i > 0; i--){
            let moving_obj = $(`.${rows[save_the_row]}${i}`);

            if (moving_obj.html() != '' && i > 1)
                break;

            if (i == 1 && check_secondRookh_move[0 + tempory] === 0 && king_second_move[tempory_for_king] === 0 && moving_obj.html() != ''){
                
                if (if_check(moving_obj.attr('class').split(" "), hit_dark_or_white, piece_color) && if_check($(`.${rows[save_the_row]}3`).attr('class').split(" "), hit_dark_or_white, piece_color))
                    moving_obj.addClass('cascade');
            }

        }
        for (let i = save_the_col + 1; i < 9; i++){
            let moving_obj = $(`.${rows[save_the_row]}${i}`);

            if (moving_obj.html() != '' && i < 8)
                break;

            if (i == 8 && check_secondRookh_move[1 + tempory] === 0 && king_second_move[tempory_for_king] === 0 && moving_obj.html() != ''){
                if (if_check(moving_obj.attr('class').split(" "), hit_dark_or_white, piece_color) && if_check($(`.${rows[save_the_row]}7`).attr('class').split(" "), hit_dark_or_white, piece_color))
                    moving_obj.addClass('cascade');
            }

        }
    }

    saver.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);
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

    //-----------------------------------------------------

    $('.active, .hit').click(function (e) {
        e.preventDefault();
        if (piece_color == 'dark-mohre')
            tempory_for_king = 1;

        kish = false;
        king_second_move[tempory_for_king]++;

        if (pressed_undo)
            redo.makeNull();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }
        animatingMoves(className, class_name, id, piece_color, '♚', '')
    });

    //---------------------------------------------------------------

    $('.cascade').click(function (e) { 
        e.preventDefault();

        if (piece_color == 'dark-mohre')
            tempory_for_king = 1;
        king_second_move[tempory_for_king]++;

        // remove listener of active & hit classes
        
            
        $('.active').prop('onclick', null).off('click')
        $('.hit').prop('onclick', null).off('click')
        $('.cascade').prop('onclick', null).off('click')

        
        // remove active from all elements
        $('.light, .dark').removeClass('active');
        $('.light, .dark').removeClass('hit');
        $('.light').removeClass('cascade');
        $('.dark').removeClass('cascade');
        $('.cascade').prop('onclick', null).off('click')
        

        castling(e.target.id, e.target.className.split(" "), tempory_for_king, id, className, save_the_row, save_the_col, piece_color, false);
        return;
    })
}

function castling (e, rook_parent, tempory_for_king, id, className, save_the_row, save_the_col, piece_color, redoing, if_history){

    if (!if_history){
        change_side();
        if (!redoing){
            if (pressed_undo)
            redo.makeNull();
        }
    }

    let rookh_id = e;
    let rookh_parent_class;
    // console.log(rookh_id)
    if (rookh_id != '')
        rookh_parent_class = $(`#${rookh_id}`).parent().attr('class').split(" ");
    else{
        rookh_parent_class = rook_parent;
        rookh_id = $(`.${rookh_parent_class[1]}`).children().attr('id');
    }

    $(`.${rookh_parent_class}`).off('click');
    
    let king_going_position, rookh_going_position;

    if (rookh_id[2] == '1'){
        king_going_position = -2 * 53;
        rookh_going_position = 3 * 53;
    }
    else {
        king_going_position = +2 * 53;
        rookh_going_position = -2 * 53;
    }

    $(`#${id}`).animate({
        left: `+=${king_going_position}`
    }, 500)

    $(`#${rookh_id}`).animate({
        left: `+=${rookh_going_position}`
    }, 500)

    setTimeout(function(){
        let temp = className.substring(className.length - 2)

        $(`.${temp}`).html('');
        temp = `${rows[save_the_row]}${parseInt(save_the_col) + king_going_position / 53}`;
        let saver = temp;
        
        $(`.${temp}`).html(`<p class="${piece_color}" id=${id}>♚</p>`)

        $(`.${rookh_parent_class[1]}`).html('');
        
        temp = `${rows[save_the_row]}${parseInt(rookh_parent_class[1][1]) + rookh_going_position / 53}`
        $(`.${temp}`).html(`<p class="${piece_color}" id=${rookh_id}>♜</p>`)

        let action = new Action(`${id} ${rookh_id}`, `${className.split(" ")[1]} ${rookh_parent_class[1]}`, `${saver} ${temp}`, null, null)
        let position = Log.head;
    
        while (position != null){
            if (position.next == null)
                break;
            position = position.next;
            
        }

        undo.push(action);
        if (!redoing){
            Log.insert(position, action);
            showHistory_on_browser(action);
        }
    }, 495)

}
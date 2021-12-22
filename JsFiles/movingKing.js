const king_second_move = [false, false]
function moveKing (id, className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;
    let cheker;

    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');

    for (let i = save_the_row - 1; i < save_the_row + 2; i++){
        
        if (i < 8 && i >= 0){
            for (let j = save_the_col - 1; j < save_the_col + 2; j++){

                if (j < 9 && j > 0 && (i != save_the_row || j != save_the_col)){
                    cheker = true;
                    var temp = $(`.${rows[i]}${j}`);

                    if ( temp.html() == ''){
                        temp.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);
                        if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color)){
                            temp.addClass('active');
                        }
                        cheker = false;
                        temp.html('')
                    }
                    if (cheker && temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
                        if ($(`.${rows[j]}${k}`).children().attr('id').search('k') == -1){
                            temp.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);
                            if (if_check(temp.attr('class').split(" "), hit_dark_or_white, piece_color))
                                temp.addClass('hit');

                            temp.html('');
                        }
                    }
                }
            }
        }
    }

    // check cascading with rookhs
    let tempory = 0;
    let tempory_for_king = 0;
    if (piece_color == 'dark-mohre'){
        tempory = 2;
        tempory_for_king = 1;
    }

    for (let i = save_the_col - 1; i > 0; i--){
        let moving_obj = $(`.${rows[save_the_row]}${i}`);

        if (moving_obj.html() != '' && i > 1)
            break;

        if (i == 1 && !check_secondRookh_move[0 + tempory] && !king_second_move[tempory_for_king]){
            if (if_check(moving_obj.attr('class').split(" "), hit_dark_or_white, piece_color))
                moving_obj.addClass('cascade');
        }

    }
    for (let i = save_the_col + 1; i < 9; i++){
        let moving_obj = $(`.${rows[save_the_row]}${i}`);

        if (moving_obj.html() != '' && i < 8)
            break;

        if (i == 8 && !check_secondRookh_move[0 + tempory] && !king_second_move[tempory_for_king]){
            if (if_check(moving_obj.attr('class').split(" "), hit_dark_or_white, piece_color))
                moving_obj.addClass('cascade');
        }

    }

    saver.html(`<p class = "${piece_color}" id = ${id}>♚</p>`);

    //-----------------------------------------------------

    $('.active, .hit').click(function (e) { 
        e.preventDefault();

        king_second_move[tempory_for_king] = true;
        
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

        king_second_move[tempory_for_king] = true;

        second = 0;
        counter();

        let rookh_id = e.target.id;
        let rookh_parent_class;
        // console.log(rookh_id)
        if (rookh_id != '')
            rookh_parent_class = $(`#${rookh_id}`).parent().attr('class').split(" ");
        else{
            rookh_parent_class = e.target.className.split(" ")
            rookh_id = $(`.${rookh_parent_class[1]}`).children().attr('id');
        }
        
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

        // remove listener of active & hit classes
        $('.active').prop('onclick', null).off('click')
        $('.hit').prop('onclick', null).off('click')
        $('.cascade').prop('onclick', null).off('click');

        // remove active from all elements
        $('.light, .dark').removeClass('active');
        $('.light, .dark').removeClass('hit');
        $('.light, .dark').removeClass('cascade');

        setTimeout(function(){
            let temp = className.substring(className.length - 2)

            $(`.${temp}`).html('');
            temp = `${rows[save_the_row]}${parseInt(save_the_col) + king_going_position / 53}`;
            
            $(`.${temp}`).html(`<p class="${piece_color}" id=${id}>♚</p>`)

            $(`.${rookh_parent_class[1]}`).html('');
            
            temp = `${rows[save_the_row]}${parseInt(rookh_parent_class[1][1]) + rookh_going_position / 53}`
            $(`.${temp}`).html(`<p class="${piece_color}" id=${rookh_id}>♜</p>`)
        
        }, 495)

    });
}
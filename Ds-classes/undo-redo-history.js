function to_undo (){

    if (undo.peek() == undefined)
        return;

    const move = undo.pop();
    redo.push(move);
    pressed_undo = true;

    second = 0;
    counter();

    
    let destination = move.destination;
    setTimeout(function (){

        if (move.destination.split(" ").length == 1){
            if (move.mohre[0] == 's'){

                if (move.mohre[1] == 'w'){
                    if (move.origin[0] == 'g')
                    $(`.${move.origin}`).html(`<p class="light-mohre" id="${move.mohre}">♟</p>`)

                    else
                        $(`.${move.origin}`).html(`<p class="light-mohre second-move" id="${move.mohre}">♟</p>`)
                }

                else if (move.mohre[1] == 'd'){
                    if (move.origin[0] == 'b')
                        $(`.${move.origin}`).html(`<p class="dark-mohre" id="${move.mohre}">♟</p>`)

                    else
                        $(`.${move.origin}`).html(`<p class="dark-mohre second-move" id="${move.mohre}">♟</p>`)
                }
                    
            }
            else {
                let temp = $(`.${destination}`).html();
                $(`.${move.origin}`).html(temp);
            }
            

            if (move.deleted == null){
                $(`.${destination}`).html('');
            }
            else {
                let piece_shape;
                switch (move.deleted[0]){
                    case 's':
                        piece_shape = '♟'
                        break;
                    case 'r':
                        piece_shape = '♜'
                        break;
                    case 'h':
                        piece_shape = '♞';
                        break;
                    case 'e':
                        piece_shape = '♝';
                        break;
                    case 'v':
                        piece_shape = '♛'
                        break;
                }

                if (move.deleted[1] == 'w'){
                    document.getElementById('black1').innerHTML = document.getElementById('black1').innerHTML.replace(piece_shape, '')
                    let if_soldier = ' second-move';
                    if (piece_shape == '♟' && destination[0] == 'g')
                        if_soldier = '';
                    $(`.${destination}`).html(`<p class="light-mohre${if_soldier}" id="${move.deleted}">${piece_shape}</p>`);
                }
                else {
                    document.getElementById('white1').innerHTML = document.getElementById('white1').innerHTML.replace(piece_shape, '')
                    let if_soldier = ' second-move';
                    if (piece_shape == '♟' && destination[0] == 'g')
                        if_soldier = '';
                    $(`.${destination}`).html(`<p class="dark-mohre${if_soldier}" id="${move.deleted}">${piece_shape}</p>`);
                }
                
            }
        }

        else {
            destination = destination.split(" ");

            let temp = $(`.${destination[0]}`).html();
            $(`.${move.origin.split(" ")[0]}`).html(temp);
            $(`.${destination[0]}`).html("")
            temp = $(`.${destination[1]}`).html();
            $(`.${move.origin.split(" ")[1]}`).html(temp);
            $(`.${destination[1]}`).html("")
        }

    }, 20)

}

function to_redo (history_obj, if_history){
    

    let move;
    let second_move;
    if (!if_history){

        if (redo.peek() == undefined)
        return;

        move = redo.pop();
        // undo.push(move);

        second_move = '';
        if (move.destination.split(" ").length == 1){
            if (move.mohre[0] == 's'){

                if (move.mohre[1] == 'w'){

                    if (move.origin[0] != 'b'){
                        second_move = ' second-move';
                    }
                }
                else {
                    if (move.origin[0] != 'g'){
                        second_move = ' second-move';
                    }
                }
            }
        }
    }
    else {
        move = history_obj;
        second_move = '';
    }

    let piece_color;
    // console.log(move.mohre[1])
    if (move.mohre[1] == 'w')
        piece_color = 'light-mohre';
    else 
        piece_color = 'dark-mohre';

    if (move.destination.split(" ").length == 1){
        let piece_shape;
        switch (move.mohre[0]){
            case 's':
                piece_shape = '♟'
                break;
            case 'r':
                piece_shape = '♜'
                break;
            case 'h':
                piece_shape = '♞';
                break;
            case 'e':
                piece_shape = '♝';
                break;
            case 'v':
                piece_shape = '♛'
                break;
            case 'k':
                piece_shape = '♚'
                break;
        }

        let temp = 'null ' + move.origin;
        let temp1 = [null, move.destination];
        animatingMoves(temp, temp1, move.mohre, piece_color, piece_shape, second_move, true, if_history);
    }
    else {

        let rook_id = move.mohre.split(" ")[1];
        let king_id = move.mohre.split(" ")[0];
        let rook_class = move.origin.split(" ")[1];
        let king_class = $(`#${king_id}`).parent().attr('class');

        let tempory = 0;
        let tempory_for_king = 0;
        
        if (rook_id[1] == 'd'){
            tempory = 2;
            tempory_for_king = 1;
        }

        let save_the_col = parseInt(king_class[king_class.length - 1]);
        let save_the_row = king_class[king_class.length - 2].charCodeAt(0) - 97;

        castling(rook_id, rook_class, tempory_for_king, king_id, king_class, save_the_row, save_the_col, piece_color, true)
        // undo.push(move);
        return;
    }


    let color;
    if (move.mohre[1] == 'w'){
        color = 'light-mohre';
    }
    else {
        color = 'dark-mohre';
    }
    setTimeout( function(){
        if (move.last_soldier != null){
            console.log(445)
            let soldier = move.last_soldier.split(" ");
            $(`.${move.destination}`).html(`<p class="${color}" id="${soldier[0]}">${soldier[1]}</p>`)
        }
    }, 505);
}

var history_counter = 1;

function showHistory_on_browser (the_log){
    let history_section = $(".history-section").html();
    let white_player_or_dark;
    if (the_log.mohre[1] == 'w'){
        white_player_or_dark = 'white';
    }
    else
        white_player_or_dark = 'black';
    let shape;
    switch(the_log.mohre[0]){
        case 's':
            shape = 'soldier'
            break;
        case 'r':
            shape = 'rook'
            break;
        case 'h':
            shape = 'horse';
            break;
        case 'e':
            shape = 'bishop';
            break;
        case 'v':
            shape = 'queen'
            break;
        case 'k':
            shape = 'king';
            break;
    }
    let desti = the_log.destination
    if (the_log.destination.split(" ").length > 1)
        desti = the_log.destination.split(" ")[0];
    let new_log = `<p class="history-click" id="${history_counter}">${history_counter}. ${white_player_or_dark} ${shape} ${desti}</p>`
    history_counter++;

    history_section += new_log;
    $(".history-section").html(history_section);
    $('.history-click').prop('onclick', null).off('click');
    $(".history-click").click(show_history_on_board)
}

function show_history_on_board (event){

    history_id = parseInt(event.target.id);
    let specified_pos = Log.head;

    for (let i = 0; i < history_id - 1; i++){
        specified_pos = specified_pos.next;
    }

    let current_rook;
    let current_rook_parent;
    let current_saver = specified_pos.data.mohre;
    let current_origin_parent;
    let current_origin;
    let current_destination;
    let prev_origin, prev_rook, current_rook_destination;

    if (current_saver.split(" ").length == 1){
        current_origin_parent =  $(`#${current_saver}`).parent();
        current_origin = current_origin_parent.html();
        current_destination = $(`.${specified_pos.data.destination}`).html();
        $(`#${current_saver}`).parent().html('');
        prev_origin = $(`.${specified_pos.data.origin}`).html();
    }
    else {
        current_saver = specified_pos.data.mohre.split(" ");
        current_origin_parent =  $(`#${current_saver[0]}`).parent();
        current_origin = current_origin_parent.html();
        current_destination = $(`.${specified_pos.data.destination.split(" ")[0]}`).html();
        prev_origin = $(`.${specified_pos.data.origin.split(" ")[0]}`).html();
        $(`#${current_saver[0]}`).parent().html('');

        current_rook_parent = $(`#${current_saver[1]}`).parent();
        current_rook = current_rook_parent.html();
        current_rook_destination = $(`.${specified_pos.data.destination.split(" ")[1]}`).html();
        prev_rook = $(`.${specified_pos.data.origin.split(" ")[1]}`).html();
        console.log(prev_origin)
        $(`#${current_saver[1]}`).parent().html('');
    }


    
    
    
    let piece_shape = [];
    
    for (let i = 0; i < 2; ++i){
        let search = specified_pos.data.mohre.split(" ")[0];
        

        if (i == 1)
            search = specified_pos.data.deleted;
        if (search == null){
            piece_shape[1] = null;
            break;
        }
        switch(search[0]){
            case 's':
                piece_shape[i] = '♟'
                break;
            case 'r':
                piece_shape[i] = '♜'
                break;
            case 'h':
                piece_shape[i] = '♞';
                break;
            case 'e':
                piece_shape[i] = '♝';
                break;
            case 'v':
                piece_shape[i] = '♛'
                break;
            case 'k':
                piece_shape[i] = '♚';
                break;
        }
    }
    let colors = [];

    console.log(piece_shape[0])
    if (specified_pos.data.mohre.split(" ")[0][1] == 'w'){

        colors[0] = 'light-mohre';
        if (piece_shape[1] != null){
            colors[1] = 'dark-mohre';
        }
    }
    else {
        colors[0] = 'dark-mohre';
        if (piece_shape[1] != null){
            colors[1] = 'light-mohre';
        }
    }
    $(`.${specified_pos.data.origin.split(" ")[0]}`).html(`<p class="${colors[0]}" id="${specified_pos.data.mohre.split(" ")[0]}">${piece_shape[0]}</p>`)
    if (specified_pos.data.origin.split(" ").length > 1){
        $(`.${specified_pos.data.origin.split(" ")[1]}`).html(`<p class="${colors[0]}" id="${specified_pos.data.mohre.split(" ")[1]}">♜</p>`)
    }
    if (piece_shape[1] != null)
        $(`.${specified_pos.data.destination.split(" ")[0]}`).html(`<p id="${specified_pos.data.deleted}" class="${colors[1]}">${piece_shape[1]}</p>`)
    
    else {
        $(`.${specified_pos.data.destination.split(" ")[0]}`).html('');
        if (specified_pos.data.origin.split(" ").length > 1){
            $(`.${specified_pos.data.destination.split(" ")[1]}`).html('');
        }
    }
    setTimeout(function (){
        to_redo(specified_pos.data, true);
    }, 100)

    setTimeout(function(){
        $(`.${specified_pos.data.destination.split(" ")[0]}`).html(current_destination);
        $(`.${specified_pos.data.origin.split(" ")[0]}`).html(prev_origin);
        current_origin_parent.html(current_origin);
       
        if (specified_pos.data.origin.split(" ").length > 1){
            $(`.${specified_pos.data.destination.split(" ")[1]}`).html(current_rook_destination);
            // $(`.${specified_pos.data.origin.split(" ")[1]}`).html(prev_rook);
            current_rook_parent.html(current_rook)
        }
    }, 800)
    
}
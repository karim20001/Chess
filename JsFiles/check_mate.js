let kish = false;
let kish_white = false;
let kish_black = false;

function if_check(id, hit_dark_or_white, piece_color) {


    let temp;
    if (true) {
        if (piece_color == 'dark-mohre') {
            piece_color = 'light-mohre'
            hit_dark_or_white = 'dark-mohre'
        }
        else {
            piece_color = 'dark-mohre'
            hit_dark_or_white = 'light-mohre'
        }

        const _all_opennet = $(`.${piece_color}`);

        for (let i = 0; i < _all_opennet.length; i++) {

            temp = true;
            if ($(`.${id[1]}`).html() == '')
                $(`.${id[1]}`).html(`<p class = ${piece_color}>rr</p>`)

            switch (_all_opennet[i].id[0]) {

                case "r":

                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]) {
                        temp = check_mate_rook($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                    }

                    break;
                case 's':
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]) {
                        temp = soldier_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white)
                    }
                    break;
                case 'h':

                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]) {
                        temp = horse_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white)
                    }
                    break;
                case 'e':

                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1])
                        temp = bishop_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)

                    break;
                case 'v':

                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]) {
                        temp = check_mate_rook($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                    }
               
                    if (!temp){
                        if ($(`.${id[1]}`).children().html() == 'rr'){
                            $(`.${id[1]}`).html('')
                        }
                        return false;
                    }

                        
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1])
                    temp  = bishop_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                    let temp1;
                    
                    break;
                case 'k':
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1])
                        temp = king_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white)
                    break;
            }
            if ($(`.${id[1]}`).children().html() == 'rr')
                $(`.${id[1]}`).html('')

            if (!temp)
                return false;
        }
        return true;
    }
}

function check_mate_rook(className, hit_dark_or_white, piece_color) {

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;


    return (ww(1, 0) && ww(-1, 0) && ww(0, 1) && ww(0, -1))

    function ww(is_row, is_col) {

        for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col) {
            let cheker = true;
            var temp = $(`.${rows[i]}${j}`);

            if (temp.html() == '') {
                cheker = false
            }



            else if (temp.children().attr('class').search(hit_dark_or_white) != -1) {

                if (temp.children().attr('id').search('k') != -1) {
                    return false;
                }
                break;
            }
            if (cheker && temp.children().attr('class').search(`${piece_color}`) != -1)
                break;
        }
        return true;
    }
}

function bishop_check_mate(className, hit_dark_or_white, piece_color) {

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;

    return (logic(-1, -1) && logic(-1, 1) && logic(1, -1) && logic(1, 1));

    function logic(zaribI, zaribJ) {

        for (let i = save_the_row + zaribI, j = save_the_col + zaribJ; i >= 0 && i < 8 && j > 0 && j < 9; j += zaribJ, i += zaribI) {
            cheker = true;
            var temp = $(`.${rows[i]}${j}`);

            if (temp.html() == '') {
                cheker = false;
            }
            
            else if (temp.children().attr('class').search(hit_dark_or_white) != -1) {
                if (temp.children().attr('id').search('k') != -1) {
                    return false;
                }
                break;
            }
            if (cheker && temp.children().attr('class').search(`${piece_color}`) != -1)
                break;
        }
        return true;
    }
}

function horse_check_mate(className, hit_dark_or_white) {
    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;

    for (let j = save_the_row - 2; j <= save_the_row + 2; j++) {

        if (j >= 0 && j < 8 && j != save_the_row) {

            for (let k = save_the_col - 2; k <= save_the_col + 2; k++) {

                if (k > 0 && k < 9) {

                    if (k != parseInt(className[1][1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - save_the_row) < 2) && (Math.abs(k - save_the_col) != 1 || Math.abs(j - save_the_row) != 1)) {
                        if ($(`.${rows[j]}${k}`).html() != '' && $(`.${rows[j]}${k}`).children().attr('class').search(`${hit_dark_or_white}`) != -1) {
                            if ($(`.${rows[j]}${k}`).children().attr('id').search('k') != -1)
                                return false
                        }
                    }
                }
            }
        }
    }
    return true;
}

function soldier_check_mate(className, hit_dark_or_white) {

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;
    let dark_or_white;
    if (hit_dark_or_white == 'light-mohre')
        dark_or_white = -1;
    else
        dark_or_white = 1;

    let temp = $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`);
   
    if (save_the_col != 8)
        if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1) {
            if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('id').search('k') != -1)
                return false;
        }

        if (save_the_col != 1){
            
            if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1) {
                if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('id').search('k') != -1)
                    return false;
            }
        }
    return true;
}

function king_check_mate(className, hit_dark_or_white) {

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;

    for (let i = save_the_row - 1; i < save_the_row + 2; i++) {

        if (i < 8 && i >= 0) {
            for (let j = save_the_col - 1; j < save_the_col + 2; j++) {

                if (j < 9 && j > 0) {
                    var temp = $(`.${rows[i]}${j}`);

                    if (temp.html() != '' && cheker && temp.children().attr('class').search(`${hit_dark_or_white}`) != -1) {
                        if (temp.children().attr('id').search('k') != -1)
                            return false;
                    }
                }
            }
            return true;
        }
    }
}

function if_check_then_checkMate(id, hit_dark_or_white, piece_color) {

    let temp = true;
    let checkMate_or_pat = true;
    const _all_of_pieces_own = $(`.${piece_color}`);

    for (let i = 0; i < _all_of_pieces_own.length; i++){

        let mohre_id = _all_of_pieces_own[i].id
        switch (mohre_id[0]) {

            case "s":
                temp = soldier_check_mate($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white)
                break;
            case "r":
                temp = check_mate_rook($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                break;
            case "h":
                temp = horse_check_mate($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white)
                break;
            case "e":
                temp = bishop_check_mate($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                break;
            case "v":

                temp = check_mate_rook($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                if (!temp)
                    break;
                temp = bishop_check_mate($(`#${mohre_id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                break;
        }
        if (!temp){
            checkMate_or_pat = temp;
            break;
        }
    }
    if (true){

        if (!temp){
            kish = true;
            if (piece_color == 'light-mohre'){
                $('#kd1').parent().addClass('kish');
            }
            else {
                $('#kw1').parent().addClass('kish');
            }
            setTimeout(function (){
                document.getElementById("when-kish").play();
            }, 50)
        }
        else{
            kish = false;
        }
        const _all_own = $(`.${hit_dark_or_white}`)

        for (let i = 0; i < _all_own.length; i++){

            let mohre_id = _all_own[i].id
            let parent_class = $(`#${mohre_id}`).parent().attr('class');
            let dark_or_white;
            if (piece_color == 'light-mohre')
                dark_or_white = -1;
            else
                dark_or_white = 1;
            switch (mohre_id[0]) {

                case "s":
                    temp = moveSoldier(mohre_id, parent_class, dark_or_white, piece_color, hit_dark_or_white, true)
                    break;
                case "r":
                    temp = moveRokh(mohre_id, parent_class, piece_color, hit_dark_or_white, true)
                    break;
                case "h":
                    temp = moveHorse(mohre_id, parent_class, piece_color, hit_dark_or_white, true)
                    break;
                case "e":
                    temp = moveBshop(mohre_id, parent_class, piece_color, hit_dark_or_white, true)
                    break;
                case "v":
                    temp = moveQueen(mohre_id, parent_class, piece_color, hit_dark_or_white, true)
                    
                    break;
                case "k":
                    temp = moveKing(mohre_id, parent_class, piece_color, hit_dark_or_white, true)
            }
            if (temp){
                return;
            }
        }
        if (!checkMate_or_pat){
            let player_win = white_player;
            if (piece_color == 'dark-mohre')
                player_win = black_player;
            game_finished(player_win)
        }

        else 
            alert ("pat !!!")
        return;

    }
    else
        kish = false;
}
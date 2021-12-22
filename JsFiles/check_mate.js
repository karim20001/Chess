let kish = false;
let kish_white = false;
let kish_black = false;

function if_check (id, hit_dark_or_white, piece_color){

    
    let temp;
    if (true){
        if (piece_color == 'dark-mohre'){
            piece_color = 'light-mohre'
            hit_dark_or_white = 'dark-mohre'
        }
        else {
            piece_color = 'dark-mohre'
            hit_dark_or_white = 'light-mohre'
        }

        const _all_opennet = $(`.${piece_color}`);

        for (let i = 0; i < _all_opennet.length; i++){

            temp = true;
            if ($(`.${id[1]}`).html() == '')
                $(`.${id[1]}`).html(`<p class = ${piece_color}>rr</p>`)
            
            switch (_all_opennet[i].id[0]){

                case "r":
                     
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]){
                        temp = check_mate_rook($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                        // console.log(id[1])
                    }

                    break;
                case 's':
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]){
                        temp = soldier_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white)
                        // console.log(id[1])
                    }
                    break;
                case 'h':
                        
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]){
                        temp = horse_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white)
                        // console.log(id[1])
                    }
                    break;
                case 'e':
                        
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1])
                        temp = bishop_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)

                    break;
                case 'v':
                    
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1]){
                        temp = check_mate_rook($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
                    }
                    else
                        return true;

                    if ($(`.${id[1]}`).children().html() == 'rr')
                        $(`.${id[1]}`).html('')

                    if (!temp)
                        return false;
                            
                    if (id[1] != $(`#${_all_opennet[i].id}`).parent().attr('class').split(" ")[1])
                        temp = bishop_check_mate($(`#${_all_opennet[i].id}`).parent().attr('class').split(" "), hit_dark_or_white, piece_color)
    
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
    
    else {
        let className = $(`#${id}`).parent().attr('class').split(" ");

        let ss;
        
        if (piece_color == 'white-mohre'){
            ss = 1;
        }
        else 
            ss = -1;
        switch (id[0]){

            case "s":
                temp = moveSoldier(id, className, ss, hit_dark_or_white, piece_color)
                break;
            case "r":
                moveRokh(id, className[1], hit_dark_or_white, piece_color, true, false)
                
                break;
            case "h":
                moveHorse(id, className, hit_dark_or_white, piece_color)
                break;
            case "e":
                moveBshop(id, className, hit_dark_or_white, piece_color)
                break;
            case "v":
               temp = moveQueen(id, className, hit_dark_or_white, piece_color, true, false)
                break;
            case "k":
                moveKing(id, className, hit_dark_or_white, piece_color)
                break;
        }
    }
}

function check_mate_rook (className, hit_dark_or_white, piece_color){
    
    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;


        return(ww(1, 0) && ww(-1, 0) && ww(0, 1) && ww(0, -1))

        function ww (is_row, is_col){
            
            for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col){
                let cheker = true;
                var temp = $(`.${rows[i]}${j}`);
                
                if ( temp.html() == ''){
                    cheker = false
                }
                
                

                else if (temp.children().attr('class').search(hit_dark_or_white) != -1){
                    
                    if (temp.children().attr('id').search('k') != -1){
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

function bishop_check_mate (className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;
    // console.log(save_the_col)

    return ( logic(-1, -1) && logic(-1, 1) && logic(1, -1) && logic(1, 1) );

    function logic(zaribI, zaribJ){

        for (let i = save_the_row + zaribI, j = save_the_col + zaribJ; i >= 0 && i < 8 && j > 0 && j < 9; j += zaribJ, i += zaribI){
            cheker = true;
            var temp = $(`.${rows[i]}${j}`);
    
            if ( temp.html() == ''){
                cheker = false;
            }
            else if (temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
                if (temp.children().attr('id').search('k') != -1){
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

function horse_check_mate (className, hit_dark_or_white){
    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;

    for (let j = save_the_row - 2; j <= save_the_row + 2; j++){

        if (j >= 0 && j < 8 && j != save_the_row){

            for (let k = save_the_col - 2; k <= save_the_col + 2; k++){

                if (k > 0 && k < 9){
                    
                    if ( k != parseInt(className[1][1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - save_the_row) < 2) && (Math.abs(k - save_the_col) != 1 || Math.abs(j - save_the_row) != 1)){
                        if ($(`.${rows[j]}${k}`).html() != '' && $(`.${rows[j]}${k}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                            if ($(`.${rows[j]}${k}`).children().attr('id').search('k') != -1)
                                return false
                        }
                    }
                }

                    // if ($(`.${rows[j]}${k}`).children().attr('class').search('dark-mohre') != -1 && k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - i) < 2)){
                    //     $(`.${rows[j]}${k}`).addClass('hit')
                    // }
            }
        }
    }
    return true;
}

function soldier_check_mate (className, hit_dark_or_white){

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;
    let dark_or_white;
    if (hit_dark_or_white == 'light-mohre')
        dark_or_white = -1;
    else
        dark_or_white = 1;

    let temp = $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`);

        // check soldier can hit dark chess piece & not white ones
        // if (moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id)){
            if (save_the_col != 1)
                if ( temp.html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                    if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col - 1}`).children().attr('id').search('k') != -1)
                        return false
                }
                        
            if (save_the_col != 8)
                if ( $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).html() != '' && $(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                    if ($(`.${rows[save_the_row - (1 * dark_or_white)]}${save_the_col + 1}`).children().attr('id').search('k') != -1)
                        return false;
                }
        // }
        return true;
        //-------------------------------------------

        // check soldier can move forward
        // let temp1 = $(`.${rows[save_the_row - (1 * dark_or_white)]}${className[className.length - 1]}`)
        // let temp2 = $(`.${rows[save_the_row - (2 * dark_or_white)]}${className[className.length - 1]}`)
                
        // if (temp1.html() == ''){

        //     temp1.addClass('active');

        //     if (temp2.html() == '' && ($(`#${id}`).attr('class') === 'light-mohre' || $(`#${id}`).attr('class') === 'dark-mohre')){
                        
        //         temp2.addClass('active');
        //     }
        // }
        //-------------------------------------------
}

function king_check_mate (className, hit_dark_or_white){

    let save_the_col = parseInt(className[1][1]);
    let save_the_row = className[1].charCodeAt(0) - 97;

    for (let i = save_the_row - 1; i < save_the_row + 2; i++){
        
        if (i < 8 && i >= 0){
            for (let j = save_the_col - 1; j < save_the_col + 2; j++){

                if (j < 9 && j > 0){
                    var temp = $(`.${rows[i]}${j}`);

                    if (temp.html() != '' && cheker && temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
                        if (temp.children().attr('id').search('k') != -1)
                            return false;
                    }
                }
            }
            return true;
        }
    }
}
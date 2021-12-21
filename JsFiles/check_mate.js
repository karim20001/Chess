let kish = false;
let kish_white = false;
let kish_black = false;

function if_check (id, hit_dark_or_white, piece_color){

    
    let temp;
    if (kish){
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
            
            // console.log(_all_opennet[i].id[0])
            console.log(_all_opennet[9].id[0])
            switch (_all_opennet[i].id[0]){

                case "r":
                    
                    if ($(`.${id[1]}`).html() == '')
                        $(`.${id[1]}`).html(`<p class = ${piece_color}>rr</p>`)
                        console.log(_all_opennet[9].id[0])
                        
                    let temp = check_mate_rook(_all_opennet[i].id, $(`#${_all_opennet[i].id}`).parent().attr('class'), hit_dark_or_white, piece_color)

                    if ($(`.${id[1]}`).children().html() == 'rr')
                        $(`.${id[1]}`).html('')
                    if (!temp)
                        return false;
                    break;
                case 's':
                    break;
                case 'h':
                    break;
                case 'e':
                    break;
                case 'v':
                    break;
                case 'k':
                    break;
            }
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

function check_mate_rook (id, className, hit_dark_or_white, piece_color){
    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;

    // console.log(save_the_col)
    // console.log(save_the_row)

        return(ww(1, 0) && ww(-1, 0) && ww(0, 1) && ww(0, -1))

            function ww (is_row, is_col){
                
                for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col){
                    let cheker = true;
                    var temp = $(`.${rows[i]}${j}`);
                    
                    if ( temp.html() == ''){
                        cheker = false
                    }
                    
                    

                    else if (temp.children().attr('class').search(hit_dark_or_white) != -1){
                        // console.log(temp.children().attr('id'))
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
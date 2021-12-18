function moveBshop(id, className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[className.length - 1])

    let save_the_row = className.charCodeAt(className.length - 2) - 97;
    
    doingBishop_logic(-1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(-1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(1, -1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    doingBishop_logic(1, 1, save_the_row, save_the_col, hit_dark_or_white, piece_color);
    
    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2 || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♝', '')
    });
}

function doingBishop_logic(zaribI, zaribJ, save_the_row, save_the_col, hit_dark_or_white, piece_color){

    let cheker;

    for (let i = save_the_row + zaribI, j = save_the_col + zaribJ; i >= 0 && i < 8 && j > 0 && j < 9; j += zaribJ, i += zaribI){
        cheker = true;
        var temp = $(`.${rows[i]}${j}`);

        if ( temp.html() == ''){
            temp.addClass('active');
            cheker = false;
        }
        else if (temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
            if (temp.children().attr('id').search('k') == -1)
                temp.addClass('hit');
            break;
        }
        if (cheker && temp.children().attr('class').search(`${piece_color}`) != -1)
            break;
    }
}
function moveRokh(id, className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;
    
    doingRokh_logic(save_the_row, save_the_col, -1, 0, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 0, -1, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 1, 0, hit_dark_or_white, piece_color);
    doingRokh_logic(save_the_row, save_the_col, 0, 1, hit_dark_or_white, piece_color);


    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2 || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♜', '')
    });
}

function doingRokh_logic (save_the_row, save_the_col, is_row, is_col, hit_dark_or_white, piece_color){

    let cheker;

    for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col){
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
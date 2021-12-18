function moveRokh(id, className){

    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;


    
    doingRokh_logic(save_the_row, save_the_col, -1, 0);
    doingRokh_logic(save_the_row, save_the_col, 0, -1);
    doingRokh_logic(save_the_row, save_the_col, 1, 0);
    doingRokh_logic(save_the_row, save_the_col, 0, 1);


    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, '♜', '')
    });
}

function doingRokh_logic (save_the_row, save_the_col, is_row, is_col){

    let cheker;

    for (let i = save_the_row + is_row, j = save_the_col + is_col; i >= 0 && i < 8 && j > 0 && j < 9; i += is_row, j += is_col){
        cheker = true;
        var temp = $(`.${rows[i]}${j}`);

        if ( temp.html() == ''){
                temp.addClass('active');
                cheker = false;
        }
        else if (temp.children().attr('class').search('dark-mohre') != -1){
            temp.addClass('hit');
            break;
        }
        if (cheker && temp.children().attr('class').search('light-mohre') != -1)
            break;
    }
}
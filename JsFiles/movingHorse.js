function moveHorse (id, className, hit_dark_or_white, piece_color){

    // save col position of horse
    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className.charCodeAt(className.length - 2) - 97;

    let saver = $(`#${id}`).parent();
    $(`#${id}`).parent().html('');
    //--------------------------

    // if (moving_piece_notIn_same_col(className.split(" "), piece_color, id) && moving_piece_check_own_same_rowCol(className.split(" "), piece_color, id))

    //check wich homes horse can go
    for (let j = save_the_row - 2; j <= save_the_row + 2; j++){

        if (j >= 0 && j < 8 && j != save_the_row){

            for (let k = save_the_col - 2; k <= save_the_col + 2; k++){

                if (k > 0 && k < 9){

                    if ( k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - save_the_row) < 2) && (Math.abs(k - save_the_col) != 1 || Math.abs(j - save_the_row) != 1)){
                        if (if_check($(`.${rows[j]}${k}`).attr('class').split(" "), hit_dark_or_white, piece_color)){
                            if ($(`.${rows[j]}${k}`).html() == '')
                                $(`.${rows[j]}${k}`).addClass('active')
                            else if ($(`.${rows[j]}${k}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                                if ($(`.${rows[j]}${k}`).children().attr('id').search('k') == -1)
                                    $(`.${rows[j]}${k}`).addClass('hit')
                            }
                        }
                    }
                }

                    // if ($(`.${rows[j]}${k}`).children().attr('class').search('dark-mohre') != -1 && k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - i) < 2)){
                    //     $(`.${rows[j]}${k}`).addClass('hit')
                    // }
            }
        }
    }
    saver.html(`<p class = "${piece_color}" id = ${id}>♞</p>`);
    if (piece_color === 'light-mohre'){
        $(".light-mohre").prop("onclick", null).off("click");
        $(".light-mohre").click(light_clicked)
    }
    else {
        $(".dark-mohre").prop("onclick", null).off("click");
        $(".dark-mohre").click(dark_clicked)
    }
    //---------------------------------------------
    //animating

    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♞', '');

    });
}
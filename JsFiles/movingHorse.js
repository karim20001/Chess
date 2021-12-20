function moveHorse (id, className, hit_dark_or_white, piece_color){

    // save col position of horse
    let save_the_col = parseInt(className[className.length - 1]);
    //--------------------------

    for (let i = 0; i < rows.length; i++){
        if (className[className.length - 2] == rows[i]){

            //check wich homes horse can go
            for (let j = i - 2; j <= i + 2; j++){

                if (j >= 0 && j < 8 && j != i){

                    for (let k = save_the_col - 2; k <= save_the_col + 2; k++){

                        if (k > 0 && k < 9){

                            if (moving_piece_check_own_same_rowCol(className.split(" "), piece_color)){

                                if ( k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - i) < 2) && (Math.abs(k - save_the_col) != 1 || Math.abs(j - i) != 1)){

                                    if ($(`.${rows[j]}${k}`).html() == '')
                                        $(`.${rows[j]}${k}`).addClass('active')
                                    else if ($(`.${rows[j]}${k}`).children().attr('class').search(`${hit_dark_or_white}`) != -1){
                                        if ($(`.${rows[j]}${k}`).children().attr('id').search('k') == -1)
                                            $(`.${rows[j]}${k}`).addClass('hit')
                                    }
                                }
                            }

                            // if ($(`.${rows[j]}${k}`).children().attr('class').search('dark-mohre') != -1 && k != parseInt(className[className.length - 1]) && (Math.abs(k - save_the_col) < 2 || Math.abs(j - i) < 2)){
                            //     $(`.${rows[j]}${k}`).addClass('hit')
                            // }
                        }
                    }
                }
            }
            break;
        }
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
function moveKing (id, className, hit_dark_or_white, piece_color){

    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;
    let cheker;

    for (let i = save_the_row - 1; i < save_the_row + 2 && i < 8 && i >= 0; i++){

        for (let j = save_the_col - 1; j < save_the_col + 2 && j < 9 && j > 0; j++){

            cheker = true;
            var temp = $(`.${rows[i]}${j}`);

            if ( temp.html() == ''){
                    temp.addClass('active');
                    cheker = false;
                    console.log(345)
            }
            if (cheker && temp.children().attr('class').search(`${hit_dark_or_white}`) != -1){
                temp.addClass('hit');
            }
        }

    }

    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2  || class_name[1] == 'second-move'){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, piece_color, '♚', '')
    });
}
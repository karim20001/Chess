function moveRokh(id, className){

    let save_the_col = parseInt(className[className.length - 1]);

    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;

    let cheker = true;

    for (let i = save_the_row - 1; i >= 0 && i < 8; i--){
        cheker = true;
        var temp = $(`.${rows[i]}${save_the_col}`);

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

    for (let i = save_the_row + 1; i >= 0 && i < 8; i++){
        cheker = true;
        var temp = $(`.${rows[i]}${save_the_col}`);

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
    for (let i = save_the_col + 1; i > 0 && i < 9; i++){
        cheker = true;
        var temp = $(`.${rows[save_the_row]}${i}`);

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

    for (let i = save_the_col - 1; i > 0 && i < 9; i--){
        cheker = true;
        var temp = $(`.${rows[save_the_row]}${i}`);

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
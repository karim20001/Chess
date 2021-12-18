function moveKing (id, className){

    let save_the_col = parseInt(className[className.length - 1]);
    let save_the_row = className[className.length - 2].charCodeAt(0) - 97;



    $('.active, .hit').click(function (e) { 
        e.preventDefault();
        
        // the class & id object should go
        let class_name = e.target.className.split(" ");
        let id_obj = e.target.id;

        if (class_name.length < 2){
            class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
        }

        animatingMoves(className, class_name, id, '♚', '')
    });
}
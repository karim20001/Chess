function to_undo (){
    const move = undo.pop();
    redo.push(move);

    second = 0;
    counter();

    let destination = move.destination;
    setTimeout(function (){
        if (move.deleted == null){
            let temp = $(`.${destination}`).html();
            $(`.${destination}`).html('')
            $(`.${move.origin}`).html(temp);
        }
        else {
            let piece_shape;
            switch (move.deleted[0]){
                case 's':
                    piece_shape = '♟'
                    break;
                case 'r':
                    piece_shape = '♜'
                    break;
                case 'h':
                    piece_shape = '♞';
                    break;
                case 'e':
                    piece_shape = '♝';
                    break;
                case 'v':
                    piece_shape = '♛'
                    break;
            }
            if (move.deleted[1] == 'w'){
                document.getElementById('black1').innerHTML = document.getElementById('black1').innerHTML.replace(piece_shape, '')
                console.log(piece_shape)
            }
            else {
                document.getElementById('white1').innerHTML = document.getElementById('white1').innerHTML.replace(piece_shape, '')
            }
            let temp = $(`.${destination}`).html();
            $(`.${destination}`).html('')
            $(`.${move.origin}`).html(temp);
        }
    }, 20)

}
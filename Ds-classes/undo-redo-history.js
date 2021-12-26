function to_undo (){
    if (undo.peek() == undefined)
        return;

    const move = undo.pop();
    redo.push(move);

    second = 0;
    counter();

    
    let destination = move.destination;
    setTimeout(function (){

        if (move.mohre[0] == 's'){

            if (move.mohre[1] == 'w'){
                if (move.origin[0] == 'g')
                $(`.${move.origin}`).html(`<p class="light-mohre" id="${move.mohre}">♟</p>`)

                else
                    $(`.${move.origin}`).html(`<p class="light-mohre second-move" id="${move.mohre}">♟</p>`)
            }

            else if (move.mohre[1] == 'd'){
                if (move.origin[0] == 'b')
                    $(`.${move.origin}`).html(`<p class="dark-mohre" id="${move.mohre}">♟</p>`)

                else
                    $(`.${move.origin}`).html(`<p class="dark-mohre second-move" id="${move.mohre}">♟</p>`)
            }
                
        }
        else {
            let temp = $(`.${destination}`).html();
            $(`.${move.origin}`).html(temp);
        }
        

        if (move.deleted == null){
            $(`.${destination}`).html('');
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
                let if_soldier = ' second-move';
                if (piece_shape == '♟' && destination[0] == 'g')
                    if_soldier = '';
                $(`.${destination}`).html(`<p class="light-mohre${if_soldier}" id="${move.deleted}">${piece_shape}</p>`);
            }
            else {
                document.getElementById('white1').innerHTML = document.getElementById('white1').innerHTML.replace(piece_shape, '')
                let if_soldier = ' second-move';
                if (piece_shape == '♟' && destination[0] == 'g')
                    if_soldier = '';
                $(`.${destination}`).html(`<p class="dark-mohre${if_soldier}" id="${move.deleted}">${piece_shape}</p>`);
            }
            
        }
    }, 20)

}

function to_redo (){
    if (redo.pop())
        return;
}
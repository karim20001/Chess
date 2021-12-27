const start_button = document.getElementById('start');
const redo_button = document.getElementById('redo');
const undo_button = document.getElementById('undo');
//const _all_ = document.getElementsByTagName('td');
const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// undo redo history
const undo = new Stack();
const redo = new Stack();
const Log = new LinkedList();
let pressed_undo = false;
//switch between dark & white in 30s
var interval;

start_button.addEventListener('click',start)

function start(){
    if (start_button.style.display != 'none'){
        start_button.style.display = 'none';
        redo_button.style.display = 'block';
        undo_button.style.display = 'block';
        redo_button.addEventListener('click', to_redo);
        undo_button.addEventListener('click', to_undo);
    }

    interval = setInterval(counter, 1000)
}

let check_side_move = true, firstClicked_or_second = true, bullshit_stuff_with_interval = true;
// $('.c3').removeClass('active');
var second = 30;

const whitePieces_number = [2, 2, 2, 1];
const blackPieces_number = [2, 2, 2, 1];

function counter(){
    let switcher = document.getElementById('turn')
    let seconds = document.getElementById('second-counter');

    if (check_side_move){
        switcher.innerHTML = 'White'
        $('.dark-mohre').css('cursor', '');
        $('.light-mohre').css('cursor', 'pointer');
        $(".dark-mohre").prop("onclick", null).off("click");

        if (bullshit_stuff_with_interval){
            bullshit_stuff_with_interval = false;
            $('.light-mohre').click(light_clicked)
        }
        
    }
    
    else {
        switcher.innerHTML = 'Black'
        $('.light-mohre').css('cursor', '');
        $('.dark-mohre').css('cursor', 'pointer');
        $(".light-mohre").prop("onclick", null).off("click");

        if (bullshit_stuff_with_interval){
            bullshit_stuff_with_interval = false
            $('.dark-mohre').click(dark_clicked);
            // $(".dark-mohre").prop("onclick", null).off("click");
        }
        
    }
    
    seconds.innerHTML = second + 's'

    switch (second){
        case 10:
            seconds.style.color = 'gold';
            break;
        case 5: 
            seconds.style.color = 'red';
            break;
        case 0:
            if (check_side_move)
                check_side_move = false;
            else
                check_side_move = true;
            second = 31;
            bullshit_stuff_with_interval = true;
            // remove listener of active & hit classes
            $('.active').prop('onclick', null).off('click')
            $('.hit').prop('onclick', null).off('click')
            $('.cascade').prop('onclick', null).off('click');

            // remove active from all elements
            $('.light, .dark').removeClass('active');
            $('.light, .dark').removeClass('hit');
            $('.light, .dark').removeClass('cascade');
            
            seconds.style.color = 'green'
            break;
    }

    second -= 1;
    
}

function light_clicked(event){
    
    let id = event.target.id;
    let _parent_className = $(`#${id}`).parent().attr('class');
    // remove active classes & off onclick for them every time clicked
    $('.active').prop('onclick', null).off('click')
    $('.hit').prop('onclick', null).off('click')
    $('.light, .dark').removeClass('active');
    $('.light, .dark').removeClass('hit');
    $('.light, .dark').removeClass('cascade');
    //----------------------------------------------------

    switch (id[0]){

        case "s":
            moveSoldier(id, _parent_className, 1, 'dark-mohre', 'light-mohre')
            break;
        case "r":
            moveRokh(id, _parent_className, 'dark-mohre', 'light-mohre', false, false)
            break;
        case "h":
            moveHorse(id, _parent_className, 'dark-mohre', 'light-mohre')
            break;
        case "e":
            moveBshop(id, _parent_className, 'dark-mohre', 'light-mohre')
            break;
        case "v":
            moveQueen(id, _parent_className, 'dark-mohre', 'light-mohre', false)
            break;
        case "k":
            moveKing(id, _parent_className, 'dark-mohre', 'light-mohre')
            break;
    }

    if (firstClicked_or_second)
        firstClicked_or_second = false;
    
    else
        firstClicked_or_second = true;
    
}

function dark_clicked(event){

    let id = event.target.id
    let _parent_className = $(`#${id}`).parent().attr('class');
    // remove active classes & off onclick for them every time clicked
    $('.active').prop('onclick', null).off('click')
    $('.hit').prop('onclick', null).off('click')
    $('.light, .dark').removeClass('active');
    $('.light, .dark').removeClass('hit');
    $('.light, .dark').removeClass('cascade');
    
    switch (id[0]){

        case "s":
            moveSoldier(id, _parent_className, -1, 'light-mohre', 'dark-mohre')
            break;
        case "r":
            moveRokh(id, _parent_className, 'light-mohre', 'dark-mohre', false, false)
            break;
        case "h":
            moveHorse(id, _parent_className, 'light-mohre', 'dark-mohre');
            break;
        case "e":
            moveBshop(id, _parent_className, 'light-mohre', 'dark-mohre')
            break;
        case "v":
            moveQueen(id, _parent_className, 'light-mohre', 'dark-mohre', false)
            break;
        case "k":
            moveKing(id, _parent_className, 'light-mohre', 'dark-mohre')
            break;
        
    }

    if (firstClicked_or_second)
        firstClicked_or_second = false;
    
    else
        firstClicked_or_second = true;
    
}

function animatingMoves(className, class_name, id, dark_or_white, Char, second_move, Redo_last_soldier){

        let Top = 0;
        let Left = 0;

        second = 0;
        counter();

        
        $(".dark-mohre").prop("onclick", null).off("click");
        $(".light-mohre").prop("onclick", null).off("click");

        Top = (class_name[1].charCodeAt(0) - className[className.length - 2].charCodeAt(0)) * 53;
        Left = (parseInt(class_name[1][1]) - parseInt(className[className.length - 1])) * 53;
        
        // animating part
        $(`#${id}`).animate({
            top: `+=${Top}px`,
            left: `+=${Left}px`
        }, 500)

        // document.getElementById('sliding').onload

        // remove listener of active & hit classes
        $('.active').prop('onclick', null).off('click')
        $('.hit').prop('onclick', null).off('click')
        $('.cascade').prop('onclick', null).off('click');

        // remove active from all elements
        $('.light, .dark').removeClass('active');
        $('.light, .dark').removeClass('hit');
        $('.light, .dark').removeClass('cascade');

        setTimeout(function(){
            let temp = className.substring(className.length - 2)
            // alert(temp)
            $(`.${temp}`).html('');
            temp = class_name[1];  
            // delete mohre
            let action;
            if ($(`.${temp}`).html() != ''){

                let deleted_child = $(`.${temp}`).children().html();
                let deleted_child_id = $(`.${temp}`).children().attr('id');
                if (dark_or_white == 'light-mohre')
                    document.getElementById('white1').innerHTML += deleted_child;
                else 
                    document.getElementById('black1').innerHTML += deleted_child;

                action = new Action(id, className.split(" ")[1], class_name[1], deleted_child_id, null)
            }

            else {
                action = new Action(id, className.split(" ")[1], class_name[1], null, null)
            }
            // save moves
            undo.push(action)
            let position = Log.head;
            while (position != null){
                if (position.next == null)
                    break;
                position = position.next;
                
            }
            Log.insert(position, action)
            if (!Redo_last_soldier)
                showHistory_on_browser(action)
            // if (Log.head.next != null)
            // console.log(Log.head.next.data)
            // if (action.deleted != null){
                // to_undo()
            // }

            $(`.${temp}`).html(`<p class="${dark_or_white}${second_move}" id=${id}>${Char}</p>`);

            // console.log($(`.${temp}`).children())
            // $('.light-mohre').click(light_clicked)
            // $('.dark-mohre').click(dark_clicked)
            if (id[0] == 's' && !Redo_last_soldier){
                if (dark_or_white == 'light-mohre' && temp[0] == 'a'){
                    soldier_reached_end(temp, id, dark_or_white);
                    
                }
                if (dark_or_white == 'dark-mohre' && temp[0] == 'h'){
                    soldier_reached_end(temp, id, dark_or_white);

                }
            }
        }, 495)

}

//soldier_reached_end(true, true)

function soldier_reached_end (parent_class, id, dark_or_white){

    // remove listener of active & hit classes
    $('.active').prop('onclick', null).off('click')
    $('.hit').prop('onclick', null).off('click')
    $('.cascade').prop('onclick', null).off('click');

    // remove active from all elements
    $('.light, .dark').removeClass('active');
    $('.light, .dark').removeClass('hit');
    $('.light, .dark').removeClass('cascade');

    clearInterval(interval)

    $("body").append(`<div class='soldier-end'>
                        <h2>Choose your piece to replace</h2>
                        <p class='selected-option' id='r'>Rook</p>
                        <p class='selected-option' id='h'>Horse</p>
                        <p class='selected-option' id='b'>Bishop</p>
                        <p class='selected-option' id='q'>Queen</p>
                    </div>`);
    $('.to-disable').css("opacity", ".4");

    let temp;
    let hit;
    if (dark_or_white == 'light-mohre')
        hit = 'dark-mohre';
    else 
        hit = 'light-mohre'

    $('.selected-option').click(function (e) { 
        e.preventDefault();
        
        let clicked_id = e.target.id;
        let number;

        $('.soldier-end').remove();
        $(`#${id}`).remove();
        $('.to-disable').css("opacity", "1");
        temp = id[1]

        switch (clicked_id){

            case 'r':
                if (dark_or_white == 'light-mohre'){
                    number = whitePieces_number[0] + 1;
                    whitePieces_number[0] += 1;
                }
                else{
                    number = blackPieces_number[0] + 1;
                    blackPieces_number[0] += 1;
                }
                set_instead_soldier('r', '♜', number)
                break;

            case 'h':
                if (dark_or_white == 'light-mohre'){
                    number = whitePieces_number[1] + 1;
                    whitePieces_number[1] += 1;
                }
                else{
                    number = blackPieces_number[1] + 1;
                    blackPieces_number[1] += 1;
                }
                set_instead_soldier('h', '♞', number)
                break;

            case 'b':
                if (dark_or_white == 'light-mohre'){
                    number = whitePieces_number[2] + 1;
                    whitePieces_number[2] += 1;
                }
                else{
                    number = blackPieces_number[2] + 1;
                    blackPieces_number[2] += 1;
                }
                set_instead_soldier('e', '♝', number)
                break;

            case 'q':
                if (dark_or_white == 'light-mohre'){
                    number = whitePieces_number[3] + 1;
                    whitePieces_number[3] += 1;
                }
                else{
                    number = blackPieces_number[3] + 1;
                    blackPieces_number[3] += 1;
                }
                set_instead_soldier('v', '♛', number);
                break;
        }
    });
    
    function set_instead_soldier (char, kindOfPiece, number_for_id){

        let upgrade = undo.pop();
        
        let origin = upgrade.origin;
        let destination = upgrade.destination;
        upgrade = upgrade.deleted;

        let action = new Action(id, origin, destination, upgrade, `${char}${temp}${number_for_id} ${kindOfPiece}`)
        undo.push(action);
        console.log(action)
        $(`.${parent_class}`).html(`<p class="${dark_or_white}" id="${char}${temp}${number_for_id}">${kindOfPiece}</p>`);
        setTimeout(function (){
            if_check_then_checkMate(`${char}${temp}${number_for_id}`, hit, dark_or_white);
            start();
        }, 50)
    }
}
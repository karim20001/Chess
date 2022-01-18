// ------------------------------
    // Amirreza Karimi
    // Ali Khanpoor
//-------------------------------

const start_button = document.getElementById('start');
const redo_button = document.getElementById('redo');
const undo_button = document.getElementById('undo');
//const _all_ = document.getElementsByTagName('td');
const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// load file
let input = document.getElementById('file-loader');
input.addEventListener('change', readFile);

//download file

let download_history = document.getElementById("download-history");
download_history.addEventListener('click', writeInFile);

let replay = document.getElementById("replay");
replay.addEventListener('click', function (){
    to_replay(false);
});

const AllElements = [];
$(".dark-mohre, .light-mohre").each(function (){
    AllElements.push($(this).parent().html());
})

// get names

const white_player = prompt("white player name?");
const black_player = prompt("black player name?");

// undo redo history
const undo = new Stack();
const redo = new Stack();
const Log = new LinkedList();
let pressed_undo = false;
//switch between dark & white in 30s
var interval;

start_button.addEventListener('click',start)

function start(){
    // if (start_button.style.display != 'none'){
        start_button.style.display = 'none';
        redo_button.style.display = 'block';
        undo_button.style.display = 'block';
        $('.history-click').css('cursor', 'pointer');
        redo_button.addEventListener('click', to_redo);
        undo_button.addEventListener('click', to_undo);
    // }

    interval = setInterval(counter, 1000)
}

let check_side_move = true, firstClicked_or_second = true, bullshit_stuff_with_interval = true;
// $('.c3').removeClass('active');
var second = 30;

// for set id to new pieces (soldier reached end)
const whitePieces_number = [2, 2, 2, 1];
const blackPieces_number = [2, 2, 2, 1];

function counter(){
    let switcher = document.getElementById('turn')
    let seconds = document.getElementById('second-counter');

    if (check_side_move){
        switcher.innerHTML = white_player;
        $('.dark-mohre').css('cursor', '');
        $('.light-mohre').css('cursor', 'pointer');
        $(".dark-mohre").prop("onclick", null).off("click");

        if (bullshit_stuff_with_interval){
            bullshit_stuff_with_interval = false;
            $('.light-mohre').click(light_clicked)
        }
        
    }
    
    else {
        switcher.innerHTML = black_player;
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
    if (id[0] != 'r')
        $('.cascade').prop('onclick', null).off('click')
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
    if (id[0] != 'r')
        $('.cascade').prop('onclick', null).off('click')
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

function animatingMoves(className, class_name, id, dark_or_white, Char, second_move, Redo_last_soldier, animate_histoy){

        let Top = 0;
        let Left = 0;

        if (!animate_histoy){
            second = 0;
            counter();

            $(".dark-mohre").prop("onclick", null).off("click");
            $(".light-mohre").prop("onclick", null).off("click");
        }

        if (!kish){
            if (dark_or_white == 'light-mohre'){
                let the_parent = $('#kw1').parent();
                if (the_parent.attr('class').split(" ")[0] == "dark")
                    the_parent.css('background-color', '#a4aebb')
                else
                    the_parent.css('background-color', '#718091')
            }
            else {
                let the_parent = $('#kd1').parent();
                if (the_parent.attr('class').split(" ")[0] == "dark")
                    the_parent.css('background-color', '#a4aebb')
                else
                    the_parent.css('background-color', '#718091')
            }
        }
        

        Top = (class_name[1].charCodeAt(0) - className[className.length - 2].charCodeAt(0)) * 58;
        Left = (parseInt(class_name[1][1]) - parseInt(className[className.length - 1])) * 58;
        
        // animating part
        $(`#${id}`).animate({
            top: `+=${Top}px`,
            left: `+=${Left}px`
        }, 500);
        document.getElementById("slide").play();

        // document.getElementById('sliding').onload

        // remove listener of active & hit classes
        if (!animate_histoy){
            $('.active').prop('onclick', null).off('click')
            $('.hit').prop('onclick', null).off('click')
            $('.cascade').prop('onclick', null).off('click');

            // remove active from all elements
            $('.light, .dark').removeClass('active');
            $('.light, .dark').removeClass('hit');
            $('.light, .dark').removeClass('cascade');
        }

        setTimeout(function(){
            let temp = className.substring(className.length - 2)
            // alert(temp)
            $(`.${temp}`).html('');
            temp = class_name[1];  
            // delete mohre
            let action;
            if ($(`.${temp}`).html() != '' || pusan_checker[1]){
                let deleted_child_id, deleted_child;

                if (!pusan_checker[1]){
                    deleted_child = $(`.${temp}`).children().html();
                    deleted_child_id = $(`.${temp}`).children().attr('id');
                }
                else {
                    console.log(pusan_checker[0])
                    deleted_child = $(`.${pusan_checker[0]}`).children().html();
                    deleted_child_id = $(`.${pusan_checker[0]}`).children().attr('id');
                    $(`.${pusan_checker[0]}`).html('');
                }
                if (!animate_histoy){
                    if (dark_or_white == 'light-mohre')
                        document.getElementById('white1').innerHTML += deleted_child;
                    else 
                        document.getElementById('black1').innerHTML += deleted_child;
                }

                if (!pusan_checker[1])
                    action = new Action(id, className.split(" ")[1], class_name[1], deleted_child_id, null)
                else{
                    action = new Action(id, className.split(" ")[1], `${pusan_checker[0]} ${class_name[1]}`, deleted_child_id, null)
                }
                document.getElementById("sliding").play();
            }

            else {
                action = new Action(id, className.split(" ")[1], class_name[1], null, null)
            }
            // save moves
            let position = Log.head;
            if (!animate_histoy){
                undo.push(action)
                while (position != null){
                    if (position.next == null)
                        break;
                    position = position.next;
                    
                }
                if (!Redo_last_soldier){
                    if (id[0] == 's'){
                        if (temp[0] != 'a' && temp[0] != 'h'){
                            Log.insert(position, action)
                            showHistory_on_browser(action)
                        }
                    }
                    else {
                        Log.insert(position, action);
                        showHistory_on_browser(action);
                    }
                }
            }
            if (Math.abs(Top) == 116 && id[0] == 's'){
                pusan_checker[0] = class_name[1];
            }
            else {
                pusan_checker[0] = null;
            }
            pusan_checker[1] = false;

            $(`.${temp}`).html(`<p class="${dark_or_white}${second_move}" id=${id}>${Char}</p>`);

            if (id[0] == 's' && !Redo_last_soldier){
                if (dark_or_white == 'light-mohre' && temp[0] == 'a'){
                    soldier_reached_end(temp, id, dark_or_white, position);
                    
                }
                if (dark_or_white == 'dark-mohre' && temp[0] == 'h'){
                    soldier_reached_end(temp, id, dark_or_white, position);

                }
            }
        }, 495)

}

//soldier_reached_end(true, true)

function soldier_reached_end (parent_class, id, dark_or_white, position){

    // remove listener of active & hit classes
    $('.active').prop('onclick', null).off('click')
    $('.hit').prop('onclick', null).off('click')
    $('.cascade').prop('onclick', null).off('click');
    $('.history-click').prop('onclick', null).off('click');
    $('.history-click').css('cursor', 'unset');
    redo_button.removeEventListener('click', to_redo);
    undo_button.removeEventListener('click', to_undo);

    // remove active from all elements
    $('.light, .dark').removeClass('active');
    $('.light, .dark').removeClass('hit');
    $('.light, .dark').removeClass('cascade');

    clearInterval(interval)

    $("body").append(`<div class='soldier-end'>
                        <h3>Choose your piece to replace</h3>
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

        let action = new Action(id, origin, destination, upgrade, `${char}${temp}${number_for_id} ${kindOfPiece}`);

        undo.push(action);
        Log.insert(position, action);
        showHistory_on_browser(action);

        $(`.${parent_class}`).html(`<p class="${dark_or_white}" id="${char}${temp}${number_for_id}">${kindOfPiece}</p>`);
        setTimeout(function (){
            if (temp == 'd')
                document.getElementById('white1').innerHTML += '♟';
            else 
                document.getElementById('black1').innerHTML += '♟';

            if_check_then_checkMate(`${char}${temp}${number_for_id}`, hit, dark_or_white);

            start();
        }, 50)
    }
}

function game_finished (player_win){

    writeInFile();

    clearInterval(interval);
    $(".light-mohre").prop("onclick", null).off("click");
    $(".dark-mohre").prop("onclick", null).off("click");

    let saver = [];
    let winner_length = Math.ceil(player_win.length / 3);

    for (let i = 0, j= 0; i < 3; i++, j += winner_length){
        saver[i] = player_win.slice(j, j + winner_length);
        saver[i] = saver[i].split("").join(" ");
    }

    const set_the_winner = document.getElementsByClassName("winner");
    for (let i = 0; i < 3; i++){
        if (i == 0)
            set_the_winner[i].innerHTML = saver[i];
        else
            set_the_winner[i].innerHTML = saver[i];
    }

    setTimeout(function (){
        document.getElementById('finish').style.display = 'block';
        $('.to-disable').css('opacity', '0.1')
        document.getElementById('vid').play();
        document.getElementById("winning").play();
        
        document.getElementById("finished-button").addEventListener('click', function(){
            location.reload();
        })
    }, 1000);
}

function writeInFile (){
    let Head = Log.head;
    if (Head == null) return;

    var string = Head.data.to_string();

    while (Head.next != null){
        Head = Head.next;
        string += Head.data.to_string();
    }

    var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "history.txt");
}

function readFile (){

    let files = input.files;
    if (files.length == 0) return;

    history_counter = 1;
    $(".history-section").html("");
    to_replay(true);
    Log.makeNull();
    
    let reader = new FileReader();

    const file = files[0];

    reader.onload = (e) => {
        
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        const deleted_pieces = [];
        
        lines.forEach(function (value) {
            
            const words = value.split(' ');
            let words_length = words.length;
            
            if ((words_length == 5 || words_length == 6) && words[3] != 'null'){

                let deleted;
                deleted = $(`#${words[3]}`);
                deleted_pieces.push(words[3]);

                let shape = deleted.html();
                if (words[3][1] == 'd'){
                    document.getElementById('white1').innerHTML += shape;
                }
                else {
                    document.getElementById('black1').innerHTML += shape;
                }
                deleted.parent().html("");
            }
        });

        let set_turn;
        
        lines.forEach(function (value){
            let position = Log.head;
            while (position != null){
                if (position.next == null)
                    break;
                position = position.next;
                    
            }

            
            const words = value.split(" ");
            let words_length = words.length;
            if (words_length > 4)
                set_turn = words[0][1];
            
            let action;

            function if_null(the_word){
                if (the_word == 'null')
                    return null;
                return the_word;
            }

            if (words_length == 5){
                action = new Action(words[0], words[1], words[2], if_null(words[3]), if_null(words[4]))
            }
            if (words_length == 6 && words[5] == 'null'){
                action = new Action(words[0], words[1], `${words[2]} ${words[3]}`, words[4], null);
            }

            if (words_length == 6 && words[5] != 'null'){
                action = new Action(words[0], words[1], words[2], words[3], `${words[4]} ${words[5]}`)
            }

            if (((words_length == 5 && words[4] == 'null') || (words_length == 6 && words[5] == 'null')) && deleted_pieces.find( (val) => val == words[0]) == undefined){

                let mohre = $(`#${words[0]}`).parent().html();
                $(`#${words[0]}`).parent().html("");
                $(`.${words[2]}`).html(mohre);

            }
            if (words_length == 8){

                action = new Action(`${words[0]} ${words[1]}`, `${words[2]} ${words[3]}`, `${words[4]} ${words[5]}`, null, null)

                let king = $(`#${words[0]}`).parent().html();
                $(`#${words[0]}`).parent().html("");
                $(`.${words[4]}`).html(king);

                if (deleted_pieces.find( (val) => val == words[1]) == undefined){
                    let rook = $(`#${words[1]}`).parent().html();
                    $(`#${words[1]}`).parent().html("");
                    $(`.${words[5]}`).html(rook);
                }
            }
            if (words_length == 6 && words[5] != 'null'){
                $(`#${words[0]}`).parent().html("");

                let className;
                if (words[0][1] == 'd'){
                    className = 'dark-mohre';
                    document.getElementById('white1').innerHTML += '♟';
                }
                else{
                    className = 'light-mohre';
                    document.getElementById('black1').innerHTML += '♟';
                }
                
                $(`.${words[2]}`).html(`<p id="${words[4]}" class="${className}">${words[5]}</p>`);
            }
            
            if (action != undefined){
                Log.insert(position, action);
                showHistory_on_browser(action);
            }
        })

        if (set_turn == 'w')
            check_side_move = false;

    }
    reader.readAsText(file);
}
const start_button = document.getElementById('start')
//const _all_ = document.getElementsByTagName('td');
const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

//switch between dark & white in 30s
var interval;

start_button.addEventListener('click',start)

function start(){
    start_button.style.display = 'none'
    
    interval = setInterval(counter, 1000)

    actions = new Stack();
}

let check_side_move = true, firstClicked_or_second = true, bullshit_stuff_with_interval = true;
// $('.c3').removeClass('active');
var second = 30;


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
    
    let id = event.target.id
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

function animatingMoves(className, class_name, id, dark_or_white, Char, second_move){

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
            
            $(`.${temp}`).html(`<p class="${dark_or_white}${second_move}" id=${id}>${Char}</p>`)
            // console.log($(`.${temp}`).children())
            // $('.light-mohre').click(light_clicked)
            // $('.dark-mohre').click(dark_clicked)
        }, 495)
}
const start_button = document.getElementById('start')
const _all_ = document.getElementsByTagName('td')

//switch between dark & white in 30s
var interval;

start_button.addEventListener('click',start)

function start(){
    start_button.style.display = 'none'
    
    interval = setInterval(counter, 1000)
}

let check_side_move = true;
$('.c3').addClass('active');
// $('.c3').removeClass('active');
var second = 30;
let bullshit_stuff_with_interval = true;

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
            
            seconds.style.color = 'green'
            break;
    }

    second -= 1;
    
}

function light_clicked(event){
    
    let id = event.target.id
    let _parent_className = $(`#${id}`).parent().attr('class');

    switch (id){

        case "sw1":
            moveSoldier(id, _parent_className)
            // $('#s1').animate({
            //     top: "-=90px",
            // },300)
            break;
        case "s2":
            break;
        case "s3":
            break;
    }
    
}

function dark_clicked(event){
    
    switch (event){

        case '':
    }
    
}
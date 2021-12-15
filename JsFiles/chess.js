
const start_button = document.getElementById('start')

//switch between dark & white in 30s

start_button.addEventListener('click',start)

function start(){
    start_button.style.display = 'none'
    
    var interval = setInterval(counter, 1000)
}


let check_side_move = true
var second = 30;

function counter(){
    let switcher = document.getElementById('turn')
    let seconds = document.getElementById('second-counter');

    if (check_side_move){
        switcher.innerHTML = 'White'
        $('.dark-mohre').css('cursor', '');
        $('.light-mohre').css('cursor', 'pointer');
        $(".dark-mohre").prop("onclick", null).off("click");
        $('.light-mohre').click(light_clicked)
        
    }
    else {
        switcher.innerHTML = 'Black'
        $('.light-mohre').css('cursor', '');
        $('.dark-mohre').css('cursor', 'pointer');
        $(".light-mohre").prop("onclick", null).off("click");
        $('.dark-mohre').click(dark_clicked);
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
            seconds.style.color = 'green'
            break;
    }

    second -= 1;

}

function light_clicked(event){
    
    switch (event.target.id){

        case "s1":
            alert(353)
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

function dark_clicked(){

}
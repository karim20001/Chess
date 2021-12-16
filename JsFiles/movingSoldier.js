

function moveSoldier(id, className){
    
    //if (){
        $('.active').prop('onclick', null).off('click')
        $('.light, .dark').removeClass('active');

        for (let i = 0; i < rows.length; i++){
            if (className[className.length - 2] == rows[i]){
                $(`.${rows[i - 1]}${className[className.length - 1]}`).addClass('active');
                $(`.${rows[i - 2]}${className[className.length - 1]}`).addClass('active');
            }
        }

        //animating moves
        
        $('.active').click(function (e) { 
            e.preventDefault();

            let class_name = e.target.className.split(" ");
            alert(class_name[1][0])
            let Top = 0;
            
            for (let i = 0; i < rows.length; i++){

                if (rows[i] == class_name[1][0])
                    Top = i;

                if (rows[i] == className[className.length - 2]){
                    Top = (Top - i) * 53;
                    alert(Top)
                    break;
                }
            }

            $(`#${id}`).animate({
                top: `+=${Top}px`,
                // left: "+=80px"
            }, 500)

            $('.light, .dark').removeClass('active');
        });
    //}
    // else {
        
    // }
}
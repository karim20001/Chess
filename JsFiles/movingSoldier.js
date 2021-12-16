

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

            let class_name = e.target.className;
            let Top;
            for (let i = 0; i < rows.length; i++){

                let j;
                if (rows[i] == class_name[class_name.length - 2])
                    j = i;

                if (rows[i] == className[className.length - 2]){
                    Top = i - j;
                }
            }

            Top = $(e.target).css('top');
            alert(Top - 10)

            $(`#${id}`).animate({
                top: `-=${Top}px`,
                left: "+=80px"
            }, 500)

            $('.light, .dark').removeClass('active');
        });
    //}
    // else {
        
    // }
}
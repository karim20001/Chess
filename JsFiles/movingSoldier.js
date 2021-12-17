

function moveSoldier(id, className){
    
    //if (){
        $('.active').prop('onclick', null).off('click')
        $('.hit').prop('onclick', null).off('click')
        $('.light, .dark').removeClass('active');
        $('.light, .dark').removeClass('hit');
        let save_the_col;

        for (let i = 1; i < 9; i++){
            if (className[className.length - 1] == i){
                save_the_col = i;
                break;
            }
        }

        for (let i = 0; i < rows.length; i++){
            if (className[className.length - 2] == rows[i]){

                // check soldier can hit dark chess piece & not white ones
                if (save_the_col != 1)
                    if ( $(`.${rows[i - 1]}${save_the_col - 1}`).html() != '' && $(`.${rows[i - 1]}${save_the_col - 1}`).children().attr('class').search('dark-mohre') != -1){
                        $(`.${rows[i - 1]}${save_the_col - 1}`).addClass('hit')
                    }
                    
                if (save_the_col != 8)
                    if ( $(`.${rows[i - 1]}${save_the_col + 1}`).html() != '' && $(`.${rows[i - 1]}${save_the_col + 1}`).children().attr('class').search('dark-mohre') != -1){
                        $(`.${rows[i - 1]}${save_the_col + 1}`).addClass('hit')
                    }
                //-------------------------------------------
                // check soldier can move forward
                alert($(`.${rows[i - 1]}${className[className.length - 1]}`).html())
                if ($(`.${rows[i - 1]}${className[className.length - 1]}`).html() == ''){

                    $(`.${rows[i - 1]}${className[className.length - 1]}`).addClass('active');

                    if ($(`.${rows[i - 2]}${className[className.length - 1]}`).html() == '' && $(`#${id}`).attr('class') === 'light-mohre'){
                        
                        $(`.${rows[i - 2]}${className[className.length - 1]}`).addClass('active');
                    }
                }
                //-------------------------------------------
                
                break;
            }
        }

        //animating moves
        
        $('.active, .hit').click(function (e) { 
            e.preventDefault();
            
            // the class & id object should go
            let class_name = e.target.className.split(" ");
            let id_obj = e.target.id;

            if (class_name.length < 2){
                class_name = $(`#${id_obj}`).parent().attr('class').split(" ");
            }

            let Top = 0;
            let Left = 0;
            
            // find diffrence between two class
            for (let i = 0; i < rows.length; i++){

                if (rows[i] == class_name[1][0]){
                    Top = i;
                }

                if (rows[i] == className[className.length - 2]){
                    Top = (Top - i) * 53;

                    if (class_name[2] == 'hit'){
                        if (Math.abs(Top) == 53){
                            if (parseInt(class_name[1][1]) > parseInt(className[className.length - 1])){
                                Left = 53;
                            }
                            else {
                                Left = -53;
                            }
                        }
                    }
                    
                    break;
                }

            }

            // animating part
            $(`#${id}`).animate({
                top: `+=${Top}px`,
                left: `+=${Left}px`
            }, 500)

            // remove listener of active classes
            $('.active').prop('onclick', null).off('click')
            $('.hit').prop('onclick', null).off('click')

            // remove active from all elements
            $('.light, .dark').removeClass('active');
            

            // this timeout created beacause of animation & displacement class of chess pieces
            setTimeout(function(){
                let temp = className.substring(className.length - 2)
                // alert(temp)
                $(`.${temp}`).html('');
                temp = class_name[1];
                $('.light, .dark').removeClass('hit');
                $(`.${temp}`).html(`<p class="light-mohre second-move" id=${id}>♟</p>`)
                // console.log($(`.${temp}`).children())
                $('.light-mohre').click(light_clicked)
            }, 495)
            
        });
   
}
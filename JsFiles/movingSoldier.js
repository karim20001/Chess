function moveSoldier(id, className){
    
        
        let save_the_col = parseInt(className[className.length - 1]);

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

            animatingMoves(className, class_name, id, '♟', ' second-move');
            
        });
   
}
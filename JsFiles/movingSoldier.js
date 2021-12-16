

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

            // the class object should go
            let class_name = e.target.className.split(" ");
            let Top = 0;
            
            // find diffrence between two class
            for (let i = 0; i < rows.length; i++){

                if (rows[i] == class_name[1][0])
                    Top = i;

                if (rows[i] == className[className.length - 2]){
                    Top = (Top - i) * 53;
                    break;
                }
            }

            

            $(`#${id}`).animate({
                top: `+=${Top}px`,
                // left: "+=80px"
            }, 500)

            // remove listener of active classes
            $('.active').prop('onclick', null).off('click')
            // remove active from all elements
            $('.light, .dark').removeClass('active');

            // this timeout created beacause of animation & displacement class of chess pieces
            setTimeout(function(){
                let temp = className.substring(className.length - 2)
                // alert(temp)
                $(`.${temp}`).html('');
                temp = class_name[1];
                $(`.${temp}`).html(`<p class="light-mohre" id=${id}>♟</p>`)
                // console.log($(`.${temp}`).children())
                $('.light-mohre').click(light_clicked)
            }, 495)
            
        });
   
}
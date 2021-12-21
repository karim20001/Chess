class Action {
    constructor (mohre, origin, destination, deleted) {
        this.mohre = mohre;
        this.origin = origin;
        this.destination = destination;
        this.deleted = deleted;
    }
}

function moving_piece_check_own_same_rowCol (own_piece_parent_className, piece_color, id){

    let king_id;
    let oppenet_rookhs_id, oppenet_queen_id;
    if (piece_color == 'dark-mohre'){
        king_id = '#kd1';
        oppenet_rookhs_id = ['#rw1', '#rw2'];
        oppenet_queen_id = '#vw1';
    }
    else {
        king_id = '#kw1';
        oppenet_rookhs_id = ['#rd1', '#rd2'];
        oppenet_queen_id = '#vd1';
    }

    let king_parent = $(king_id).parent().attr('class').split(" ");

    if (king_parent[1][0] != own_piece_parent_className[1][0] && king_parent[1][1] != own_piece_parent_className[1][1]){
        return true;
    }

    let roohks_parent = [];
    let queen_parent = null;

    if ($(oppenet_queen_id).parent().attr('class') != undefined)
        queen_parent = $(oppenet_queen_id).parent().attr('class').split(" ");
    
    if ($(oppenet_rookhs_id[0]).parent().attr('class') != undefined)
        roohks_parent[0] = $(oppenet_rookhs_id[0]).parent().attr('class').split(" ");
    
    if ($(oppenet_rookhs_id[1]).parent().attr('class') != undefined)
        roohks_parent[1] = $(oppenet_rookhs_id[1]).parent().attr('class').split(" ")

    let sorting = [king_parent[1], own_piece_parent_className[1]]
    sorting.sort();


        // same row
        if (king_parent[1][0] == own_piece_parent_className[1][0]){

            for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                if ($(`.${sorting[0][0]}${i}`).html() != ''){
                    return true;
                }
            }
            // between king & piece is empty

            let checkerr = true;
            if (queen_parent[1][0] == own_piece_parent_className[1][0]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = false;
                    return true;
                }

                checkerr = false;
                sorting = [queen_parent[1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[0][1][0] == own_piece_parent_className[1][0]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = false;
                    return true;
                }

                checkerr = false;
                sorting = [roohks_parent[0][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[1][1][0] == own_piece_parent_className[1][0]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = false;
                    return true;
                }

                checkerr = false;
                sorting = [roohks_parent[1][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }

            if (checkerr)
                return true;
            return false;
        }

        //---------------------------------------------------------------------
        // same col

        if (king_parent[1][1] == own_piece_parent_className[1][1]){

            let checkerr = true;
            for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                    return true;
                }
            }
            // between king & piece is empty

            if (queen_parent[1][1] == own_piece_parent_className[1][1]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = true;
                    return true;
                }

                checkerr = false;
                sorting = [queen_parent[1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[0][1][1] == own_piece_parent_className[1][1]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = true;
                    return true;
                }

                checkerr = false;
                sorting = [roohks_parent[0][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[1][1][1] == own_piece_parent_className[1][1]){
                if (id.search('r') != -1 || id.search('v') != -1){
                    rook_col_row = true;
                    return true;
                }

                checkerr = false;
                sorting = [roohks_parent[1][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }
            if (checkerr)
                return true;
            return false;
        }

        //------------------------------------------  
    
    return false;
}

function moving_piece_notIn_same_col (own_piece_parent_className, piece_color){

    let king_id;
    let oppenet_bishop_id, oppenet_queen_id;
    if (piece_color == 'dark-mohre'){
        king_id = '#kd1';
        oppenet_bishop_id = ['#ew1', '#ew2'];
        oppenet_queen_id = '#vw1';
    }
    else {
        king_id = '#kw1';
        oppenet_bishop_id = ['#ed1', '#ed2'];
        oppenet_queen_id = '#vd1';
    }

    let king_parent = $(king_id).parent().attr('class').split(" ");

    if (Math.abs(king_parent[1].charCodeAt(0) - own_piece_parent_className[1].charCodeAt(0)) != Math.abs(parseInt(king_parent[1][1]) - parseInt(own_piece_parent_className[1][1])) ){
        return true;
    }

    let bishops_parent = [];
    let queen_parent = null;

    if ($(oppenet_queen_id).parent().attr('class') != undefined)
        queen_parent = $(oppenet_queen_id).parent().attr('class').split(" ");
    
    if ($(oppenet_bishop_id[0]).parent().attr('class') != undefined)
        bishops_parent[0] = $(oppenet_bishop_id[0]).parent().attr('class').split(" ");
    
    if ($(oppenet_bishop_id[1]).parent().attr('class') != undefined)
        bishops_parent[1] = $(oppenet_bishop_id[1]).parent().attr('class').split(" ")

    //--------
    // right top

    if (king_parent[1].charCodeAt(0) > own_piece_parent_className[1].charCodeAt(0) && parseInt(king_parent[1][1]) < parseInt(own_piece_parent_className[1][1]) ){
        let checkerr = cheking_for_queen_bishop(-1, 1, own_piece_parent_className, king_parent, queen_parent, bishops_parent)
        if (checkerr)
            return true
    }
    
    //----------------------------------
    //top left 

    if (king_parent[1].charCodeAt(0) > own_piece_parent_className[1].charCodeAt(0) && parseInt(king_parent[1][1]) > parseInt(own_piece_parent_className[1][1]) ){
        let checkerr = cheking_for_queen_bishop(-1, -1, own_piece_parent_className, king_parent, queen_parent, bishops_parent)
        if (checkerr)
            return true
    }

    //------------------------------------------------
    // down left
    if (king_parent[1].charCodeAt(0) < own_piece_parent_className[1].charCodeAt(0) && parseInt(king_parent[1][1]) > parseInt(own_piece_parent_className[1][1]) ){
        let checkerr = cheking_for_queen_bishop(1, -1, own_piece_parent_className, king_parent, queen_parent, bishops_parent)
        if (checkerr)
            return true
    }

    //-------------------------------------------------
    // down right

    if (king_parent[1].charCodeAt(0) < own_piece_parent_className[1].charCodeAt(0) && parseInt(king_parent[1][1]) < parseInt(own_piece_parent_className[1][1]) ){
        let checkerr = cheking_for_queen_bishop(1, 1, own_piece_parent_className, king_parent, queen_parent, bishops_parent)
        if (checkerr)
            return true
    }
    
}

function cheking_for_queen_bishop (zaribI, zaribJ, own_piece_parent_className, king_parent, queen_parent, bishops_parent){

    for (let i = king_parent[1].charCodeAt(0) - 97 + 1 * zaribI, j = parseInt(king_parent[1][1]); j < parseInt(own_piece_parent_className[1][1]) + 1 * zaribJ; i += 1 * zaribI, j += 1 * zaribJ){
            
        if ($(`.${rows[i]}${j}`).html() != ''){
            return true;
        }
    }

    let check_for_ifs = true;
    if ((queen_parent[1].charCodeAt(0) - own_piece_parent_className[1].charCodeAt(0)) * zaribI == (parseInt(queen_parent[1][1]) - parseInt(own_piece_parent_className[1][1])) * zaribJ){

        check_for_ifs = false;
        for (let i = own_piece_parent_className[1].charCodeAt(0) - 97 + 1 * zaribI, j = parseInt(own_piece_parent_className[1][1]) + 1 * zaribJ; j < parseInt(queen_parent[1][1]); i += 1 * zaribI, j += 1 * zaribJ){
        
            if ($(`.${rows[i]}${j}`).html() != ''){
                return true;
            }
        }
    }

    if ((bishops_parent[0][1].charCodeAt(0) - own_piece_parent_className[1].charCodeAt(0)) * zaribI == (parseInt(bishops_parent[0][1][1]) - parseInt(own_piece_parent_className[1][1])) * zaribJ){

        check_for_ifs = false;
        for (let i = own_piece_parent_className[1].charCodeAt(0) - 97 + 1 * zaribI, j = parseInt(own_piece_parent_className[1][1]) + 1 * zaribJ; j < parseInt(bishops_parent[0][1][1]); i += 1 * zaribI, j += 1 * zaribJ){
        
            if ($(`.${rows[i]}${j}`).html() != ''){
                return true;
            }
        }
    }

    if ((bishops_parent[1][1].charCodeAt(0) - own_piece_parent_className[1].charCodeAt(0)) * zaribI == (parseInt(bishops_parent[1][1][1]) - parseInt(own_piece_parent_className[1][1])) * zaribJ){

        check_for_ifs = false;
        for (let i = own_piece_parent_className[1].charCodeAt(0) - 97 + 1 * zaribI, j = parseInt(own_piece_parent_className[1][1]) + 1 * zaribJ; j < parseInt(bishops_parent[1][1][1]); i += 1 * zaribI, j += 1 * zaribJ){
        
            if ($(`.${rows[i]}${j}`).html() != ''){
                return true;
            }
        }
    }

    if (check_for_ifs)
        return true
    return false;
}
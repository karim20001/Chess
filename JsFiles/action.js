class Action {
    constructor (mohre, origin, destination, deleted) {
        this.mohre = mohre;
        this.origin = origin;
        this.destination = destination;
        this.deleted = deleted;
    }
}

function moving_piece_check_own_same_rowCol (own_piece_parent_className, piece_color){

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
    let roohks_parent = [];
    let queen_parent = null;

    if ($(oppenet_queen_id).parent() != undefined)
        queen_parent = $(oppenet_queen_id).parent().attr('class').split(" ");
    
    if ($(oppenet_rookhs_id[0]).parent() != undefined)
        roohks_parent[0] = $(oppenet_rookhs_id[0]).parent().attr('class').split(" ");
    
    if ($(oppenet_rookhs_id[1]).parent() != undefined)
        roohks_parent[1] = $(oppenet_rookhs_id[1]).parent().attr('class').split(" ")

    let sorting = [king_parent[1], own_piece_parent_className[1]]
    sorting.sort();

    if (king_parent[1][0] != own_piece_parent_className[1][0] && king_parent[1][1] != own_piece_parent_className[1][1]){
        return true;
    }
    else {

        // same row
        if (king_parent[1][0] == own_piece_parent_className[1][0]){

            for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                if ($(`.${sorting[0][0]}${i}`).html() != ''){
                    console.log(i)
                    return true;
                }
            }
            // between king & piece is empty

            if (queen_parent[1][0] == own_piece_parent_className[1][0]){

                sorting = [queen_parent[1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[0][1][0] == own_piece_parent_className[1][0]){

                sorting = [roohks_parent[0][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[1][1][0] == own_piece_parent_className[1][0]){

                sorting = [roohks_parent[1][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = parseInt(sorting[0][1]) + 1; i < parseInt(sorting[1][1]); i++){

                    if ($(`.${sorting[0][0]}${i}`).html() != ''){
                        return true;
                    }
                }
            }
        }

        //---------------------------------------------------------------------
        // same col

        if (king_parent[1][1] == own_piece_parent_className[1][1]){

            for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                    console.log($(`.${rows[i]}${sorting[0][1]}`).html())
                    return true;
                }
            }
            // between king & piece is empty

            if (queen_parent[1][1] == own_piece_parent_className[1][1]){

                sorting = [queen_parent[1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[0][1][1] == own_piece_parent_className[1][1]){

                sorting = [roohks_parent[0][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }

            if (roohks_parent[1][1][1] == own_piece_parent_className[1][1]){

                sorting = [roohks_parent[1][1], own_piece_parent_className[1]];
                sorting.sort();

                for (let i = sorting[0][0].charCodeAt(0) - 96; i < sorting[1][0].charCodeAt(0) - 97; i++){

                    if ($(`.${rows[i]}${sorting[0][1]}`).html() != ''){
                        return true;
                    }
                }
            }
        }

        //------------------------------------------  
    }
    return false;
}
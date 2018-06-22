'use sthict';

const BOARD_SIZE = 8;
let turn_of_white = false; //falseが黒でtrueが白

const board_click = (e) => {
    let position = e.target.id || e.target.parentElement.id;
    let board_number = parseInt(position.slice("Num".length));
    let turn_count = 0;
    let can_put    = 0;

    let board_position = {
        y: Math.floor(board_number / BOARD_SIZE) + 1,   //board_positionの場合:-1,-1左上、0,-1上、+1,-1右上、+1,0右、+1,+1右下、0,+1下、-1,+1左下、-1,0左
        x: board_number % BOARD_SIZE,                   //position_number の場合:-9左上、-8上、-7右上、+1右、+9右下、+8下、+7左下、-1左
    };

    const search_enemy = (my_color, enemy_color, temp_my_color) => {
        let TempMyColor = document.getElementsByClassName(temp_my_color);
        for (let y = board_position.y - 1; y <= board_position.y + 1; ++y) {

            for (let x = board_position.x - 1; x <= board_position.x + 1; ++x) {
                let y_dif = y - board_position.y;
                let x_dif = x - board_position.x;
                let position_sum = board_number + (y_dif * 8 + x_dif);
                let position_sum_div = position_sum % 8;

                if (position_sum < 1 || position_sum > 64) { 
                }
                else if (document.getElementById("Num" + position_sum).classList.contains(enemy_color)) {

                    while (true) {

                        if (position_sum <= 0 || position_sum > 64) {

                            while (TempMyColor.length !== 0) {
                                TempMyColor[0].classList.remove(temp_my_color);
                            } break;
                        }
                        else if (document.getElementById("Num" + position_sum).classList.contains(enemy_color)) {

                            if (((position_sum_div === 0) || (position_sum_div === 1)) && ((x - board_position.x) !== 0)) {//position_sum_divは列を確かめ、両端を検知して、x-board_position.xは進む方向を示している。両端から飛び出そうとすると弾かれます。

                                while (TempMyColor.length !== 0) {
                                    TempMyColor[0].classList.remove(temp_my_color);
                                }
                                y_dif = y_dif + (y - board_position.y);
                                y_dif = y_dif + (x - board_position.x);
                                position_sum = board_number + (y_dif * 8 + x_dif);
                                position_sum_div = position_sum % 8;
                                break;
                            }
                            else {
                                document.getElementById("Num" + position_sum).classList.add(temp_my_color);
                                y_dif = y_dif + (y - board_position.y);
                                x_dif = x_dif + (x - board_position.x);
                                position_sum = board_number + (y_dif * 8 + x_dif);
                                position_sum_div = position_sum % 8;
                            };
                        }
                        else if (document.getElementById("Num" + position_sum).classList.contains(my_color)) {
                            document.getElementById(position).classList.add(my_color);//ここが正規のコード　　下のデバッグモードをコメントアウトして、こちらを動かすと好きなとこに置けなくなる
                            turn_count = 1;

                            for (let i = 0; i < TempMyColor.length; ++i) {
                                document.getElementsByClassName(temp_my_color)[i].classList.add(my_color);
                            };

                            while (document.getElementsByClassName(temp_my_color).length !== 0) {
                                document.getElementsByClassName(temp_my_color)[0].classList.remove(temp_my_color, enemy_color);
                            };
                            break;
                        }
                        else if (document.getElementById("Num" + position_sum).classList.length === 0) {

                            while (document.getElementsByClassName(temp_my_color).length !== 0) {
                                document.getElementsByClassName(temp_my_color)[0].classList.remove(temp_my_color);
                            };
                            break;
                        };
                    };
                };
            };
        };
    }

    const can_put_peace = (my_color, enemy_color) => {
        let my_peace_count = document.getElementsByClassName(my_color).length;

        for (let i = 0; i < my_peace_count; i++) {
            let temp_position = parseInt(document.getElementsByClassName(my_color)[i].id.slice("Num".length));
            
            let imagnary_position = {
                y: Math.floor(temp_position / BOARD_SIZE) + 1,
                x: temp_position % BOARD_SIZE,
            }

            for (let y = imagnary_position.y - 1; y <= imagnary_position.y + 1; ++y) {

                for (let x = imagnary_position.x - 1; x <= imagnary_position.x + 1; ++x) {

                    let y_dif = y - imagnary_position.y;
                    let x_dif = x - imagnary_position.x;
                    let position_sum = temp_position + (y_dif * 8 + x_dif);
                    let position_sum_div = position_sum % 8;

                    if (position_sum < 1 || position_sum > 64) { 
                    }
                    else if (document.getElementById("Num" + position_sum).classList.contains(enemy_color)) {

                        while (true) {

                            if (position_sum <= 0 || position_sum > 64) {
                                break;
                            }
                            else if (document.getElementById("Num" + position_sum).classList.contains(enemy_color)) {

                                if (((position_sum_div === 0) || (position_sum_div === 1)) && ((x - imagnary_position.x) !== 0)) {//position_sum_divは列を確かめ、両端を検知して、x-board_position.xは進む方向を示している。両端から飛び出そうとすると弾かれます。
                                    y_dif = y_dif + (y - imagnary_position.y);
                                    x_dif = x_dif + (x - imagnary_position.x);
                                    position_sum = temp_position + (y_dif * 8 + x_dif);
                                    position_sum_div = position_sum % 8;
                                    break;
                                }
                                else {
                                    y_dif = y_dif + (y - imagnary_position.y);
                                    x_dif = x_dif + (x - imagnary_position.x);
                                    position_sum = temp_position + (y_dif * 8 + x_dif);
                                    position_sum_div = position_sum % 8;
                                };
                            }
                            else if (document.getElementById("Num" + position_sum).classList.contains(my_color)) {
                                break;
                            }
                            else if (document.getElementById("Num" + position_sum).classList.length === 0) {
                                can_put = 1;
                                break;
                            };
                        };
                    };
                };
            };
        };
    };

    const win_decision = () => {
        let all_black = document.getElementsByClassName("black").length;
        let all_white = document.getElementsByClassName("white").length;

        if (all_black === all_white) {
            alert("引き分け");
            let next_game = confirm("次の試合をしますか？");
            if(next_game){
                location.href = location.href;
            }
            else{
                document.getElementById("next_game_button").style.display = "block";
            };
        }
        else if (all_black > all_white) {
            alert("黒の勝ち");
            let next_game = confirm("次の試合をしますか？");
            if(next_game){
                location.href = location.href;
            }
            else{
                document.getElementById("next_game_button").style.display = "block";
            };
        }
        else {
            alert("白の勝ち");
            let next_game = confirm("次の試合をしますか？");
            if(next_game){
                location.href = location.href;
            }
            else{
                document.getElementById("next_game_button").style.display = "block";
            };
        };
    };

    if (document.getElementById(position).classList.length === 0) {
        let white_turn = document.getElementById("white_turn");
        let black_turn = document.getElementById("black_turn");

        if (turn_of_white === false) {
            // document.getElementById(position).classList.add("black");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn_of_white = !turn_of_white;//もしコメントアウト外すときはsearch_enemyのをコメントアウトすべし
            search_enemy("black", "white", "temp_black");

            if (turn_count !== 0) {
                let all_black  = document.getElementsByClassName("black").length;
                let all_white  = document.getElementsByClassName("white").length;
                let text_black = document.getElementById("now_black_peaces");
                let text_white = document.getElementById("now_white_peaces");

                turn_of_white = !turn_of_white;
                text_black.innerHTML = all_black;
                text_white.innerHTML = all_white;

                black_turn.style.color    = "black";
                black_turn.style.font     = "nomal";
                black_turn.style.fontSize = "50px";
                white_turn.style.color    = "orangered";
                white_turn.style.font     = "bold";
                white_turn.style.fontSize = "100px";

                can_put_peace("white", "black");

                if (can_put === 0) {
                    can_put_peace("black", "white");

                    if (can_put === 0) {
                        win_decision();
                    }
                    else {
                        document.getElementById("white_PASS").style.display = "block";
                        alert("白を置ける場所がありません");
                    };
                }
                else {
                    let all_black = document.getElementsByClassName("black").length;
                    let all_white = document.getElementsByClassName("white").length;

                    if (all_black + all_white >= 64) {
                        win_decision();
                    };
                };
            };
        }
        else {
            // document.getElementById(position).classList.add("white");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn_of_white = !turn_of_white;//もしコメントアウト外すときはsearch_enemyのをコメントアウトすべし 
            search_enemy("white", "black", "temp_white");

            if (turn_count !== 0) {
                let all_black  = document.getElementsByClassName("black").length;
                let all_white  = document.getElementsByClassName("white").length;
                let text_black = document.getElementById("now_black_peaces");
                let text_white = document.getElementById("now_white_peaces");
                
                turn_of_white = !turn_of_white;
                text_black.innerHTML = all_black;
                text_white.innerHTML = all_white;

                white_turn.style.color    = "black";
                white_turn.style.font     = "nomal";
                white_turn.style.fontSize = "50px";
                black_turn.style.color    = "orangered";
                black_turn.style.font     = "bold";
                black_turn.style.fontSize = "100px";

                can_put_peace("black", "white");

                if (can_put === 0) {
                    can_put_peace("white", "black");

                    if (can_put === 0) {
                        win_decision();
                    }
                    else {
                        document.getElementById("black_PASS").style.display = "block";
                        alert("黒を置ける場所がありません");
                    };
                }
                else {
                    let all_black = document.getElementsByClassName("black").length;
                    let all_white = document.getElementsByClassName("white").length;

                    if (all_black + all_white >= 64) {
                        win_decision();
                    };
                };
            };
        };
    };
};


let pass_process = () => {
    let white_turn = document.getElementById("white_turn");
    let black_turn = document.getElementById("black_turn");

    if (turn_of_white === true) {
        turn_of_white = !turn_of_white;
        document.getElementById("white_PASS").style.display = "none";
        white_turn.style.color    = "black";
        white_turn.style.font     = "nomal";
        white_turn.style.fontSize = "50px";
        black_turn.style.color    = "orangered";
        black_turn.style.font     = "bold";
        black_turn.style.fontSize = "100px";
    }
    else {
        turn_of_white = !turn_of_white;
        document.getElementById("black_PASS").style.display = "none";
        black_turn.style.color    = "black";
        black_turn.style.font     = "nomal";
        black_turn.style.fontSize = "50px";
        white_turn.style.color    = "orangered";
        white_turn.style.font     = "bold";
        white_turn.style.fontSize = "100px";
    };
};

let next_game_process = () =>{
    let next_game = confirm("次の試合をしますか？");
    if(next_game){
        location.href = location.href;
    };
};

let board_create = document.getElementById("board");
for (let y = 0; y < BOARD_SIZE + 1; ++y) {

    if (y === 0) {
        let html_tr = document.createElement("tr");
        let html_th = document.createElement("th");

        board.appendChild(html_tr);
        html_tr.appendChild(html_th);

        for (let x = 0; x < BOARD_SIZE + 1; ++x) {

            if (x !== 0) {
                let html_th = document.createElement("th");

                html_th.innerHTML = x;
                html_tr.appendChild(html_th);
            };
        };
    }
    else {
        let html_tr = document.createElement("tr");
        let html_th = document.createElement("th");

        html_th.innerHTML = y;
        board.appendChild(html_tr);
        html_tr.appendChild(html_th);

        for (let x = 0; x < BOARD_SIZE + 1; ++x) {

            if (x !== 0) {
                let html_td = document.createElement("td");
                let html_div = document.createElement("div");

                html_div.addEventListener("click", board_click, false);
                html_div.id = `Num${(y - 1) * BOARD_SIZE + x}`;
                html_tr.appendChild(html_td);
                html_td.appendChild(html_div);

                if (y === 4) {

                    if (x === 4) {
                        html_div.classList.add("white");
                    }
                    else if (x === 5) {
                        html_div.classList.add("black");
                    };
                }
                else if (y === 5) {

                    if (x === 4) {
                        html_div.classList.add("black");
                    }
                    else if (x === 5) {
                        html_div.classList.add("white");
                    };
                };
            };
        };
    };
};

let add_event_lisner = (id,process)=>{document.getElementById(id).addEventListener("click",(process),false)};

add_event_lisner("black_PASS",pass_process);
add_event_lisner("white_PASS",pass_process);
add_event_lisner("next_game_button",next_game_process);

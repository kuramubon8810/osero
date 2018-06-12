'use sthict'

let board_size = {
    x_width: 8,
    y_width: 8,
};

let turn = false; //falseが黒でtrueが白

let peace_eval = {
    none: 0,
    white: 1,
    black: 2,
};

let array = [];


let board_click = (e) => {
    let position = e.target.id || e.target.parentElement.id;
    let board_number = parseInt(position.slice("Num".length));

    let board_position = {
        y: Math.floor(board_number / board_size.x_width) + 1,
        x: board_number % board_size.y_width,
    };
    //board_positionの場合:-1,-1左上、0,-1上、+1,-1右上、+1,0右、+1,+1右下、0,+1下、-1,+1左下、-1,0左
    //position_number の場合:-9左上、-8上、-7右上、+1右、+9右下、+8下、+7左下、-1左
    let turn_count = 0;
    let can_put = 0;

    let search_enemy = (my_color, enemy_color, temp_my_color) => {
        for (let y = board_position.y - 1; y <= board_position.y + 1; ++y) {
            for (let x = board_position.x - 1; x <= board_position.x + 1; ++x) {
                let around_math = "Num" + ((y - 1) * 8 + x);
                if (around_math.slice("Num".length) > 64) {
                    continue;
                }
                let Y = y - board_position.y;
                let X = x - board_position.x;
                let sum = board_number + (Y * 8 + X);
                let sum_div = sum % 8;
                if (sum <= 0) { }
                else if (document.getElementById(around_math).classList.contains(enemy_color)) {
                    while (true) {
                        if (sum <= 0 || sum > 64) {
                            while (document.getElementsByClassName(temp_my_color).length !== 0) {
                                document.getElementsByClassName(temp_my_color)[0].classList.remove(temp_my_color);
                            } break;
                        }
                        else if (document.getElementById("Num" + sum).classList.contains(enemy_color)) {
                            if (((sum_div === 0) && (x - board_position.x) === -1) || ((sum_div === 0 || sum_div === 1) && ((x - board_position.x) === 1 || (x - board_position.x) === -1))) {
                                while (document.getElementsByClassName(temp_my_color).length !== 0) {
                                    document.getElementsByClassName(temp_my_color)[0].classList.remove(temp_my_color);
                                }
                                Y = Y + (y - board_position.y);
                                X = X + (x - board_position.x);
                                sum = board_number + (Y * 8 + X);
                                sum_div = sum % 8;
                                break;
                            }
                            else {
                                document.getElementById("Num" + sum).classList.add(temp_my_color);
                                Y = Y + (y - board_position.y);
                                X = X + (x - board_position.x);
                                sum = board_number + (Y * 8 + X);
                                sum_div = sum % 8;
                            };
                        }
                        else if (document.getElementById("Num" + sum).classList.contains(my_color)) {
                            document.getElementById(position).classList.add(my_color);//ここが正規のコード　　下のデバッグモードをコメントアウトして、こちらを動かすと好きなとこに置けなくなる
                            turn_count = 1;
                            for (let i = 0; i < document.getElementsByClassName(temp_my_color).length; ++i) {
                                document.getElementsByClassName(temp_my_color)[i].classList.add(my_color);
                            };
                            while (document.getElementsByClassName(temp_my_color).length !== 0) {
                                document.getElementsByClassName(temp_my_color)[0].classList.remove(temp_my_color, enemy_color);
                            };
                            break;
                        }
                        else if (document.getElementById("Num" + sum).classList.length === 0) {
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

    let can_put_peace = (my_color, enemy_color) => {
        let my_peace_count = document.getElementsByClassName(my_color).length;
        for (let i = 0; i < my_peace_count; i++) {
            let temp_position = parseInt(document.getElementsByClassName(my_color)[i].id.slice("Num".length));
            let imagnary_position = {
                y: Math.floor(temp_position / board_size.x_width) + 1,
                x: temp_position % board_size.y_width,
            }
            for (let y = imagnary_position.y - 1; y <= imagnary_position.y + 1; ++y) {
                for (let x = imagnary_position.x - 1; x <= imagnary_position.x + 1; ++x) {
                    let around_math = "Num" + ((y - 1) * 8 + x);
                    if (around_math.slice("Num".length) > 64) {
                        continue;
                    }
                    let Y = y - imagnary_position.y;
                    let X = x - imagnary_position.x;
                    let sum = temp_position + (Y * 8 + X);
                    let sum_div = sum % 8;
                    if (sum <= 0) { }
                    else if (document.getElementById(around_math).classList.contains(enemy_color)) {
                        while (true) {
                            if (sum <= 0 || sum > 64) {
                                break;
                            }
                            else if (document.getElementById("Num" + sum).classList.contains(enemy_color)) {
                                if (((sum_div === 0) && (x - imagnary_position.x) === -1) || ((sum_div === 0 || sum_div === 1) && ((x - imagnary_position.x) === 1 || (x - imagnary_position.x) === -1))) {
                                    Y = Y + (y - imagnary_position.y);
                                    X = X + (x - imagnary_position.x);
                                    sum = temp_position + (Y * 8 + X);
                                    sum_div = sum % 8;
                                    break;
                                }
                                else {
                                    Y = Y + (y - imagnary_position.y);
                                    X = X + (x - imagnary_position.x);
                                    sum = temp_position + (Y * 8 + X);
                                    sum_div = sum % 8;
                                };
                            }
                            else if (document.getElementById("Num" + sum).classList.contains(my_color)) {
                                break;
                            }
                            else if (document.getElementById("Num" + sum).classList.length === 0) {
                                can_put = can_put + 1;
                                break;
                            };
                        };
                    };
                };
            };
        };
    };

    let win_decision = () => {
        let all_black = document.getElementsByClassName("black").length;
        let all_white = document.getElementsByClassName("white").length;
        if (all_black === all_white) {
            alert("引き分け");
        }
        else if (all_black > all_white) {
            alert("黒の勝ち");
        }
        else {
            alert("白の勝ち");
        };
    };

    if (document.getElementById(position).classList.length === 0) {
        let white_turn = document.getElementById("white_turn");
        let black_turn = document.getElementById("black_turn");
        if (turn === false) {
            // document.getElementById(position).classList.add("black");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn = !turn;//もしコメントアウト外すときはsearch_enemyのをコメントアウトすべし
            search_enemy("black", "white", "temp_black");
            if (turn_count !== 0) {
                turn = !turn;
                black_turn.style.color = "black";
                black_turn.style.font = "nomal";
                black_turn.style.fontSize = "50px";
                white_turn.style.color = "orangered";
                white_turn.style.font = "bold";
                white_turn.style.fontSize = "100px";
                turn_count = 0;
                let all_black = document.getElementsByClassName("black").length;
                let all_white = document.getElementsByClassName("white").length;
                let text_black = document.getElementById("now_black_peaces");
                let text_white = document.getElementById("now_white_peaces");
                text_black.innerHTML = all_black;
                text_white.innerHTML = all_white;
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
                    }
                };
            };
        }
        else {
            // document.getElementById(position).classList.add("white");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn = !turn;//もしコメントアウト外すときはsearch_enemyのをコメントアウトすべし 
            search_enemy("white", "black", "temp_white")
            if (turn_count !== 0) {
                turn = !turn;
                white_turn.style.color = "black";
                white_turn.style.font = "nomal";
                white_turn.style.fontSize = "50px";
                black_turn.style.color = "orangered";
                black_turn.style.font = "bold";
                black_turn.style.fontSize = "100px";
                let all_black = document.getElementsByClassName("black").length;
                let all_white = document.getElementsByClassName("white").length;
                let text_black = document.getElementById("now_black_peaces");
                let text_white = document.getElementById("now_white_peaces");
                text_black.innerHTML = all_black;
                text_white.innerHTML = all_white;
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
                    }
                };
            };
        };
    };
};


let pass_process = () => {
    let white_turn = document.getElementById("white_turn");
    let black_turn = document.getElementById("black_turn");
    if (turn = false) {
        turn = !turn;
        document.getElementById("white_PASS").style.display = "none";
        white_turn.style.color = "black";
        white_turn.style.font = "nomal";
        white_turn.style.fontSize = "50px";
        black_turn.style.color = "orangered";
        black_turn.style.font = "bold";
        black_turn.style.fontSize = "100px";
    }
    else {
        turn = !turn;
        document.getElementById("black_PASS").style.display = "none";
        black_turn.style.color = "black";
        black_turn.style.font = "nomal";
        black_turn.style.fontSize = "50px";
        white_turn.style.color = "orangered";
        white_turn.style.font = "bold";
        white_turn.style.fontSize = "100px";
    }
}



let board_create = document.getElementById("board");
for (let y = 0; y < board_size.y_width + 1; ++y) {
    if (y === 0) {
        let html_tr = document.createElement("tr");
        let html_th = document.createElement("th");
        board.appendChild(html_tr);
        html_tr.appendChild(html_th);
        for (let x = 0; x < board_size.x_width + 1; ++x) {
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
        for (let x = 0; x < board_size.x_width + 1; ++x) {
            if (x !== 0) {
                let html_td = document.createElement("td");
                let html_div = document.createElement("div");
                html_div.addEventListener("click", board_click, false);
                html_div.id = `Num${(y - 1) * board_size.x_width + x}`;
                array.push([html_td.id.slice("Num".length), peace_eval.none]);
                html_tr.appendChild(html_td);
                html_td.appendChild(html_div);
                if (y === 4) {
                    if (x === 4) {
                        html_div.classList.add("white");
                    }
                    else if (x === 5) {
                        html_div.classList.add("black");
                    }
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
}
document.getElementById("black_PASS").addEventListener("click", pass_process, false);
document.getElementById("black_PASS").style.display = "none";
document.getElementById("white_PASS").addEventListener("click", pass_process, false);
document.getElementById("white_PASS").style.display = "none";



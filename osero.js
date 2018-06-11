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

    let turn_count = 0;
    //board_positionの場合:-1,-1左上、0,-1上、+1,-1右上、+1,0右、+1,+1右下、0,+1下、-1,+1左下、-1,0左
    //position_number の場合:-9左上、-8上、-7右上、+1右、+9右下、+8下、+7左下、-1左
    if (document.getElementById(position).classList.length === 0) {
        if (turn === false) {
            // document.getElementById(position).classList.add("black");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn = !turn;//もしコメントアウト外すときは下のをコメントアウトすべし
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
                    else if (document.getElementById(around_math).classList.contains("white")) {
                        while (true) {
                            if (sum <= 0 || sum > 64) {
                                while (document.getElementsByClassName("temp_black").length !== 0) {
                                    document.getElementsByClassName("temp_black")[0].classList.remove("temp_black");
                                } break;
                            }
                            else if (document.getElementById("Num" + sum).classList.contains("white")) {
                                if (((sum_div === 0) && (x - board_position.x) === -1) || ((sum_div === 0 || sum_div === 1) && ((x - board_position.x) === 1 || (x - board_position.x) === -1))) {
                                    while (document.getElementsByClassName("temp_black").length !== 0) {
                                        document.getElementsByClassName("temp_black")[0].classList.remove("temp_black");
                                    }
                                    Y = Y + (y - board_position.y);
                                    X = X + (x - board_position.x);
                                    sum = board_number + (Y * 8 + X);
                                    sum_div = sum % 8;
                                    break;
                                }
                                else {
                                    document.getElementById("Num" + sum).classList.add("temp_black");
                                    Y = Y + (y - board_position.y);
                                    X = X + (x - board_position.x);
                                    sum = board_number + (Y * 8 + X);
                                    sum_div = sum % 8;
                                };
                            }
                            else if (document.getElementById("Num" + sum).classList.contains("black")) {
                                document.getElementById(position).classList.add("black");//ここが正規のコード　　上のデバッグモードをコメントアウトして、こちらを動かすと好きなとこに置けなくなる
                                turn_count = turn_count + 1;
                                for (let i = 0; i < document.getElementsByClassName("temp_black").length; ++i) {
                                    document.getElementsByClassName("temp_black")[i].classList.add("black");
                                };
                                while (document.getElementsByClassName("temp_black").length !== 0) {
                                    document.getElementsByClassName("temp_black")[0].classList.remove("temp_black", "white");
                                };
                                break;
                            }
                            else if (document.getElementById("Num" + sum).classList.length === 0) {
                                while (document.getElementsByClassName("temp_black").length !== 0) {
                                    document.getElementsByClassName("temp_black")[0].classList.remove("temp_black");
                                };
                                break;
                            };
                        };
                    };
                };
            }; if (turn_count !== 0) {
                turn = !turn
            };
        }
        else {
            // document.getElementById(position).classList.add("white");//ここ二行はデバッグモード用のどこにでも置けるようにするやつ
            //turn = !turn;//もしコメントアウト外すときは下のをコメントアウトすべし
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
                    else if (document.getElementById(around_math).classList.contains("black")) {
                        while (true) {
                            if (sum <= 0 || sum > 64) {
                                while (document.getElementsByClassName("temp_white").length !== 0) {
                                    document.getElementsByClassName("temp_white")[0].classList.remove("temp_white");
                                } break;
                            }
                            else if (document.getElementById("Num" + sum).classList.contains("black")) {
                                if (((sum_div === 0) && (x - board_position.x) === -1) || ((sum_div === 0 || sum_div === 1) && ((x - board_position.x) === 1 || (x - board_position.x) === -1))) {
                                    while (document.getElementsByClassName("temp_white").length !== 0) {
                                        document.getElementsByClassName("temp_white")[0].classList.remove("temp_white");
                                    }
                                    Y = Y + (y - board_position.y);
                                    X = X + (x - board_position.x);
                                    sum = board_number + (Y * 8 + X);
                                    sum_div = sum % 8;
                                    break;
                                }
                                else {
                                    document.getElementById("Num" + sum).classList.add("temp_white");
                                    Y = Y + (y - board_position.y);
                                    X = X + (x - board_position.x);
                                    sum = board_number + (Y * 8 + X);
                                    sum_div = sum % 8;
                                };
                            }
                            else if (document.getElementById("Num" + sum).classList.contains("white")) {
                                document.getElementById(position).classList.add("white");//ここが正規のコード　上のデバッグモードをコメントアウトして、こちらを動かすと好きなとこに置けなくなる
                                turn_count = turn_count + 1;
                                for (let i = 0; i < document.getElementsByClassName("temp_white").length; ++i) {
                                    document.getElementsByClassName("temp_white")[i].classList.add("white");
                                };
                                while (document.getElementsByClassName("temp_white").length !== 0) {
                                    document.getElementsByClassName("temp_white")[0].classList.remove("temp_white", "black");
                                };
                                break;
                            }
                            else if (document.getElementById("Num" + sum).classList.length === 0) {
                                while (document.getElementsByClassName("temp_white").length !== 0) {
                                    document.getElementsByClassName("temp_white")[0].classList.remove("temp_white");
                                };
                                break;
                            };
                        };
                    };
                };
            }; if (turn_count !== 0) {
                turn = !turn
            };
        };
    };
    console.log(board_position.x, board_position.y);
};


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
};
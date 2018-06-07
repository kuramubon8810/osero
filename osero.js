'use sthict'

let board_size = {
    x_width: 8,
    y_width: 8,
};
let turn = true; //falseが黒でtrueが白
let board_click = (e) => {
    let position = e.target.id || e.target.parentElement.id;
    let board_number = parseInt(position.slice("Num".length));
    let board_position = {
        y: Math.floor(board_number / board_size.x_width),
        x: board_number % board_size.y_width,
    };
    if (document.getElementById(position).classList.length === 0) {
        if (turn === false) {
            document.getElementById(position).classList.add("black");
            turn = !turn;
        }
        else {
            document.getElementById(position).classList.add("white");
            turn = !turn;
        };
    };
    if (document.getElementById(position).classList.contains("black")) {
        document.getElementById(position).classList.remove("black");
        document.getElementById(position).classList.add("white");
    }
    else if (document.getElementById(position).classList.contains("white")) {
        document.getElementById(position).classList.remove("white");
        document.getElementById(position).classList.add("black");
    }
    else {
        document.getElementById(position).classList.add("white");
    }
    console.log(board_position.y, board_position.x);
    console.log(array[board_number][1]);
};
let peace_eval = {
    none: 0,
    white: 1,
    black: 2,
};
let array = [];

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
                html_div.id = `Num${(y - 1) * board_size.x_width + x - 1}`;
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






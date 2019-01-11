'use strict';

const BOARD_SIZE = 8; //正方形で8×8の盤面なため高さと幅をまとめてる
let turn_of_black = true;
let cpu_turn_of_black = false;
let cpu_mode = true;
let gameend_frag = false;
let cpu_put_position = {};
let board_status_array = [];
let can_put_position = [];
let piece_count = ["black", "white", "space"];
piece_count["black"] = 2;
piece_count["white"] = 2;
piece_count["space"] = BOARD_SIZE * BOARD_SIZE;

function create_board_array() {
	for (let y = 0; y <= BOARD_SIZE + 1; ++y) {
		let line = [];
		for (let x = 0; x <= BOARD_SIZE + 1; ++x) {
			switch (y) {
				case 0:
				case BOARD_SIZE + 1:
					line.push("outzone");
					break;
				case 4:
					switch (x) {
						case 0:
						case BOARD_SIZE + 1:
							line.push("outzone");
							break;
						case 4:
							line.push("white");
							break;
						case 5:
							line.push("black");
							break;
						default:
							line.push("space");
							break;
					};
					break;
				case 5:
					switch (x) {
						case 0:
						case BOARD_SIZE + 1:
							line.push("outzone");
							break;
						case 4:
							line.push("black");
							break;
						case 5:
							line.push("white");
							break;
						default:
							line.push("space");
							break;
					};
					break;
				default:
					switch (x) {
						case 0:
						case BOARD_SIZE + 1:
							line.push("outzone");
							break;
						default:
							line.push("space");
							break;
					}
			};
		};
		board_status_array.push(line);
	};
};

let clicked_board = (e) => {
	let piece_id = e.target.id || e.target.parentElement.id;
	let piece_coordinate = {
		y: parseInt(piece_id.slice(0, 1)),
		x: parseInt(piece_id.slice(2, 3))
	};

	if (!gameend_frag) {
		if (board_status_array[piece_coordinate.y][piece_coordinate.x] == "space") {
			if (turn_of_black) {
				search_enemy("black", "white", piece_coordinate);
				if (can_put_position.length) {
					turn_over("black", "white", piece_coordinate);
					insertion_array_data_to_board();
					clear_can_put_position_color();
					if (check_next_turn("black", "white") === 1) {
						document.getElementById("white_PASS").style.display = "block";
						clear_can_put_position_color();
					} else if (check_next_turn("black", "white") === 2) {
						gameend_frag = true;
					};

					--piece_count["space"];
					turn_of_black = !turn_of_black;
					now_pieces();

					black_turn.style.color = "black";
					black_turn.style.font = "nomal";
					black_turn.style.fontSize = "50px";
					white_turn.style.color = "orangered";
					white_turn.style.font = "bold";
					white_turn.style.fontSize = "100px";
				};
			} else {
				search_enemy("white", "black", piece_coordinate);
				if (can_put_position.length) {
					turn_over("white", "black", piece_coordinate);
					insertion_array_data_to_board();
					clear_can_put_position_color();
					if (check_next_turn("white", "black") === 1) {
						document.getElementById("black_PASS").style.display = "block";
						clear_can_put_position_color();
					} else if (check_next_turn("white", "black") === 2) {
						gameend_frag = true;
					};

					--piece_count["space"];
					turn_of_black = !turn_of_black;
					now_pieces();

					white_turn.style.color = "black";
					white_turn.style.font = "nomal";
					white_turn.style.fontSize = "50px";
					black_turn.style.color = "orangered";
					black_turn.style.font = "bold";
					black_turn.style.fontSize = "100px";
				};
			};
			if (!(piece_count["space"])) {
				win_decision();
				next_game_process();
			};
		};
		if (cpu_mode) {
			if (cpu_turn_of_black && turn_of_black) {
				cpu_turn();
				setTimeout(cpu_put, 10);
			} else if (!(cpu_turn_of_black || turn_of_black)) {
				cpu_turn();
				setTimeout(cpu_put, 10);
			};
		};
	} else {
		alert("どちらも置ける場所がありません")
		win_decision();
		next_game_process();
		clear_can_put_position_color();
	};
};

function search_enemy(my_color, enemy_color, piece_coordinate) {
	for (let y = piece_coordinate.y - 1; y <= piece_coordinate.y + 1; ++y) {
		for (let x = piece_coordinate.x - 1; x <= piece_coordinate.x + 1; ++x) {
			let y_direction = y - piece_coordinate.y;
			let x_direction = x - piece_coordinate.x;

			if (board_status_array[y][x] == enemy_color && board_status_array[y][x] != "outzone") {
				let search_position = {
					y: y,
					x: x
				};
				while (board_status_array[search_position.y][search_position.x] == enemy_color) {
					search_position = {
						y: search_position.y + y_direction,
						x: search_position.x + x_direction
					};
				};
				if (board_status_array[search_position.y][search_position.x] == my_color) {
					can_put_position.push(search_position);
				};
			};
		};
	};
};

//https://www.deep-rain.com/programming/javascript/755
function objectSort(obj) {
	// まずキーのみをソートする
	var keys = Object.keys(obj).sort();

	// 返却する空のオブジェクトを作る
	var map = {};

	// ソート済みのキー順に返却用のオブジェクトに値を格納する
	keys.forEach(function (key) {
		map[key] = obj[key];
	});

	return map;
};

//https://javascript.programmer-reference.com/js-sleep/
//引数にはミリ秒を指定します。（例：5秒の場合は5000）
function sleep(a) {
	var dt1 = new Date().getTime();
	var dt2 = new Date().getTime();
	while (dt2 < dt1 + a) {
		dt2 = new Date().getTime();
	}
	return;
};

function turn_over(my_color, enemy_color, piece_coordinate) {
	for (let i = 0; i < can_put_position.length; ++i) {
		let y_direction = (can_put_position[i].y - piece_coordinate.y) / Math.abs(can_put_position[i].y - piece_coordinate.y);
		let x_direction = (can_put_position[i].x - piece_coordinate.x) / Math.abs(can_put_position[i].x - piece_coordinate.x);
		let turn_over_position = {
			x: piece_coordinate.x,
			y: piece_coordinate.y
		};

		while (!(JSON.stringify(objectSort(can_put_position[i])) === JSON.stringify(objectSort(turn_over_position)))) {
			board_status_array[turn_over_position.y][turn_over_position.x] = my_color;
			++piece_count[my_color];
			--piece_count[enemy_color];
			if (y_direction) {
				turn_over_position.y += y_direction;
			} else {
				turn_over_position.y += 0;
			};

			if (x_direction) {
				turn_over_position.x += x_direction;
			} else {
				turn_over_position.x += 0;
			};
		};
	};
	piece_count[my_color] -= can_put_position.length - 1;
	piece_count[enemy_color] += can_put_position.length;
	can_put_position = [];
};

//次のターン、敵がコマを置けるかの判定（置けるとは、オセロのルール上ひっくり返せるかどうか）
function can_put_enemy(my_color, enemy_color) {
	let pass_status = true;
	for (let y = 1; y <= BOARD_SIZE; ++y) {
		for (let x = 1; x <= BOARD_SIZE; ++x) {
			if (board_status_array[y][x] == "space") {
				let imagnary_position = {
					y: y,
					x: x
				};
				search_enemy(my_color, enemy_color, imagnary_position);

				if (can_put_position.length > 0) {
					paint_can_put_position(y, x);
					can_put_position = [];
					pass_status = false;
				};
			};
		};
	};
	return pass_status;
};

function check_next_turn(my_color, enemy_color) {
	if (can_put_enemy(enemy_color, my_color)) {
		if (can_put_enemy(my_color, enemy_color)) {
			return 2;
		};
		return 1;
	} else {
		return 0;
	};
};

function paint_can_put_position(y, x) {
	document.getElementById(y + "_" + x).style.backgroundColor = "palegreen";
};

function clear_can_put_position_color() {
	for (let y = 1; y <= BOARD_SIZE; ++y) {
		for (let x = 1; x <= BOARD_SIZE; ++x) {
			document.getElementById(y + "_" + x).style.backgroundColor = "rgba(0,0,0,0)"
		};
	};
};

function win_decision() {
	if (piece_count["black"] == piece_count["white"]) {
		alert("引き分け");
	}
	else if (piece_count["black"] > piece_count["white"]) {
		alert("黒の勝ち");
	}
	else {
		alert("白の勝ち");
	};
};

function pass_process() {
	if (turn_of_black) {
		turn_of_black = !turn_of_black;
		document.getElementById("black_PASS").style.display = "none";
		black_turn.style.color = "black";
		black_turn.style.font = "nomal";
		black_turn.style.fontSize = "50px";
		white_turn.style.color = "orangered";
		white_turn.style.font = "bold";
		white_turn.style.fontSize = "100px";
		clear_can_put_position_color();
		check_next_turn("black", "white");
	}
	else {
		turn_of_black = !turn_of_black;
		document.getElementById("white_PASS").style.display = "none";
		white_turn.style.color = "black";
		white_turn.style.font = "nomal";
		white_turn.style.fontSize = "50px";
		black_turn.style.color = "orangered";
		black_turn.style.font = "bold";
		black_turn.style.fontSize = "100px";
		clear_can_put_position_color();
		check_next_turn("white", "black");
	};
};

function next_game_process() {
	let next_game = confirm("次の試合をしますか？");
	if (next_game) {
		location.href = location.href;
	}
	else {
		document.getElementById("next_game_button").style.display = "block";
	};
};

function now_pieces() {
	document.getElementById("now_white_peaces").innerHTML = piece_count["white"];
	document.getElementById("now_black_peaces").innerHTML = piece_count["black"];
};

function cpu_turn() {
	let board_score_array = [];
	let higher_score = 0;
	let higher_score_position = {
		y: 0,
		x: 0
	}
	for (let y = 0; y <= BOARD_SIZE + 1; ++y) {
		let line = [];
		for (let x = 0; x <= BOARD_SIZE + 1; ++x) {
			if (board_status_array[y][x] == "space") {
				let imagnary_position = {
					y: y,
					x: x
				};
				if (cpu_turn_of_black) {
					search_enemy("black", "white", imagnary_position);
				} else {
					search_enemy("white", "black", imagnary_position);
				};

				if (can_put_position.length > 0) {
					let now_position_score = 0;

					for (let i = 0; i < can_put_position.length; ++i) {
						let y_direction = Math.abs(can_put_position[i].y - y);
						let x_direction = Math.abs(can_put_position[i].x - x);

						if (y_direction && x_direction) {
							now_position_score += y_direction - 1;
						} else {
							if (y_direction) {
								now_position_score += y_direction - 1;
							} else {
								now_position_score += x_direction - 1;
							};
						};
					};
					line.push([now_position_score]);
					can_put_position = [];
				} else {
					line.push([0]);
				};
			} else {
				line.push([0]);
			};
		};
		board_score_array.push(line);
	};

	for (let y = 0; y < BOARD_SIZE + 1; ++y) {
		for (let x = 0; x < BOARD_SIZE + 1; ++x) {
			if (higher_score < board_score_array[y][x]) {
				higher_score_position = {
					y: y,
					x: x
				};
			};
		};
	};
	cpu_put_position = higher_score_position;
};

function cpu_put() {
	sleep(1800);
	document.getElementById(cpu_put_position.y + "_" + cpu_put_position.x).click();
};

let board_create = document.getElementById("board");
for (let y = 0; y < BOARD_SIZE + 1; ++y) {
	if (y === 0) {
		let html_tr = document.createElement("tr");
		let html_th = document.createElement("th");

		board_create.appendChild(html_tr);
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
		board_create.appendChild(html_tr);
		html_tr.appendChild(html_th);

		for (let x = 0; x < BOARD_SIZE + 1; ++x) {
			if (x !== 0) {
				let html_td = document.createElement("td");
				let html_div = document.createElement("div");

				html_div.addEventListener("click", clicked_board, false);
				html_div.id = y + "_" + x;
				html_tr.appendChild(html_td);
				html_td.appendChild(html_div);
			};
		};
	};
};

function insertion_array_data_to_board() {
	for (let y = 0; y <= BOARD_SIZE; ++y) {
		for (let x = 0; x <= BOARD_SIZE; ++x) {
			if (board_status_array[y][x] === "black") {
				document.getElementById(y + "_" + x).className = "black";
			} else if (board_status_array[y][x] === "white") {
				document.getElementById(y + "_" + x).className = "white";
			};
		};
	};
};

let add_event_lisner = (id, process) => { document.getElementById(id).addEventListener("click", (process), false) };

add_event_lisner("black_PASS", pass_process);
add_event_lisner("white_PASS", pass_process);
add_event_lisner("next_game_button", next_game_process);
create_board_array();
insertion_array_data_to_board();
check_next_turn("white", "black");
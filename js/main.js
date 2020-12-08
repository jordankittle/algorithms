//main.js - Jordan Kittle
const main = document.getElementById('main');
let ctrlDown = false;
let shiftDown = false;
let start = null;
let end = null;


//Create Grid
function createGrid(){
	const table = document.createElement('div');
	table.setAttribute('id', 'grid');
	table.className = 'grid';
	main.append(table);

	for(let i=0; i < 1250; i++){
		const cell = document.createElement('div');
		cell.className = "cell";
		cell.classList.add('unvisited');
		cell.setAttribute('data-cellNum', i);
		cell.setAttribute('data-distance', 'infinity');
		cell.setAttribute('data-weight', 1);
		cell.setAttribute('data-routedFrom', null);
		table.append(cell);

	}
	const cells = table.querySelectorAll('.cell');
	let counter = 0;
	for(let y=25; y > 0; y--){
		for(let x = 1; x <= 50; x++){
			cells[counter++].setAttribute('data-id', `${x},${y}`);
		}
	}
	table.addEventListener('click', handleCellClick);
	table.addEventListener('mouseover', handleMouseOver);
	table.addEventListener('mousedown', e => {
		if(e.which === 2){
			for(cell of cells){
				cell.className = 'cell';
				cell.classList.add('univsited');
				cell.setAttribute('data-distance', 'infinity');
			}
			start = null;
			end = null;
		}
		
	});
}

function handleCellClick(e){
	const cells = document.querySelectorAll('.cell');
	if(ctrlDown === true && !e.target.classList.contains('wall') && !e.target.classList.contains('start')){
		for(cell of cells){
		cell.classList.remove('end');
		}
	end = e.target;
	end.classList.add('end');
	} else if (!e.target.classList.contains('wall')  && !e.target.classList.contains('end')){
		for(cell of cells){
		cell.classList.remove('start');
	}
	start = e.target;
	start.classList.add('start');
	}
	
}
function handleMouseOver(e){
	if(shiftDown === true && ctrlDown === true){
		e.target.classList.remove('wall');
	}
	else if(shiftDown === true  && !e.target.classList.contains('start') && !e.target.classList.contains('end')){
		e.target.classList.add('wall');
	} 
}

document.addEventListener('keydown', e => {
	if(e.key === 'Control'){
		ctrlDown = true;
	} else if(e.key === 'Shift'){
		shiftDown = true;
	}
});
document.addEventListener('keyup', e => {
	if(e.key === 'Control'){
		ctrlDown = false;
	} else if(e.key === 'Shift'){
		shiftDown = false;
	}
});

function run(){
	if(start !== null && end != null){
		const algorithm = document.getElementById('algorithm').value;
		const grid = document.querySelectorAll('.cell');
		if(algorithm === "Dijkstra"){runDijkstra(grid, start, end)};
	}
}

createGrid();

//main.js - Jordan Kittle
const mainWrapper = document.getElementById('main-wrapper');
const main = document.getElementById('main');
let ctrlDown = false;
let shiftDown = false;
let start = null;
let end = null;
var height = 40;
var width = 80;
var cellSize = 15;
document.getElementById('widthInput').value = width;
document.getElementById('heightInput').value = height;
document.getElementById('cellSize').value = cellSize;



//Create Grid
function createGrid(){
	main.innerHTML = '';
	width = +document.getElementById('widthInput').value;
	height = +document.getElementById('heightInput').value;
	cellSize = +document.getElementById('cellSize').value;
	mainWrapper.style.height = `${height*cellSize}px`;
	const table = document.createElement('div');
	table.setAttribute('id', 'grid');
	table.className = 'grid';
	main.append(table);
	table.style.width = `${width * cellSize}px`;
	table.style.height = `${height * cellSize}px`;

	for(let i=0; i < width * height; i++){
		const cell = document.createElement('div');
		cell.style.width = `${cellSize}px`;
		cell.style.height = `${cellSize}px`;
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
	for(let y=height; y > 0; y--){
		for(let x = 1; x <= width; x++){
			cells[counter++].setAttribute('data-id', `${x},${y}`);
		}
	}
	table.addEventListener('click', handleCellClick);
	table.addEventListener('mouseover', handleMouseOver);
	table.addEventListener('mousedown', e => {
		if(e.which === 2){
			for(cell of cells){
				cell.className = 'cell';
				cell.classList.add('unvisited');
				cell.setAttribute('data-distance', 'infinity');
				cell.textContent = '';
			}
			start = null;
			end = null;
		}
		
	});
}

function getCells(){
	return document.querySelectorAll('.cell');
}


function addRandomNodes(){
	const cells = getCells();
	const randomCell = () => cells[Math.floor(Math.random() * cells.length)];
	for(cell of cells){
		cell.classList.remove('end');
		cell.classList.remove('start');
	}
	start = randomCell();
	end = randomCell();
	while(end === start){
		end = randomCell();
	}
	console.log(start === end?true:false);
	start.classList.add('start');
	end.classList.add('end');

}

function handleCellClick(e){
	const cells = getCells();
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
		if(document.getElementById('diagonal').checked && e.target.getAttribute('data-id').split(',')[0] % width !== 0){
			e.target.classList.add('wall');
			e.target.nextElementSibling.classList.add('wall');

		} else {
			e.target.classList.add('wall');
		}
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
		const grid = getCells();
		if(algorithm === "Dijkstra"){runDijkstra(grid, start, end)};
	}
}

createGrid();

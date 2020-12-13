//main.js - Jordan Kittle
const mainWrapper = document.getElementById('main-wrapper');
const main = document.getElementById('main');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const message = document.getElementById('message');
let ctrlDown = false;
let shiftDown = false;
let start = null;
let end = null;
var windowHeight = window.innerHeight;
var mainWidth = main.clientWidth;
var mainHeight = window.innerHeight - (header.clientHeight + footer.clientHeight);
var height = 30;
var width = 60;
var cellWidth = (mainWidth/width);
var cellHeight = (mainHeight/height);

document.getElementById('widthInput').value = width;
document.getElementById('heightInput').value = height;



//Create Grid
function createGrid(){
	main.innerHTML = '';
	width = +document.getElementById('widthInput').value;
	height = +document.getElementById('heightInput').value;
	message.textContent = '';
	const grid = document.createElement('div');
	grid.setAttribute('id', 'grid');
	grid.className = 'grid';
	main.append(grid);
	grid.style.width = `${width * cellWidth}px`;
	grid.style.height = `${height * cellHeight}px`;

	for(let i=0; i < width * height; i++){
		const cell = document.createElement('div');
		cell.style.width = `${cellWidth}px`;
		cell.style.height = `${cellHeight}px`;
		cell.className = "cell";
		cell.classList.add('unvisited');
		cell.setAttribute('data-cellNum', i);
		cell.setAttribute('data-distance', 'infinity');
		cell.setAttribute('data-weight', 1);
		cell.setAttribute('data-routedFrom', null);
		grid.append(cell);

	}
	const cells = grid.querySelectorAll('.cell');
	let counter = 0;
	for(let y=height; y > 0; y--){
		for(let x = 1; x <= width; x++){
			cells[counter++].setAttribute('data-id', `${x},${y}`);
		}
	}
	grid.addEventListener('click', handleCellClick);
	grid.addEventListener('mouseover', handleMouseOver);
	
	grid.addEventListener('mousedown', e => {
		if(e.which === 2){
			for(cell of cells){
				cell.className = 'cell';
				cell.classList.add('unvisited');
				cell.setAttribute('data-distance', 'infinity');
				cell.setAttribute('data-weight', 1);
				cell.textContent = '';
				message.textContent = '';
			}
			start = null;
			end = null;
		}
		
	});
	resizeGrid();
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
	if(e.key === 'Control' || e.key === 'e'){
		ctrlDown = true;
	} else if(e.key === 'Shift'){
		console.log('shift down');
		shiftDown = true;
	}
});
document.addEventListener('keyup', e => {
	if(e.key === 'Control' || e.key === 'e'){
		ctrlDown = false;
	} else if(e.key === 'Shift'){
		console.log('shift up');
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

function resizeGrid(){
	mainWidth = main.clientWidth;
	mainHeight = window.innerHeight - (header.clientHeight + footer.clientHeight);
	cellWidth = mainWidth/ width;
	cellHeight = mainHeight/ height;
	const grid  = document.getElementById('grid');
	grid.style.width = `${width * cellWidth}px`;
	grid.style.height = `${height * cellHeight}px`;
	const cells = document.querySelectorAll('.cell');
	for(cell of cells){
		cell.style.width = `${cellWidth}px`;
		cell.style.height = `${cellHeight}px`;
	}

}

const speedOptions = [0,1,2,3,15,150];
const speedLabels = ['Boost','Fast','Medium','Slow','Crawl','Snail'];
const speedSlider = document.getElementById('speed');
speedSlider.oninput = () => {
	const selectedSpeed = speedOptions[speedSlider.value];
	speedSlider.nextElementSibling.textContent = speedLabels[speedSlider.value];
	speed = selectedSpeed;
}
speedSlider.oninput();


window.addEventListener('resize', resizeGrid);

createGrid();

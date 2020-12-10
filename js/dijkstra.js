//Dijkstra's algorithm implementation by Jordan Kittle

function runDijkstra(grid, start, end){
	let cycle = 0;
	let queue = 0;
	let noAvailableNeighbors = false;
	let diagonalAllowed = document.getElementById('diagonal').checked?true:false;
	speed = parseInt(document.getElementById('speed').value);
	const unvisited = [...grid];
	const visited = [];
	const startNum = parseInt(start.getAttribute('data-cellnum'));
	const message = document.getElementById('message');
	message.textContent = '';
	start.classList.remove('unvisited');
	start.classList.add('visited');
	start.setAttribute('data-distance', 0);
	getNeighbors(start);


	while(unvisited.length > 0 ){

		if(noAvailableNeighbors){
			setTimeout(() => {
					message.textContent = "No Route Found";
				}, queue);
			return;
		}
		for(let i = 0; i < visited.length; i++){
			if(visited[i] === end){
				
				setTimeout(() => {
					tracePath(end);
					message.textContent = "Route Found";
				}, queue);
				return;
			}

			getNeighbors(visited[i]);
			
		}
	}

	function tracePath(lastCell){

		const lastDistance = +lastCell.getAttribute('data-distance');	
		lastCell.textContent = lastDistance.toFixed(1);
		let routeLength = 0;
		const previousCellNum = lastCell.getAttribute('data-routedFrom');
		const previousCell = Array.from(grid).filter(cell => cell.getAttribute('data-cellnum') === previousCellNum );
		if(previousCell[0] === start){
			return;
		}
		if(previousCell.length !== 0){
			previousCell[0].classList.add('route');
		}
		//setTimeout( () => tracePath(previousCell[0]), speed);
		tracePath(previousCell[0]);

	}


	function getNeighbors(currentCell){
		if(!currentCell.getAttribute('data-id')){
			console.log(currentCell);
		}
		const coords = currentCell.getAttribute('data-id').split(',');
		const cellNum = parseInt(currentCell.getAttribute('data-cellnum') );
		const cellDistance = currentCell.getAttribute('data-distance');
		const x = parseInt(coords[0]);
		const y = parseInt(coords[1]);
		const neighbors = [];
		
		const left = () => {
			let potentialLeft = currentCell.previousElementSibling;
			if(!potentialLeft.classList.contains('wall') && potentialLeft.classList.contains('unvisited')){
				neighbors.push(potentialLeft);
			}
		}

		const right = () => {
			let potentialRight = currentCell.nextElementSibling;
			if (!potentialRight.classList.contains('wall') && potentialRight.classList.contains('unvisited')){
				neighbors.push(potentialRight);
			}
		}

		const up = () => {
			let potentialUp = grid[cellNum -width];
			if(!potentialUp.classList.contains('wall') && potentialUp.classList.contains('unvisited')){
				neighbors.push(potentialUp);
			}
		}
		const down = () => {
			let potentialDown = grid[cellNum +width];
			if(!potentialDown.classList.contains('wall') && potentialDown.classList.contains('unvisited')){
				neighbors.push(potentialDown);
			}
		}

		const upLeft = () => {
			let potentialUpLeft = grid[cellNum - (width+1)];
			if(!potentialUpLeft.classList.contains('wall') && potentialUpLeft.classList.contains('unvisited')){
				const currentWeight = +potentialUpLeft.getAttribute('data-weight');
				potentialUpLeft.setAttribute('data-weight', Math.sqrt(currentWeight*2));
				neighbors.push(potentialUpLeft);
			}
		}

		const upRight = () => {
			let potentialUpRight = grid[cellNum - (width-1)];
			if(!potentialUpRight.classList.contains('wall') && potentialUpRight.classList.contains('unvisited')){
				const currentWeight = +potentialUpRight.getAttribute('data-weight');
				potentialUpRight.setAttribute('data-weight', Math.sqrt(currentWeight*2));
				neighbors.push(potentialUpRight);
			}
		}

		const downLeft = () => {
			let potentialDownLeft = grid[cellNum + (width-1)];
			if(!potentialDownLeft.classList.contains('wall') && potentialDownLeft.classList.contains('unvisited')){
				const currentWeight = +potentialDownLeft.getAttribute('data-weight');
				potentialDownLeft.setAttribute('data-weight', Math.sqrt(currentWeight*2));
				neighbors.push(potentialDownLeft);
			}
		}

		const downRight = () => {
			let potentialDownRight = grid[cellNum + (width+1)];
			if(!potentialDownRight.classList.contains('wall') && potentialDownRight.classList.contains('unvisited')){
				const currentWeight = +potentialDownRight.getAttribute('data-weight');
				potentialDownRight.setAttribute('data-weight', Math.sqrt(currentWeight*2));
				neighbors.push(potentialDownRight);
			}
		}

		//up down left right
		if(x === 1){
			//right
			right();
			
		} else if (x === width) {
			left();
		} else {
			left();
			right();
		} 
		if(y === 1){
			up();
		} else if (y === height) {
			down();
		} else {
			up();
			down();
		}
		
		if(diagonalAllowed){
			if(x === 1){
				if(y === 1){
					//up and to the right
					upRight();
					
				} else if(y === height){
					//down and to the right
					downRight();
					
				} else {
					//up right and down right
					upRight();
					downRight();
				}
			} else if(x === width){
				if(y === 1){
					//up and to the left
					upLeft();
				} else if(y === height){
					//down and to the left
					downLeft();
				} else {
					//up and down left
					upLeft();
					downLeft();
				}
			} else if(y === 1){
				//up left and right
				upLeft();
				upRight();
			} else if(y === height){
				//down left and right
				downLeft();
				downRight();
			} else {
				//all four corners
				upLeft();
				upRight();
				downLeft();
				downRight();
			}
		}


		//
		for(let neighbor of neighbors){
			const neighborDistance = neighbor.getAttribute('data-distance');
			const neighborWeight = +neighbor.getAttribute('data-weight');
			const tentativeDistance = +cellDistance + neighborWeight;
			//console.log('existing: ' + cellDistance + ',  neighborDistance: ' + neighborDistance + ', neighborWeight: ' + neighborWeight + ', tentativeDistance: ' + tentativeDistance);

			const routeNeighbor = () => {
				neighbor.setAttribute('data-routedFrom', currentCell.getAttribute('data-cellnum'));
				const neighborIndex = unvisited.indexOf(neighbor);
				visited.push(...unvisited.splice(neighborIndex,1));
			}

			if(neighborDistance === 'infinity'){
				neighbor.setAttribute('data-distance', +cellDistance + neighborWeight );
				neighbor.classList.remove('unvisited');
				setTimeout(() => {
					neighbor.classList.add('visited');
				}, queue);
				queue += speed;
				routeNeighbor();
				
				
			} else if( tentativeDistance < neighborDistance ){
				console.log('got to second case');
				console.log('neighborDistance existing: ' + neighborDistance + ' vs tentative distance: ' + tentativeDistance);
				neighbor.setAttribute('data-distance', tentativeDistance );
				neighbor.classList.remove('unvisited');
				setTimeout(() => {
					neighbor.classList.add('visited');
				}, queue);
				queue += speed;
				routeNeighbor();
			} else {
				neighbor.classList.remove('unvisited');
				//console.log('got to third case');
				//console.log('neighborDistance existing: ' + neighborDistance + ' vs tentative distance: ' + tentativeDistance);
			}

			

		}
		if(neighbors.length === 0){
			noAvailableNeighbors = true;
		}
		return neighbors;
		
	}

	
}
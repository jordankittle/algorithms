//Dijkstra's algorithm implementation by Jordan Kittle

function runDijkstra(grid, start, end){
	let cycle = 0;
	let queue = 0;
	let done = false;
	let noAvailableNeighbors = false;
	let diagonalAllowed = document.getElementById('diagonal').checked?true:false;
	const unvisited = [...grid];
	const queued = [];
	const startNum = parseInt(start.getAttribute('data-cellnum'));
	message.textContent = '';
	start.classList.remove('unvisited');
	start.classList.add('visited');
	start.setAttribute('data-distance', 0);
	getNeighbors(start);


	while(unvisited.length > 0 ){
		console.log(unvisited.length);
		
		console.log(queued);
		if(done) break;
		if(noAvailableNeighbors){
			setTimeout(() => {
					message.textContent = "No Route Found";
				}, queue);
			return;
		}
		while(queued.length > 0){
			queued.sort((a,b) => {
				let aWeight = +a.getAttribute('data-distance');
				let bWeight = +b.getAttribute('data-distance');
				if( aWeight === bWeight ){
					return 0
				} else if( aWeight < bWeight){
					return -1
				} else {
					return 1
				}
			});
			if(queued[0] === end){
				console.log('done');
				console.log(unvisited.length);
				done = true;
				setTimeout(() => {
					tracePath(end);
					message.textContent = "Route Found";
				}, queue);
				return;
			}
			getNeighbors(queued.splice(0,1)[0]);
			
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
	
	function delayVisual(element, className, delay){
		 setTimeout(() => {
		 	element.classList.add(className);
		 }, delay);
	}


	function getNeighbors(currentCell){
	
		delayVisual(currentCell, 'current', queue-speed);
		// setTimeout(() => {
		// 			currentCell.classList.add('current');
		// 		}, queue-speed*2);
		const coords = currentCell.getAttribute('data-id').split(',');
		const cellNum = parseInt(currentCell.getAttribute('data-cellnum') );
		const cellDistance = currentCell.getAttribute('data-distance');
		const x = parseInt(coords[0]);
		const y = parseInt(coords[1]);
		const neighbors = [];

		const pythag = (a,b) => {
			return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
		}
		
		const left = () => {
			let potentialLeft = currentCell.previousElementSibling;
			if(!potentialLeft.classList.contains('wall') && potentialLeft.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialLeft.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialLeft.getAttribute('data-weight');
				potentialLeft.setAttribute('data-weight-cache', currentWeight)
				neighbors.push(potentialLeft);
			}
		}

		const right = () => {
			let potentialRight = currentCell.nextElementSibling;
			if (!potentialRight.classList.contains('wall') && potentialRight.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialRight.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialRight.getAttribute('data-weight');
				potentialRight.setAttribute('data-weight-cache', currentWeight)
				neighbors.push(potentialRight);
			}
		}

		const up = () => {
			let potentialUp = grid[cellNum -width];
			if(!potentialUp.classList.contains('wall') && potentialUp.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialUp.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialUp.getAttribute('data-weight');
				potentialUp.setAttribute('data-weight-cache', currentWeight)
				neighbors.push(potentialUp);
			}
		}
		const down = () => {
			let potentialDown = grid[cellNum +width];
			if(!potentialDown.classList.contains('wall') && potentialDown.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialDown.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialDown.getAttribute('data-weight');
				potentialDown.setAttribute('data-weight-cache', currentWeight)
				neighbors.push(potentialDown);
			}
		}

		const upLeft = () => {
			let potentialUpLeft = grid[cellNum - (width+1)];
			let potentialUp = grid[cellNum -width];
			if(!potentialUpLeft.classList.contains('wall') && potentialUpLeft.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialUpLeft.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialUpLeft.getAttribute('data-weight');
				const travelWeight = pythag(currentWeight, currentWeight);
				potentialUpLeft.setAttribute('data-weight-cache', travelWeight);
				neighbors.push(potentialUpLeft);
			}
		}

		const upRight = () => {
			let potentialUpRight = grid[cellNum - (width-1)];
			if(!potentialUpRight.classList.contains('wall') && potentialUpRight.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialUpRight.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialUpRight.getAttribute('data-weight');
				const travelWeight = pythag(currentWeight,currentWeight);
				potentialUpRight.setAttribute('data-weight-cache', travelWeight);
				neighbors.push(potentialUpRight);
			}
		}

		const downLeft = () => {
			let potentialDownLeft = grid[cellNum + (width-1)];
			if(!potentialDownLeft.classList.contains('wall') && potentialDownLeft.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialDownLeft.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialDownLeft.getAttribute('data-weight');
				const travelWeight = pythag(currentWeight, currentWeight);
				potentialDownLeft.setAttribute('data-weight-cache', travelWeight);
				neighbors.push(potentialDownLeft);
			}
		}

		const downRight = () => {
			let potentialDownRight = grid[cellNum + (width+1)];
			if(!potentialDownRight.classList.contains('wall') && potentialDownRight.classList.contains('unvisited')){
				// setTimeout(() => {
				// 	potentialDownRight.classList.add('next');
				// }, queue-speed);
				const currentWeight = +potentialDownRight.getAttribute('data-weight');
				const travelWeight = pythag(currentWeight, currentWeight);
				potentialDownRight.setAttribute('data-weight-cache', travelWeight);
				neighbors.push(potentialDownRight);
			}
		}

		if(x > 1) left();
		if(x < width) right();
		if(y > 1) down();
		if(y < height ) up();

		if(diagonalAllowed){
			if(x > 1){
				if(y > 1) downLeft();
				if(y < height) upLeft();
			}
			if(x < width){
				if(y > 1) downRight();
				if(y < height) upRight();
			}
		}
		
		// Sorting which neighbors to check first. may not need to be done as queued list is now sorted
		// neighbors.sort((a,b) => {
		// 	let aWeight = +a.getAttribute('data-weight-cache');
		// 	let bWeight = +b.getAttribute('data-weight-cache');
		// 	if( aWeight === bWeight ){
		// 		return 0
		// 	} else if( aWeight < bWeight){
		// 		return -1
		// 	} else {
		// 		return 1
		// 	}
		// console.log(neighbors);
		// });
		for(let neighbor of neighbors){
			neighbor.setAttribute('calledby', currentCell.getAttribute('data-cellnum'));
			const neighborDistance = neighbor.getAttribute('data-distance');
			const neighborWeight = +neighbor.getAttribute('data-weight-cache');
			const tentativeDistance = +cellDistance + neighborWeight;
			//console.log('existing: ' + cellDistance + ',  neighborDistance: ' + neighborDistance + ', neighborWeight: ' + neighborWeight + ', tentativeDistance: ' + tentativeDistance);

			const routeNeighbor = () => {
				neighbor.setAttribute('data-routedFrom', currentCell.getAttribute('data-cellnum'));
				queued.push(neighbor);

			}

			if(neighborDistance === 'infinity'){
				//console.log('first case: replacing infinity');
				neighbor.setAttribute('data-distance', tentativeDistance );
				//neighbor.classList.remove('unvisited');
				delayVisual(neighbor, 'queued', queue);
				queue += speed;
				routeNeighbor();
				
				
			} else if( tentativeDistance < neighborDistance ){
				console.log('neighborDistance existing: ' + neighborDistance + ' vs tentative distance: ' + tentativeDistance);
				neighbor.setAttribute('data-distance', tentativeDistance );
				//neighbor.classList.remove('unvisited');
				delayVisual(neighbor, 'queued', queue);
				queue += speed;
				routeNeighbor();
			} else {
				//neighbor.classList.remove('unvisited');
				//console.log('got to third case: neighborDistance existing: ' + neighborDistance + ' vs tentative distance: ' + tentativeDistance);
			}

			

		}
		currentCell.classList.remove('unvisited');
		const currentQueueIndex = unvisited.indexOf(currentCell);
		unvisited.splice(currentQueueIndex, 1);
		if(neighbors.length === 0){
			noAvailableNeighbors = true;
			console.log('checked all neighbors found none');
		}
		return neighbors;
		
	}

	
}
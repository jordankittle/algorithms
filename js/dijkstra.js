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
					message.textContent = "No Route";
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
					tracePath(end); // 
					message.textContent = "Route Found";
				}, queue);
				return;
			}
			//getNeighbors(queued.splice(0,1)[0]);
			getNeighbors(queued.shift());
			
		}
	}

	function tracePath(lastCell, direction = 'forward'){
		const path = [];
		lastCell.textContent = (+lastCell.getAttribute('data-distance')).toFixed(1);
		const trace = (lastCell) => {
			lastCell.textContent = (+lastCell.getAttribute('data-distance')).toFixed(1);	
			const previousCellNum = lastCell.getAttribute('data-routedFrom');
			const previousCell = Array.from(grid).filter(cell => cell.getAttribute('data-cellnum') === previousCellNum );
			if(previousCell[0] === start){
				return;
			}
			if(previousCell.length !== 0){
				direction === 'forward' ? path.unshift(previousCell[0]) : path.push(previousCell[0]);
			}
			
			trace(previousCell[0]);
		}
		trace(lastCell);
		let tracePosition = 0;
		const addClass = (point) => {
			point.classList.add('route');
			if(tracePosition < path.length) setTimeout(() => addClass(path[tracePosition++]), speed*2);
		}
		addClass(path[0]);
		
	}

	function delayVisual(element, className, delay){
		 setTimeout(() => {
		 	element.classList.add(className);
		 }, delay);
	}

	function getNeighbors(currentCell){
	
		delayVisual(currentCell, 'current', queue-speed);
		const coords = currentCell.getAttribute('data-id').split(',');
		const cellNum = parseInt(currentCell.getAttribute('data-cellnum') );
		const cellDistance = currentCell.getAttribute('data-distance');
		const x = parseInt(coords[0]);
		const y = parseInt(coords[1]);
		const neighbors = [];
	
		const explore = (target) => {
			if(!target.classList.contains('wall') && target.classList.contains('unvisited')){

				const currentWeight = +target.getAttribute('data-weight');
				target.setAttribute('data-weight-cache', currentWeight);
				neighbors.push(target);
			}
		}

		const exploreDiagonal = (target) => {
			if(!target.classList.contains('wall') && target.classList.contains('unvisited')){

				const currentWeight = +target.getAttribute('data-weight');
				const travelWeight = Math.sqrt(2 *Math.pow(currentWeight,2));
				target.setAttribute('data-weight-cache', travelWeight);
				neighbors.push(target);
			}
		}

		if(x > 1) explore(currentCell.previousElementSibling);
		if(x < width) explore(currentCell.nextElementSibling);
		if(y > 1) explore(grid[cellNum +width]);
		if(y < height ) explore(grid[cellNum -width]);

		if(diagonalAllowed){
			if(x > 1){
				if(y > 1) exploreDiagonal(grid[cellNum + (width-1)]);
				if(y < height) exploreDiagonal(grid[cellNum - (width+1)]);
			}
			if(x < width){
				if(y > 1) exploreDiagonal(grid[cellNum + (width+1)]);
				if(y < height) exploreDiagonal(grid[cellNum - (width-1)]);
			}
		}
		
		for(let neighbor of neighbors){
			neighbor.setAttribute('calledby', currentCell.getAttribute('data-cellnum'));
			const neighborDistance = neighbor.getAttribute('data-distance');
			const neighborWeight = +neighbor.getAttribute('data-weight-cache');
			const tentativeDistance = +cellDistance + neighborWeight;
			const routeNeighbor = () => {
				neighbor.setAttribute('data-routedFrom', currentCell.getAttribute('data-cellnum'));
				queued.push(neighbor);
			}
			if(neighborDistance === 'infinity'){
				//console.log('first case: replacing infinity');
				neighbor.setAttribute('data-distance', tentativeDistance );
				delayVisual(neighbor, 'queued', queue);
				queue += speed;
				routeNeighbor();
			} else if( tentativeDistance < neighborDistance ){
				//console.log('neighborDistance existing: ' + neighborDistance + ' vs tentative distance: ' + tentativeDistance);
				neighbor.setAttribute('data-distance', tentativeDistance );
				delayVisual(neighbor, 'queued', queue);
				queue += speed;
				routeNeighbor();
			} else {
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
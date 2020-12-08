//Dijkstra's algorithm implentation by Jordan Kittle

function runDijkstra(grid, start, end){
	let cycle = 0;
	const unvisited = [...grid];
	const visited = [];
	const startNum = parseInt(start.getAttribute('data-cellnum'));
	start.classList.remove('unvisited');
	start.classList.add('visited');
	start.setAttribute('data-distance', 0);
	getNeighbors(start);

	while(unvisited.length > 0 ){
		if(++cycle >= grid.length * 4){
			console.log('no path found');
			return;
		}
		for(let cell of visited){
			if(cell === end){
				tracePath(end);
				return;
			}

			getNeighbors(cell);
			
		}
	}

	function tracePath(lastCell){
		
		const previousCellNum = lastCell.getAttribute('data-routedFrom');
		const previousCell = Array.from(grid).filter(cell => cell.getAttribute('data-cellnum') === previousCellNum );
		if(previousCell[0] === start){
			console.log('done tracing');
			return;
		}
		previousCell[0].classList.add('route');
		tracePath(previousCell[0]);

	}


	function getNeighbors(currentCell){
		//currentCell.classList.add('current');
		if(!currentCell.getAttribute('data-id')){
			console.log(currentCell);
		}
		const coords = currentCell.getAttribute('data-id').split(',');
		const cellNum = parseInt(currentCell.getAttribute('data-cellnum') );
		const cellDistance = currentCell.getAttribute('data-distance');
		const x = parseInt(coords[0]);
		const y = parseInt(coords[1]);
		const neighbors = [];
		if(x === 1){
			let potentialRight = currentCell.nextElementSibling;
			if (!potentialRight.classList.contains('wall') && !potentialRight.classList.contains('visited')){
				neighbors.unshift(potentialRight);
			}
			
		} else if (x === 50) {
			let potentialLeft = currentCell.previousElementSibling;
			if(!potentialLeft.classList.contains('wall') && !potentialLeft.classList.contains('visited')){
				neighbors.unshift(potentialLeft);
			}
		} else {
			let potentialRight = currentCell.nextElementSibling;
			let potentialLeft = currentCell.previousElementSibling;
			if (!potentialRight.classList.contains('wall') && !potentialRight.classList.contains('visited')){
				neighbors.unshift(potentialRight);
			}
			if(!potentialLeft.classList.contains('wall') && !potentialLeft.classList.contains('visited')){
				neighbors.unshift(potentialLeft);
			}
		} 
	
		if(y === 1){
			let potentialUp = grid[cellNum -50];
			if(!potentialUp.classList.contains('wall') && !potentialUp.classList.contains('visited')){
				neighbors.unshift(potentialUp);
			}
		} else if (y === 25) {
			let potentialDown = grid[cellNum +50];
			if(!potentialDown.classList.contains('wall') && !potentialDown.classList.contains('visited')){
				neighbors.unshift(potentialDown);
			}
		} else {
			let potentialUp = grid[cellNum -50];
			let potentialDown = grid[cellNum +50];
			if(!potentialUp.classList.contains('wall') && !potentialUp.classList.contains('visited')){
				neighbors.unshift(potentialUp);
			}
			if(!potentialDown.classList.contains('wall') && !potentialDown.classList.contains('visited')){
				neighbors.unshift(potentialDown);
			}
		}
		for(let neighbor of neighbors){
			const neighborDistance = +neighbor.getAttribute('data-distance');
			const neighborWeight = parseInt(neighbor.getAttribute('data-weight'));
			const tentativeDistance = +cellDistance + neighborWeight;
			if(neighbor.getAttribute('data-distance') === 'infinity'){
				neighbor.setAttribute('data-distance', +cellDistance + neighborWeight );
				neighbor.classList.remove('unvisited');
				neighbor.classList.add('visited');
				neighbor.setAttribute('data-routedFrom', currentCell.getAttribute('data-cellnum'));
				const neighborIndex = unvisited.indexOf(neighbor);
				visited.push(...unvisited.splice(neighborIndex,1));
			} else if( tentativeDistance < neighborDistance ){
				neighbor.setAttribute('data-distance', tentativeDistance );
				neighbor.classList.remove('unvisited');
				neighbor.classList.add('visited');
				neighbor.setAttribute('data-routedFrom', currentCell.getAttribute('data-cellnum'));
				const neighborIndex = unvisited.indexOf(neighbor);
				visited.push(...unvisited.splice(neighborIndex,1));
			}
			

		}

		// const closestNeighbor = neighbors.reduce((acc, neighbor) => {
		// 	const neighborDistance = neighbor.getAttribute('data-distance');
		// 	if(neighborDistance < acc) {
		// 		return neighbor;
		// 	} else {
		// 		return acc;
		// 	}
		// }, {});
		
		// console.log(closestNeighbor);
		// if (closestNeighbor === {}){
		// 	alert('No more cells to check.');
		// 	return;
		// }
		/*for(let neighbor of neighbors){
			const neighborIndex = unvisited.indexOf(neighbor);
			visited.push(...unvisited.splice(neighborIndex,1));
		}*/
		//currentCell.classList.remove('current');
		return neighbors;
		
	}

	
}
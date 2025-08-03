// storage of 2d matrix

let collectedGraphComponent = [];
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++){
    let row = [];
    for (let j = 0; j < cols; j++){
        // more than one child relations (dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

// true denotes cycle, false denotes not cyclic
function isGraphCyclic(graphComponentMatrix){
    // dependency -> visited, dfsVisited (2d array)
    let visited = []; // node visit trace
    let dfsVisited = []; // stack visit trace

    for (let i = 0; i < rows; i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            if (visited[i][j] === false){
            let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
            if (response == true) return [i,j];
            }
        }
    }    
    return null;
}
    
// start -> vis(True) dfsvis(True)
// end -> dfsvis(False)
// if vis[i][j] -> already explored path, so go back no use to explore again
// cycle detection condition if (vis[i][j] == true && dfsvis[i][j] == true) -> cycle
// returns true for cyclic or false for not cyclic
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    // A1 -> [ [0, 1], [1, 0], [5, 10], .....  ]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true) return true; // Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path
            return true;
        }
    }

    dfsVisited[srcr][srcc] = false;
    return false;
}
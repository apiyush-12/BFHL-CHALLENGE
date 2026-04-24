const { isValidFormat } = require('../utils/validator');
function processData(data) {
    const invalid_entries = [];
    const duplicate_edges = [];
    const seenEdges = new Set();
    
    const adjList = {}; 
    const inDegree = {}; 
    const parentsMap = {}; 
    const allNodes = new Set();

    if (!Array.isArray(data)) {
        return {
            hierarchies: [],
            invalid_entries: ["Input is not an array"],
            duplicate_edges: [],
            summary: {
                total_trees: 0,
                total_cycles: 0,
                largest_tree_root: null
            }
        };
    }

    data.forEach(item => {
        if (!isValidFormat(item)) {
            invalid_entries.push(item);
            return;
        }

        const trimmed = item.trim();
        if (seenEdges.has(trimmed)) {
            duplicate_edges.push(item);
            return;
        }
        seenEdges.add(trimmed);
        const [parent, child] = trimmed.split('->');
        allNodes.add(parent);
        allNodes.add(child);

        if (parentsMap[child]) {
            return;
        }
        
        parentsMap[child] = parent;
        if (!adjList[parent]) adjList[parent] = [];
        adjList[parent].push(child);
        if (inDegree[child] === undefined) inDegree[child] = 0;
        inDegree[child]++;
        if (inDegree[parent] === undefined) inDegree[parent] = 0;
    });
    const roots = [];
    allNodes.forEach(node => {
        if (!parentsMap[node]) {
            roots.push(node);
        }
    });
    roots.sort();
    const hierarchies = [];
    let total_trees = 0;
    let total_cycles = 0;
    let largest_tree_root = null;
    let max_tree_size = -1;
    const globalVisited = new Set(); 
    roots.forEach(root => {
        const visited = new Set();
        const recursionStack = new Set();
        let hasCycle = false;
        let nodeCount = 0;
        function dfs(node) {
            if (recursionStack.has(node)) {
                hasCycle = true;
                return {};
            }
            if (visited.has(node)) {
                return {};
            }
            visited.add(node);
            recursionStack.add(node);
            nodeCount++;
            globalVisited.add(node);

            const childrenObj = {};
            const childrenList = adjList[node] || [];
            
            childrenList.sort();

            for (const child of childrenList) {
                if (parentsMap[child] === node) {
                    childrenObj[child] = dfs(child);
                }
            }

            recursionStack.delete(node);
            return childrenObj;
        }

        const treeStruct = dfs(root);

        if (hasCycle) {
            hierarchies.push({
                tree: { [root]: {} },
                has_cycle: true
            });
            total_cycles++;
        } else {

            const treeRoot = { [root]: treeStruct };
            hierarchies.push(treeRoot);
            total_trees++;

            if (nodeCount > max_tree_size) {
                max_tree_size = nodeCount;
                largest_tree_root = root;
            } else if (nodeCount === max_tree_size) {
                if (root < largest_tree_root) {
                    largest_tree_root = root;
                }
            }
        }
    });

    allNodes.forEach(node => {
        if (!globalVisited.has(node) && parentsMap[node]) {
            total_cycles++;
            
            let curr = node;
            const cycleNodes = new Set();
            while (!cycleNodes.has(curr)) {
                cycleNodes.add(curr);
                globalVisited.add(curr);
                curr = parentsMap[curr];
            }
            
            const cycleNodesArr = Array.from(cycleNodes).sort();
            const cycleRoot = cycleNodesArr[0];
            
            hierarchies.push({
                tree: { [cycleRoot]: {} }, 
                has_cycle: true
            });
        }
    });

    return {
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees,
            total_cycles,
            largest_tree_root
        }
    };
}

module.exports = {
    processData
};

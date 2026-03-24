const n = 4;
let board = [], solution = [], R = [], C = [], emptiesCnt = n * n;
let countRowL = [], countRowR = [], countColT = [], countColB = [];

function CountRow(n, board, row, dir) {
    let cntRow = 0, maxVal = -1;
    if (dir) {
        for (let j = 0; j < n; j++) {
            if (board[row][j] > maxVal) {
                maxVal = board[row][j];
                cntRow++;
            }
        }
    }
    else {
        for (let j = n - 1; j >= 0; j--) {
            if (board[row][j] > maxVal) {
                maxVal = board[row][j];
                cntRow++;
            }
        }
    }
    return cntRow;
}

function CountCol(n, board, col, dir) {
    let cntCol = 0, maxVal = -1;
    if (dir) {
        for (let i = 0; i < n; i++) {
            if (board[i][col] > maxVal) {
                maxVal = board[i][col];
                cntCol++;
            }
        }
    }
    else {
        for (let i = n - 1; i >= 0; i--) {
            if (board[i][col] > maxVal) {
                maxVal = board[i][col];
                cntCol++;
            }
        }
    }
    return cntCol;
}

let success;
function RandomizeBoardState(step) {
    if (step === n * n) {
        success = true;
    }
    else {
        let choices = [], move = 0;
        for (let i = 1; i <= n; i++) {
            choices.push(i);
        }
        success = false;
        while (move < n && !success) {
            let index = Math.floor(Math.random() * choices.length), num = choices[index];
            let row = Math.floor(step / n), col = step % n;
            choices.splice(index, 1);
            if (R[row][num - 1] && C[col][num - 1]) {
                board[row][col] = num;
                R[row][num - 1] = false;
                C[col][num - 1] = false;
                if (!RandomizeBoardState(step + 1)) {
                    board[row][col] = 0;
                    R[row][num - 1] = true;
                    C[col][num - 1] = true;
                }
            }
            move++;
        }
    }
    return success;
}

function FillCounts() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).innerText = "";
            document.getElementById(i + "" + j).style.backgroundColor = "silver";
            board[i][j] = 0;
            solution[i][j] = 0;
            R[i][j] = true;
            C[i][j] = true;
        }
    }
    RandomizeBoardState(0);
    for (let i = 0; i < n; i++) {
        countRowL[i] = CountRow(n, board, i, true);
        countRowR[i] = CountRow(n, board, i, false);
        countColT[i] = CountCol(n, board, i, true);
        countColB[i] = CountCol(n, board, i, false);
        document.getElementById("L" + i).innerText = countRowL[i];
        document.getElementById("R" + i).innerText = countRowR[i];
        document.getElementById("T" + i).innerText = countColT[i];
        document.getElementById("B" + i).innerText = countColB[i];
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            solution[i][j] = board[i][j];
            board[i][j] = 0;
        }
    }
}

function Load() {
    for (let i = 0; i < n; i++) {
        board[i] = [];
        R[i] = [];
        C[i] = [];
        solution[i] = [];
        for (let j = 0; j < n; j++) {
            board[i][j] = 0;
            solution[i][j] = 0;
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).style.backgroundColor = "silver";
        }
        document.getElementById("L" + i).style.backgroundColor = "white";
        document.getElementById("R" + i).style.backgroundColor = "white";
        document.getElementById("T" + i).style.backgroundColor = "white";
        document.getElementById("B" + i).style.backgroundColor = "white";
    }
    FillCounts();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("randomBtn").disabled = false;
    document.getElementById("solveBtn").disabled = true;
}

function IsSolved(n, board, emptiesCnt) {
    if (emptiesCnt !== 0) {
        return false;
    }
    for (let i = 0; i < n; i++) {
        let vis = [];
        for (let j = 0; j < n; j++) {
            vis[j] = false;
        }
        for (let j = 0; j < n; j++) {
            if (vis[board[i][j] - 1]) {
                return false;
            }
            vis[board[i][j] - 1] = true;
        }
    }
    for (let j = 0; j < n; j++) {
        let vis = [];
        for (let i = 0; i < n; i++) {
            vis[i] = false;
        }
        for (let i = 0; i < n; i++) {
            if (vis[board[i][j] - 1]) {
                return false;
            }
            vis[board[i][j] - 1] = true;
        }
    }
    for (let i = 0; i < n; i++) {
        let cntRowL = CountRow(n, board, i, true);
        let cntRowR = CountRow(n, board, i, false);
        let cntColT = CountCol(n, board, i, true);
        let cntColB = CountCol(n, board, i, false);
        if (cntRowL !== countRowL[i]) {
            return false;
        }
        if (cntRowR !== countRowR[i]) {
            return false;
        }
        if (cntColT !== countColT[i]) {
            return false;
        }
        if (cntColB !== countColB[i]) {
            return false;
        }
    }
    return true;
}

function Start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = false;
        }
    }
    document.getElementById("startBtn").disabled = true;
    document.getElementById("randomBtn").disabled = true;
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("solveBtn").disabled = false;
}

function Random() {
    FillCounts();
}

function Restart() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).style.backgroundColor = "silver";
            document.getElementById(i + "" + j).innerText = "";
            board[i][j] = 0;
        }
        document.getElementById("L" + i).style.backgroundColor = "white";
        document.getElementById("R" + i).style.backgroundColor = "white";
        document.getElementById("T" + i).style.backgroundColor = "white";
        document.getElementById("B" + i).style.backgroundColor = "white";
    }
    emptiesCnt = n * n;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("randomBtn").disabled = false
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("solveBtn").disabled = true;
}

function Solve() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).innerText = solution[i][j];
            document.getElementById(i + "" + j).style.backgroundColor = "silver";
            document.getElementById(i + "" + j).disabled = true;
            board[i][j] = solution[i][j];
        }
    }
    document.getElementById("solveBtn").disabled = true;
}

function GameOver() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
        }
    }
    document.getElementById("randomBtn").disabled = false
    document.getElementById("solveBtn").disabled = true;
}

function FillNum(row, col) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).style.backgroundColor = "silver";
        }
        document.getElementById("L" + i).style.backgroundColor = "white";
        document.getElementById("R" + i).style.backgroundColor = "white";
        document.getElementById("T" + i).style.backgroundColor = "white";
        document.getElementById("B" + i).style.backgroundColor = "white";
    }
    board[row][col]++;
    if (board[row][col] === n + 1) {
        document.getElementById(row + "" + col).innerText = "";
        board[row][col] = 0;
        emptiesCnt++;
    }
    else {
        document.getElementById(row + "" + col).innerText = board[row][col];
        if (board[row][col] === 1) {
            emptiesCnt--;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== 0) {
                let isDuplicate = false;
                for (let k = 0; k < n; k++) {
                    if (k !== i && board[k][j] === board[i][j]) {
                        document.getElementById(k + "" + j).style.backgroundColor = "red";
                        isDuplicate = true;
                    }
                    if (k !== j && board[i][k] === board[i][j]) {
                        document.getElementById(i + "" + k).style.backgroundColor = "red";
                        isDuplicate = true;
                    }
                }
                if (isDuplicate) {
                    document.getElementById(i + "" + j).style.backgroundColor = "red";
                }
            }
        }
    }
    if (emptiesCnt === 0) {
        for (let i = 0; i < n; i++) {
            let cntRowL = CountRow(n, board, i, true);
            let cntRowR = CountRow(n, board, i, false);
            let cntColT = CountCol(n, board, i, true);
            let cntColB = CountCol(n, board, i, false);
            if (cntRowL !== countRowL[i]) {
                document.getElementById("L" + i).style.backgroundColor = "red";
            }
            if (cntRowR !== countRowR[i]) {
                document.getElementById("R" + i).style.backgroundColor = "red";
            }
            if (cntColT !== countColT[i]) {
                document.getElementById("T" + i).style.backgroundColor = "red";
            }
            if (cntColB !== countColB[i]) {
                document.getElementById("B" + i).style.backgroundColor = "red";
            }
        }
    }
    if (IsSolved(n, board, emptiesCnt)) {
        GameOver();
        alert("Solved!");
    }
}

Load();
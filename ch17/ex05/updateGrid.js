// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, rows, cols) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            const aliveNeighbors = countAliveNeighbors(grid, row, col, rows, cols);

            if (grid[row][col]) {
                // 現在のセルが生存している場合
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    nextGrid[row][col] = false; // 過疎または過密で死滅
                }
            } else {
                // 現在のセルが死んでいる場合
                if (aliveNeighbors === 3) {
                    nextGrid[row][col] = true; // ちょうど3つの生存セルに囲まれて誕生
                }
            }
        }
    }
    return nextGrid;
}

function countAliveNeighbors(grid, x, y, rows, cols) {
    let count = 0;
    // 対象に隣接する箇所をループで確認する
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue; // 自分自身はカウントしない
            }
            const row = x + i;
            const col = y + j;
            // グリッドの範囲内かどうかをチェック
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                count += grid[row][col] ? 1 : 0;
            }
        }
    }
    return count;
}
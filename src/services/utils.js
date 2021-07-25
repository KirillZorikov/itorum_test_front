function range(start, stop) {
    let arr = stop >= start? [start]: [];
    let iter = start;
    while (iter < stop) {
        arr.push(iter += 1);
    }
    return arr;
}

export default function generatePaginatorArray(end, current) {
    let start = 1;
    let array = [];
    if (current - start <= 3) {
        array = range(start, current);
    } else {
        array = [start, '...', current - 1, current];
    }
    if (end - current <= 3) {
        array = array.concat(range(current + 1, end));
    } else {
        array = array.concat([current + 1, '...', end]);
    }
    return array;
}
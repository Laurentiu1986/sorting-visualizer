const mergeSort = (arr) => {
    const animations = [];
    if (arr.length <= 1) return arr;

    const aux = arr.slice();
    console.log("unsorted arr", arr);
    mergeSortHelper(arr, 0, arr.length - 1, aux, animations);
    console.log("sorted arr", arr);
    return animations;
}

function mergeSortHelper(mainArr, left, right, aux, animations) {

    if (left === right) return;

    const middle = Math.floor((left + right) / 2);

    mergeSortHelper(aux, left, middle, mainArr, animations);
    mergeSortHelper(aux, middle + 1, right, mainArr, animations);
    merge(mainArr, left, middle, right, aux, animations);

}

function merge(mainArr, left, middle, right, aux, animations) {

    let k = left;
    let i = left;
    let j = middle + 1;

    while (i <= middle && j <= right) {
        animations.push([i, j, false, -1, -1]);
        if (aux[i] <= aux[j]) {
            animations.push([k, j, true, aux[i], aux[k]]);
            mainArr[k++] = aux[i++];
        } else {
            animations.push([k, j, true, aux[j], aux[k]]);
            mainArr[k++] = aux[j++];
        }
    }

    while (i <= middle) {
        if (j === mainArr.length)
            animations.push([k, i - 1, true, aux[i], aux[k]]);
        else
            animations.push([k, i, true, aux[i], aux[k]]);
        mainArr[k++] = aux[i++];
    }
    while (j <= right) {
        if (j === mainArr.length)
            animations.push([k, j - 1, true, aux[j], aux[k]]);
        else
            animations.push([k, j, true, aux[j], aux[k]]);
        mainArr[k++] = aux[j++];
    }
}


 export default mergeSort;

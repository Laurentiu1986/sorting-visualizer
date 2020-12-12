const quickSort = (array) => {
    const animations = [];

    quicksortFn(array.slice(), 0, array.length - 1, animations);
    console.log("quicksort: ", animations);
    return animations;
}

function quicksortFn(array, low, high, animations) {
    if(low < high) {
        var pi = partition(array, low, high, animations);
        quicksortFn(array, low, pi - 1, animations);
        quicksortFn(array, pi + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    var pivot = array[high];
    var i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            console.log("test: ", [i, j, true, array[j], array[i]]);
            animations.push([i > -1 ? i : (i + 1), j ? j : (j + 1), true, array[i], array[j]])
        } else {
            animations.push([i > -1 ? i : (i + 1), j ? j : (j + 1), false, -1, -1])
        }
    }
    let temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;

    animations.push([i + 1, high, true, array[i + 1], array[high]])

    return (i + 1);
}

export default quickSort;
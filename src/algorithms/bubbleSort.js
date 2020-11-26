const bubbleSort = (unsortedArr) => {
        console.log("bubble sort executing...");
        var animations = [];

        var arr = unsortedArr;
        var swap;
        var n = arr.length - 1;
        var x = arr;

        do {
            swap = false;
            arr = unsortedArr;

            for (var i = 0; i < n; i++) {
                if (x[i] > x[i + 1]) {
                    var temp = x[i];
                    x[i] = x[i + 1];
                    x[i + 1] = temp;
                    swap = true;
                    animations.push([i, i+1, true, x[i], x[i+1]])
                } else {
                    animations.push([i, i+1, false, -1, -1])
                }
            }
            n--;
        } while (swap);

        console.log(animations);

        return animations;
}

export default bubbleSort;
const array = [3,1,4,3,5,1,2,3,1];

function WaterRest(array) {
    let total = 0;
    let volume = 0;
    let left = array[0];
    let countFromLeft = 0;
    let i = 1;
    while (i < array.length) {
        if (countFromLeft === 0 && array[i] > left) {
            left = array[i];
        } else if (array[i - 1] === left && array[i - 1] > array[i]) {
            countFromLeft++;
        } else if (array[i - 1] !== left && array[i - 1] === array[i]) {
            countFromLeft++;
        } else if (array[i - 1] !== left && array[i - 1] < array[i]) {
            if (array[i + 1]) {
                if (array[i + 1] > array [i]) {
                    let j = i + 1;
                    let maxHeight = array[j] - array[i];
                    while (array[j] < array[j + 1]) {
                        maxHeight += array[i + 1] - array[i];
                        j++;
                    };
                    volume += volume + countFromLeft * (Math.min(left, array[i] + maxHeight) - array[i - 1]);
                };
            } 
            volume = volume + countFromLeft * (Math.min(left, array[i]) - array[i - 1]);
            total += volume;
            countFromLeft = 0;
            left = array[i];
            volume = 0;
        };
        i++;
    };
    return total;
};

console.log(WaterRest(array));
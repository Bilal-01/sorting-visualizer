import React, { useContext, useEffect, useState } from 'react';
import AlgoContext from '../AlgoContext';


function Sorts(props) {
    const algo = useContext(AlgoContext);
    const [colorLine, setColorLine] = useState(0);

    const lineStyle = {
        backgroundColor: 'black', 
        color: 'white',
        padding: '5px 15px',
        transition: '1s all',

    }

    const helperFunctions = {
        swap,
        animateColor,
        completeSorted,
        sleep,
        mergeAnimation,
        handleFreqChange,
        clearArr,
        fillArr,
        bucketAnimation,
        removeFreqTable,
        countHandle,
        animateLine,
        copyValue,
    };

    useEffect(() => {
        algo.setIsSorted(false);
        const originalArray = [...algo.inputArr];
        algo.setArr(originalArray);
        let localArr = [...originalArray];
        if (algo.algorithm === 'Bubble') {
            bubbleSort(localArr, helperFunctions);
        }
        else if (algo.algorithm === 'Insertion') {
            insertionSort(localArr, helperFunctions);
        }
        else if (algo.algorithm === 'Quick') {
            quickSort(localArr, 0, localArr.length - 1, helperFunctions);
        }
        else if (algo.algorithm === 'Merge') {
            mergeSort(localArr, 0, localArr.length - 1, helperFunctions);
        }
        else if (algo.algorithm === 'Heap') {
            heapSort(localArr, helperFunctions)
        }
        else if (algo.algorithm === 'Counting') {
            countSort(localArr, 0, 10, helperFunctions)
        }
        else if (algo.algorithm === 'Radix') {
            radixsort(localArr, localArr.length, helperFunctions);

        }
        else if (algo.algorithm === 'Bucket') {
            bucketSort(localArr, helperFunctions);
        }
        else if (algo.algorithm === 'Modified Quick') {
            Sort_book1(localArr, 0, 14, 4, helperFunctions);
        }
        else if (algo.algorithm === 'Modified Count') {
            modifiedCountSort(localArr, 0, 10, 3, 8, helperFunctions)
        }
    }, [algo.algorithm]);

    useEffect(() => {
        algo.setIndices([]);
    }, [algo.isSorted]);


    async function sleep(millis) {
        return new Promise((resolve) => setTimeout(resolve, millis));
    }

    async function animateColor(arr) {
        await sleep(1000);
        let indices = [...arr];
        algo.setIndices(indices);
        return Promise;

    }

    async function swap(arr, i, j) {
        let tempArr = [...arr];
        var temp = tempArr[i]
        tempArr[i] = tempArr[j]
        tempArr[j] = temp;
        await sleep(500);
        algo.setArr(tempArr);
        return Promise.resolve(tempArr);
    }

    async function copyValue(input, output, i, j){
        let tempInput = [...input];
        let tempOutput = [...output];
        tempOutput[j] = tempInput[i];
        await sleep(500);
        algo.setArr(tempOutput);
        return Promise.resolve(tempOutput);
    }

    async function completeSorted() {
        algo.setIsSorted(true);
        return Promise;
    }

    
    async function mergeAnimation(arr) {
        let tempArr = [...arr];
        await sleep(1000);
        algo.setArr(tempArr);
        return Promise;
        
    }
    
    async function handleFreqChange(arr) {
        await sleep(500);
        algo.setFreq([...arr]);
        return Promise;
    }
    
    async function removeFreqTable()
    {
        await sleep(500);
        algo.setIsFreqTable(false);
        return Promise;
    }
    
    async function clearArr() {
        let temp = [];
        algo.setArr([]);
        return Promise.resolve(temp);
    }
    
    async function fillArr(arr) {
        algo.setArr([...arr]);
        return Promise;
    }
    
    
    async function bucketAnimation(i, arr) {
        await sleep(500);
        let temp = [...arr];
        algo.setIndices([i, temp]);
        console.log(algo.indices);
        return Promise;
        
    }
    
    async function countHandle(a,b,count)
    {
        let temp = [a, b, count]
        algo.setCount(temp);
        console.log(a + " " + b + " " + count);
        console.log("Show count: " + algo.count);
        return Promise;
    }
    
    async function animateLine(line){
        await sleep(500);
        await setColorLine(line);
        return Promise;
    }
    
    return (
        props.code.map((line, i) => {
            return <p style={i === colorLine ? lineStyle : {padding: '5px 15px'}} key={i}>{line}</p>
        })
    );
    
}

async function bubbleSort(localArr, helperFunctions) {
    await helperFunctions.sleep(1000);
    for (var i = 0; i < localArr.length; i++) {
        await helperFunctions.animateLine(0, 'black', 'white');
        for (var j = 0; j < (localArr.length - i - 1); j++) {
            await helperFunctions.animateLine(1);
            await helperFunctions.animateColor([j, j + 1]);    
            await helperFunctions.animateLine(2);
            if (localArr[j] > localArr[j + 1]) {
                await helperFunctions.animateLine(3, '#112B3C', '#F66B0E');
                localArr = await helperFunctions.swap(localArr, j, j + 1);
            }
        }
    }
    await helperFunctions.completeSorted();
}

async function insertionSort(localArr, helperFunctions) {
    await helperFunctions.sleep(1000);
    let i, j;
    for (i = 1; i < localArr.length; i++) {
        await helperFunctions.animateLine(0);
        j = i;
        await helperFunctions.animateLine(1);
        
        while (j >= 0 && localArr[j] < localArr[j - 1]) {
            await helperFunctions.animateLine(2);
            await helperFunctions.animateColor([j, j - 1]);
            await helperFunctions.animateLine(3)
            localArr = await helperFunctions.swap(localArr, j, j - 1);
            j = j - 1;
            await helperFunctions.animateLine(4)
        }
    }
    await helperFunctions.completeSorted();

}


async function partition(localArr, low, high, helperFunctions) {
    await helperFunctions.animateLine(0);
    let pivot = localArr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        await helperFunctions.animateLine(1);
        if (localArr[j] < pivot) {
            i++;
            await helperFunctions.animateColor([0, i, j]);
            await helperFunctions.animateLine(2);
            localArr = await helperFunctions.swap(localArr, i, j);
        }
    }
    await helperFunctions.animateColor([0, i + 1, high]);
    await helperFunctions.animateLine(3);
    localArr = await helperFunctions.swap(localArr, i + 1, high);
    return Promise.resolve([localArr, i + 1]);

}
async function quickSort(localArr, low, high, helperFunctions) {
    if (low < high) {
        let pi;
        [localArr, pi] = await partition(localArr, low, high, helperFunctions);
         await helperFunctions.animateLine(4);
        localArr = await quickSort(localArr, low, pi - 1, helperFunctions);
        await helperFunctions.animateLine(5);
        localArr = await quickSort(localArr, pi + 1, high, helperFunctions);
    }
    else {
        if (Math.min.apply(null, localArr) === localArr[0] && Math.max.apply(null, localArr) == localArr[localArr.length - 1]) { await helperFunctions.completeSorted(); }
    }
    return Promise.resolve(localArr);
}

async function merge(arr, l, m, r, helperFunctions) {
    let n1 = m - l + 1;
    let n2 = r - m;
    console.log(n1 + " " + n2);
    let L = new Array(n1);
    let R = new Array(n2);
    let animations = [];
    
    let i = 0;
    let j = 0;
    console.log(arr);
    if (n1 !== 0) {
        for (i = 0; i < n1; i++) {
            L[i] = arr[l + i];
            animations[i] = l + i;
        }
    }
    if (n2 !== 0) {
        for (j = 0; j < n2; j++) {
            R[j] = arr[m + 1 + j];
            animations[n1 + j] = m + 1 + j
        }
    }
    await helperFunctions.animateColor(animations);
    
    i = 0;
    j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    await helperFunctions.mergeAnimation(arr);
    
    
    console.log(arr);
    return Promise.resolve(arr);
}

async function mergeSort(arr, l, r, helperFunctions) {
    await helperFunctions.animateLine(0);
    if (l >= r) {
        await helperFunctions.completeSorted();
        return Promise.resolve(arr);
        
    }
    var m = l + parseInt((r - l) / 2);
    await helperFunctions.animateLine(1);
    let temp = addNumToArr(l, m);
    await helperFunctions.animateColor(temp);
    arr = await mergeSort(arr, l, m, helperFunctions);
    await helperFunctions.animateLine(2);
    let temp2 = addNumToArr(m+1, r);
    await helperFunctions.animateColor(temp2);
    arr = await mergeSort(arr, m + 1, r, helperFunctions);
    await helperFunctions.animateLine(3);
    arr = await merge(arr, l, m, r, helperFunctions);
    return Promise.resolve(arr);
}

function addNumToArr(a, b){
    let arr=[]
    for(let i=a; i<=b; i++){
        arr[i] = i;
    };
    return arr;
}


async function heapSort(arr, helperFunctions) {
    
    await helperFunctions.animateLine(4);
    var N = arr.length;
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
        await helperFunctions.animateLine(5);
        arr = await heapify(arr, N, i, helperFunctions);
    for (var i = N - 1; i > 0; i--) {
        await helperFunctions.animateColor([0, i]);
        await helperFunctions.animateLine(6)
        arr = await helperFunctions.swap(arr, 0, i);
        await helperFunctions.animateLine(5);
        arr = await heapify(arr, i, 0, helperFunctions);
    }
    await helperFunctions.completeSorted();
}
async function heapify(arr, N, i, helperFunctions) {
    
    await helperFunctions.animateLine(0);
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    await helperFunctions.animateLine(1);
    if (l < N && arr[l] > arr[largest])
        largest = l;

    await helperFunctions.animateLine(2);
    if (r < N && arr[r] > arr[largest])
        largest = r;
        if (largest != i) {
            await helperFunctions.animateColor([i, largest]);
            await helperFunctions.animateLine(3)
        arr = await helperFunctions.swap(arr, i, largest);
        arr = await heapify(arr, N, largest, helperFunctions);
    }

    return Promise.resolve(arr);
}

async function getMax(arr, n) {
    let mx = arr[0];
    for (let i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return Promise.resolve(mx);
}

async function radixHelper(arr, n, exp, helperFunctions) {
    let output = [...arr];
    let i;
    let count = new Array(10);
    await helperFunctions.animateLine(2);
    await helperFunctions.sleep(500);
    for (let i = 0; i < 10; i++)
        count[i] = 0;
    for (i = 0; i < n; i++)
        count[Math.floor(arr[i] / exp) % 10]++;
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    await helperFunctions.animateLine(3);
    for (i = n - 1; i >= 0; i--) {
        console.log("Index = " + i + "  expression = " + exp +  "  Output array Index: " + output[count[Math.floor(arr[i] / exp) % 10] - 1]);
        await helperFunctions.animateColor([exp, i, count[Math.floor(arr[i] / exp) % 10] - 1])
        output = await helperFunctions.copyValue(arr, output, i, count[Math.floor(arr[i] / exp) % 10] - 1);
        count[Math.floor(arr[i] / exp) % 10]--;
    }


    await helperFunctions.animateLine(4);
    await helperFunctions.sleep(500);
    for (i = 0; i < n; i++){
        arr[i] = output[i];
    }


    return Promise.resolve(arr);
}


async function radixsort(arr, n, helperFunctions) {
    await helperFunctions.animateLine(0);
    let m = await getMax(arr, n);
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10){
        await helperFunctions.animateLine(1);
        await helperFunctions.sleep(500);
        arr = await radixHelper(arr, n, exp, helperFunctions);
    }
    
    await helperFunctions.completeSorted()
    console.log(arr);
}


async function countSort(arr, min, max, helperFunctions) {

    let i = min,
        j = 0,
        len = arr.length,
        
        count = [];
        await helperFunctions.animateLine(0);
        for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < len; i++) {
        await helperFunctions.animateLine(1)
        
        count[arr[i]] += 1;
        await helperFunctions.animateLine(2)
        await helperFunctions.animateColor([i]);
        await helperFunctions.handleFreqChange(count);
    }
    arr = await helperFunctions.clearArr();
    console.log(arr)

    
    await helperFunctions.animateLine(3)
    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            await helperFunctions.animateLine(4);
            arr[j] = i;
            await helperFunctions.animateLine(5);
            j++;
            count[i]--;
            await helperFunctions.animateLine(6)
            await helperFunctions.handleFreqChange(count)
            await helperFunctions.fillArr(arr);
            console.log(arr);
            await helperFunctions.animateColor([j]);
        }
    }



    return Promise.resolve(arr);
}

async function bucketSort(arr, helperFunctions) {
    if (arr.length === 0) {
        return Promise.resolve(arr);
    }
    let i,
        minValue = arr[0],
        maxValue = arr[0],
        bucketSize = 50;
    arr.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);
    await helperFunctions.animateLine(0);
    for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }
    await helperFunctions.animateLine(1);
    let BucketIndex = new Array(bucketCount);

    for (i = 0; i < BucketIndex.length; i++) {
        BucketIndex[i] = [];
    }
    await helperFunctions.animateLine(2);
    arr.forEach(function (currentVal, i) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
        BucketIndex[Math.floor((currentVal - minValue) / bucketSize)].push(i);
    });
    arr.length = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (BucketIndex[i].length !== 0) {
            await helperFunctions.animateColor([i, ...BucketIndex[i]]);
        }
        await helperFunctions.sleep(1000);
    }
    await helperFunctions.sleep(1000);
    let k = 0;
    for (let i = 0; i < bucketCount; i++) {
        let tempIndex = [];
        allBuckets[i] = await bucketInsertion(allBuckets[i], helperFunctions);
        await helperFunctions.animateLine(3);
        for (let j = 0; j < allBuckets[i].length; j++) {
            arr.push(allBuckets[i][j]);
            tempIndex.push(k);
            k++;
        }
        await helperFunctions.animateColor([i, ...tempIndex]);
        await helperFunctions.fillArr(arr);
        await helperFunctions.sleep(1000);
    }
    await helperFunctions.completeSorted();
    return Promise.resolve(arr);
}


async function bucketInsertion(arr, helperFunctions) {
    let length = arr.length;
    let i, j;
    for (i = 1; i < length; i++) {
        let temp = arr[i];
        for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }
    return Promise.resolve(arr);
};

async function Sort_book1(localArr, p, r, K, helperFunctions) {
    await helperFunctions.animateLine(0);

    await helperFunctions.animateLine(1);
    localArr = await limited_quickSort(localArr, p, r, K, helperFunctions);
    await helperFunctions.animateLine(2);
    localArr = await modified_insertionSort(localArr, p, r, helperFunctions);
    return Promise;
}

async function limited_quickSort(localArr, p, r, K, helperFunctions) {
    
    if (r - p > K) {
        let q;
        [localArr, q] = await partition(localArr, p, r, helperFunctions);
        localArr = await limited_quickSort(localArr, p, q - 1, K, helperFunctions);
        localArr = await limited_quickSort(localArr, q + 1, r, K, helperFunctions);
    }
    return Promise.resolve(localArr);
}

async function modified_insertionSort(localArr, p, r, helperFunctions) {
    await helperFunctions.sleep(1000);
    let i, j;
    for (i = p + 1; i <= r; i++) {
        j = i;
        while (j >= 0 && localArr[j] < localArr[j - 1]) {
            await helperFunctions.animateColor([1, j, j - 1]);
            localArr = await helperFunctions.swap(localArr, j, j - 1);
            j = j - 1;
        }
    }
    await helperFunctions.completeSorted();

}

async function modifiedCountSort(arr, min, max, a, b, helperFunctions) {
    await helperFunctions.animateLine(0);
    let i = min,
        j = 0,
        len = arr.length,
        count = [],
        auxArr = [];
    for (i; i <= max; i++) {
        count[i] = 0;
        auxArr[i] = 0;
    }
    for (i = 0; i < len; i++) {
        await helperFunctions.animateLine(1);
        count[arr[i]] += 1;
        await helperFunctions.animateLine(2);
        await helperFunctions.animateColor([i]);
        await helperFunctions.handleFreqChange(count);
    }
    await helperFunctions.animateLine(3);
    
    for (i = min; i <= max; i++) {
        if (i === 0) {
            auxArr[i] = count[i];
        }
        else {
            auxArr[i] = auxArr[i - 1] + count[i]
        }
    }
    
    console.log(auxArr);
    console.log(count);
    
    let X=[];
    j=0;
    for (i = 0; i < arr.length; i++) {
        if(arr[i]>=a && arr[i]<=b){
            X[j] = arr[i];
            j++;
        }
    }
    await helperFunctions.animateLine(4);
    let numOfIntegers = auxArr[b] - auxArr[a - 1];
    await helperFunctions.fillArr(X);
    await helperFunctions.removeFreqTable();
    await helperFunctions.countHandle(a,b,numOfIntegers);
    return Promise.resolve(count);
}

export default Sorts;
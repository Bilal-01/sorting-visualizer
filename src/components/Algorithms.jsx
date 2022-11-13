import React, {useContext, useEffect, useState} from 'react';
import AlgoContext from './AlgoContext';
import BarContainer from './BarContainer';
import Sorts from './algorithms/Sorts';

function Algorithms(){
    const algo = useContext(AlgoContext);
    const [algoText, setAlgoText] = useState([]);
    let bubbleStr = [
        `for(var i = 0; i < arr.length; i++){`,
        `    for(var j = 0; j < ( arr.length - i -1 ); j++){`,
        `      if(arr[j] > arr[j+1]){`,
        `        var temp = arr[j]`,
        `        arr[j] = arr[j + 1]`,
        `        arr[j+1] = temp`,
        `      }`,
        `    }`,
        `}`
    ];

    let insertionStr = [
        `for (i = 1; i < N; i++) {`, 
            `j = i;`, 
            `while (j >= 0 && arr[j] < arr[j-1]){`, 
                `arr = swap(arr, j, j-1);`,
                `j = j-1;`,
            `}`,
        `}` 
    ]

    let quickStr = [
        `function partition(arr, low, high) {`,
            `let pivot = arr[high];`,
            `let i = (low - 1);`,
            `for (let j = low; j <= high - 1; j++) {`,
                `if (arr[j] < pivot) {`,
                    `i++;`,
                    `swap(arr, i, j);`,
                `}`,
            `},`,
            `swap(arr, i + 1, high);`,
            `return (i + 1);`,
        `}`,
        `function quickSort(arr, low, high) {`,
           `if (low < high) {`,
                `let pi = partition(arr, low, high);`,
                `quickSort(arr, low, pi - 1);`,
                `quickSort(arr, pi + 1, high);`,
           ` }`,
        `}`
    ]

    useEffect(() => {
        if(algo.algorithm === 'Bubble'){
            setAlgoText(bubbleStr);
        }
        if(algo.algorithm === 'Insertion'){
            setAlgoText(insertionStr);
        }
        if(algo.algorithm === 'Quick')
        {
            setAlgoText(quickStr);
        }
    }, [algo.algorithm]);

    return (
        <>
            <h3>{algo.algorithm} Sort</h3>
            {algo.algorithm === '' ? 'Not Available' : <Sorts code={algoText}/>}
        </>
    )
}



export default Algorithms
import { useAppSelector } from "Store/hooks";
import { selectCount } from "Store/slices/counterSlice";
import React from "react";
import { Provider } from "react-redux";


function Counter(props: any) {
    const count =  useAppSelector(selectCount);

    return (
        <div>React: counter is {count}</div>
    )
}


export default Counter;

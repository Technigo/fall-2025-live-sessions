// const anObject = {
//     someKey: 'someValue'
// }

// // const { someKey } = anObject
// console.log('somekey', someKey) // prints out 'someValue'

// export const MyComponent = ({ myFirstProp, mySecondProp, children }) => { ... }
/*
export const MyComponent = (props) => { 
    // destructuring the props object
    const {children, myFirstProp, mySecondProp } = props
    return (
        <div>
            {props.children} 
        </div>
    )
}
// Spread operator
const newObject = { ...anotherObject }
*/







export const MyComponent = (props) => { 
    // This is what the `props` parameter looks like:
    // {
    //  myFirstProp: 'myFirstValue',
    //  mySecondProp: 'mySecondValue',
    //  children: "My Title is right here",
    // }


    return (
        <div>
            {props.children} {/* prints out "My Title is right here" */}
        </div>
    )
}


// OTHER FILE BELOW, usually


export const MyComponentParent = () => { 

    return (
        <MyComponent myFirstProp="myFirstValue" mySecondProp="mySecondValue">
            My Title is right here
        </MyComponent>
    )
}

export const List = (props) => {
    // Interface Props = {
    //   items: React.ReactNode
    // }

    return (
        <ul className="list">
            {props.items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

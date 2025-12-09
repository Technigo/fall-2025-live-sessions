// interface ButtonProps {
//     variant: 'primary' | 'secondary' | 'tertiary';
// }

export const Button = (props) => {
    return (
        <button className={`button ${props.className} button-${props.variant}`} type="button">
            {props.children}
        </button>
    )
}
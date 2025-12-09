import { Icon } from "./Icon";
import { Typography } from "./Typography";
import { Button } from "./Button";

// interface CardProps {
//     iconName: 'lemon' | 'rocket' | 'dog';
//     title: string;
//     description: string;
//     buttonText: string;
//     variant: 'primary' | 'secondary' | 'tertiary';
// }

export const Card = (props) => {
    return (
        <div className={`card card-${props.variant}`}>
            <Typography className="card-heading"variant="h2">{props.title}
                <Icon name={props.iconName} className="card-icon" />
            </Typography>

            <div className="card-inner">
                <Typography className="card-description" variant="p">{props.description}</Typography>

                <Button className="card-button" variant={props.variant}>{props.buttonText}</Button>
            </div>
        </div>
    )
}
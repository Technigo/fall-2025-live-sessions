import { Image } from './Image';
import { Typography } from './Typography';

export const Pokemon = (props) => {
  return (
    <div className="pokemon">
        <Image src={props.imgUrl} />
        
         <Typography>{props.name}</Typography>
         <Typography><strong>Type: </strong>{props.type?.join(', ')}</Typography>
    </div>
  )
}

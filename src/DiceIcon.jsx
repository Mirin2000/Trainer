import { Box } from "@mui/material";
import d20 from './assets/d20_icon.svg';

export default function DiceIcon ({ handleClick, rolling }) {

    return(

        <Box component='img' src={d20} alt='' className='rolling-dice' name='roll' onClick={rolling?()=>{}:handleClick} sx={rolling?spinSx:{width:'50px'}} />

    );

}

const spinSx = {
    width: '50px',
    animation: "spin 1s linear infinite",
    "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
    } 
};
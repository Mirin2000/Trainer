import { useState } from "react";
import { Button, Box, Typography, createTheme, ThemeProvider, Checkbox, FormGroup, FormControlLabel, List, ListItem } from "@mui/material";
import './trainer.css';
import DiceIcon from "./DiceIcon";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';

const activitiesArray = [
    {id: 0, title: "Parata e risposta", description: "Concentrati sul parare i colpi dell'avversario, rispondi con un colpo seguito da un colpo di copertura.", active: true},
    {id: 1, title: "Allena le tecniche", description: "Scegli una tecnica da allenare da un corso che stai frequentando.", active: true},
    {id: 2, title: "Allena la misura", description: "Tira i colpi arrivando a bersaglio, stendi bene i colpi.", active: true},
    {id: 3, title: "Passeggio", description: "Presta attenzione ai tuoi passi e a quelli del tuo avversario.", active: true}
];

function ActivityCard ({ activity }) {

    return (
        <Box sx={{maxWidth: '550px', textAlign: 'center'}}>
            <Typography variant='h4' sx={{...textSx, margin: '10px 5px', fontSize:'1.5em'}}>{activity.title}</Typography>
            <Typography variant='subtitle1' sx={{...textSx, margin: '10px 5px'}}>{activity.description}</Typography>
        </Box>
    );

}

function ActivityList({ activities, setActivities }) {

    function handleChange(id) {

        //cambia elemento tra attivo e non attivo
        setActivities(activities.map((activity) => {
            if (activity.id == id) {
                return {...activity, active:!activity.active};
            } else {
                return activity;
            }      
        }))

    }

    return (

        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>

            {(activities.filter((value)=>value.active).length < 2) && <Typography sx={{...textSx, color:'red', marginTop:'10px'}}>Seleziona almeno due allenamenti!</Typography>}

            <List sx={{display:'inline-block', paddingLeft:'0px', textAlign:'left'}}>
                {activities.map((activity, index) => 
                    <ListItem key={activity.id} sx={{display: 'flex'}}>
                        <FormGroup>
                            <FormControlLabel 
                                control={<Checkbox checked={activity.active} onChange={() => handleChange(activity.id)}></Checkbox>} 
                                label={<Typography variant='subtitle1' sx={textSx}>{activity.title}</Typography>} />                           
                        </FormGroup>
                    </ListItem>
                )}
            </List>

        </Box>

    );

}

function Trainer () {

    const [activities, setActivities] = useState(activitiesArray);
    const [rolling, setRolling] = useState(false);
    const [choice, setChoice] = useState(null);
    const [editActivities, setEditActivities] = useState(false);

    async function handleClick(e) {

        let buttonName = e.target.name;
        switch (buttonName) {

            case 'roll':

                setRolling(true);

                setTimeout(() => {
                    
                    let newChoice = null;

                    do {
                        newChoice = (Math.round(Math.random()*(activities.length-1)));
                    } while (newChoice == choice || !activities[newChoice].active);

                    setChoice(newChoice);
                    setRolling(false);

                }, 1500);

                return;

            case 'edit':

                setEditActivities(true);
                return;

            case 'save':

                //salva se ci sono almeno due attività attive
                if (activities.filter((value)=>value.active).length > 1) {
                    setEditActivities(false);
                }
                
                return;

            default:

                return;

        }
        

    }

    return(
        <Box sx={outerBoxSx}>
            <Box sx={innerBoxSx}>

                <Typography variant='h3' sx={{...textSx, fontSize: '2em'}}>Trainer</Typography>

                <Box sx={buttonBoxSx}>
                    <ThemeProvider theme={buttonsTheme}>

                        <Button name={editActivities ? 'save' : 'edit'} onClick={handleClick} disabled={rolling?true:false} 
                        color='secondary' variant='outlined' sx={!editActivities?editButtonSx:rollButtonSx} 
                        endIcon={editActivities?<SaveIcon onClick={()=>handleClick({target:{name:'save'}})} sx={iconSx}/>:<EditNoteIcon onClick={()=>handleClick({target:{name:'edit'}})} sx={iconSx} />}>
                            {editActivities ? 'Save' : 'Edit'}
                        </Button>

                        <Button name='roll' onClick={rolling?()=>{}:handleClick} disabled={editActivities?true:false} color='primary' variant='contained' sx={rollButtonSx} 
                        endIcon={<DiceIcon handleClick={handleClick} rolling={rolling} />}>Roll</Button>

                    </ThemeProvider>
                </Box>

                {(choice !== null) && !editActivities && <ActivityCard activity={activities[choice]} />}
                {editActivities && <ActivityList activities={activities} setActivities={setActivities} />}

            </Box>
        </Box> 
    );

}

const outerBoxSx = {
    backgroundColor: 'rgb(26, 26, 26)',
    height: 'calc(100% - 64px)',
    overflowY: 'auto',
    width: '100%',
    paddingBottom: '64px',
    boxSizing: 'border-box',
    display: 'block'
};

const innerBoxSx = {
    height: '100%',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    //webkitBoxPack: 'center',
    justifyContent: 'center',
    //webkitBoxAlign: 'center',
    alignItems: 'center',
    gap: '16px'
};

const buttonBoxSx = {
    display: 'flex',
    gap: '16px',
    width: '60%'
};

const textSx = {

    margin: '0px',
    fontWeight: 600,
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.167,
    letterSpacing: '0em',
    textAlign: 'center'
        
}

const editButtonSx = {
    backgroundColor: 'var(--variant-outlinedBg)',
    color: 'var(--variant-outlinedColor)',
    padding: '5px 15px',
    borderStyle: 'solid',
    borderColor: 'var(--variant-outlinedBorder, currentColor)',
    fontSize: '18px'
};

const rollButtonSx = {
    backgroundColor: 'var(--variant-containedBg)',
    color: 'var(--variant-containedColor)',
    padding: '6px 16px',
    borderStyle: 'initial',
    borderColor: 'initial',
    fontSize: '18px',
};

const iconSx = {
    width: '40px',
    height: '40px'
}

const buttonsTheme = createTheme({
  palette: {
    primary: {
      main: '#990000',
    },
    secondary: {
      main: '#ffffff',
    }
  }
});

export default Trainer;
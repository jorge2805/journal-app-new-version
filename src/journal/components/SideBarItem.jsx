import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useMemo } from 'react';

export const SideBarItem = ({title = '', body = ''}) => {
  
  const trunkTitle = useMemo(() => {
    return title.length > 17 
      ? title.substring(0,17) + '...'
      : title;
  }, [title])

  const trunkBody = useMemo(() => {
    return body.length > 40 
      ? body.substring(0,40) + '...'
      : body;
  }, [body])
  
  return (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={trunkTitle}/>
                <ListItemText secondary={ trunkBody} />
            </Grid>
        </ListItemButton>
    </ListItem>
  );
}

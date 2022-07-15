import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote } from "../../store/journal";
import { ImageGallery } from "../components";


export const NoteView = () => {
    
    const dispatch =  useDispatch();
    
    const {active: activeNote} = useSelector(state => state.journal)
  
    const {id, title, body, date, imageUrls, onInputChange, formState} = useForm(activeNote);

    const dateString = useMemo(() => {
        return new Date(date).toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState));    
    }, [formState])
    
    const saveNote = () => {
        dispatch(startSavingNote());
    };

    return (
        <Grid 
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item> 
                <Button
                    onClick={ saveNote } 
                    color="primary" 
                    sx={{ padding: 2}}                 >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Insert Tittle"
                    label="Title"
                    sx={{ border: 'none', mb: 1}}
                    name="title"
                    value={ title }
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Tell me what happened today"
                    minRows={5}
                    sx={{ border: 'none', mb: 1}}
                    name="body"
                    value={ body  }
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery/>
        </Grid>
    )
}

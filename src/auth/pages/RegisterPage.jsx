import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink} from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout/AuthLayout"


const DefaultData = {
  displayName: 'Jorge',
  email: 'prueba@gmail.com',
  password: '123456'
}

export const RegisterPage = () => {
  
  const { displayName, email, password, onInputChange, formState} = useForm(DefaultData);
  
  const onSubmit = (event) => {
    event.preventDefault();

    console.log(formState);

  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="your name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="hola@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx= {{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={12}>
              <Button type="submit"  variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google/>
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid> */}
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{mr: 1}}>Already Registered?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
                Login
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}

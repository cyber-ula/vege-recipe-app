import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth'
import './auth.scss'


const initialState = {firstname:'', lastname: '', email: '', password: '', confirmPassword: '' }


const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState)

  

    
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const handleShowPassword = () => setShowPassword((prevState) => !prevState)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))

        }
    }
    const handleSubmitTest = (e) => {
        e.preventDefault();
        dispatch(signin( {email: 'test@test.com', password: 'password123'}, navigate))

        }
    



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignUp((prevState) => !prevState)
        setShowPassword(false)

    }

  
return (
    <Container component = "main" maxWidth="xs" >
        <Paper className="paper" elevation={3}>
            <Avatar className='avatar' >
                <LockIcon className='avatar__lock' />
            </Avatar>
            <Typography variant='h5' style={{textAlign: 'center', padding: '10px'}}>{isSignUp? 'Sign Up': 'Sign In'}</Typography>
            <form className="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && 
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    }
                            <Input name="email" label="Email address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword}/>
                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}

                </Grid>
                           
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '10px'}}>
                                {isSignUp? 'Sign Up': 'Sign In'}
                            </Button>
                            <Button onClick={handleSubmitTest} fullWidth variant="contained" color="primary" style={{marginTop: '10px'}}>
                                Login as a test user
                            </Button>
                            <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button onClick={switchMode}>
                                            {isSignUp? 'Already have an account? Sign In': 'Dont have an account? Sign Up' }
                                        </Button>
                                    </Grid>
                            </Grid>


            </form>
        </Paper>
    </Container>
  )
}

export default Auth
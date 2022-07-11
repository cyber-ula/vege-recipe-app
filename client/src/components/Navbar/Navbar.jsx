
import { Link } from 'react-router-dom';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'
import './navbar.scss'
import vege from '../../images/vege.png'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        navigate('/')
        setUser(null)
    }


    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
  return (
    <AppBar className="AppBar" position='static' color='inherit'>
    <div className="brandContainer">
        <Typography component={Link} to="/" className="heading" variant='h2' align='center'>
           <img className="image" src={vege} alt="vege" height={120} width= {120} />
        </Typography>
        <Toolbar className='toolbar'>
        {user ? (
            <div className='profile'>
                <Avatar className="avatar" alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className='name' variant="h6">
                    {user.result.name}
                </Typography>
                <Button variant ="contained" color="secondary" onClick={logout}>Logout</Button>
            </div>
        ): (
            <Button component={Link} to="/auth" variant="contained" color="primary">
                Sign In
            </Button>
        )}
    </Toolbar>
    </div>
   
  </AppBar>
  )
}

export default Navbar
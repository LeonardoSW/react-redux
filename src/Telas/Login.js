import React from 'react';
import {View, Text, TextInput, Button} from 'react-native'

import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { changeUser } from '../Redux/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPwd] = useState('');
    const dispatch = useDispatch();
     
    return( 
        <View>
            <TextInput placeholder='Email' onChangeText={newEml => setEmail(newEml)} />
            <TextInput placeholder='Senha' onChangeText={newPwd => setPwd(newPwd)} />
            <Button title='Entrar' onPress={handleLogin}/>
        </View>
        )

    function handleLogin() {
        console.log(email + '   !   '+pass)
        dispatch(changeUser({user: email, password: pass}))
    }
}

export default Login;
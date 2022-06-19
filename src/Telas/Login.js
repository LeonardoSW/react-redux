import React from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native'

import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../Redux/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPwd] = useState('');
    const dispatch = useDispatch();
    
    const userLoged = useSelector((state) => state);
    
    return( 
        <View>
            <TextInput placeholder='Email' onChangeText={newEml => setEmail(newEml)} />
            <TextInput placeholder='Senha' onChangeText={newPwd => setPwd(newPwd)} />
            <Button title='Entrar' onPress={handleLogin}/>
            <Text>!space!</Text>
            <Button title='Usuario Logado na Store' onPress={showUser}/>

        </View>
        )

    function handleLogin() {
        console.log(email + '   !   '+pass)
        dispatch(changeUser({user: email, password: pass}))
    }

    function showUser() {
        console.log(userLoged);
        Alert.alert("Usuario logado:" , userLoged.user.user);
    }
}

export default Login;
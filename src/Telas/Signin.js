import {View, Text, TextInput, Button} from 'react-native';

import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../Redux/userSlice';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [pass, setPwd] = useState('');
    const dispatch = useDispatch();
     
    return(
        <View>
            <Text>CADSTRO!</Text>
            <Text>
                Enter your email and Password:
            </Text>
            <TextInput placeholder='Email' onChangeText={newEml => setEmail(newEml)} />
            <TextInput placeholder='Pass' onChangeText={newPwd => setPwd(newPwd)} />
            <Button title='Cadastrar' onPress={handleSignin}/>
        </View>
    )

    function handleSignin() {
        console.log(email + '   !   '+pass)
        dispatch(createUser({user: email, password: pass}))
    }
}




export default Signin;
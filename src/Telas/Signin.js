import react from 'react';
import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

import { useDispatch } from 'react-redux';
import { createUser } from '../Redux/userSlice';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [pass, setPwd] = useState('');
    const dispatch = useDispatch();
     
    return(
        <View>
            <Text>
                Enter your email and Password:
            </Text>
            <TextInput placeholder='teste1' onChangeText={newEml => setEmail(newEml)} />
            <TextInput placeholder='teste2' onChangeText={newPwd => setPwd(newPwd)} />
            <Button title='Cadastrar' onPress={handleSignin}/>
        </View>
    )

    function handleSignin() {
        console.log(email + '   !   '+pass)
        dispatch(createUser({user: email, password: pass}))
    }
}




export default Signin;
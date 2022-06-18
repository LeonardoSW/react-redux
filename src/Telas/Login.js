import React from 'react';
import {View, Text} from 'react-native'
import Signin from './Signin';

import {useState} from 'react';
import { useDispatch } from 'react-redux';

export default function Login() {
    return( 
        <View>
            <TextInput placeholder='Email' onChangeText={newEml => setEmail(newEml)} />
            <TextInput placeholder='Senha' onChangeText={newPwd => setPwd(newPwd)} />
            <Button title='Cadastrar' onPress={handleSignin}/>
        </View>
        )
}
    
/*<Signin/>*/
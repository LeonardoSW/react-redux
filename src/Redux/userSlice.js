import { createSlice } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

export const slice = createSlice({
    name: 'user',
    initialState:{
        user:'',
        password: '',
        message: ''
    },
    reducers:{
        setEmail(){

        },
         changeUser(state, {payload, pass}){
             return {...state, password:pass, user: payload, message:''}

         },
        createUser(state, action){
             console.log('recebido: ' + action.payload.user + ' - ' + action.payload.password)
             console.log(action.type);

            auth()
            .createUserWithEmailAndPassword(action.payload.user, action.payload.password)
            .then(() => {
                console.log('User account created!');
                Alert.alert("Criação de conta.", "Conta criada com sucesso!");
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert("Criação de conta.", "Conta já existente, email já utilizado!");
                }
    
                if (error.code === 'auth/invalid-email') {
                    console.log( 'That email address is invalid!');
                    Alert.alert("Criação de conta.", "Esse email é invalido!");
                }
    
                console.log("Other any error here!\n"+error);
            })

            return {...state, password: action.payload.password, user: action.payload.user}
        }
    }
})

export const {changeUser, createUser} = slice.actions;

export const selectUser = state => state.user

export default slice.reducer
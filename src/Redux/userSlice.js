import { createSlice } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth';

export const slice = createSlice({
    name: 'user',
    initialState:{
        user:'',
        password: '',
        message: ''
    },
    reducers:{
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
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                    console.log( 'That email address is invalid!');
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
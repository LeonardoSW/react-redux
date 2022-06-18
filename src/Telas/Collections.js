import React from 'react';
import { Text, View, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { saveCollection } from '../Redux/userSlice';

const Collections = () => {

    const dispatch = useDispatch();
    const listCollections = [];

    const actState = useSelector((state) => state);

    return( 
        <View>
            <Button title='Carregar Collections' onPress={changeCollections}/>
            <Text>!space!</Text>
            <Button title='Mostrar Collections na Store' onPress={showCollections}/>
        </View>
        )

    async function showCollections() {
        await changeCollections();
        console.log(actState.user.listCollection);


    }  
    
    async function changeCollections(){
        await firestore().collection('flashcollections').get().then(querySnapshot => {        
            querySnapshot.forEach(documentSnapshot => {
                listCollections.push(documentSnapshot.id, documentSnapshot.data());
              });
        });

        dispatch(saveCollection({list: listCollections}));
    }

}

export default Collections;
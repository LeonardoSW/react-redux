import React from 'react';
import { Text, View, Button, TextInput, Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCollection } from '../Redux/userSlice';

const Collections = () => {

    const dispatch = useDispatch();
    const listCollections = [];
    const [idExclsao, setIdExclusao] = useState('');
    const [NameDoc, setNameDoc] = useState('');
    const [Name, setName] = useState('');
    const actState = useSelector((state) => state);

    return( 
        <View>
            <Button title='Carregar Collections' onPress={changeCollections}/>
            
            <Text>!space!</Text>
            <Button title='Mostrar Collections na Store' onPress={showCollections}/>
            
            <Text>!space!</Text>
            <Button title='Adicionar nova Coleção' onPress={addCollection}/>
            
            <Text>!space!</Text>
            <TextInput placeholder='Id Documento para Remoção' onChangeText={newId => setIdExclusao(newId)} />
            <Button title='Remover Documento' onPress={removeDocument}/>

             <TextInput placeholder='Documento para Alterar' onChangeText={newNameDoc => setNameDoc(newNameDoc)} />
            <TextInput placeholder='Novo Valor Documento' onChangeText={newName => setName(newName)} />
            <Button title='Atualizar Documento' onPress={updateDocument}/> 
        </View>
        )
        
//#region change and show store state - collections
    async function showCollections() {
        console.log(actState.user.listCollection);
    }
    
    async function changeCollections(){
        await firestore().collection('flashcollections').get().then(querySnapshot => {        
            querySnapshot.forEach(documentSnapshot => {
                listCollections.push(documentSnapshot.id, documentSnapshot.data());
            });
        });
        
        dispatch(saveCollection({list: listCollections}));
        
        console.log("Coleção carregada na store!");
    }
    //#endregion

//#region add new document
    async function addCollection(){

        await firestore()
        .collection('flashcollections')
        .add({
            name: 'Cabrito'
        })
        .then(() => {
            console.log('Collection added!');
        })
        .catch(error => {
            console.log(error.code);
        })
    }
//#endregion

//#region delete document
    async function removeDocument(){
        await firestore()
        .collection('flashcollections')
        .doc(idExclsao)
        .delete()
        .then(() => {
            console.log('Document removed!');
            Alert.alert('Document removed!')
        })
        .catch(error => {
            console.log(error.code);
        });
    }

//#endregion

//#region update document

    async function updateDocument(){
        await firestore()
        .collection('flashcollections')
        .doc(NameDoc)
        .update({
          nome: Name
        })
        .then(() => {
          console.log('Document updated!');
          Alert.alert('Document updated!');
        });
    }   

//#endregion
}

export default Collections;
import React from 'react';
import { Text, View, Button, TextInput, Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFlashList } from '../Redux/userSlice';

const Flashcards = () => {

    const dispatch = useDispatch();
    const listCollections = [];
    const [colecName, setColecName] = useState('');
    const [NameDoc, setNameDoc] = useState('');
    const [Name, setName] = useState('');
    const actState = useSelector((state) => state);

    return( 
        <View>
            <TextInput placeholder='Colecao para carregar' onChangeText={newColecName => setColecName(newColecName)} />
            <Button title='Carregar Collections' onPress={changeCollections}/>
            
            <Text>!space!</Text>
            <Button title='Mostrar Collections na Store' onPress={showCollections}/>
            
            {/* <Text>!space!</Text>
            <Button title='Adicionar novo Flashcard' onPress={addCollection}/> */}
            
            {/* <Text>!space!</Text>
            <TextInput placeholder='Id Documento para Remoção' onChangeText={newId => setIdExclusao(newId)} />
            <Button title='Remover Documento' onPress={removeDocument}/> */}

            <TextInput placeholder='Documento para Alterar' onChangeText={newNameDoc => setNameDoc(newNameDoc)} />
            <TextInput placeholder='Novo Valor Documento' onChangeText={newName => setName(newName)} />
            <Button title='Atualizar Documento' onPress={updateDocument}/> 
        </View>
        )
        
//#region change and show store state - collections
    async function showCollections() {
        console.log(actState.user.flashlist);
    }

    async function changeCollections(){
        var dados = await (await firestore().collection('flashcollections').doc(colecName).get()).data();
        
        console.log(dados);

        dispatch(saveFlashList({data: dados}));
        
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

export default Flashcards;
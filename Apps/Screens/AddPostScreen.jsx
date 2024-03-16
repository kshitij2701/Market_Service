import { View, Text, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';

export default function AddPostScreen() {
  
  const db = getFirestore(app);
  const [categoryList, setCategoryList]=useState([]);

  useEffect(()=>{
     getCategoryList();
  },[])
  
  /**
   * Used to get Category List
   */
  const getCategoryList=async()=>{
    const querySnapshot=await getDocs(collection(db,'Category'));

    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList(categoryList=>[...categoryList, doc.data()])
    });
  }
  return (
    <View className="p-10">
      <Formik
        initialValues={{img:'', title:'', desc:'', category:'', address:''}}
        onSubmit={value=>console.log(value)}
      >
        {({handleChange, handleBlur, handleSubmit, values})=>(
          <View>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={values.title}
            onChangeText={handleChange('title')}
          />
          <TextInput
            style={styles.input}
            placeholder='Description'
            value={values.desc}
            numberOfLines={5}
            onChangeText={handleChange('desc')}
          />

          {/* Category List Dropdown */}
          
          <Button onPress={handleSubmit}
           className="mt-7"
           title="submit"/>
          </View>


        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
      borderWidth:1,
      borderRadius:10,
      padding:10,
      marginTop:10,
      marginBottom:5,
      paddingHorizontal:17,
      fontSize:17
  }
})
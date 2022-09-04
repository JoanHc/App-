import React, {useState}  from 'react';
import { StyleSheet, Text, View, Image, Button,Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import *as Sharing from 'expo-sharing'


const App = () => {
  const [selectImage, setSelectImage] = useState(null)
  let openImagePickerAsync = async()=>{// permiso para acceder a la aplicacióm 
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync()  
  if(permissionResult.granted === false){
    alert('permiso para acccerder a galeria')
    return;
  }
  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  if(pickerResult.cancelled=== true){
    return;
  }
  setSelectImage({localUri: pickerResult.uri}) //si, seleciona una imagen 
  };
 // crear una funcion que habra una ventana para poder compartir 
  const openShareDialogo = () =>{
    
    Sharing.shareAsync(selectImage.localUri);

  }
   return (

    <View style={style.container}>
    <Text style={style.title}>Hola Joan</Text> 

    <TouchableOpacity
    onPress= {openImagePickerAsync}>
    <Image

     source={{uri: selectImage !== null 
    ? selectImage.localUri
    :'https://picsum.photos/200/200',
     }}
     style ={style.image}
   />

  </TouchableOpacity>

   <TouchableOpacity  
   onPress={openShareDialogo}
   style={style.Button}
   >
   <Text style={style.ButtonText}>Compartir</Text>
   </TouchableOpacity>
  
  </View>

   );
   
};
// se crea un objeto que agrupe los estilos
const style = StyleSheet.create({
  // se agrupan los estilos
  container: {
    flex:1,justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#292929',
  },

  title:{
    fontSize:30, 
    color:'#FFF'
  },
  image:{
    margin: 5.5,
    height:200,
    width:200,
    borderRadius:100,
  },
Button:{
  backgroundColor:'blue',
  padding:7,
  marginTop:10,
  borderRadius:15,
},
ButtonText:{
 color: '#fff',
 fontSize:20
},

});
export default App;


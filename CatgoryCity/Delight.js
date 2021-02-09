
import React from 'react';
import { Text,View ,StyleSheet,TouchableOpacity, Image} from 'react-native';

const Delight =()=>{

    return (
        
      <View style={styles.contain}>
            <View style={styles.imgcontiner}> 
                <TouchableOpacity style={styles.imgview}>
                    <Image style={styles.img}
                     source={require('../pic/Del1.jpeg')}/>
                     <Text style={{color:"#fff",bottom:30,left:10,fontSize:20,fontWeight:'bold'}}>coffee</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imgview}>
                    <Image style={styles.img}
                     source={require('../pic/Del2.jpeg')}/>
                      <Text style={{color:"#fff",bottom:30,left:10,fontSize:20,fontWeight:'bold'}}>Mosque</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imgcontiner}> 
                <TouchableOpacity style={styles.imgview}>
                    <Image style={styles.img}
                     source={require('../pic/Del3.jpeg')}/>
                      <Text style={{color:"#fff",bottom:30,left:10,fontSize:20,fontWeight:'bold'}}>Alex</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imgview} onPress={()=>props.navigation.navigate('City')}>
                    <Image style={styles.img} 
                    source={require('../pic/Del1.jpeg')}/>
                     <Text style={{color:"#fff",bottom:30,left:10,fontSize:20,fontWeight:'bold'}}>coffee</Text>
                </TouchableOpacity>
         </View>
      </View>
      );
}
  const styles=StyleSheet.create({

    contain:{
        width:"100%",
        height:'90%',
        backgroundColor:'#000',
    },
    imgcontiner:{
        flexDirection:'row',
        marginTop:10
    },
    imgview:{
        borderWidth:1,
        borderColor:'#000',
        width: 180,
        height:200,
        borderRadius:15,
        marginHorizontal:8,
        
    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:15,
    }
  },
  )
  export default Delight ;
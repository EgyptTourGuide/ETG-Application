

import React, { useEffect, useState } from 'react';
import { Text,TouchableOpacity,View ,StyleSheet,Dimensions,TextInput,ImageBackground, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateField from 'react-native-datefield';
import { Authaxios, URL } from '../API/API';
import Header from '../component/Header';


const Room=(props)=> {
  const { width, height } = Dimensions.get('screen')
  const [media, setMedia] = useState([])
  const [data, setData] = useState(null)
  const[valueTo,setvalueTo]=useState('')
  const[valueFrom,setvalueFrom]=useState('')

  useEffect(()=>{
      setMedia(props.route.params.media)
  },[])
  
  

  const handelSubmitReserve = async() => {
  
    if (!valueFrom || !valueTo) {
      alert(('Please Fill Date'));
      return;
    }
  
    let to = `${valueTo.getFullYear()}-${valueTo.getMonth()+1}-${valueTo.getDate()}`
    let from = `${valueFrom.getFullYear()}-${valueFrom.getMonth()+1}-${valueFrom.getDate()}`
    let HotelId = props.route.params.HotelId
    let roomId = props.route.params.id

    try{
    let result = await Authaxios.post(`${URL}/hotels/${HotelId}/request`, {from, to, roomId})
    if(result.status=== 201){
      alert('Your request is send')
      
    }
  }catch(e){
    console.warn(e.response.data)
    alert('Error!')
  }
  }


    return (

      <View style={styles.contain}>
      <ScrollView>
         
          {media.map(image=>
          <ImageBackground style={[styles.imgbackground,{ height: height / 3.1 }]}  source={{uri: image}}>  
           <Header />        
          </ImageBackground>)}
      
        <View style={{alignContent:'flex-end',padding:15,}}>
            <Text style={styles.txt}>Room Info</Text>
            <Text style={{fontSize:18,color:'#fff'}}>Number : {props.route.params.number}</Text>
            <Text style={{color:"#fdb827",fontSize:20}}>Price : {props.route.params.price}$ </Text>
            <Text style={styles.txt}>Room characteristics</Text>


            <View style={{flexDirection:'row',justifyContent:"space-between",alignSelf:'flex-end',width:'90%',margin:15,alignItems:'center'}}>
            <Text style={styles.txtroom}>{props.route.params.number}</Text><View style={{marginRight:30}}><FontAwesome5 name='list-ol' color="#fdb827" size={20}></FontAwesome5></View>
            <Text style={{color:'#fff',fontSize:30}}>|</Text>
            <Text style={styles.txtroom}>{props.route.params.bed}</Text><View style={{marginRight:30}}><FontAwesome5 name='bed' color="#fdb827" size={23}></FontAwesome5></View>
            <Text style={{color:'#fff',fontSize:30}}>|</Text>
            <Text style={styles.txtroom}>{props.route.params.food}</Text><View style={{marginRight:30}}><FontAwesome5 name='utensils' color="#fdb827" size={23}></FontAwesome5></View>
            
          </View>

            <Text style={styles.txt}>Duration</Text>
        </View>
              <View style={{flexDirection:'row',alignSelf:'center',paddingVertical:10,}}>
              <DateField
                    labelDate="DD"
                    labelMonth="MM"
                    labelYear= "YYYY"
                    onSubmit={(value) => setvalueFrom(value)}
                    styleInput={styles.styleInput}
                    containerStyle={styles.containerStyle}
                />
                <Text style={{color:'#fff',alignSelf:'center'}}>To</Text>
                  <DateField
                   labelDate="DD"
                   labelMonth="MM"
                   labelYear= "YYYY"
                   onSubmit={(value) => setvalueTo(value)}
                   styleInput={styles.styleInput}
                   containerStyle={styles.containerStyle}
                />
              </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=> handelSubmitReserve()}
                    >
                      <Text style={{textAlign:'center',fontSize:20}}>Reserve</Text>
                  </TouchableOpacity>
                  </ScrollView>
      </View>
    );
  }
  const styles=StyleSheet.create({

    contain:{
        flex:1, 
        backgroundColor:'#000'   
    },
    button:{
      backgroundColor: '#16c79a',
      width:'93%',
      borderRadius: 50,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'center'
    },
      txt:{
        fontSize:25,
        color:'#fff'
      },
      imgbackground: {
       
        justifyContent: 'space-between',
        width: '100%',
       resizeMode: 'cover'
      },
      txtroom:{
        fontSize:19,
        color:'#fff',
        marginHorizontal:15
      },
      styleInput:{
        backgroundColor:'#fff',
        color:'red',
        borderColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        flex:1
  
      },
      containerStyle:{
        backgroundColor:'#fff',
        width:170,
        borderColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        alignSelf:'center',
        marginHorizontal:5
      }
  },)
  export default Room;
import React from 'react'
import  { useState,useEffect } from 'react';
import { ImageBackground, View,TouchableOpacity,Text,ScrollView,StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native' ;
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, { Marker } from 'react-native-maps'
import { URL } from '../API/API'
import StarRating from 'react-native-star-rating';
import Header from '../component/Header';

const{height,width}=Dimensions.get("window")


const Discrption=(props)=>{
  const [liked, setLiked] = useState(false);
  return(
    
    <ScrollView style={{backgroundColor:"#000", width:"100%",}} contentContainerStyle={{alignItems:'center',}}>
       <View style={{width:width/1,flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{marginLeft:5,justifyContent:'center'}}>
        <StarRating
            disabled={true}
            activeOpacity={0.5}
            emptyStar={'star-o'}
            fullStar={'star'}
            halfStar={'star-half-full'}
            iconSet={'FontAwesome'}
            maxStars={5}
            starSize={18}
            rating={props.rate}
            fullStarColor={'#fdb827'}
          />
       
      </View>
      
            <View style={{}}>
              <Text style={{color:"#fff",fontSize:25,textAlign:'center',fontWeight:'bold',marginRight:12}}>{props.title}</Text>
              </View>
        
            <TouchableOpacity onPress={() => setLiked((isLiked) => !isLiked)}>
                <AntDesign
                  name={liked ? "heart" : "hearto"}
                  size={28}
                  color={liked ? "red" : "#fff"}
                />
              </TouchableOpacity>
          
           

          </View>
     
      <Text style={styles.Discrptions}>{props.dis}</Text>
    </ScrollView>
  )}

const Detelis =(props)=>{
  return(
  <ScrollView style={{height:height/3.8,}}>
   <View style={{flexDirection:'row',justifyContent:'space-evenly',borderWidth:0,borderColor:"#fff",width:"100%",alignSelf:'center',padding:2}}>
   <Text style={{color:'#fff',fontSize:25,right:35}}>Tickets</Text>
   
    
      <View style={{width:70,flexDirection:'row',alignItems:'center'}}>
      <ImageBackground
        resizeMode='cover'
        source={require('../pic/egypt.png')}
        style={{width:30,height:30,marginRight:6}}>

        </ImageBackground>
        <Text style={{color: 'white',fontSize:18,}}>: {props.ticket.egyptian.price} EGP</Text>
      </View>
    
     <View style={{width:70,flexDirection:'row',alignItems:'center'}}>
     <ImageBackground
        resizeMode='cover'
        source={require('../pic/globe.png')}
        style={{width:30,height:30,marginRight:6}}>

        </ImageBackground>
     <Text style={{color: 'white',fontSize:18}}>: {props.ticket.foreign.price} USD</Text>
     </View>
  
   </View>

   <Text style={{color:'#fff',fontSize:25,marginLeft:10}}>TimeTable</Text>
   <View>
     {props.hours && props.hours.map(h=>
     <Text style={styles.timetable}> {h.day} from <Text style={{color:"#fdb827"}}>{h.from}</Text> to <Text style={{color:'#fdb827'}}>{h.to}</Text></Text>)}
   </View>
  
  
  </ScrollView>
  )}
   
const Location=(props)=>{
  if(props.lat)
  return(
    
    <View style={styles.MapView}>
    <MapView
      style={styles.map} 
      showsCompass={true}
      toolbarEnabled={false}
      scrollEnabled={false}
      region={{
      latitude: props.lat ,
      longitude: props.long ,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.033,
   }}
   moveOnMarkerPress={false}
 > 
 <Marker
      coordinate={{ 
      latitude:props.lat ,
      longitude:props.long ,
      }} 
      title='Hi'
      description='lets go to this place'
      opacity={1}
      style={{backgroundColor: 'red', width: 10, height: 10}}

     />
 </MapView>
 </View>
  )
  else return <View />
  
}  

  const Rate=(props)=>{


  return(
   <View style={styles.RateBox}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:"100%", padding: 15}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
             <Image source={{uri: props.reviews.length > 0 && props.reviews[0].user.picture}} style={{width:60,height:60,borderRadius:30,}}/>
             <Text style={{color:'#fff', marginLeft: 5}}>{props.reviews.length > 0 && props.reviews[0].user.name}</Text>
          </View>
          <View style={{alignSelf:'center',}}>
          <StarRating
            disabled={false}
            activeOpacity={0.5}
            emptyStar={'star-o'}
            fullStar={'star'}
            halfStar={'star-half-full'}
            iconSet={'FontAwesome'}
            maxStars={5}
            starSize={20}
            rating={props.reviews.length > 0 && props.reviews[0].rate}
            fullStarColor={'#fdb827'}
          />
           </View>
      </View>
      <View>
           <Text style={{color: 'white', fontSize: 18}}>"{props.reviews.length > 0 && props.reviews[0].comment}"</Text>
      </View>
   </View>
  )}

export default function Place (props){

      const [ place, setPlace ] = useState(null)
      const [ loading, setLoading ] = useState(true)
     
     useEffect(()=>{

      async function getPlace(){

        try{
        const id = props.route.params.Place.id
        const result = await fetch(`${URL}/places/${id}`)
        if(result.status === 200){
        const jsonData = await result.json()
        setPlace(jsonData.place)
        }else return
        }catch(e){
         return
        }
        setLoading(false)
      }
 
      getPlace()

     }, [])


    if(loading)return <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color='white' size={25}/></View>
    else
    return(

       <View style={styles.Container}> 
         <ScrollView>
            <ImageBackground style={styles.imgbackground} source={{uri: place && place.media[0] }}>
             <Header />
            </ImageBackground>
            <Discrption title={ place && place.name} dis={place && place.description}   rate={place && place.rate}/>
            <Detelis hours={place && place.hours} ticket={place && place.ticket} />
            <Location  lat={place && place.location.coordinates[0]}long={place && place.location.coordinates[1]} />

             <View style={{height:50,flexDirection:'row',justifyContent:'space-between',padding:12}}>
               <View style={{width:60,}}>
                 <Text style={{color:'#fdb827',fontSize:25,fontWeight:"bold"}}>Rate</Text>
               </View> 
              <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> place && props.navigation.navigate('Review',{ questions: place.questions, id: place.id})}
                    >
                    <Text style={styles.txt}>Add Review</Text>
                </TouchableOpacity>
                </View>
             </View>
            <Rate rate={place && place.rate} reviews={place && place.reviews} />
          
         </ScrollView>
                  
        </View>
    )
    }
  

    const styles=StyleSheet.create({
      Container:{
         flex:1, 
         backgroundColor:'#000',
      },
      imgbackground:{
         height:  height / 3.2,
         flexDirection: 'column',
         justifyContent: 'space-between',
         paddingBottom: 12, width: '100%',
         resizeMode: 'cover'
      },
      MapView:{
      
        width:'90%',
        alignSelf:'center',
        height:height/4
   },
       map:{
        alignItems:'center',
        width:"100%",
        height:height/4
        
   },
      RateBox:{
        width:'90%',
        height:height/5
        ,borderRadius:25,
        borderColor:"#fff",
        borderWidth:2,
        alignSelf:'center',
        alignItems: 'center'
   },
      button:{
        backgroundColor:'#16c79a',
        width:120,
        borderRadius:30,
        height:30,
        alignItems:'center',
        justifyContent:'center'

   },
      txt:{
        fontWeight:'bold',
        fontSize:18,
        color:'#fff',
   },
      timetable:{
        color: 'white',
        textTransform:'capitalize',
        textDecorationLine:'underline',
        paddingLeft:10,
      },
      Discrptions:{
        width: '100%',
        backgroundColor: '#000',
        color:'#fff',
        padding:5,
        textTransform:"lowercase",
        fontStyle:'italic',
        fontSize:17
   }
    })
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Button,
    FlatList,
    Alert,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native'
import Modal from 'react-native-modal'
import firebase from '../firebase/firebase.js';

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postContent:'',
            post:[],
            modalVisible:false,
            
        }
        this.itemsRef = firebase.database().ref().child('products');
    }
    _showDialog = () => {
        this.setState({modalVisible: true})
    }
    _hideDialog = () => {
        this.setState({modalVisible: false})
    }
    _post = () => {
        this.setState({modalVisible:true})
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let item = {
                    key:(child.key),
                    name:child.val().name,
                    price: child.val().price,
                    info: child.val().info
                }
                items.push(item);
            });


            this.setState({
                post: items
            });
            this.state.post.map((item, idx) =>{
                console.log(item.key)
            })

        });
    }
   
    _delete(key){
        firebase.database().ref().child('products').child(key).remove()
    }

    _edit(key){
        firebase.database().ref().child('products').child(key).set({
            name:'post',
            price:'200',
            info:'da update'
        })
        
    }

    componentDidMount (){
        this.listenForItems(this.itemsRef)
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Modal
                    isVisible={this.state.modalVisible}
                    onBackButtonPress={this._hideDialog}
                    onBackdropPress={this._hideDialog}>
                    <InsertProduct/>
                </Modal>
                <View style={styles.postStatus}>
                    <Button
                        onPress={()=>{
                            this._showDialog()
                        }}
                        title='Insert Product'/>
                </View>
                <FlatList
                    data={this.state.post}
                    
                    renderItem={({item}) => 
                    <View style={styles.postContainer}>
                        <Text> {item.name} - {item.price} - {item.info} </Text> 
                        <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:3
                                    }}
                                    onPress={()=>{
                                        this._delete(item.key)
                                    }}>
                                    <Text>Delete</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:50
                                    }}
                                    onPress={()=>{
                                        this._edit(item.key)
                                    }}>
                                    
                                    <Text>Update</Text>
                        </TouchableOpacity>
                    </View>
                
                
                    }
                />
                
            </View>
        )
 
    }
}


    const {width, height} = Dimensions.get('window')
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        },
        postStatus:{
            backgroundColor:'#f2f2f2'
        },
        postContainer:{
            backgroundColor:'#f1f1f1',
            margin:width*3.6/187.5,
            padding:width*3.6/187.5,
            borderRadius: width*3.6/187.5,
        },
        nameAuth:{
            color:'#000',
            fontSize:16
        },
        postText:{
            color:'#000',
            // backgroundColor:'#fff',
            padding:width*3.6/187.5
        },

    })

    



    export class InsertProduct extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:'',
                price:'',
                info:''
            }
        }
        _post = () =>{
            console.log('post' ,new Date().getTime())
            firebase.database().ref().child('products').push({

                name:this.state.name,
                price:this.state.price,
                info:this.state.info,
            })
        }

        render(){
            return(
                <View style={{
                    width: width*167.5/187.5,

                    backgroundColor:'#fff',
                    padding:width*5/187.5
                }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Tên sản Phẩm:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({name:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Giá:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({price:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Mô tả:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({info:value})}}
                        />
                    </View>

                    <View style={{flexDirection:'row', margintop:width*3.6/187.5, alignItems:'center',justifyContent:'center'}}>

                        <Button style={{width:width*80/187.5}} title='Save' onPress={()=>{this._post()}}/>
                    </View>
                </View>
            )
        }
    }

    export class UpdateProduct extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:'test',
                price:'Test',
                info:'test'
            }
        }
        _edit(key) {
            
            firebase.database().ref().child('products').child(key).set({

                name:this.state.name,
                price:this.state.price,
                info:this.state.info,
            })
        }

        render(){
            return(
                <View style={{
                    width: width*167.5/187.5,

                    backgroundColor:'#fff',
                    padding:width*5/187.5
                }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Tên sản Phẩm: </Text>
                        <TextInput
                            style={{flex:1}}
                            value='test'
                            onChangeText={(value)=>{this.setState({name:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Giá: </Text>
                        <TextInput
                            style={{flex:1}}
                            value={this.state.price}
                            onChangeText={(value)=>{this.setState({price:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Mô tả: </Text>
                        <TextInput
                            value={this.state.info}
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({info:value})}}
                        />
                    </View>

                    <View style={{flexDirection:'row', margintop:width*3.6/187.5, alignItems:'center',justifyContent:'center'}}>

                        <Button style={{width:width*80/187.5}} title='Submit' onPress={()=>{this._edit(item.key)}}/>
                    </View>
                </View>
            )
        }
    }

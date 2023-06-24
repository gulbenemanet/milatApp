import React, {useState} from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    KeyboardAvoidingView,
    View,
    TextInput,
    Button,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client'
export default class App extends React.Component {
    //const [modalVisible, setModalVisible] = useState(false);
    //const [text, setText] = useState("");
    state={
        dolarRate: null,
        koridor1: null,
        koridor2: null,
        alan1: null,
        alan2: null,
        isModalVisible: false,
        isVisible: false
    }
    displayModal(show){
        this.setState({isModalVisible : show})
    }    
    displayModalAlert(show){
        this.setState({isVisible : show})
    }
    constructor(){
        super();                    
        this.socket = io("ws://127.0.0.1:5000", {
            transports: ['websocket'],
            jsonp: false
        });
        this.socket.on('connect', () => {
            console.log("sockete bağlandı");
        })
        this.socket.on('update', (response) => {
            this.setState({dolarRate: response.data.dolarRate})
        })        
        // this.socket.send(JSON.stringify({
        //     type: "hello from react native",
        //     content: [1, "2"]
        // }));
        this.socket.on('connect_error', (error) => {
            console.log("hata");
            console.log(error.message);
        })
    } 

    render() {
        return(
            <KeyboardAvoidingView       
            enableResetScrollToCoords={false}
            bounces={false}
            contentInsetAdjustmentBehavior="always"
            overScrollMode="always"
            showsVerticalScrollIndicator={true} 
            enableOnAndroid={true} style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}}>
                <ScrollView>
                    <View style={{backgroundColor: '#DFDEBA', height: Dimensions.get("window").height, flex:1, justifyContent: 'center', alignItems:'center'}}>
                        <Image source={require('./assets/milatyenia.jpg')} style={styles.milatLogo} />
                        <Image source={require('./assets/daire.jpg')} style={styles.daire} />
                        {/* <Text style={styles.texts}>Koridor</Text>  */}
                        <TextInput
                            editable = {true}
                            multiline
                            numberOfLines={2}
                            maxLength={40}
                            placeholder="ALAN 1"
                            placeholderTextColor="#23AEE3"
                            style={styles.textInputs}
                            onChangeText={koridor1 => this.setState({koridor1: koridor1})}
                            value={this.state.koridor1}
                        />
                        {/* <Text style={styles.texts}>Alan</Text> */}
                        <TextInput
                            editable = {true}
                            multiline
                            numberOfLines={2}
                            maxLength={40}
                            placeholder="KORİDOR 1"
                            placeholderTextColor="#23AEE3"
                            style={styles.textInputs}
                            onChangeText={alan1 => this.setState({alan1: alan1})}
                            value={this.state.alan1}
                        />
                        {/* <Text style={styles.texts}>Koridor</Text> */}
                        <TextInput
                            editable = {true}
                            multiline
                            numberOfLines={2}
                            maxLength={40}
                            placeholder="ALAN 2"
                            placeholderTextColor="#23AEE3"
                            style={styles.textInputs}
                            onChangeText={koridor2 => this.setState({koridor2: koridor2})}
                            value={this.state.koridor2}
                        />
                        {/* <Text style={styles.texts}>Alan 2</Text> */}
                        <TextInput
                            editable = {true}
                            multiline
                            numberOfLines={2}
                            maxLength={40}
                            placeholder="KORİDOR 2"
                            placeholderTextColor="#23AEE3"
                            style={styles.textInputs}
                            onChangeText={alan2 => this.setState({alan2: alan2})}
                            value={this.state.alan2}
                        />
                        <TouchableOpacity activeOpacity={1} style={styles.btnSubmit} onPress={() => {    
                            if ((this.state.koridor1 != null) && (this.state.alan1 != null) && (this.state.koridor2 != null) && (this.state.alan2 != null)) {
                                this.socket.send("koridor1: " + this.state.koridor1 + "\n" + "alan1: " + this.state.alan1 + "\n" + "koridor2: " + this.state.koridor2 + "\n" + "alan2: " + this.state.alan2 );
                                this.setState({koridor1: null});                        
                                this.setState({alan1: null});
                                this.setState({koridor2: null});
                                this.setState({alan2: null});
                                //alert('bilgiler gönderildi.')
                                this.displayModal(true);
                            }  else {
                                this.displayModalAlert(true);
                            }}}>
                            <Text style={styles.btnText}>Gönder</Text>
                        </TouchableOpacity>
                        <Modal visible={this.state.isModalVisible} animationType = {"slide"} transparent={true}             
                        onRequestClose={() => { alert('Modal has now been closed.')
                        this.displayModal(!this.state.isModalVisible)}}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                <Text style={styles.modalText}>Koordinat bilgileri araca gönderilmiştir!</Text>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => this.displayModal(!this.state.isModalVisible)}>
                                    <Text style={styles.modalTextBtn}>Kapat</Text>
                                </Pressable>
                                </View>
                            </View>
                        </Modal>                        
                        <Modal visible={this.state.isVisible} animationType = {"slide"} transparent={true}             
                        onRequestClose={() => { alert('Modal has now been closed.')
                        this.displayModal(!this.state.isVisible)}}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                <Text style={styles.modalText}>Lütfen bütün alanları doldurun.</Text>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => this.displayModalAlert(!this.state.isVisible)}>
                                    <Text style={styles.modalTextBtn}>Kapat</Text>
                                </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.icons}>
                            <Image source={require('./assets/müh-fak.jpg')} style={styles.müh_fak} />
                            <Image source={require('./assets/milat1453.jpg')} style={styles.milat1453} />                         
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

}    
const styles = StyleSheet.create({
    closeText: {
        fontSize: 24,
        color: '#00479e',
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center',    
    },  
    buttonModal: {
        width: 150,
        height: 50,
        backgroundColor: '#23AEE3',
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center', 
        borderRadius: 50,
        elevation: 2,
    },    
    modalText: {
        fontSize: 20,
        color: '#00479e',
        textAlign: 'center',
        padding: 15
    },  
    modalTextBtn: {
        color:"#C1E3ED",
        fontSize: 25,
        zIndex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#DFDEBA',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInputs: {
        backgroundColor: "#C1E3ED",
        width: 360,
        padding: 15,
        marginBottom: 30,
        zIndex: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 18,
        borderWidth: 0,
        fontSize: 16,
        zIndex: 1
    },
    texts: {
        // backgroundColor: "purple",
        width: "80%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color:  "purple",
        zIndex: 1,
    },
    milatLogo: {
        zIndex: 1,
        width: 100,
        height:100,
        marginTop: 20,
        marginBottom: 80,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center', 
    },
    daire: {
        width: 350,
        height: 458,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center', 
        position: 'absolute'
    },
    btnSubmit: {
        marginTop: 35,
        width: 200,
        height: 50,
        backgroundColor: '#23AEE3',
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        alignContent: 'center', 
        borderRadius: 50,
        elevation: 2,
    },
    müh_fak: {
        width: 75,
        height: 75 ,
    },
    milat1453: {
        alignSelf: 'flex-end',
        alignItems:'flex-start',
        width: 150,
        height: 70,
        flex: 1,
        zIndex: 1,
    },
    btnText: {
        color:"#C1E3ED",
        fontSize: 25,
        zIndex: 1
    },
    icons: {
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "row",
        margin: 10,
        marginLeft: 75
    }
})
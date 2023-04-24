
import { StyleSheet, Text, View, FlatList, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button } from '@rneui/base';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Header } from '@rneui/base';
import { Card, LinearProgress, BottomSheet, Input } from '@rneui/themed';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// function components for the study screen 
// accept route params that are a title and cards (terms and defintions)
// renders a card elemtn using text with three button elements 
function StudyScreen ({route}) {
  // defines route parmas 
  const { title, cards} = route.params.studyCards
  
  // useState for the progress bar 
  let [progress, setProgress] = useState(0)
  // useState for the index of which object in the cards array you are in
  let [index, setIndex] = useState(0)
  // useState for visibility of the bottomsheet
  let [isVisible, setIsVisible] = useState(false)
  // useState fot the card showing term of definition
  let [card, setCard] = useState(false)

  // arrow function for increasing the state of the progress bar
  const increaseIndex = () => {
    setProgress(progress + .50)
    if (cards.length-1 === index ) {
      setIndex(0)
    } else {
     setIndex(index + 1) 
    }
  }
  // arrow function for decreasing the state of the progress bar
  const decreaseIndex = () => {
    setProgress(progress - .50)
    if (index === 0) {
      setIndex(cards.length-1)
    }else {
      setIndex(index - 1)
    }
    
  }
  // callback function used to set the state of the card showing the term or definition
  let termDef = useCallback(() => {
    setCard(!card)
  }, [card])

  return (
    <View>
      <Header leftComponent={{ text: title, style: {color: "#fff", fontSize: 15} }} rightComponent={{text: `Terms: ${cards.length}`, style: {color: "#fff", fontSize: 15}}}/>
      <Text style={styles.terms} >Terms: {index+1} / {cards.length}</Text>
      <LinearProgress value={progress} variant="determinate" color='#5599FF'/>
      <Card containerStyle={{backgroundColor: "#FFD3AB", padding: 20, margin: 20}} >
        <Card.Title h1 style={{ color: "black" }}>{card ? cards[index].definition : cards[index].term }</Card.Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button type='clear' icon={() => (
              <MaterialCommunityIcons name="arrow-left" color={"#FD8C24"} size={30}  />) }
              onPress={decreaseIndex}>
          </Button>
          <Button type='clear' icon={() => (
              <MaterialCommunityIcons name="arrow-u-right-bottom" color={"#FD8C24"} size={30} />) }
              onPress={termDef}>
          </Button>
          <Button type='clear' icon={() => (
              <MaterialCommunityIcons name="arrow-right" color={"#FD8C24"} size={30}  />) }
              onPress={increaseIndex}>
          </Button>
        </View>
      </Card>
      <Button buttonStyle={{width:237, alignSelf:"center", padding: 10, marginTop: 40, borderRadius: 10}} type='solid' title={"View List"} onPress={() => setIsVisible(true)}/>
      <BottomSheet isVisible={isVisible}>
        <View style={{backgroundColor: "#5599FF", borderTopLeftRadius: 10, borderTopRightRadius: 10}} >
          <Text style={styles.sheet} >{title}</Text>
          {cards.map((card, index) => (
            <View key={index}>
              <Text style={styles.sheetList} >{card.term} : {card.definition}</Text>
            </View>
          ))}
          <Button buttonStyle={{width:237, alignSelf:"center", padding: 10, margin: 40, borderRadius: 10, backgroundColor: "#287EFF"}} title={"Close"} onPress={() => setIsVisible(false)}/>
        </View>
      </BottomSheet>
    </View>
  )
}

// function component fot he AddScreen 
// accepts navigation and route paramerters
// accepts text input from the user and a list of study cards(route params) adds user input to the initial list
function AddScreen ({navigation, route}) {
  // defines route params
  let { studyCards } = route.params

  // useState for value of the input labeled title
  const [title, setTitle] = useState("")
  // useState for the number of card elements visible on the screen
  const [numCards, setNumCards] = useState(1)
  // useState for value of the input in the card element labeled term and definition, is an array of objects
  const [cardsData, setCardsData] = useState([{ term: '', definition: '' }])

  // arrow function called when the add card button is pressed and increases the state of the number of cards and adds an object into the state of cardsData
  const handleAddCard = () => {
    setNumCards(numCards + 1)
    setCardsData([...cardsData, { term: '', definition: '' }])
  }
  // arrow funciton that acceots the index and the value and changes the value of the term paramter in the object of the cardsData array based on the index of the card.
  const handleTermChange = (index, value) => {
    const updatedCardsData = [...cardsData]
    updatedCardsData[index].term = value
    setCardsData(updatedCardsData)
  }
  // arrow funciton that acceots the index and the value and changes the value of the definition paramter in the object of the cardsData array based on the index of the card.
  const handleDefinitionChange = (index, value) => {
    const updatedCardsData = [...cardsData]
    updatedCardsData[index].definition = value
    setCardsData(updatedCardsData)
  }
  // arrow function that defines a constant variable data that is an object with title and cards, pushs data into the studyCards arrow and navigates to the cards screen 
  // called when the save button is pressed
  const handleSave = () => {
    const data = {
      title: title,
      cards: cardsData
    }
    studyCards.push(data)
    console.log(studyCards);
    navigation.navigate("Cards",{
      studyCards: studyCards
    })
  }
  // arrow function thats called when the cancel button is pressed sets the states back to the original state, setTitlle and setCards data does not work
  const handleCancel = () => {
    setTitle('')
    setCardsData([{ term: '', definition: '' }])
    setNumCards(1)
  }
  return(
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 10}} contentContainerStyle={{minHeight: '100%'}} >
        <Input labelStyle={styles.label} label="Title: " placeholder="Plants" onChangeText={(value) => setTitle(value)}/>
      {[...Array(numCards)].map((_, index) => (
        <Card  key={index}>
          <View>
            <Input labelStyle={styles.label} label="Term: " placeholder="Aloe" onChangeText={(value) => handleTermChange(index, value)} />
            <Input labelStyle={styles.label} label="Definition: " placeholder="A soothing plant" onChangeText={(value) => handleDefinitionChange(index, value)} />
          </View>
        </Card>
      ))}
      <Button type='outline' titleStyle={{color: "#287EFF"}} buttonStyle={{width:237, alignSelf:"center", padding: 10, margin: 40, borderRadius: 10, borderColor:"#287EFF"}} title={"Add Card"} onPress={handleAddCard} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button type='clear' titleStyle={{textDecorationLine: "underline", textDecorationColor: "#287EFF", color: "#287EFF"}} buttonStyle={{width:138, color: "#287EFF"}} title={"Cancel"} onPress={handleCancel} />
        <Button buttonStyle={{width:138, backgroundColor:"#287EFF", borderRadius: 10}} title={"Save"} onPress={handleSave} />
      </View>
      
      </ScrollView>
    </SafeAreaView>
  )
}


// component function for the card screen
// accepts navigation and route params 
// accepts a list of studycards and renders them on a screen as buttons using a flatlist 
function CardScreen ({route, navigation}) {
  // defines the studyCards params which is an array of objects 
  const  { studyCards } = route.params
  // item is an arrow function that is rendered by a flatlist that accepts an item(single object) fron the data studyCards 
  // allows for the display of button tiles for each item and has the funciton of navigating the study screen when pressed
  const Item = ({item}) => (
    <View style={styles.item}>
      <Button
       title={item.title}
       titleStyle={{color: 'black'}} 
       buttonStyle={styles.button}
       onPress={() => {
        navigation.navigate("Study",{
          studyCards: {
            title: item.title,
            cards: item.cards
          } 
        }
      )}}
      ></Button>
    </View>
  )

  return (
    <View>
      <Text style={styles.yourCards} >Your Cards:</Text>
      <FlatList 
      data={studyCards}
      renderItem={Item}
      numColumns={2}
      keyExtractor={(item) => item.title}
      />
  
    </View>
    
  )
}

// a fucntion component that has the inital data set studyCards and contains the nested tab navigation 
function Initial() {
  const studyCards = [
    {
      "title": "Spanish",
      "cards": [
        {
          "term": "Yo",
          "definition" : "I"
        },
        {
          "term" : "Tu",
          "definition" : "You"
        }
      ]
    },
    {
      "title": "Emotions",
      "cards": [
        {
          "term": "happy",
          "definition" : "feeling or showing pleasure or contentment"
        },
        {
          "term" : "sad",
          "definition" : "feeling or showing sorrow"
        }
      ]
    }
  ]
  return (
    <Tab.Navigator initialRouteName='Cards' screenOptions={{ tabBarActiveTintColor: '#5599FF', headerStyle: {backgroundColor: "#5599FF"}, headerTintColor: '#fff'}}>
          <Tab.Screen
            name="Cards"
            component={CardScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )
            }}
            initialParams={{studyCards: studyCards}}
          />
          <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
              tabBarLabel: 'Add',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="card-plus" color={color} size={size} />
              )
            }}
            initialParams={{studyCards: studyCards}}
          />
      </Tab.Navigator>
  );
}

// exports all the the components of the app and returns the stack navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }}/>
        <Stack.Screen name="Study" component={StudyScreen} options={{ title:"", headerStyle: {backgroundColor: "#FFF"}}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// constant vaiable that holds styles created by styleSheet
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    alignItems: "center"
  },
  button: {
    backgroundColor: "#FFC086",
    width: 164,
    height: 164,
    borderRadius: 10
  },
  yourCards: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold"
  },
  terms: {
    textAlign: "center",
    padding: 10,
    fontSize: 20
  },
  view: {
    backgroundColor: "#287EFF",
    width: 237,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    padding: 30
  },
  sheet: {
    backgroundColor: "#287EFF",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  sheetList: {
    textAlign: "center",
    color: "#fff",
    margin: 10,
    textDecorationLine: "underline",
    textDecorationColor: "#287EFF",
    padding:10
  },
  label: {
    color: "black"
  }
});

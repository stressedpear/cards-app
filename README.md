DIG4639C-portfolio-project

Link to github pages:


Mobile development final project

Description: 
I chose option 2: new project, 3 components for my portfolio project. I would like to create a new project that takes inspiration from our exercise 9: design a flash card app. For this exercise we designed the app but did not implement in React Native. The application will allow users to create and view study card decks. There will be three screens home, add, and study that will be organized by using the Bottom Tabs and Stack collections form React Navigation.

Navigation: 
For this project I will be using nested react native navigators. These navigators include tab and stack. The initial screen will be a home screen that include the decks of card that the user has created. When one of the decks are pressed then a new stack screen will push in that allows the user to study the cards. The user can get back to the home screen by clicking a back arrow. Included on the home screen is tab navigation with a house icon for home and a plus icon for the add screen. On the add screen the save button that will add a new deck to the home screen.

Screens and Components: Core Components:

• View 
• StyleSheet 
• Text 
• Icon(new) 
• Header (new)

Home screen: 
Description: The home screen accepts a list of study cards and renders them on the screen as tiles using a FlatList. When a Tile is pressed then a the Study screen will push in using the navigation. This screen includes a header comprised of leftComponent equal to text “Cards”. There will also be a bottom tab that includes the two icons home and add. 
Components:
• Tile 
• Flatlist

Add screen:
Description: The add screen will accept text input from a user and a list of study cards. The list of study cards will not be rendered but used as a state. This state will be changed by adding the users textInput to the end of the list when the user presses the save button. The Add Card button when pressed will add a term and a definition TextInput Tile that the user can fill out. This will be accomplished by using useState that keeps track of the amount of Tile elements on the screen. The cancel button will reset the screen using useState that will set the input to “” and Tile element state to 1 when pressed. This screen includes a header comprised of leftComponent equal to text “Create a new deck” and a bottom tab that includes the two icons home and add. Components:
• TextInput 
• Button 
• FlatList

Study screen:
Description: The study screen will accept a list of terms and definitions according to the title of the deck. These terms and definitions will be rendered in a Card element using Text. This Card will have three button elements. One located in the middle under the text works as a toggle that changes between a term and definition being shown on the state. And two buttons on the left and right that “changes” the card by showing the next term in the list based on the index of the term. The top of the screen will comprise of two headers one that holds the back Button that navigates back to the home screen and one that has the title of the list of terms and the amount of terms in the deck. Under that is Text and a process bar that tells the user how many terms they have studied. The progress of the bar is set based on the arrows on either side of the term Cards. The bottom the screen displays a view list button. When this button is pressed then a BottomSheet is displayed that shows all the terms and definitions that the screen accepted through a route. A button is also on the BottomSheet that sets the visibility of the screen to false.
Components: 
• Card (new) 
• Bottom Sheet(new) 
• Linear Progress (new)
# cards-gh-pages

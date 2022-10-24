# Tinder Clone - A work of Haris Javed

This project is an upgraded and enhanced version of the one created by Sonny Sangha in a tutorial on his YouTube channel (https://www.youtube.com/c/SonnySangha).
Try out the project for yourself: https://bit.ly/3rkEURr (Currently only for Android).

## Project Details

### Tech Stack:
React Native with Expo CLI, Tailwind CSS, Firebase
<p align="left">
<a href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207" alt="react_native" width="50" height="40"/> </a><a href="https://expo.dev/" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/72334266/197482778-b0d54063-286e-4369-a11e-e22eac39e4f2.svg" alt="expo_cli" width="40" height="40"/> </a><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/72334266/197483264-965d93cb-c811-4745-b7a1-e3c4bdd4fa78.svg" alt="tailwind" width="40" height="40"/> </a><a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a></p>



### Description:

This application emulates the working and functionalities of the dating app Tinder, complete with a matching algorithm and a real-time chat system to facilitate communication between a match of two people. After a user has signed in using Google, they will be asked to create a profile. Once their profile is ready, they are ready to swipe on! A stack of cards showcasing the existing users will be displayed to which a user can have two reactions - MATCH or PASS. A MATCH indicates that the user likes the profile they see and can be achieved by swiping right on the card or pressing the green heart icon at the bottom. If the user does not like what they see, they can just PASS on the profile by swiping left or pressing the red cross button below. If the user matches with a profile that has already matched with them, they will be greeted with a "It's a Match!" screen and the matched users can now have a chat in the chat section. A drawer may be extended by swiping right from the top left portion of the screen or by pressing the user's profile image from Google. This drawer has the options to return to home, update the profile, check the about section or sign out.

The project uses Firebase as its backend and employs the Firestore Database (to store user profiles) and Authentication (for user authentication via Google oAuth Sign-In).

## Screenshots

Splash Screen             |  Login Screen             |   Profile Creation Screen
:-------------------------:|:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/72334266/145680399-9bbe9f19-b54b-4d68-849c-a2243b71c5a8.png)  |  ![](https://user-images.githubusercontent.com/72334266/145680407-b7bd9a55-ea21-4b78-ae7f-3c886e2fc678.png)  |  ![](https://user-images.githubusercontent.com/72334266/145680564-6a6f0787-92c0-4ba5-8332-014d8c88e7be.png)

Home Screen             |  Chat Screen             |   Drawer Screen
:-------------------------:|:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/72334266/145681213-48e05771-db4d-4836-9ff1-996673757787.png)  |  ![](https://user-images.githubusercontent.com/72334266/145681225-797267f8-dc32-4c73-a5ba-0f0a43610b15.png)  |  ![](https://user-images.githubusercontent.com/72334266/145681246-24a950b6-3926-4eef-8276-3f7afb69043e.png)

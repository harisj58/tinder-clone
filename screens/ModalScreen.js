import { doc, onSnapshot, serverTimestamp, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-rn";
import Header from "../components/Header";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [profileCreated, setProfileCreated] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Complete Your Profile");
  const [buttonTitle, setButtonTitle] = useState("Complete Profile");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const timestamp = new Date().toISOString();
    const filename = user.displayName + timestamp;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setTransferred(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setUploading(false);
        Alert.alert(
          "Image Upload Unsuccessful",
          "Please try uploading the profile image again."
        );
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        setUploading(false);
        Alert.alert("Image Upload Successful");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const incompleteForm = !image || !job || !age;

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (snapshot.exists()) {
          setImage(
            snapshot._document.data.value.mapValue.fields.photoURl.stringValue
          );
          setJob(snapshot._document.data.value.mapValue.fields.job.stringValue);
          setAge(snapshot._document.data.value.mapValue.fields.age.stringValue);
          setProfileCreated(true);
          setHeaderTitle("Update Your Profile");
          setButtonTitle("Update Profile");
        }
      }),
    []
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (profileCreated) return;
        e.preventDefault();
        Alert.alert(
          "Process Incomplete",
          "Please complete your profile to proceed further."
        );
      }),
    [navigation, profileCreated]
  );

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURl: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={tw("flex-1")}>
      <Header title={headerTitle} />
      <ScrollView>
        <View style={tw("items-center pt-1")}>
          <Image
            style={tw("h-20 w-full")}
            resizeMode="contain"
            source={require("../assets/logoWithText.png")}
          />
          <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
            Welcome, {user.displayName}!
          </Text>
          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 1: The Profile Pic
          </Text>
          <TouchableOpacity style={[styles.selectButton]} onPress={selectImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{ uri: image }} style={styles.imageBox} />
          ) : null}
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={tw("flex-1 items-center pt-1 pb-20")}>
          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 2: The Job
          </Text>
          <TextInput
            value={job}
            onChangeText={setJob}
            style={tw("text-center text-xl pb-2")}
            placeholder="Enter your occupation"
          />
          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 3: The Age
          </Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={tw("text-center text-xl pb-3")}
            placeholder="Enter your age"
            maxLength={2}
            keyboardType="numeric"
          />
        </View>

        <View style={tw("flex-1 items-center  pt-1 mb-10")}>
          <TouchableOpacity
            disabled={incompleteForm}
            style={[
              tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-red-400"),
              incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
            ]}
            onPress={updateUserProfile}
          >
            <Text style={tw("text-center text-white text-xl")}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#bbded6",
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#FF5864",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});

export default ModalScreen;

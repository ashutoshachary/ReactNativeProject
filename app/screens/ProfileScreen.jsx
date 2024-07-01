import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  const route = useRoute();
  const { ChangeHandler, userProfileData  } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (value) => {
        setSelectedGender(value);
      };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>
          <FontAwesome name='gear' size={30} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <Image
           source={{ uri: userProfileData?.image }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfileData?.username}</Text>
        <Text style={styles.email}>{userProfileData?.email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItems}>
        
        <TouchableOpacity  style={styles.menuItem} onPress={()=>{

        }}>
            <Text style={styles.menuItemText}>Favourites</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Downloads</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Language</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Location</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Display</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Feed preference</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Subscription</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem}>
            <Text style={styles.menuItemText}>Clear Cache</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuItem} onPress={()=>{

          }}>
            <Text style={styles.menuItemText}>Clear history</Text>
            <Text style={styles.menuItemArrow}><AntDesign name="right" size={24} color="black" /></Text>
          </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={() => ChangeHandler()}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Text style={styles.menuItemArrow}> <FontAwesome name="sign-out" size={24} color="#000" /></Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.versionText}>App version 60.3</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.headerIcon}><FontAwesome name='arrow-circle-left' size={30} color="black" /></Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.headerIcon}><FontAwesome name='check-circle-o' size={30} color="green" /></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: userProfileData?.image }}
                style={styles.modalProfileImage}
              />
              <TouchableOpacity style={styles.cameraIcon}>
                <Text><FontAwesome name='camera' size={30} color="black" /></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.formLabel}>Your Information</Text>
              <TextInput style={styles.input} placeholder="First name" />
              <TextInput style={styles.input} placeholder="Last name" />
              <View style={styles.phoneInput}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput style={styles.phoneNumber}  keyboardType="phone-pad" placeholder="Enter Your Number"/>
              </View>
              <TextInput style={styles.input} placeholder="Email id" keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Address" />
              <Picker
        selectedValue={selectedGender}
        onValueChange={handleGenderChange}
        style={styles.input}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
        
      </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    borderBlockColor:'#dbdbdb',
    borderWidth:1,
    height: 40,
    borderRadius:5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: 24,
  },
  profileInfo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#888',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItems: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 20,
    fontWeight:'bold',
  },
  menuItemArrow: {
    color: '#888',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: 'red',
    fontSize: 20,
    fontWeight:'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    backgroundColor: '#fff',
   
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
  },
  form: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  countryCode: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  phoneNumber: {
    flex: 1,
    padding: 10,
  },
  genderDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
});

export default ProfileScreen;




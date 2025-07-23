import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Sanju',
    lastName: 'Patel',
    email: 'Sanju123@gmail.com',
    phone: '+91 9878674567',
    relationship: 'Parents',
  });

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const getInputStyle = (field: string, full: boolean = false) => {
    return [
      full ? styles.inputFull : styles.input,
      focusedInput === field && { borderColor: '#2c3e94' },
    ];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          isCardFocused && {
            borderColor: '#2c82f8',
            shadowColor: '#2c82f8',
            shadowOpacity: 0.4,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 0 },
            elevation: 6,
          },
        ]}
        onTouchStart={() => setIsCardFocused(true)}
        onTouchEnd={() => setIsCardFocused(false)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Details</Text>
          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.editBtn}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <>
            <View style={styles.inputRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={getInputStyle('firstName')}
                  placeholder="Enter first name"
                  placeholderTextColor="#A9A9A9"
                  value={profile.firstName}
                  onChangeText={text => handleChange('firstName', text)}
                  onFocus={() => setFocusedInput('firstName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={getInputStyle('lastName')}
                  placeholder="Enter last name"
                  placeholderTextColor="#A9A9A9"
                  value={profile.lastName}
                  onChangeText={text => handleChange('lastName', text)}
                  onFocus={() => setFocusedInput('lastName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={getInputStyle('email', true)}
              placeholder="Enter email address"
              placeholderTextColor="#A9A9A9"
              value={profile.email}
              onChangeText={text => handleChange('email', text)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={getInputStyle('phone', true)}
              placeholder="Enter phone number"
              placeholderTextColor="#A9A9A9"
              value={profile.phone}
              onChangeText={text => handleChange('phone', text)}
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
            />

            <Text style={styles.label}>Relationship with student</Text>
            <TextInput
              style={getInputStyle('relationship', true)}
              placeholder="Enter relationship with student"
              placeholderTextColor="#A9A9A9"
              value={profile.relationship}
              onChangeText={text => handleChange('relationship', text)}
              onFocus={() => setFocusedInput('relationship')}
              onBlur={() => setFocusedInput(null)}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.label}>First Name</Text>
                <Text style={styles.value}>{profile.firstName}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.label}>Last Name</Text>
                <Text style={styles.value}>{profile.lastName}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.value}>{profile.email}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>{profile.phone}</Text>
              </View>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Relationship with student</Text>
              <Text style={styles.value}>{profile.relationship}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2c3e94',
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    fontFamily: 'Montserrat',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    margin: 16,
    backgroundColor: '#FAFAFC',
    padding: 16,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat',
  },
  editBtn: {
    color: '#5670FA',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    flex: 1,
    marginBottom: 16,
    paddingRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Montserrat',
  },
  value: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7C7C7C',
    fontFamily: 'Montserrat',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat',
  },
  inputFull: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat',
  },
  saveButton: {
    backgroundColor: '#2c3e94',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
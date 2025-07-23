import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const results = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Thermodynamics',
    marks: '200',
    bgColor: '#f1e6ff',
  },
  {
    id: '2',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#d9f4ff',
  },
  {
    id: '3',
    subject: 'Physics',
    topic: 'Thermodynamics',
    marks: '200',
    bgColor: '#f1e6ff',
  },
  {
    id: '4',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#d9f4ff',
  },
  {
    id: '5',
    subject: 'Physics',
    topic: 'Thermodynamics',
    marks: '200',
    bgColor: '#f1e6ff',
  },
  {
    id: '6',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#d9f4ff',
  },
  {
    id: '7',
    subject: 'Physics',
    topic: 'Thermodynamics',
    marks: '200',
    bgColor: '#f1e6ff',
  },
  {
    id: '8',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#d9f4ff',
  },
];

const Result = () => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Physics');
  const options = ['Physics', 'Chemistry', 'Math', 'NEET', 'JEE', 'MHT-CET'];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); // Ex: "03 Feb 2025"

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Result</Text>
        <View style={styles.rightSection}>
          <View>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Text style={styles.dropdownText}>{selectedOption}</Text>
              <Icon name="chevron-down" size={16} />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {options.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedOption(option);
                      setIsDropdownOpen(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar-outline" size={16} color="#000" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <ScrollView>
        <View style={styles.grid}>
          {results.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: item.bgColor }]}
              onPress={() => navigation.navigate('ResultDetails', { item })}>
              <Text style={styles.cardTitle}>{item.subject}</Text>
              <Text style={styles.cardTopic}>{item.topic}</Text>
              <Text style={styles.cardMarks}>
                <Text style={{ fontWeight: 'bold' }}>Total Marks</Text> - {item.marks}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 999, // To appear above other content
  },
  dropdownItem: {
    padding: 8,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  dateText: {
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardTopic: {
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 6,
  },
  cardMarks: {
    color: '#222',
    fontSize: 14,
  },
});

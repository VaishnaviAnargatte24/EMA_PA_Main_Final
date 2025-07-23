import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {scale} from 'react-native-size-matters';
import IconCalender from '../../../assets/icons/calendar.svg';
import moment from 'moment';

const classData = [
  {
    id: '1',
    subject: 'PHYSICS',
    topic: 'Freely falling objects and acceleration due to gravity',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#f1e6ff',
    icon: 'atom',
  },
  {
    id: '2',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
    icon: 'flask-outline',
  },
  {
    id: '3',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
    icon: 'flask-outline',
  },
  {
    id: '4',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
    icon: 'flask-outline',
  },
  {
    id: '5',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
    icon: 'flask-outline',
  },
  {
    id: '6',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
    icon: 'flask-outline',
  },
  // Repeat more times...
];

const Classes = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);

  const onStartDatePressAndroid = () => {
    DateTimePickerAndroid.open({
      value: startDate || new Date(),
      mode: 'date',

      onChange: (event, selectedDate) => {
        if (event.type === 'dismissed') {
          setStartDate(null);
          return;
        }

        if (event.type === 'set' && selectedDate) {
          setStartDate(selectedDate);
          // setEndDate(null);
        }
      },
    });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          {/* <Icon name="calendar" size={16} color="#333" /> */}
          {/* <Text style={styles.dateText}>3 Feb 2025</Text> */}
          <View style={styles.fieldWrapper}>
            <Text>Start date </Text>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'android') {
                  onStartDatePressAndroid();
                } else {
                  setShowStartDatePicker(true);
                }
              }}
              style={styles.datePickerInput}>
              <IconCalender height={24} width={24} />
              <Text>
                {startDate
                  ? moment(startDate).format('MMMM DD YYYY')
                  : 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>
          {showStartDatePicker && (
            <View
              style={{
                alignItems: 'center',
                // justifyContent: "center",
              }}>
              <RNDateTimePicker
                display="spinner"
                value={startDate || new Date()}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: scale(12),
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowStartDatePicker(false);
                    if (startDate === null) {
                      setStartDate(new Date());
                    }
                  }}
                  style={{
                    width: scale(96),
                    height: scale(37),
                    paddingHorizontal: scale(12),
                    paddingVertical: scale(8),
                    borderRadius: scale(4),
                    backgroundColor: '#EA4724',
                  }}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowStartDatePicker(false);
                    setStartDate(null);
                  }}
                  style={{
                    width: scale(96),
                    height: scale(37),
                    borderWidth: scale(1),
                    paddingHorizontal: scale(12),
                    paddingVertical: scale(8),
                    borderRadius: scale(4),
                    borderColor: '#EA4724',
                    // alignItems: "flex-end",
                  }}>
                  <Text>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Classes</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {classData.map(item => (
            <View
              key={item.id}
              style={[styles.card, {backgroundColor: item.bgColor}]}>
              <View style={styles.cardIconRow}>
                {/* <Icon name={item.icon} size={24} color="#333" /> */}
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
              <View style={styles.durationBox}>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.topic}>{item.topic}</Text>
              <Text style={styles.teacher}>{item.teacher}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Classes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',

    alignContent: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  cardIconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#333',
  },
  durationBox: {
    marginTop: 4,
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  durationText: {
    fontSize: 12,
    color: '#333',
  },
  subject: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  topic: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
  },
  teacher: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#333',
  },
  datePickerInput: {
    borderColor: '#94A3B8',
    borderWidth: 1,
    marginTop: scale(4),
    borderRadius: scale(4),
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
  fieldWrapper: {
    marginTop: scale(12),
    width: '100%',
  },
});

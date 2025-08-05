import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import IconCalender from '../../../assets/icons/Calendar1.svg';
import IconBack from '../../../assets/icons/Back_Icon.svg';
import PhysicsIcon from '../../../assets/icons/PhysicsIcon.svg';
import ChemistryIcon from '../../../assets/icons/ChemistryIcon.svg';
import IconLeftArrow from '../../../assets/icons/Left_icon.svg';
import IconRightArrow from '../../../assets/icons/Right_icon.svg';
import IconClose from '../../../assets/icons/Close_icon.svg';
import {useNavigation} from '@react-navigation/native';

const classData = [
  {
    id: '1',
    subject: 'PHYSICS',
    topic: 'Freely falling objects and acceleration due to gravity',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#f1e6ff',
  },
  {
    id: '2',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
  },
  {
    id: '3',
    subject: 'PHYSICS',
    topic: 'Freely falling objects and acceleration due to gravity',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#f1e6ff',
  },
  {
    id: '4',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
  },
  {
    id: '5',
    subject: 'PHYSICS',
    topic: 'Freely falling objects and acceleration due to gravity',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#f1e6ff',
  },
  {
    id: '6',
    subject: 'CHEMISTRY',
    topic: 'Thermodynamics & Thermochemistry',
    teacher: 'Sarita Chaudhari',
    time: '1:00 PM',
    duration: '1 hrs',
    bgColor: '#fbfcd6',
  },
];

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Classes = () => {
  const navigation = useNavigation();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 1)); // April 1, 2025

  const days = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // FIX: Add type annotation for 'date'
  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOkPress = () => {
    setIsCalendarVisible(false);
  };

  const renderBlanks = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const blanks = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < startDay; i++) {
      blanks.push(<View key={`blank-${i}`} style={styles.dayContainer} />);
    }
    const prevMonthDays = getDaysInMonth(currentDate.getMonth() - 1, currentDate.getFullYear());
    for (let i = 0; i < startDay; i++) {
      blanks.unshift(
        <View key={`prev-${i}`} style={styles.dayContainer}>
          <Text style={styles.otherMonthDayText}>{prevMonthDays[prevMonthDays.length - 1 - i].getDate()}</Text>
        </View>
      );
    }
    return blanks;
  };

  const renderNextMonthBlanks = () => {
    const totalSlots = renderBlanks().length + days.length;
    const blanks = [];
    for (let i = 1; i <= 42 - totalSlots; i++) {
      blanks.push(
        <View key={`next-${i}`} style={styles.dayContainer}>
          <Text style={styles.otherMonthDayText}>{i}</Text>
        </View>
      );
    }
    return blanks;
  };

  const renderSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'PHYSICS':
        return <PhysicsIcon width={24} height={24} />;
      case 'CHEMISTRY':
        return <ChemistryIcon width={32} height={32} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backWrap}
          onPress={() => navigation.goBack()}>
          <View style={styles.backCircle}>
            <IconBack width={12} height={12} />
          </View>
          <Text style={styles.topTitle}>Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateStaticWrap}
          onPress={() => setIsCalendarVisible(true)}>
          <IconCalender width={16} height={16} />
          <Text style={styles.dateStatic}>
            {selectedDate.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Today's Classes</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {classData.map(item => (
            <View
              key={item.id}
              style={[styles.card, {backgroundColor: item.bgColor}]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconWrap}>
                  {renderSubjectIcon(item.subject)}
                </View>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Calender</Text>
              <TouchableOpacity onPress={() => setIsCalendarVisible(false)} style={styles.closeButton}>
                <IconClose width={24} height={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.monthHeader}>
              <View style={styles.monthDisplayContainer}>
                <TouchableOpacity onPress={handlePrevMonth} style={styles.monthNavButton}>
                  <IconLeftArrow width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                  {currentDate.toLocaleString('default', {month: 'long'})}, {currentDate.getFullYear()}
                </Text>
                <TouchableOpacity onPress={handleNextMonth} style={styles.monthNavButton}>
                  <IconRightArrow width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.daysHeader}>
              {daysOfWeek.map((day, index) => (
                <Text key={index} style={styles.dayHeaderText}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {renderBlanks()}
              {days.map((date, index) => {
                const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dayContainer, isSelected && styles.selectedDay]}
                    onPress={() => handleDatePress(date)}>
                    <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {renderNextMonthBlanks()}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCalendarVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                <Text style={styles.okButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCircle: {
    backgroundColor: '#F1F3FB',
    borderRadius: 20,
    padding: 6,
    marginRight: 8,
  },
  topTitle: {
    fontSize: 16,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  dateStaticWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateStatic: {
    fontSize: 14,
    color: '#2A2A2A',
    fontWeight: '500',
    marginLeft: 6,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrap: {
    backgroundColor: '#e5d8f3',
    borderRadius: 20,
    padding: 6,
  },
  timeBox: {
    backgroundColor: '#dedede',
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
    backgroundColor: '#dedede',
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
    color: '#2A2A2A',
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
  // Calendar styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthNavButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthChange: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  dayHeaderText: {
    width: '14%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayContainer: {
    width: '14.2%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#6c63ff',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
  },
  otherMonthDayText: {
    color: '#a0a0a0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6c63ff',
  },
  okButton: {
    backgroundColor: '#6c63ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  okButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
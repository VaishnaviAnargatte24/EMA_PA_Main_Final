import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import resultillustration from '../../../../assets/images/resultIllustration.png';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  Modal,
} from 'react-native';
import IconBack from '../../../../assets/icons/Back_Icon.svg';
import IconCalender from '../../../../assets/icons/Calendar1.svg';
import CloseIcon from '../../../../assets/icons/Close_icon.svg';
import LeftArrow from '../../../../assets/icons/Left_icon.svg';
import RightArrow from '../../../../assets/icons/Right_icon.svg';
import DropDownPicker from 'react-native-dropdown-picker';
 
// Define expected route params
type RouteParams = {
  item: {
    name: string;
    exam: string;
    subject: string;
    rollNumber: string;
  };
};
 
// 👇 Custom Down Arrow Component with Physics text
const SubjectWithArrow = () => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text style={{fontSize: 14, color: '#000', marginRight: 6}}></Text>
    <Text style={{fontSize: 14, color: '#000'}}>▼</Text>
  </View>
);
 
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
 
const ResultDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params as RouteParams;
 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.subject);
  const [items, setItems] = useState([
    {label: 'Science', value: 'Science'},
    {label: 'Maths', value: 'Maths'},
    {label: 'Biology', value: 'Biology'},
    {label: 'Chemistry', value: 'Chemistry'},
    {label: 'JEE', value: 'JEE'},
    {label: 'NEET', value: 'NEET'},
    {label: 'MHT-CET', value: 'MHT-CET'},
    {label: 'Physics', value: 'Physics'},
  ]);
 
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 3));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 1, 3));
 
  const days = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
 
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
 
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };
 
  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
  };
 
  const handleOkPress = () => {
    setCalendarVisible(false);
  };
 
  const renderBlanks = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const blanks = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonthDays = getDaysInMonth(
      currentDate.getMonth() - 1,
      currentDate.getFullYear(),
    );
    for (let i = 0; i < startDay; i++) {
      blanks.unshift(
        <View key={`prev-${i}`} style={styles.dayContainer}>
          <Text style={styles.otherMonthDayText}>
            {prevMonthDays[prevMonthDays.length - 1 - i].getDate()}
          </Text>
        </View>,
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
        </View>,
      );
    }
    return blanks;
  };
 
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <IconBack width={16} height={16} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Result</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="..."
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownBox}
              textStyle={styles.dropdownText}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
              listItemLabelStyle={styles.listItemLabel}
              ArrowDownIconComponent={() => <SubjectWithArrow />} // ✅ Physics + Arrow
            />
          </View>
          <TouchableOpacity
            onPress={() => setCalendarVisible(true)}
            style={styles.dateContainer}>
            <IconCalender width={16} height={16} />
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
 
      {/* Custom Calendar Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={isCalendarVisible}
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Calender</Text>
              <TouchableOpacity
                onPress={() => setCalendarVisible(false)}
                style={styles.modalCloseBtn}>
                <CloseIcon width={16} height={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.monthHeader}>
              <View style={styles.monthDisplayContainer}>
                <TouchableOpacity
                  onPress={handlePrevMonth}
                  style={styles.monthNavButton}>
                  <LeftArrow width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                  {currentDate.toLocaleString('default', {month: 'long'})},{' '}
                  {currentDate.getFullYear()}
                </Text>
                <TouchableOpacity
                  onPress={handleNextMonth}
                  style={styles.monthNavButton}>
                  <RightArrow width={24} height={24} />
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
                const isSelected =
                  selectedDate &&
                  selectedDate.toDateString() === date.toDateString();
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayContainer,
                      isSelected && styles.selectedDay,
                    ]}
                    onPress={() => handleDatePress(date)}>
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText,
                      ]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {renderNextMonthBlanks()}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setCalendarVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okBtn} onPress={handleOkPress}>
                <Text style={styles.okText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
 
      {/* Profile Card */}
      <View style={styles.card}>
        <View>
          <Text style={styles.cardText}>
            <Text style={styles.boldValue}>Candidate Name</Text> -{' '}
            <Text>{item.name || 'Shruti Rajput'}</Text>
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.boldValue}>Exam Name</Text> -{' '}
            <Text>{item.exam || 'NEET'}</Text>
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.boldValue}>Subject Name</Text> -{' '}
            <Text>{item.subject || 'Science'}</Text>
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.boldValue}>Roll Number</Text> -{' '}
            <Text>{item.rollNumber || '69102189'}</Text>
          </Text>
        </View>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/1.jpg'}}
          style={styles.profilePic}
        />
      </View>
 
      {/* Image Graph */}
      <View style={styles.chartContainer}>
        <Image
          source={resultillustration as ImageSourcePropType}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <View style={styles.graphWrapper}>
          <View style={styles.graphLine} />
          <View style={styles.graphScale}>
            {['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'].map(
              (val, index) => (
                <Text
                  key={index}
                  style={[
                    styles.graphLabel,
                    val === '60' && styles.highlightedLabel,
                  ]}>
                  {val}
                </Text>
              ),
            )}
          </View>
        </View>
      </View>
 
      {/* Score Card */}
      <Text style={styles.sectionTitle}>Score Card</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreText}>Total Question - 45</Text>
        <Text style={styles.scoreText}>Total Attempted - 40</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreText}>Total Unattempted - 5</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreText}>Correct Answers - 25</Text>
        <Text style={styles.scoreText}>Incorrect Answers - 15</Text>
      </View>
 
      <TouchableOpacity style={styles.scoreBtn}>
        <Text style={styles.scoreBtnText}>Total Score - 70</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
 
export default ResultDetails;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2A2A2A',
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  dropdownWrapper: {
    width: 120,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#EAEAEA',
    borderColor: '#ccc',
    borderRadius: 18,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    height: 36,
    minHeight: 36,
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 9,
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
  },
  selectedItemContainer: {
    backgroundColor: '#2E4995',
  },
  selectedItemLabel: {
    color: '#fff',
    fontWeight: '500',
  },
  listItemLabel: {
    color: '#333',
    fontSize: 13,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef0ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
    zIndex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#0c0c0cff',
    marginLeft: 6,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f3fb',
  },
  cardText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 20,
  },
  boldValue: {
    fontWeight: 'bold',
    color: '#000',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  chartContainer: {
    backgroundColor: '#f1f3fb',
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chartImage: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#2A2A2A',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F1F3FB',
    borderRadius: 8,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  scoreBtn: {
    backgroundColor: '#2E4995',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  graphWrapper: {
    marginTop: -8,
    marginBottom: 16,
    alignItems: 'center',
  },
  graphLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  graphScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  graphLabel: {
    fontSize: 12,
    color: '#444',
  },
  highlightedLabel: {
    color: 'green',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
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
    color: '#000',
  },
  selectedDay: {
    backgroundColor: '#2E4995',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherMonthDayText: {
    color: '#bbb',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  okBtn: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    backgroundColor: '#2E4995',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#333',
  },
  okText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
 
 
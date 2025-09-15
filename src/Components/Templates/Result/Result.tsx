import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import IconBack from '../../../assets/icons/Back_Icon.svg';
import IconCalender from '../../../assets/icons/Calendar1.svg';
import CloseIcon from '../../../assets/icons/Close_icon.svg';
import LeftArrow from '../../../assets/icons/Left_icon.svg';
import RightArrow from '../../../assets/icons/Right_icon.svg';
import {NavigationProp, ResultItem} from './Result.modal';
 
const results: ResultItem[] = [
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
  {
    id: '9',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#f1e6ff',
  },
  {
    id: '10',
    subject: 'Physics',
    topic: 'Electromagnetism',
    marks: '200',
    bgColor: '#d9f4ff',
  },
];
 
// ---------- Calendar Helpers ----------
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
 
type CalendarProps = {
  visible: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};
 
const CustomCalendar: React.FC<CalendarProps> = ({
  visible,
  onClose,
  selectedDate,
  onSelectDate,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
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
 
  const renderBlanks = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const blanks = [];
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < startDay; i++) {
      blanks.push(<View key={`blank-${i}`} style={styles.dayContainer}></View>);
    }
    return blanks;
  };
 
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Calendar</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <CloseIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
 
          {/* Month navigation */}
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <LeftArrow width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {currentDate.toLocaleString('default', {month: 'long'})},{' '}
              {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <RightArrow width={24} height={24} />
            </TouchableOpacity>
          </View>
 
          {/* Days header */}
          <View style={styles.daysHeader}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.dayHeaderText}>
                {day}
              </Text>
            ))}
          </View>
 
          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {renderBlanks()}
            {days.map((date, index) => {
              const isSelected =
                selectedDate.toDateString() === date.toDateString();
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => onSelectDate(date)}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
};
 
// ---------- Result Screen ----------
const Result = () => {
  const navigation = useNavigation<NavigationProp>();
 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Physics');
  const [items, setItems] = useState([
    {label: 'Physics', value: 'Physics'},
    {label: 'Maths', value: 'Maths'},
    {label: 'Biology', value: 'Biology'},
    {label: 'Chemistry', value: 'Chemistry'},
    {label: 'JEE', value: 'JEE'},
    {label: 'NEET', value: 'NEET'},
    {label: 'MHT-CET', value: 'MHT-CET'},
  ]);
 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
 
  const formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backWrap}
          onPress={() => navigation.goBack()}>
          <View style={styles.backCircle}>
            <IconBack width={12} height={12} />
          </View>
          <Text style={styles.topTitle}>Results</Text>
        </TouchableOpacity>
 
        <View style={styles.headerRight}>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Subject"
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownBox}
              textStyle={styles.dropdownText}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
              listItemLabelStyle={styles.listItemLabel}
            />
          </View>
 
          <TouchableOpacity
            onPress={() => setCalendarVisible(true)}
            style={styles.dateContainer}>
            <IconCalender width={14} height={14} style={{marginRight: 6}} />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
        </View>
      </View>
 
      {/* Calendar */}
      <CustomCalendar
        visible={isCalendarVisible}
        onClose={() => setCalendarVisible(false)}
        selectedDate={selectedDate}
        onSelectDate={date => {
          setSelectedDate(date);
          setCalendarVisible(false);
        }}
      />
 
      {/* Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {results.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {backgroundColor: item.bgColor},
                index % 2 === 0 ? {marginRight: '4%'} : {},
              ]}
              onPress={() => navigation.navigate('ResultDetails', {item})}>
              <Text style={styles.cardTitle}>{item.subject}</Text>
              <Text style={styles.cardTopic}>{item.topic}</Text>
              <Text style={styles.cardMarks}>
                <Text style={{fontWeight: 'bold'}}>Total Marks</Text> -{' '}
                {item.marks}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
 
export default Result;
 
// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  backWrap: {flexDirection: 'row', alignItems: 'center'},
  backCircle: {
    backgroundColor: '#F1F3FB',
    borderRadius: 20,
    padding: 6,
    marginRight: 8,
  },
  topTitle: {fontSize: 16, color: '#2A2A2A', fontWeight: '600'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerRight: {flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'},
  dropdownWrapper: {width: 100, zIndex: 1000},
  dropdown: {
    backgroundColor: '#EAEAEA',
    borderColor: '#ccc',
    maxHeight: 90,
    borderRadius: 18,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    height: 36,
    minHeight: 36,
    paddingVertical: 0,
  },
  dropdownBox: {backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 9},
  dropdownText: {fontSize: 13, color: '#333'},
  selectedItemContainer: {backgroundColor: '#2E4995'},
  selectedItemLabel: {color: '#fff', fontWeight: '500'},
  listItemLabel: {color: '#333', fontSize: 13},
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
  dateText: {fontSize: 14, color: '#0c0c0cff'},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {elevation: 3},
    }),
  },
  cardTitle: {fontSize: 16, fontWeight: '600'},
  cardTopic: {
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 6,
    lineHeight: 20,
  },
  cardMarks: {color: '#222', fontSize: 14, lineHeight: 18},
 
  // Calendar styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  modalTitle: {fontSize: 20, fontWeight: 'bold'},
  modalCloseBtn: {position: 'absolute', right: 0, top: 0, padding: 5},
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  monthText: {fontSize: 18, fontWeight: 'bold'},
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  dayHeaderText: {width: '14%', textAlign: 'center', fontWeight: 'bold'},
  calendarGrid: {flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
  dayContainer: {
    width: '14.2%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {fontSize: 16},
  selectedDay: {backgroundColor: '#6c63ff', borderRadius: 20},
  selectedDayText: {color: 'white'},
});

 
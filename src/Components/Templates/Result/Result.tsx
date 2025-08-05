import React, { useState, useCallback } from 'react';
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
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import IconBack from '../../../assets/icons/Back_Icon.svg';
import IconCalender from '../../../assets/icons/Calendar1.svg';
import CloseIcon from '../../../assets/icons/Close_icon.svg';
import LeftArrow from '../../../assets/icons/Left_icon.svg';
import RightArrow from '../../../assets/icons/Right_icon.svg';
import { DayComponentProps, NavigationProp, ResultItem } from './Result.modal';

const DayComponent = ({ date, state, marking, setSelectedDate, setCalendarVisible }: DayComponentProps) => {
  const isSelected = marking?.selected;
  const isDisabled = state === 'disabled';
  const isToday = date?.dateString === new Date().toISOString().slice(0, 10);

  return (
    <TouchableOpacity
      onPress={() => {
        if (date) {
          setSelectedDate(date.dateString);
          setCalendarVisible(false);
        }
      }}
      style={[
        isSelected
          ? styles.selectedDayContainer
          : (isToday && !isDisabled)
              ? styles.todayDayContainer
              : styles.dayContainer,
      ]}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.dayText,
          isDisabled ? styles.disabledDayText : {},
          isSelected ? styles.selectedDayText : {},
          isToday && !isSelected ? styles.todayDayText : {},
        ]}
      >
        {date?.day}
      </Text>
    </TouchableOpacity>
  );
};

const results: ResultItem[] = [
  { id: '1', subject: 'Physics', topic: 'Thermodynamics', marks: '200', bgColor: '#f1e6ff' },
  { id: '2', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#d9f4ff' },
  { id: '3', subject: 'Physics', topic: 'Thermodynamics', marks: '200', bgColor: '#f1e6ff' },
  { id: '4', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#d9f4ff' },
  { id: '5', subject: 'Physics', topic: 'Thermodynamics', marks: '200', bgColor: '#f1e6ff' },
  { id: '6', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#d9f4ff' },
  { id: '7', subject: 'Physics', topic: 'Thermodynamics', marks: '200', bgColor: '#f1e6ff' },
  { id: '8', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#d9f4ff' },
  { id: '9', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#f1e6ff' },
  { id: '10', subject: 'Physics', topic: 'Electromagnetism', marks: '200', bgColor: '#d9f4ff' },
];

const Result = () => {
  const navigation = useNavigation<NavigationProp>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Physics');
  const [items, setItems] = useState([
    { label: 'Physics', value: 'Physics' },
    { label: 'Maths', value: 'Maths' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'JEE', value: 'JEE' },
    { label: 'NEET', value: 'NEET' },
    { label: 'MHT-CET', value: 'MHT-CET' },
  ]);

  const initialSelectedDate = '2025-04-01';
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialSelectedDate);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const customWeekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleSetSelectedDate = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  const handleSetCalendarVisible = useCallback((visible: boolean) => {
    setCalendarVisible(visible);
  }, []);

  const renderDayComponent = useCallback((props: any) => {
    return (
      <DayComponent
        {...props}
        setSelectedDate={handleSetSelectedDate}
        setCalendarVisible={handleSetCalendarVisible}
      />
    );
  }, [handleSetSelectedDate, handleSetCalendarVisible]);

  // Updated custom header for the calendar modal
  const renderCalendarHeader = () => {
    const month = new Date(currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    return (
      <View style={styles.calendarNavHeader}>
        <TouchableOpacity
          onPress={() => {
            const date = new Date(currentMonth);
            date.setMonth(date.getMonth() - 1);
            setCurrentMonth(date.toISOString().slice(0, 10));
          }}
          style={styles.arrowButton}>
          <LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <Text style={styles.calendarMonthText}>{month}</Text>
        <TouchableOpacity
          onPress={() => {
            const date = new Date(currentMonth);
            date.setMonth(date.getMonth() + 1);
            setCurrentMonth(date.toISOString().slice(0, 10));
          }}
          style={styles.arrowButton}>
          <RightArrow width={20} height={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backWrap} onPress={() => navigation.goBack()}>
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

          <TouchableOpacity onPress={() => {
            setSelectedDate(initialSelectedDate);
            setCurrentMonth(initialSelectedDate);
            setCalendarVisible(true);
          }} style={styles.dateContainer}>
            <IconCalender width={14} height={14} style={{ marginRight: 6 }} />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Calendar Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={isCalendarVisible}
        onRequestClose={() => {
          setCalendarVisible(false);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Custom Modal Header: Calender title and Close button */}
            <View style={styles.customModalHeader}>
              <View style={{ width: 16 }} />
              <Text style={styles.modalTitle}>Calender</Text>
              <TouchableOpacity onPress={() => {
                setCalendarVisible(false);
              }} style={styles.modalCloseBtn}>
                <CloseIcon width={16} height={16} />
              </TouchableOpacity>
            </View>

            {/* Render the custom calendar header with side-by-side arrows */}
            {renderCalendarHeader()}

            <View style={styles.customWeekDaysHeader}>
              {customWeekDays.map((day, index) => (
                <Text key={index} style={styles.customWeekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            <Calendar
              current={currentMonth}
              renderHeader={() => null} // Keep this to use our custom header
              onMonthChange={() => {}} // This is intentional to prevent `react-native-calendars` from changing the month internally
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  customStyles: {
                    container: {
                      borderRadius: 99,
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#2E4995',
                    },
                    text: {
                      color: 'white',
                      fontWeight: '500',
                    },
                  },
                },
              }}
              enableSwipeMonths={false}
              hideExtraDays={false}
              firstDay={1}
              dayComponent={renderDayComponent}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: 'transparent',
                textSectionTitleDisabledColor: 'transparent',
                selectedDayBackgroundColor: 'transparent',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#2E4995',
                dayTextColor: '#2d4150',
                textDisabledColor: '#B0B0B0',
                dotColor: 'transparent',
                selectedDotColor: 'transparent',
                arrowColor: 'transparent',
                disabledArrowColor: 'transparent',
                monthTextColor: 'transparent',
                indicatorColor: 'transparent',
                textDayFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
                textMonthFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
                textDayHeaderFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
                textDayFontWeight: 'normal',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'normal',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
              style={[
                styles.calendarStyle,
                { paddingHorizontal: styles.customWeekDaysHeader.paddingHorizontal },
              ]}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => {
                setCalendarVisible(false);
              }} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setCalendarVisible(false);
              }} style={styles.okBtn}>
                <Text style={styles.okText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {results.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: item.bgColor },
                index % 2 === 0 ? { marginRight: '4%' } : {},
              ]}
              onPress={() => navigation.navigate('ResultDetails', { item })}
            >
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  dropdownWrapper: {
    width: 100,
    zIndex: 1000,
  },
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
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardTopic: {
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 6,
    lineHeight: 20,
  },
  cardMarks: {
    color: '#222',
    fontSize: 14,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '85%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  customModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 16,
  },
  modalCloseBtn: {
    padding: 5,
  },
  // The key change to put the arrows next to the month and year text
  calendarNavHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // This centers the whole row
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  arrowButton: {
    padding: 5,
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A2A2A',
    marginHorizontal: 10, // Add space between the text and the arrows
  },
  customWeekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  customWeekDayText: {
    color: '#606060',
    fontSize: 14,
    fontWeight: 'normal',
    width: 32, // Matches dayContainer width
    textAlign: 'center',
    marginHorizontal: 0.5, // You may need to fine-tune this value.
  },
  calendarStyle: {
    borderRadius: 12,
    width: '100%',
    paddingBottom: 10,
  },
  dayContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#2E4995',
  },
  todayDayContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#2d4150',
    textAlign: 'center',
    width: '100%',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '500',
  },
  disabledDayText: {
    color: '#B0B0B0',
  },
  todayDayText: {
    color: '#2E4995',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#2E4995',
    borderWidth: 1,
    marginRight: 10,
  },
  okBtn: {
    backgroundColor: '#2E4995',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: '#2E4995',
    fontWeight: '500',
  },
  okText: {
    color: '#fff',
    fontWeight: '500',
  },
});
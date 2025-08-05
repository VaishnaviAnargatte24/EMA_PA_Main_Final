import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconBack from '../../../assets/icons/Back_Icon.svg';
import { UseNavigationProps, ROUTES } from '../../../Routes'; // ✅ Adjust the import to your path
const { width } = Dimensions.get('window');

const allExams = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Fundamental of physics',
    date: '3 Feb 2025',
    marks: 200,
    type: 'upcoming',
  },
  {
    id: '2',
    subject: 'Chemistry',
    topic: 'Thermodynamics',
    date: '5 Feb 2025',
    marks: 200,
    type: 'upcoming',
  },
  {
    id: '3',
    subject: 'Mathematics',
    topic: 'Mathematical Induction',
    date: '7 Feb 2025',
    marks: 200,
    type: 'upcoming',
  },
  {
    id: '4',
    subject: 'Physics',
    topic: 'Fundamental of physics',
    date: '8 Feb 2025',
    marks: 200,
    type: 'upcoming',
  },
  {
    id: '5',
    subject: 'Physics',
    topic: 'Fundamental of physics',
    date: '10 Feb 2025',
    marks: 200,
    type: 'upcoming',
  },
  {
    id: '6',
    subject: 'Physics',
    topic: 'Fundamental of physics',
    date: '25 Jan 2025',
    marks: 200,
    type: 'previous',
  },
  {
    id: '7',
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    date: '20 Jan 2025',
    marks: 200,
    type: 'previous',
  },
];

const Exams = () => {
  const navigation = useNavigation<UseNavigationProps>(); // ✅ Strongly typed navigation
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [items, setItems] = useState([
    { label: 'All', value: 'all' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'JEE', value: 'JEE' },
    { label: 'NEET', value: 'NEET' },
    { label: 'MHT-CET', value: 'MHT-CET' },
  ]);

  const filteredExams = allExams.filter(
    exam =>
      exam.type === selectedTab &&
      (selectedSubject === 'all' || exam.subject === selectedSubject)
  );

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
          <Text style={styles.topTitle}>Classes</Text>
        </TouchableOpacity>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={selectedSubject}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedSubject}
            setItems={setItems}
            placeholder="All"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 12 }}
            labelStyle={styles.labelStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            maxHeight={150}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming'
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}>
            Upcoming Exam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'previous' && styles.activeTab]}
          onPress={() => setSelectedTab('previous')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'previous'
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}>
            Previous Exam
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exam List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredExams.map(exam => (
          <View key={exam.id} style={styles.examCard}>
            <View style={styles.examRow}>
              <View>
                <Text style={styles.examSubject}>{exam.subject}</Text>
                <Text style={styles.examTopic}>{exam.topic}</Text>
              </View>
              <Text style={styles.examDate}>{exam.date}</Text>
            </View>
            <View style={styles.examFooter}>
              <Text style={styles.examMarks}>Total Marks - {exam.marks}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.ExamResults, { exam }) // ✅ navigate with param
                }>
                <Text style={styles.seeResult}>See Result</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Exams;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 20,
    paddingHorizontal: 16,
    width: width,
    alignSelf: 'center',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    zIndex: 10,
  },
  dropdownWrapper: {
    width: 100,
    zIndex: 1000,
  },
  dropdown: {
    borderRadius: 8,
    borderColor: '#ccc',
    height: 34,
    minHeight: 30,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
  },
  labelStyle: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    color: '#2E4995',
  },
  listItemContainerStyle: {
    borderRadius: 5,
    marginVertical: 2,
  },
  listItemLabelStyle: {
    color: '#2E4995',
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#2E4995',
    borderRadius: 5,
  },
  selectedItemLabelStyle: {
    color: '#ffffff',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    width: 345,
    alignSelf: 'center',
  },
  tab: {
    width: 172.5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 15,
  },
  activeTab: {
    backgroundColor: '#2E4995',
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#2E4995',
  },
  examCard: {
    width: 345,
    height: 100,
    backgroundColor: 'rgba(248, 242, 251, 0.61)',
    padding: 12,
    borderRadius: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D4C1E5',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  examRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  examSubject: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 15,
    color: '#0C0B0B',
    lineHeight: 15,
    width: 90,
    height: 18,
  },
  examTopic: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 13,
    fontStyle: 'italic',
    color: '#363636',
    marginTop: 2,
    lineHeight: 15,
  },
  examDate: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    color: '#0C0B0B',
    lineHeight: 15,
  },
  examFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examMarks: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    color: '#0C0B0B',
    lineHeight: 15,
  },
  seeResult: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 10,
    color: '#5670FA',
    lineHeight: 15,
  },
});

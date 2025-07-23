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
    date: '25 Jan 2025',
    marks: 200,
    type: 'previous',
  },
  {
    id: '5',
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    date: '20 Jan 2025',
    marks: 200,
    type: 'previous',
  },
];

const Exams = () => {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [items, setItems] = useState([
    { label: 'All', value: null },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'JEE', value: 'JEE' },
    { label: 'NEET', value: 'NEET' },
    { label: 'MHT-CET', value: 'MHT-CET' },
  ]);

  const filteredExams = allExams.filter(
    exam => exam.type === selectedTab && (selectedSubject ? exam.subject === selectedSubject : true)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Exams</Text>

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
            maxHeight={120}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}>
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming Exam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'previous' && styles.activeTab]}
          onPress={() => setSelectedTab('previous')}>
          <Text style={[styles.tabText, selectedTab === 'previous' && styles.activeTabText]}>
            Previous Exam
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exam List */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
                onPress={() => navigation.navigate('ResultDetails1', { exam })}>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    zIndex: 10,
  },
  backButton: {
    marginRight: 8,
  },
  backText: {
    fontSize: 20,
    color: '#2c3e94',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    paddingLeft: 8,
  },
  dropdownWrapper: {
    width: width * 0.35,
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
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2c3e94',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  examCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  examRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  examSubject: {
    fontWeight: '600',
    fontSize: 16,
    color: '#2c3e94',
  },
  examTopic: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  examDate: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  examFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  examMarks: {
    fontSize: 13,
    color: '#333',
  },
  seeResult: {
    color: '#2c3e94',
    fontWeight: '600',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

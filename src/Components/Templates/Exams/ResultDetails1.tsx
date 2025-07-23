import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const ResultDetails1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exam } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Result</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.subjectHeader}>
          <View>
            <Text style={styles.subject}>{exam.subject}</Text>
            <Text style={styles.topic}>{exam.topic}</Text>
          </View>
          <Text style={styles.date}>{exam.date}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>No. of Questions</Text>
          <Text style={styles.value}>45</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Answered</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Not Answered</Text>
          <Text style={styles.value}>1</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Marked for Review</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Answered & Marked for Review{'\n'}(will be considered for evaluation)</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Not Visited</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Overall Rank</Text>
          <Text style={styles.value}>22</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total students</Text>
          <Text style={styles.value}>100</Text>
        </View>
      </View>

      {/* Score Box */}
      <View style={styles.marksBox}>
        <Text style={styles.marksText}>Your Marks</Text>
        <Text style={styles.marksText}>150/200</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#F9F6FB',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  topic: {
    fontStyle: 'italic',
    color: '#777',
    marginTop: 2,
  },
  date: {
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    color: '#333',
    fontSize: 14,
  },
  value: {
    fontWeight: '500',
    color: '#000',
  },
  marksBox: {
    marginTop: 20,
    backgroundColor: '#2A3B8F',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marksText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultDetails1;

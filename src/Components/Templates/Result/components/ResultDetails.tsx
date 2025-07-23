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

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreTitle}>{exam.subject}</Text>
          <Text style={styles.scoreDate}>{exam.date}</Text>
        </View>
        <Text style={styles.scoreSubtitle}>{exam.topic}</Text>
        <View style={styles.divider} />

        <View style={styles.scoreRow}>
          <Text>No. of Questions</Text>
          <Text>45</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Answered</Text>
          <Text>0</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Not Answered</Text>
          <Text>1</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Marked for Review</Text>
          <Text>0</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Answered & Marked for Review{'\n'}(will be considered for evaluation)</Text>
          <Text>0</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Not Visited</Text>
          <Text>0</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Overall Rank</Text>
          <Text>22</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text>Total Students</Text>
          <Text>100</Text>
        </View>
      </View>

      {/* Your Marks */}
      <TouchableOpacity style={styles.scoreBtn}>
        <Text style={styles.scoreBtnText}>Your Marks</Text>
        <Text style={styles.scoreBtnText}>150/200</Text>
      </TouchableOpacity>
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
  scoreCard: {
    backgroundColor: '#fefbff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderColor: '#eee',
    borderWidth: 1,
    elevation: 2,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scoreDate: {
    fontSize: 13,
    color: '#444',
  },
  scoreSubtitle: {
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  scoreBtn: {
    marginTop: 20,
    backgroundColor: '#2A3B8F',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultDetails1;

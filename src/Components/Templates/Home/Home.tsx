import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart, PieChartPro } from 'react-native-gifted-charts';

import NotificationBell from '../../../assets/icons/Notification_bell.svg';
import MenuBar from '../../../assets/icons/Menu_bar.svg';
import AttendanceIcon from '../../../assets/icons/attendance_icon.svg';
import ScoreIcon from '../../../assets/icons/score.svg';

const { width } = Dimensions.get('window');

const Home = () => {
  const pieData = [
    { value: 47, color: '#009FFF', gradientCenterColor: '#006DFF', focused: true },
    { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];

  const renderDot = (color: string) => (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );

  const renderLegendComponent = () => (
    <>
      <View style={styles.legendRow}>
        <View style={styles.legendBox}>
          {renderDot('#006DFF')}
          <Text>Excellent: 47%</Text>
        </View>
        <View style={styles.legendBox}>
          {renderDot('#8F80F3')}
          <Text>Okay: 16%</Text>
        </View>
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendBox}>
          {renderDot('#3BE9DE')}
          <Text>Good: 40%</Text>
        </View>
        <View style={styles.legendBox}>
          {renderDot('#FF7F97')}
          <Text>Poor: 3%</Text>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Section */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Sanju Patel</Text>
              <Text style={styles.subtext}>Student - Priya Patel</Text>
              <Text style={styles.subtext}>11th std</Text>
            </View>
          </View>
          <View style={styles.rightIcons}>
            <View style={styles.notificationWrapper}>
              <NotificationBell width={24} height={24} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
            <MenuBar width={26} height={26} style={{ marginLeft: 15 }} />
          </View>
        </View>
      </View>

      {/* Score Cards */}
      <Text style={styles.title}>Student Score</Text>
      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: '#d0f0f8' }]}>
          <AttendanceIcon width={30} height={30} style={{ marginBottom: 6 }} />
          <Text style={styles.cardTitle}>69%</Text>
          <Text style={styles.cardSubtitle}>Total Attendance</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#e7e4ff' }]}>
          <ScoreIcon width={30} height={30} style={{ marginBottom: 6 }} />
          <Text style={styles.cardTitle}>97%</Text>
          <Text style={styles.cardSubtitle}>Weekly Score</Text>
        </View>
      </View>

      {/* Progress Bar Chart */}
      <Text style={styles.title}>Progress</Text>
      <View style={styles.chartContainer}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#03A9F4' }]} />
            <Text style={styles.legendLabel}>Student Score</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#B3E5FC' }]} />
            <Text style={styles.legendLabel}>Average Student Score</Text>
          </View>
        </View>

        <BarChart
          data={[
            { label: 'Jan', frontColor: '#03A9F4', value: 95 },
            { frontColor: '#B3E5FC', value: 45 },
            { label: 'Feb', frontColor: '#03A9F4', value: 92 },
            { frontColor: '#B3E5FC', value: 70 },
            { label: 'Mar', frontColor: '#03A9F4', value: 94 },
            { frontColor: '#B3E5FC', value: 85 },
            { label: 'Apr', frontColor: '#03A9F4', value: 89 },
            { frontColor: '#B3E5FC', value: 76 },
            { label: 'May', frontColor: '#03A9F4', value: 80 },
            { frontColor: '#B3E5FC', value: 55 },
            { label: 'Jun', frontColor: '#03A9F4', value: 95 },
            { frontColor: '#B3E5FC', value: 70 },
            { label: 'Jul', frontColor: '#03A9F4', value: 85 },
            { frontColor: '#B3E5FC', value: 70 },
          ]}
          barWidth={10}
          spacing={16}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={1}
          yAxisThickness={1}
          yAxisColor="#ccc"
          xAxisColor="#ccc"
          noOfSections={5}
          maxValue={100}
          yAxisTextStyle={{ color: '#999', fontSize: 10 }}
          xAxisLabelTextStyle={{ color: '#555', fontSize: 12 }}
        />
      </View>

      {/* Pie Chart */}
      <Text style={styles.title}>Overall Statistics</Text>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <PieChartPro
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelMain}>47%</Text>
              <Text style={styles.centerLabelSub}>Excellent</Text>
            </View>
          )}
        />
        {renderLegendComponent()}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6ff',
    flex: 1,
  },
  headerWrapper: {
    width: '100%',
    height: 145,
    backgroundColor: '#e6eaff',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    paddingTop: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 62,
    marginRight: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtext: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  notificationWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#000',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    width: (width - 60) / 2,
    height: 111,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  chartContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 6,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 12,
    color: '#555',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginRight: 20,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelMain: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  centerLabelSub: {
    fontSize: 14,
  },
});

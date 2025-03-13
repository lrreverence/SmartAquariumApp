import { StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  // TODO: Replace with actual pH reading from your sensor
  const currentPH = 7.2;
  const lastWaterChange = new Date('2024-03-20T15:30:00');

  // Sample data for the chart
  const chartData = {
    labels: ['12h', '10h', '8h', '6h', '4h', '2h', 'Now'],
    datasets: [
      {
        data: [7.1, 7.3, 7.2, 7.4, 7.2, 7.3, 7.2],
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Smart Aquarium</ThemedText>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.pHCard}>
        <ThemedText style={styles.pHLabel}>Current pH Level</ThemedText>
        <ThemedText style={styles.pHValue}>{currentPH}</ThemedText>
        <ThemedText style={[
          styles.pHStatus,
          { color: currentPH >= 6.5 && currentPH <= 7.5 ? '#4CAF50' : '#FF5252' }
        ]}>
          {currentPH >= 6.5 && currentPH <= 7.5 ? 'Optimal' : 'Warning'}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.chartContainer}>
        <ThemedText style={styles.chartTitle}>pH History</ThemedText>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 32}
          height={180}
          chartConfig={{
            backgroundColor: '#121212',
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeDasharray: [], // Solid lines
              stroke: "rgba(74, 144, 226, 0.1)",
            },
            propsForLabels: {
              fontSize: 12,
            }
          }}
          bezier
          style={styles.chart}
          withDots={false}
          withInnerLines={true}
          withOuterLines={false}
          withShadow={false}
        />
      </ThemedView>

      <ThemedView style={styles.waterChangeCard}>
        <Ionicons name="water-outline" size={24} color="#4A90E2" />
        <ThemedView style={styles.waterChangeInfo}>
          <ThemedText style={styles.waterChangeTitle}>Last Water Change</ThemedText>
          <ThemedText style={styles.waterChangeTime}>
            {lastWaterChange.toLocaleDateString()} {lastWaterChange.toLocaleTimeString()}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  settingsButton: {
    padding: 8,
  },
  pHCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#1A1A1A',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pHLabel: {
    fontSize: 18,
    color: '#B0B0B0',
    marginBottom: 8,
  },
  pHValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginVertical: 16,
    textShadowColor: 'rgba(74, 144, 226, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  pHStatus: {
    fontSize: 20,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  waterChangeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  waterChangeInfo: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  waterChangeTitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 4,
  },
  waterChangeTime: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

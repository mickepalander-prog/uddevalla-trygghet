import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uddevalla Trygghet & Larm</Text>
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>Status: Ansluten</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusBox: {
    backgroundColor: '#e6fffa',
    borderColor: '#38b2ac',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
  },
  statusText: {
    color: '#234e52',
    fontWeight: '600',
    fontSize: 16,
  },
});
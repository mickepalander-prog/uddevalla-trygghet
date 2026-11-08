import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function ProfileScreen() {
  const handleDeleteAccount = () => {
    Alert.alert(
      'Radera konto',
      'Är du säker på att du vill radera ditt konto och all sparad data?',
      [
        { text: 'Avbryt', style: 'cancel' },
        { text: 'Radera', style: 'destructive', onPress: () => console.log('Konto raderas...') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Användarprofil</Text>
      <Text style={styles.info}>Inloggad i Uddevalla Trygghet</Text>
      
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Radera mitt konto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  deleteButton: {
    backgroundColor: '#ffebe6',
    borderWidth: 1,
    borderColor: '#ffbdad',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#de350b',
    fontWeight: 'bold',
  },
});
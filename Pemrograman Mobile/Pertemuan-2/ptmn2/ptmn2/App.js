import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
         Nama Lengkap : Ahmad aly{"\n"}
         NIM : 2488010069{"\n"}
         Asal Sekolah : MAN 1 BEKASI{"\n"}
         Cita-cita : Staff Offcie{"\n"}
         Rencana mencapai cita-cita : Berangkat haji{"\n"}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
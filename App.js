import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaActivity } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kmvubkqmkvcjttocsrnf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rBU_QjFOC41J08Yc6vL3w_s-ZZr5QD';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Kör Supabase-anropet säkert inuti useEffect efter att komponenten har laddats
    supabase.auth.getSession().catch(err => console.log(err));
    setReady(true);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Uddevalla Trygghet & Larm</Text>
      <Text style={styles.subText}>{ready ? 'Status: Ansluten' : 'Laddar...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subText: { color: '#0f0', fontSize: 14, marginTop: 10 }
});
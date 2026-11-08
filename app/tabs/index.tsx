import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kmvubkqmkvcjttocsrnf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rBU_QjFOC41J08Yc6vL3w_s-ZZr5QD';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function HomeScreen() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function handleLogin() {
    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setErrorMessage(error.message);
    setLoading(false);
  }

  async function handleSignUp() {
    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setErrorMessage(error.message);
    setLoading(false);
  }

  if (session && session.user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Uddevalla Trygghet & Larm</Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Status: Ansluten</Text>
          <Text style={styles.userText}>Inloggad som: {session.user.email}</Text>
        </View>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => supabase.auth.signOut()}>
          <Text style={styles.buttonText}>Logga ut</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uddevalla Trygghet & Larm</Text>
      <Text style={styles.subtitle}>Logga in för att se larmstatus</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="E-postadress"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#38b2ac" />
      ) : (
        <>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
            <Text style={styles.buttonText}>Logga in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Skapa konto</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#aaa',
    marginBottom: 24,
  },
  statusBox: {
    backgroundColor: '#1e293b',
    borderColor: '#38b2ac',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  statusText: {
    color: '#38b2ac',
    fontWeight: '600',
    fontSize: 16,
  },
  userText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 6,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonPrimary: {
    width: '100%',
    height: 50,
    backgroundColor: '#0284c7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: '#334155',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 12,
  },
});
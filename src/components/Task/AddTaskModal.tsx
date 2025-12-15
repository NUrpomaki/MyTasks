import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Modal uuden tehtävän lisäämistä varten.
// Tässä vaiheessa: otsikko + kuvaus + lisää/peruuta, ei vielä kuvaa.
const AddTaskModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description?: string) => void;
}> = ({ visible, onClose, onAdd }) => {
  const { theme } = useTheme();

  // Lomakkeen tila
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Tyhjennetään kentät ja suljetaan modali
  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  // Validointi + lisäys
  const handleAdd = () => {
    // Robustisuus: otsikko on pakollinen
    if (!title.trim()) {
      Alert.alert('Puuttuu otsikko', 'Anna tehtävälle otsikko.');
      return;
    }

    // Kutsutaan parentin antamaa callbackia
    onAdd(title.trim(), description.trim() || undefined);

    // Tyhjennetään lomake ja suljetaan modali
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      {/* Tumma tausta modaalin alla */}
      <View style={styles.backdrop}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Lisää uusi tehtävä
          </Text>

          {/* Otsikko */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Otsikko</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Tehtävän otsikkko"
            placeholderTextColor={theme.colors.text}
            style={[
              styles.input,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
          />

          {/* Kuvaus */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Kuvaus (valinnainen)</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Lisätiedot tehtävästä"
            placeholderTextColor={theme.colors.text}
            multiline
            style={[
              styles.input,
              styles.textArea,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
          />

          {/* Napit */}
          <View style={styles.row}>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.secondaryBtn, { borderColor: theme.colors.border }]}
            >
              <Text style={{ color: theme.colors.text, fontWeight: '700' }}>
                Peruuta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={{ color: '#fff', fontWeight: '900' }}>
                Lisää
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontWeight: '700',
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default AddTaskModal;

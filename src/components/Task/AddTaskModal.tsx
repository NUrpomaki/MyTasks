import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TaskPriority } from '../../types/Task';
import PriorityPicker from './PriorityPicker';
import DueDatePicker from './DueDatePicker';
import * as ImagePicker from 'expo-image-picker';

// Modal uuden tehtävän lisäämistä varten.
// Sisältää otsikon, kuvauksen, prioriteetin ja määräajan valinnan.
const AddTaskModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onAddTask: (
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: number,
    imageUri?: string
  ) => void;
}> = ({ visible, onClose, onAddTask }) => {
  const { theme } = useTheme();

  // Lomakkeen tila
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  // Tyhjennetään kentät ja suljetaan modali
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(null);
    setImageUri(undefined);
    onClose();
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Oikeudet puuttuu', 'Salli kuvakirjaston käyttö valitaksesi kuvan.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Validointi + lisäys
  const handleAdd = () => {
    // Robustisuus: otsikko on pakollinen
    if (!title.trim()) {
      Alert.alert('Puuttuu otsikko', 'Anna tehtävälle otsikko.');
      return;
    }

    // Kutsutaan parentin antamaa callbackia
    onAddTask(
      title.trim(),
      description.trim() || undefined,
      priority,
      dueDate ? dueDate.getTime() : undefined,
      imageUri
    );

    // Tyhjennetään lomake ja suljetaan modali
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(null);
    setImageUri(undefined);
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
            placeholderTextColor={theme.colors.border}
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
            placeholderTextColor={theme.colors.border}
            multiline
            style={[
              styles.input,
              styles.textArea,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
          />

          {/* Prioriteetti */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Prioriteetti</Text>
          <PriorityPicker selected={priority} onSelect={setPriority} />

          {/* Määräaika */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Määräaika (valinnainen)</Text>
          <DueDatePicker value={dueDate} onChange={setDueDate} />

          {/* Kuva */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Kuva (valinnainen)</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={[
              styles.imageBtn,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={styles.imageBtnText}>Valitse kuva</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}

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
  imageBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  imageBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 6,
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

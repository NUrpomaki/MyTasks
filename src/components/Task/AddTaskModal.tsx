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
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Modal uuden tehtävän lisäämistä varten.
const AddTaskModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description?: string, imageUri?: string) => void;
}> = ({ visible, onClose, onAdd }) => {
  const { theme } = useTheme();

  // Lomakkeen tila
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setImageUri(undefined);
    onClose();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Puuttuu otsikko', 'Anna tehtävälle otsikko.');
      return;
    }

    onAdd(title.trim(), description.trim() || undefined, imageUri);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
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
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Otsikko
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Tehtävän otsikko"
            placeholderTextColor={theme.colors.text}
            style={[
              styles.input,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
          />

          {/* Kuvaus */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Kuvaus (valinnainen)
          </Text>
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

          <Text style={[styles.label, { color: theme.colors.text }]}>
            Lisää kuva (valinnainen)
          </Text>

          <TouchableOpacity
            onPress={pickImage}
            style={[
              styles.imageButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.imageButtonText}>Valitse kuva</Text>
          </TouchableOpacity>

          {imageUri && (
            <>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Valittu kuva
              </Text>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            </>
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
              style={[
                styles.primaryBtn,
                { backgroundColor: theme.colors.primary },
              ]}
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
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 10,
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
  imageButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AddTaskModal;

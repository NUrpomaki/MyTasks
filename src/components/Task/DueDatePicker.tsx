import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  Platform 
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Komponentti määräajan valitsemiseen tehtävälle

interface DueDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DueDatePicker: React.FC<DueDatePickerProps> = ({ value, onChange }) => {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  // Väliaikainen päivämäärä iOS-modalia varten
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  // Muotoillaan päivämäärä näytettäväksi
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Käsitellään päivämäärän muutos
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // Androidilla picker sulkeutuu automaattisesti
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS:lla päivitetään väliaikainen päivämäärä
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  // Avataan picker
  const handleOpen = () => {
    setTempDate(value || new Date());
    setShowPicker(true);
  };

  // Poistetaan määräaika
  const handleClear = () => {
    onChange(null);
    setShowPicker(false);
  };

  // Vahvistetaan valinta (iOS)
  const handleConfirm = () => {
    onChange(tempDate);
    setShowPicker(false);
  };

  // Peruutetaan valinta (iOS)
  const handleCancel = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Päänäppäin päivämäärän valintaan */}
      <TouchableOpacity
        onPress={handleOpen}
        style={[
          styles.button,
          { 
            borderColor: theme.colors.border,
            backgroundColor: value ? theme.colors.primary + '15' : 'transparent',
          },
        ]}
      >
        <Ionicons 
          name="calendar-outline" 
          size={18} 
          color={value ? theme.colors.primary : theme.colors.border} 
        />
        <Text 
          style={[
            styles.buttonText, 
            { color: value ? theme.colors.primary : theme.colors.text }
          ]}
        >
          {value ? formatDate(value) : 'Lisää määräaika'}
        </Text>
      </TouchableOpacity>

      {/* Poista-nappi näkyy vain kun päivämäärä on valittu */}
      {value && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={22} color={theme.colors.border} />
        </TouchableOpacity>
      )}

      {/* DateTimePicker - Androidilla suoraan */}
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}

      {/* iOS Modal - käytetään inline displayta joka toimii paremmin */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalBackdrop}>
            <TouchableOpacity 
              style={styles.modalOverlay} 
              activeOpacity={1} 
              onPress={handleCancel}
            />
            <View 
              style={[
                styles.modalContent, 
                { backgroundColor: theme.colors.card }
              ]}
            >
              <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={[styles.modalButton, { color: theme.colors.danger }]}>
                    Poista
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  Valitse päivä
                </Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={[styles.modalButton, { color: theme.colors.primary }]}>
                    Valmis
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                onChange={handleChange}
                minimumDate={new Date()}
                style={styles.iosPicker}
                themeVariant={theme.name === 'dark' ? 'dark' : 'light'}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  iosPicker: {
    height: 350,
  },
});

export default DueDatePicker;
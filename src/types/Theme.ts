export interface Colors {
  primary: string; // Pääväri (esim. painikkeisiin)
  background: string; // Taustaväri (vaalea/tumma)
  text: string; // Tekstin väri
  card: string; // Komponenttien taustaväri
  border: string; // Reunaviivojen väri
  success: string; // Valmis/onnistunut väri
  danger: string; // Poisto/virhe väri
  priorityHigh: string; // Korkea prioriteetti
  priorityMedium: string; // Keskitason prioriteetti
  priorityLow: string; // Matala prioriteetti
}

export type ThemeName = 'light' | 'dark';

export interface Theme {
  name: ThemeName;
  colors: Colors;
}
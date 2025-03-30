export const colors = {
  // Couleurs principales
  primary: {
    main: "#3A78A5",
    light: "#60A5FA",
    dark: "#2563EB",
  },
  // Couleurs de texte
  text: {
    primary: "#111827",
    secondary: "#374151",
    placeholder: "#9CA3AF",
    label: "#B3EBFF",
    white: "#FFFFFF",
  },
  // Couleurs de fond
  background: {
    default: "#0D1A2A",
    input: "#F9FAFB",
    error: "#FEE2E2",
    page: "#050A11",
    navbar: "#0D1A2A",
  },
  // Couleurs d'état
  state: {
    error: "#A72525",
    success: "#10B981",
  },
  // Couleurs des composants
  components: {
    // NavBar
    navbar: {
      background: "#0D1A2A",
      icon: {
        active: "#B3EBFF",
        inactive: "#FFFFFF",
      },
    },
    // Titre
    titre: {
      text: {
        normal: "#FFFFFF",
        highlight: "#B3EBFF",
      },
      line: "#B3EBFF",
    },
    // Button
    button: {
      primary: {
        background: "#3A78A5",
        text: "#FFFFFF",
        hover: "#2563EB",
      },
      secondary: {
        background: "#F9FAFB",
        text: "#111827",
        hover: "#E5E7EB",
      },
    },
    // TextInput
    textInput: {
      background: "#F9FAFB",
      border: "#E5E7EB",
      text: "#111827",
      placeholder: "#9CA3AF",
      focus: "#3A78A5",
      error: "#A72525",
    },
    // HelpText
    helpText: {
      text: "#374151",
      error: "#A72525",
    },
    // Info
    info: {
      background: {
        info: "#F3F4F6",
        error: "#FEE2E2",
        success: "#ECFDF5",
      },
      text: {
        info: "#374151",
        error: "#A72525",
        success: "#10B981",
      },
      border: {
        info: "#E5E7EB",
        error: "#FCA5A5",
        success: "#A7F3D0",
      },
    },
    // SettingsItem
    settingsItem: {
      background: "#316285",
      hover: "#F9FAFB",
      icon: {
        background: "#0D1A2A",
        color: "#B3EBFF",
      },
      text: "#FFFFFF",
    },
  },
} as const; 
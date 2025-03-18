import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showSnackbar = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{
          backgroundColor: "#333",  // Dark gray background for a modern feel
          borderRadius: 8,  // Rounded corners
          paddingHorizontal: 16,  // Padding for better spacing
        }}
        theme={{ colors: { surface: "#fff" } }}  // Ensures the action button is properly styled
        action={{
          label: "OK",
          onPress: () => setVisible(false),
          textColor: "#FFD700", // Gold color for contrast
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

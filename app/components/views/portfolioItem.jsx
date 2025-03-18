import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InvestmentItem = ({ investment }) => {
  const currentValue = investment.qty * investment.nav;
  const isProfit = currentValue >= investment.invested;
  const percentChange = (currentValue - investment.invested ) * 100 / investment.invested;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {investment.provider} - {investment.type}
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{investment.qty}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>NAV:</Text>
        <Text style={styles.value}>₹{investment.nav.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Invested:</Text>
        <Text style={styles.value}>₹{investment.invested.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Current Value:</Text>
        <Text style={[styles.value, isProfit ? styles.profit : styles.loss]}>
          ₹{currentValue.toFixed(2)} ({percentChange.toFixed(2)}%) 
        </Text>
      </View>
    </View>
  );
};

export default InvestmentItem;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginVertical: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#BBBBBB",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DDDDDD",
  },
  profit: {
    color: "#4CAF50", // Green for profit
  },
  loss: {
    color: "#FF5252", // Red for loss
  },
});

import React, { useMemo } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import userHoldings from "../../resources/user_holdings.json";
import items from "../../resources/items.json";
import { useRouter } from 'expo-router';
import PortfolioItem from "./portfolioItem";

const Portfolio = ({ navigation }) => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const router = useRouter();

  const userInvestments = useMemo(() => {
    const userData = userHoldings.find((user) => user.userId === userId);
    if (!userData) return [];

    return userData.holdings.map((holding) => {
      const fund = items.find((item) => item.id === holding.fundId);
      return {
        ...fund,
        qty: holding.qty,
        invested: holding.invested,
      };
    });
  }, [userId, userHoldings, items]);

  const totalPortfolioValue = useMemo(() => {
    return userInvestments.reduce((sum, investment) => sum + investment.invested, 0);
  }, [userInvestments]);

  const currentValue = useMemo(() => {
    return userInvestments.reduce((sum, investment) => sum + (investment.qty * investment.nav), 0);
  }, [userInvestments]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/components/auth/login");
  };

  const handleInvestmentClick = (investment) => {
    alert(`Clicked on: ${investment.type} - NAV: ₹${investment.nav.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Portfolio</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Invested: ₹{totalPortfolioValue.toFixed(2)}</Text>
        <Text 
          style={[
            styles.summaryText, 
            currentValue >= totalPortfolioValue ? styles.profitText : styles.lossText
          ]}
        >
          Current Value: ₹{currentValue.toFixed(2)}
        </Text>
      </View>
          
          <FlatList
            data={userInvestments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => handleInvestmentClick(item)}>
               <PortfolioItem investment={item} />
              </TouchableOpacity>
          }
          />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // Dark Mode Background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White Title
    textAlign: "center",
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: "#1E1E1E", // Dark Card
    padding: 18,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E0E0E0", // Light Gray for Contrast
    textAlign: "center",
    marginVertical: 5,
  },
  profitText: {
    color: "#4CAF50", // Green for Profit
  },
  lossText: {
    color: "#FF5252", // Red for Loss
  },
  logoutButton: {
    backgroundColor: "#FF3B30", // Red background
    paddingVertical: 8,  // Reduced padding for a smaller button
    paddingHorizontal: 16, 
    borderRadius: 6, // Slightly smaller rounded corners
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Centers the button
    marginTop: 15,
  },
  logoutButtonText: {
    color: "#FFFFFF", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
  investmentItem: {
    backgroundColor: "#1E1E1E", // Darker Background for Investment Cards
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  investmentText: {
    color: "#E0E0E0", // Light Gray Text
    fontSize: 16,
  },
});


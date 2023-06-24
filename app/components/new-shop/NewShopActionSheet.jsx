import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NewShopContext } from "../../globals/NewShopContext";
import { persistor } from "../../state/persistor";
import { selectMeals } from "../../state/reducers/mealReducer";
import { useSelector } from "react-redux";

function NewShopActionSheet({ DisplayComponent = null }) {
    const meals = useSelector((state) => selectMeals(state));
    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();
    const { setManualModalVisible, setAutoModalVisible, setMealModalVisible } =
        useContext(NewShopContext);

    const allOptions = (index) => {
        switch (index) {
            case 0:
                navigation.navigate("Meals");
                setMealModalVisible(true);
                break;
            case 1:
                setAutoModalVisible(true);
                break;
            case 2:
                setManualModalVisible(true);
                break;
            case 3:
                persistor.purge();
                break;
        }
    };

    const limitedOptions = (index) => {
        switch (index) {
            case 0:
                console.log("Add Meal");
                break;
        }
    };

    const handlePress = () => {
        if (meals.length > 6) {
            const options = [
                "Add Meal",
                "Shop Chef's Choice",
                "Shop Your Picks",
                "Purge Shops",
                "Cancel",
            ];
            const cancelButtonIndex = 4;

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                allOptions
            );
        } else {
            options = ["Add Meal", "Cancel"];
            cancelButtonIndex = 1;
            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                limitedOptions
            );
        }
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
                {DisplayComponent ? (
                    <DisplayComponent />
                ) : (
                    <Text style={{ textAlign: "center", fontSize: 40 }}>+</Text>
                )}
            </TouchableOpacity>
        </>
    );
}

export default NewShopActionSheet;

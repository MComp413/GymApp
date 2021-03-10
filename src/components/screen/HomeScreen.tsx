import { ComponentType } from "react"
import { Button, View, Text } from "react-native";

const HomeScreen = (props: { navigation: any }) =>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Home </Text>
        <Button
            title="Go to Details"
            onPress={() => props.navigation.navigate("Details")}
        />
    </View>

export default HomeScreen
import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout(){
    return (
        <View classname="flex-1 bg-black items-center justify-center">
            <Text classname='text-white'>Layout general</Text>
            <Slot></Slot>
        </View>
    )
}
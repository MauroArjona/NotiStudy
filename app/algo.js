import { Link } from "expo-router";
import { ScrollView, Text } from "react-native-web";

export default function Algo(){
    return (
        <ScrollView>
            <Text>Ruta de prueba</Text>
            <Link href='/'>Enlace a home</Link>
        </ScrollView>
    )
}
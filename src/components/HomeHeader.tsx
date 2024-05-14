import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto
                source={{ uri: 'https://github.com/silasjuniordev.png' }}
                alt="Imagem do usuário"
                size={16}
                mr={4}
            />

            <VStack flex={1}>
                <Text color="white" fontSize="md">
                    Olá,
                </Text>

                <Heading color="white" fontSize="md" fontFamily="heading">
                    Silas
                </Heading>
            </VStack>

            <TouchableOpacity>
                <Icon 
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    )
}
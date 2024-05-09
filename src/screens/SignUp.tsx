import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image 
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando na academia"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={32}>
                    <LogoSvg />
                    <Text color="gray.100" fontSize="sm" mb={6} fontFamily="body">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Crie sua conta
                    </Heading>

                    <Input 
                        placeholder="Nome"
                    />

                    <Input 
                        placeholder="E-mail" 
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input 
                        placeholder="Senha" 
                        secureTextEntry
                    />

                    <Button title="Criar e acessar" />
                </Center>
                
                    <Button 
                        title="Voltar para o login" 
                        variant="outline"
                        mt={24}
                        onPress={handleGoBack}
                    />

            </VStack>
        </ScrollView>
    )
}
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as yup from 'yup'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
    email: string
    password: string
}

const signInSchema = yup.object({
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos')
})

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    })

    function handleSignIn( { email, password }: FormDataProps ) {
        console.log({ email, password })
    }

    function handleNewAccount() {
        navigation.navigate('signUp')
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

                <Center my={28}>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse sua conta
                    </Heading>

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="E-mail" 
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Senha" 
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button 
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)} 
                    />
                </Center>

                <Center my={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>

                    <Button 
                        title="Criar conta" 
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>

            </VStack>
        </ScrollView>
    )
}
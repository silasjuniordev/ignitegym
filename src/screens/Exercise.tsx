import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string
}

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [ exerciseDetails, setExerciseDetails ] = useState<ExerciseDTO>({} as ExerciseDTO)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ sendExerciseHistory, setSendExerciseHistory ] = useState(false)

    const route = useRoute()
    const { exerciseId } = route.params as RouteParamsProps

    const toast = useToast()

    function handleGoBack() {
        navigation.goBack()
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseId}`)
            setExerciseDetails(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes dos exercícios. Tente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendExerciseHistory(true)

            await api.post('/history', { exercise_id: exerciseId })

            toast.show({
                title: 'Parabéns! Exercício concluído.',
                placement: 'top',
                bgColor: 'green.700'
            })

            navigation.navigate('history')

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar o exercício. Tente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setSendExerciseHistory(false)
        }
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
                </TouchableOpacity>

                <HStack mt={4} mb={8} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
                        {exerciseDetails.name}
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            {exerciseDetails.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            
            { isLoading ? <Loading /> :
                <ScrollView>
                    <VStack p={8}>
                        <Box rounded="lg" mb={3} overflow="hidden">
                            <Image 
                                w="full"
                                h={80}
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}` }}
                                alt="Imagem do exercício"
                                resizeMode="cover"
                                rounded="lg"
                                overflow="hidden"
                            />
                        </Box>

                        <Box bg="gray.600" rounded="md" pb={4} px={4}>
                            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                                <HStack>
                                    <SeriesSvg />
                                    <Text color="gray.200" ml={2}>
                                        {exerciseDetails.series} séries
                                    </Text>
                                </HStack>

                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="gray.200" ml={2}>
                                        {exerciseDetails.repetitions} repetições
                                    </Text>
                                </HStack>
                            </HStack>

                            <Button 
                                title="Marcar como realizado"
                                isLoading={sendExerciseHistory}
                                onPress={handleExerciseHistoryRegister}
                            />
                        </Box>
                    </VStack>
                </ScrollView>
            }
        </VStack>
    )
}
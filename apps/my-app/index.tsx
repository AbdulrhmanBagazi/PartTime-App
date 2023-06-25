import 'react-native-gesture-handler'
import { Assets } from '@react-navigation/elements'
import { registerRootComponent } from 'expo'
import { Asset } from 'expo-asset'
import App from './screen/app'

Asset.loadAsync(Assets)

registerRootComponent(App)

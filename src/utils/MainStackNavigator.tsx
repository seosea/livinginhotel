import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Home, Category, Alarm, MyPage } from '../pages'
import { Header } from '../components'

import { Image, StyleSheet } from 'react-native'
import colorSchema from '../globals/colorSchema'

//image
import {
  AlarmOff,
  AlarmOn,
  ProfileOff,
  ProfileOn,
  HomeOff,
  HomeOn,
  CategoryOff,
  CategoryOn
} from '../assets/images/footer'

const MainStackNavigator = createNativeStackNavigator()
const TabStackNavigator = createBottomTabNavigator()

function TabScreen() {
  return (
    <TabStackNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colorSchema.green3,
        inactiveTintColor: colorSchema.navy3
      }}
    >
      <TabStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: '홈',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={HomeOn} />
            } else {
              return <Image style={styles.icon} source={HomeOff} />
            }
          }
        }}
      />
      <TabStackNavigator.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          title: '카테고리',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={CategoryOn} />
            } else {
              return <Image style={styles.icon} source={CategoryOff} />
            }
          }
        }}
      />
      <TabStackNavigator.Screen
        name="Alarm"
        component={Alarm}
        options={{
          headerShown: false,
          title: '알림',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={AlarmOn} />
            } else {
              return <Image style={styles.icon} source={AlarmOff} />
            }
          }
        }}
      />
      <TabStackNavigator.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
          title: '마이페이지',

          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={ProfileOn} />
            } else {
              return <Image style={styles.icon} source={ProfileOff} />
            }
          }
        }}
      />
    </TabStackNavigator.Navigator>
  )
}

const HomeStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <Header />
      <MainStackNavigator.Navigator>
        <MainStackNavigator.Screen
          name="TabScreen"
          component={TabScreen}
          options={{ headerShown: false }}
        />
      </MainStackNavigator.Navigator>
    </SafeAreaProvider>
  )
}

export default HomeStackNavigator

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})

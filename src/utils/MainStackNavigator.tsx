import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Home, Category, Alarm, MyPage, Splash } from '../pages'

import { Image, StyleSheet, StatusBar } from 'react-native'
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
import { Header } from '../components'

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
          title: '홈',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={HomeOn} />
            } else {
              return <Image style={styles.icon} source={HomeOff} />
            }
          },
          header: props => {
            return <Header />
          }
        }}
      />
      <TabStackNavigator.Screen
        name="Category"
        component={Category}
        options={{
          title: '카테고리',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={CategoryOn} />
            } else {
              return <Image style={styles.icon} source={CategoryOff} />
            }
          },
          header: props => <Header />
        }}
      />
      <TabStackNavigator.Screen
        name="Alarm"
        component={Alarm}
        options={{
          title: '알림',
          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={AlarmOn} />
            } else {
              return <Image style={styles.icon} source={AlarmOff} />
            }
          },
          header: props => <Header />
        }}
      />
      <TabStackNavigator.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: '마이페이지',

          tabBarIcon: props => {
            if (props.focused) {
              return <Image style={styles.icon} source={ProfileOn} />
            } else {
              return <Image style={styles.icon} source={ProfileOff} />
            }
          },
          header: props => {
            return <Header />
          }
        }}
      />
    </TabStackNavigator.Navigator>
  )
}

const HomeStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={colorSchema.white}
        barStyle={'dark-content'}
      />
      <MainStackNavigator.Navigator>
        <MainStackNavigator.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
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

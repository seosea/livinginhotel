import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//globals
import colorSchema from '../../globals/colorSchema'

const MyPage = () => {
  return (
    <View style={styles.contentsContainer}>
      <Text style={styles.contentsText}>마이페이지</Text>
    </View>
  )
}

export default MyPage

const styles = StyleSheet.create({
  contentsText: {
    fontWeight: '400',
    color: colorSchema.navy3,
    fontSize: 16
  },
  contentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

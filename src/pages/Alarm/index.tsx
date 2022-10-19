import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//globals
import colorSchema from '../../globals/colorSchema'

const Alarm = () => {
  return (
    <View style={styles.contentsContainer}>
      <Text style={styles.contentsText}>알림 페이지</Text>
    </View>
  )
}

export default Alarm

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

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { SkypeIndicator, MaterialIndicator } from 'react-native-indicators'

import colorSchema from '../../globals/colorSchema'

class LoadingIndicator extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            zIndex: 9999,
            backgroundColor: colorSchema.white,
            opacity: 0.7,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MaterialIndicator color={colorSchema.navy1} size={40} />
        </View>
      )
    } else {
      return null
    }
  }
}

export default connect(state => ({
  isLoading: state.appState.isLoading
}))(LoadingIndicator)

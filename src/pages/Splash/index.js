import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image } from 'react-native'

import { StackActions } from '@react-navigation/native'

//globals
import colorSchema from '../../globals/colorSchema'

//image
import LogoImage from '../../assets/images/header/img_logo.png'

//redux
import { initializeApp } from '../../redux/reducers/appState'
import { getMainData } from '../../redux/reducers/main'

class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMainData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appState !== this.props.appState) {
      switch (this.props.state) {
        case 'SUCCESS_GET_MAIN_DATA':
          return this.props.navigation.dispatch(
            StackActions.replace('TabScreen', {
              screen: 'Home'
            })
          )
          break
        default:
          break
      }
    }
  }

  render() {
    return (
      <View style={styles.contentsContainer}>
        <Image style={styles.logoImage} source={LogoImage} />
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  appState: state.appState,
  state: state.appState.state,
  data: state.appState.data
})

const mapDispatchToProps = (dispatch: any) => ({
  initializeApplication: () => dispatch(initializeApplication()),
  getMainData: () => dispatch(getMainData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: { height: 56, width: 146, resizeMode: 'contain' }
})

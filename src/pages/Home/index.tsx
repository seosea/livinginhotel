import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'

// navigation
import { useNavigation } from '@react-navigation/native'

//component
import Banner from './components/Banner'
import Promotion from './components/Promotion'
import Catalog from './components/Catalog'

//globals
import colorSchema from '../../globals/colorSchema'

const Home = (props: any) => {
  const navigation = useNavigation()

  {
    return (
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Banner />
        <Promotion />
        <Catalog />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: any) => ({
  appState: state.appState,
  state: state.appState.state,
  data: state.appState.data
})

const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: colorSchema.navy1
  }
})

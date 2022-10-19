import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Pressable } from 'react-native'

// navigation
import { useNavigation } from '@react-navigation/native'

//redux
import { getMainData } from '../../redux/reducers/main'

//component
import Banner from './components/Banner'
import Promotion from './components/Promotion'
import Catalog from './components/Catalog'

const Home = (props: any) => {
  const navigation = useNavigation()

  useEffect(() => {
    props.getMainData()
  }, [])

  {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
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

const mapDispatchToProps = (dispatch: any) => ({
  getMainData: () => dispatch(getMainData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

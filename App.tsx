import React from 'react'

// navigation
import { NavigationContainer } from '@react-navigation/native'
import MainStackNavigator from './src/utils/MainStackNavigator'

//redux
import { Provider } from 'react-redux'
import { store } from './src/redux'

class App extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

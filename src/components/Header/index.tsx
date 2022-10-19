import React, { useState } from 'react'
import {
  View,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput
} from 'react-native'

import colorSchema from '../../globals/colorSchema'
import styleSchema from '../../globals/styleSchema'

// image
import Logo from '../../assets/images/header/img_logo.png'
import Profile from '../../assets/images/header/ic_profile_24.png'

const Header = () => {
  const [searchWord, setSearchWord] = useState('')

  return (
    <SafeAreaView>
      <StatusBar />
      <View
        style={{
          height: 60,
          width: Dimensions.get('screen').width,
          backgroundColor: colorSchema.white,
          padding: styleSchema.marginDefault,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Image
          style={{ height: 28, width: 73, resizeMode: 'contain' }}
          source={Logo}
        />
        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
          <TextInput
            style={{
              backgroundColor: colorSchema.gray6,
              borderRadius: 22,
              height: 32,
              marginHorizontal: styleSchema.marginDefault,
              flex: 1
            }}
            value={searchWord}
          />
          <Image
            style={{ height: 24, width: 24, resizeMode: 'contain' }}
            source={Profile}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header

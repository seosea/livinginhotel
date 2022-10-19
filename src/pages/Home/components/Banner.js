import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions, Image } from 'react-native'

import Carousel from 'react-native-snap-carousel'
import colorSchema from '../../../globals/colorSchema'
import styleSchema from '../../../globals/styleSchema'

//image
import BtnGo from '../assets/btn_go.png'

const width = Dimensions.get('screen').width

const Banner = props => {
  const [banners, setBanners] = useState([])
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)

  useEffect(() => {
    setBanners(props.banners)
  }, [banners])

  {
    return (
      <View style={{ backgroundColor: colorSchema.white }}>
        {banners && banners.length > 0 && (
          <View
            style={{
              width: width - styleSchema.marginDefault * 2,
              height: 172,
              paddingHorizontal: 24,
              paddingTop: 33,
              paddingBottom: 24,
              backgroundColor: colorSchema.white,
              position: 'absolute',
              bottom: 32,
              right: styleSchema.marginDefault,
              zIndex: 9999,
              shadowOffset: {
                width: 0,
                height: 4
              },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 6,
              shadowColor: '#000'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                marginBottom: 14,
                color: colorSchema.navy1,
                fontWeight: '400'
              }}
            >
              {banners[currentCarouselIndex].name ?? ''}
            </Text>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 24,
                color: colorSchema.navy1,
                fontWeight: '600',
                flex: 1
              }}
            >
              {banners[currentCarouselIndex].description ?? ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  color: colorSchema.green3,
                  fontWeight: '700',
                  width: width - 150
                }}
              >
                {banners[currentCarouselIndex].promotion ?? ''}
              </Text>
              <Image
                style={{ width: 50, height: 24, resizeMode: 'contain' }}
                source={BtnGo}
              />
            </View>
          </View>
        )}
        <View style={{ paddingBottom: 188 }}>
          <Carousel
            autoPlay={true}
            autoplayInterval={5000}
            data={banners}
            renderItem={({ item, index }) => {
              return (
                <View style={{ height: 270, backgroundColor: 'pink' }}>
                  <Image
                    style={{ width: width, height: 270, resizeMode: 'cover' }}
                    source={{
                      uri: item.mobile_images
                    }}
                  />
                </View>
              )
            }}
            sliderWidth={width}
            itemWidth={width}
            style={{ zIndex: 0 }}
            onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  state: state.appState.state,
  data: state.appState.data,
  banners: state.appState.data.banners,
  catalogs: state.appState.data.catalogs
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)

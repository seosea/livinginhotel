import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native'

import Carousel from 'react-native-snap-carousel'

import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  FlingGestureHandler,
  Directions
} from 'react-native-gesture-handler'

//globals
import colorSchema from '../../../globals/colorSchema'
import styleSchema from '../../../globals/styleSchema'
import * as constants from '../../../globals/constants'

import { ProgressBar } from '../../../components'

//image
import BtnGoImage from '../assets/btn_go.png'
import ArrowRightImage from '../../../assets/images/arrow/ic_arrow_right_w_16.png'
import ArrowLeftImage from '../../../assets/images/arrow/ic_arrow_left_w_16.png'

import * as Convertor from '../../../utils/convertor'

const width = Dimensions.get('screen').width

const CAROUSEL_TIME = 5

const Banner = props => {
  const [banners, setBanners] = useState([])
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [progressTime, setProgressTime] = useState(0)
  const carouselRef = new useRef(null)

  useEffect(() => {
    setBanners(props.banners)
  }, [banners])

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.floor((progressTime / (banners.length * CAROUSEL_TIME)) * 100) >=
        100
      )
        return
      setProgressTime(progressTime + 1)
      if ((progressTime + 1) % CAROUSEL_TIME === 0) {
        carouselRef.current.snapToNext()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [progressTime])

  const onPreviousCarouselPress = () => {
    carouselRef.current.snapToPrev()
    console.log((currentCarouselIndex - 1) * CAROUSEL_TIME)
    setProgressTime((currentCarouselIndex - 1) * CAROUSEL_TIME)
  }

  const onNextCarouselPress = () => {
    carouselRef.current.snapToNext()
    setProgressTime((currentCarouselIndex - 1) * CAROUSEL_TIME)
  }

  const renderCarouselNavigation = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 214,
          left: styleSchema.marginDefault,
          right: styleSchema.marginDefault,
          width: width - styleSchema.marginDefault * 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 24
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              fontWeight: '700',
              color: colorSchema.white,
              fontStyle: 'italic',
              marginRight: styleSchema.marginDefault,
              fontFamily: constants.FONT_TYPE.PT_SERIF
            }}
          >{`${currentCarouselIndex + 1} / ${banners.length}`}</Text>

          <ProgressBar
            progress={currentCarouselIndex / (banners.length - 1)}
            width={160}
            height={2}
            unfilledColor={Convertor.convertOpacityColor(
              colorSchema.white,
              0.1
            )}
            color={colorSchema.white}
            borderColor={Convertor.convertOpacityColor(colorSchema.white, 0)}
          />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              fontWeight: '700',
              color: colorSchema.white,
              fontStyle: 'italic',
              marginLeft: 4,
              fontFamily: constants.FONT_TYPE.PT_SERIF
            }}
          >{`${Math.floor(
            (currentCarouselIndex / (banners.length - 1)) * 100
          )}%`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={onPreviousCarouselPress}
            disabled={currentCarouselIndex === 0}
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colorSchema.white,
              borderRadius: 100,
              marginRight: 8,

              opacity: currentCarouselIndex === 0 ? 0.5 : 1
            }}
          >
            <Image
              style={{ width: 16, height: 16, resizeMode: 'contain' }}
              source={ArrowLeftImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNextCarouselPress}
            disabled={currentCarouselIndex + 1 === banners.length}
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colorSchema.white,
              borderRadius: 100,
              opacity: currentCarouselIndex + 1 === banners.length ? 0.5 : 1
            }}
          >
            <Image
              style={{ width: 16, height: 16, resizeMode: 'contain' }}
              source={ArrowRightImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  {
    return (
      <View style={{ backgroundColor: colorSchema.white }}>
        {banners && banners.length > 0 && (
          <>
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
                  fontWeight: '400',
                  fontFamily: constants.FONT_TYPE.NOTO_SERIF
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
                  flex: 1,
                  fontFamily: constants.FONT_TYPE.NOTO_SERIF
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
                  source={BtnGoImage}
                />
              </View>
            </View>
            {/* <View style={{ paddingBottom: 188 }}>
              <FlingGestureHandler
                direction={Directions.RIGHT}
                onHandlerStateChange={e => {
                  console.log(e)
                }}
                numberOfPointers={1}
              >
                <Animated.View style={{ height: 270 }}>
                  <Image
                    style={{ width: width, height: 270, resizeMode: 'cover' }}
                    source={{
                      uri: banners[currentCarouselIndex].mobile_images
                    }}
                  />
                </Animated.View>
              </FlingGestureHandler>
            </View> */}
          </>
        )}
        <View style={{ paddingBottom: 188 }}>
          <Carousel
            data={banners}
            renderItem={({ item, index }) => {
              return (
                <View style={{ height: 270 }}>
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
            inactiveSlideScale={1}
            onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
            ref={carouselRef}
          />

          {renderCarouselNavigation()}
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

import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'

import Carousel from 'react-native-snap-carousel'

//globals
import colorSchema from '../../../globals/colorSchema'
import styleSchema from '../../../globals/styleSchema'
import * as constants from '../../../globals/constants'

//image
import StarImage from '../assets/ic_star_12.png'
import DiscountImage from '../assets/ic_discount_16.png'
import ArrowRightImage from '../../../assets/images/arrow/ic_arrow_right_w_16.png'
import ArrowLeftImage from '../../../assets/images/arrow/ic_arrow_left_w_16.png'
import TimeSaleImage from '../assets/ic_timesale_12.png'

// utils
import { getPriceString } from '../../../utils/formatter'

// time
import moment from 'moment'
import 'moment/locale/ko'

const width = Dimensions.get('screen').width

const Catalog = props => {
  const [catalogs, setCatalogs] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCityHotel, setSelectedCityHotel] = useState([])
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const carouselRef = new useRef(null)

  useEffect(() => {
    setCatalogs(props.catalogs)

    if (catalogs && catalogs.length > 0) {
      setSelectedCity(catalogs[0].city)
      setSelectedCityHotel(catalogs[0].items)
    }

    console.log(catalogs)
  }, [catalogs])

  const onSelectCityPress = local => {
    setSelectedCity(local.city)
    setSelectedCityHotel(local.items)
    carouselRef.current.snapToItem(0)
    setCurrentCarouselIndex(0)
  }

  const onPreviousCarouselPress = () => {
    carouselRef.current.snapToPrev()
  }

  const onNextCarouselPress = () => {
    carouselRef.current.snapToNext()
  }

  const renderLocalCityItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => onSelectCityPress(item)}
          style={{
            paddingHorizontal: 24,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color:
                selectedCity === item.city
                  ? colorSchema.white
                  : colorSchema.navy3,
              fontWeight: selectedCity === item.city ? '700' : '400',
              fontSize: 16,
              lineHeight: 24
            }}
          >
            {item.city}
          </Text>
        </TouchableOpacity>

        {index !== catalogs.length - 1 && (
          <View
            style={{ backgroundColor: colorSchema.navy3, height: 20, width: 1 }}
          />
        )}
      </View>
    )
  }

  const renderLocalHotelItem = ({ item, index }) => {
    let hasTimeSale = false
    let hotelType = ''

    if (item.timesale && item.timesale.length > 0) {
      hasTimeSale = true

      const now = new Date()
      const end = new Date(item.timesale[0].end_at)

      const diff = end - now

      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24))
      const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const diffMin = Math.floor((diff / (1000 * 60)) % 60)
      const diffSec = Math.floor((diff / 1000) % 60)
      console.log(item.timesale[0].end_at, diffDay, diffHour, diffMin, diffSec)
    }

    switch (item.type) {
      case constants.HOTEL_TYPE.HOTEL:
        hotelType = '호텔'
        break
      case constants.HOTEL_TYPE.MINI_HOTEL:
        hotelType = '미니 호텔'
        break

      default:
        break
    }
    return (
      <View
        style={{
          marginTop: 32,
          paddingHorizontal: styleSchema.marginDefault,
          backgroundColor: colorSchema.white,
          marginHorizontal: styleSchema.marginDefault
        }}
      >
        <View
          style={{
            backgroundColor: colorSchema.navy1,
            height: 32,
            width: width,
            position: 'absolute',
            top: 0
          }}
        />
        <View
          style={{
            width: width - 64,
            height: 180,
            zIndex: 100,
            marginBottom: 16
          }}
        >
          <FlatList
            data={item.events}
            extraData={item.events}
            style={{
              position: 'absolute',
              top: 0,
              left: 16,
              zIndex: 9999
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  backgroundColor: colorSchema.green3
                }}
              >
                <Text style={{ color: colorSchema.white }}>{item}</Text>
              </View>
            )}
          />
          <Text
            style={{
              color: colorSchema.white,
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 16,
              position: 'absolute',
              top: 8,
              right: 12,
              zIndex: 9999
            }}
          >
            {item.subway_station}
          </Text>
          {hasTimeSale && (
            <View
              style={{
                backgroundColor: colorSchema.green3,
                height: 32,
                width: width - 64,
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 9999,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12
              }}
            >
              <Image
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  marginRight: 5
                }}
                source={TimeSaleImage}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 12,
                  color: colorSchema.white
                }}
              >
                {item.timesale[0].remaining}
              </Text>
              <Text></Text>
            </View>
          )}
          <Image
            style={{
              width: width - 64,
              height: 180,
              resizeMode: 'cover'
            }}
            source={{ uri: item.image }}
          />
        </View>
        <View
          style={{
            width: width - 64,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'flex-start',
            overflow: 'scroll'
          }}
        >
          {item.tags.map((tag, index) => {
            return (
              <View
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: colorSchema.gray4,
                  marginRight: 4,
                  marginBottom: 4
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 20,
                    color: colorSchema.gray3
                  }}
                >
                  {tag}
                </Text>
              </View>
            )
          })}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 22,
            color: colorSchema.navy1,
            alignSelf: 'flex-start'
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2
          }}
        >
          {item.star && (
            <>
              <Image
                style={{ width: 12, height: 12, resizeMode: 'contain' }}
                source={require('../assets/ic_star_12.png')}
              />
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  color: colorSchema.navy2
                }}
              >{`${item.star}성급`}</Text>
            </>
          )}
          <View
            style={{
              height: 10,
              width: 1,
              backgroundColor: colorSchema.navy2,
              marginHorizontal: 2
            }}
          />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              color: colorSchema.navy2
            }}
          >
            {hotelType}
          </Text>
        </View>

        <View
          style={{
            height: 0.5,
            backgroundColor: colorSchema.navy2,
            marginVertical: 10
          }}
        />
        {item.price.is_price ? (
          <View
            style={{
              paddingBottom: styleSchema.marginDefault
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 20,
                  color: colorSchema.navy1,
                  marginRight: 4
                }}
              >
                정가
                <Text
                  style={{ textDecorationLine: 'line-through' }}
                >{` ${getPriceString(item.price.price[0].price)}원`}</Text>
              </Text>
              {item.price.is_coupon && (
                <View
                  style={{
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: colorSchema.green3,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{ width: 16, height: 16, resizeMode: 'contain' }}
                    source={DiscountImage}
                  />
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 10,
                      lineHeight: 16,
                      color: colorSchema.green3,
                      marginLeft: 4
                    }}
                  >
                    추가 쿠폰 드려요
                  </Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 28,
                  color: colorSchema.red2,
                  marginLeft: 4
                }}
              >{`${item.price.price[0].discount}%`}</Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  lineHeight: 36,
                  color: colorSchema.navy1,
                  marginLeft: 4
                }}
              >
                {`${getPriceString(item.price.price[0].sale_price)}`}
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 22,
                  color: colorSchema.navy1,
                  marginLeft: 2
                }}
              >
                원~
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: 70,
              justifyContent: 'flex-end',
              paddingBottom: 16
            }}
          >
            <Text>상세페이지에서 가격 확인</Text>
          </View>
        )}
      </View>
    )
  }

  const renderCarouselNavigation = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 24
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

            opacity: currentCarouselIndex === 0 ? 0.5 : 1
          }}
        >
          <Image
            style={{ width: 16, height: 16, resizeMode: 'contain' }}
            source={ArrowLeftImage}
          />
        </TouchableOpacity>
        <Text style={{ color: colorSchema.white, marginHorizontal: 12 }}>{`${
          currentCarouselIndex + 1
        } / ${selectedCityHotel.length}`}</Text>

        <TouchableOpacity
          onPress={onNextCarouselPress}
          disabled={currentCarouselIndex + 1 === selectedCityHotel.length}
          style={{
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colorSchema.white,
            borderRadius: 100,
            opacity:
              currentCarouselIndex + 1 === selectedCityHotel.length ? 0.5 : 1
          }}
        >
          <Image
            style={{ width: 16, height: 16, resizeMode: 'contain' }}
            source={ArrowRightImage}
          />
        </TouchableOpacity>
      </View>
    )
  }

  {
    return (
      <View
        style={{
          backgroundColor: colorSchema.navy1,
          paddingHorizontal: styleSchema.marginDefault,
          paddingVertical: 60,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontWeight: '400',
            fontSize: 24,
            lineHeight: 36,
            color: colorSchema.white,
            marginBottom: 32,
            fontFamily: constants.FONT_TYPE.PT_SERIF
          }}
        >
          Local Hotels
        </Text>

        <FlatList
          data={catalogs}
          extraData={catalogs}
          renderItem={renderLocalCityItem}
          horizontal={true}
          scrollEnabled={false}
          bounces={false}
          style={{ marginBottom: 42 }}
        />

        <Carousel
          data={selectedCityHotel}
          renderItem={renderLocalHotelItem}
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideScale={1}
          onSnapToItem={index => setCurrentCarouselIndex(index)}
          ref={carouselRef}
        />
        {renderCarouselNavigation()}
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  appState: state.appState,
  state: state.appState.state,
  data: state.appState.data,
  banners: state.appState.data.banners,
  catalogs: state.appState.data.catalogs
})

const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)

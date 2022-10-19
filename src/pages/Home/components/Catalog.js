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
import colorSchema from '../../../globals/colorSchema'
import styleSchema from '../../../globals/styleSchema'

//image
import StarImage from '../assets/ic_star_12.png'
import DiscountImage from '../assets/ic_discount_16.png'

// utils
import { getPriceString } from '../../../utils/formatter'

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
    console.log('carouselRef', carouselRef, carouselRef.current)
    carouselRef.current.snapToItem(0)
    setCurrentCarouselIndex(0)
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
          <Image
            style={{
              width: width - 64,
              height: 180,
              resizeMode: 'cover'
            }}
            source={{ uri: item.image }}
          />
        </View>
        <FlatList
          horizontal={true}
          data={item.tags}
          extraData={props}
          keyExtractor={(item, index) => index}
          style={{ marginBottom: 12, backgroundColor: 'pink' }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: colorSchema.gray4
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
                  {item}
                </Text>
              </View>
            )
          }}
        />
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
        {/* TODO: 미니호텔 exception */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2
          }}
        >
          <Image
            style={{ width: 12, height: 12, resizeMode: 'contain' }}
            source={require('../assets/ic_star_12.png')}
          />
          <Text>{`${item.star}성급`}</Text>
          <View
            style={{
              height: 10,
              width: 1,
              backgroundColor: colorSchema.navy2,
              marginHorizontal: 2
            }}
          />
          <Text>{item.type}</Text>
        </View>

        <View
          style={{
            height: 0.5,
            backgroundColor: colorSchema.navy2,
            marginVertical: 10
          }}
        />
        {item.price.is_price && (
          <View>
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
            <View></View>
          </View>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 14,
              lineHeight: 28,
              color: colorSchema.red2,
              marginLeft: 4
            }}
          >
            {/* {`${item.price.price[0].min_night_discount}%`} */}
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 14,
              lineHeight: 28,
              color: colorSchema.red2,
              marginLeft: 4
            }}
          >{`${item.price.price[0].min_night_discount}%`}</Text>
        </View>
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
            marginBottom: 32
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

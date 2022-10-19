import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import colorSchema from '../../../globals/colorSchema'
import styleSchema from '../../../globals/styleSchema'

//image
import CouponImage from '../assets/img_coupon.png'
import ArrowRightImage from '../../../assets/images/arrow/ic_arrow_w_16.png'

const Promotion = (props: any) => {
  {
    return (
      <View style={styles.promotion}>
        <View style={{ alignItems: 'stretch', justifyContent: 'space-evenly' }}>
          <Text style={styles.promotionText}>
            평일에만{'\n'}호텔 롱스테이 해보세요
          </Text>
          <View style={styles.promotionButtonContainer}>
            <Text style={styles.promotionButtonText}>5만원 할인받기</Text>
            <Image
              style={styles.promotionButtonImage}
              source={ArrowRightImage}
            />
          </View>
        </View>
        <Image style={styles.promotionImage} source={CouponImage} />
      </View>
    )
  }
}

export default Promotion

const styles = StyleSheet.create({
  promotion: {
    backgroundColor: colorSchema.gray6,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  promotionText: {
    color: colorSchema.navy1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: styleSchema.marginDefault
  },
  promotionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colorSchema.green3,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 3,
    alignSelf: 'flex-start'
  },
  promotionButtonText: {
    color: colorSchema.white,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22
  },
  promotionButtonImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8
  },
  promotionImage: {
    width: 122,
    height: 92,
    resizeMode: 'contain'
  }
})

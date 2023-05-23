import { useEffect, useState } from 'react'
import FlowListItem from '../components/FlowListItem'
import WaterfallFlow from 'react-native-waterfall-flow'

const Waterfall = ({ style, data, navigation, myLike }) => {
  return (
    <WaterfallFlow
      style={style}
      contentContainerStyle={{
        paddingLeft: '2%',
        paddingRight: '2%',
      }}
      data={data}
      numColumns={2}
      renderItem={({ item, index, columnIndex }) => (
        <FlowListItem
          key={item.id}
          item={item}
          myLike={myLike}
          navigation={navigation}
        />
      )}
    />
  )
}

export default Waterfall
import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CarouselButton from './CarouselButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterCarousel = ({ filters, onFilterChange, initialFilter }) => {
  const scrollViewRef = useRef(null);
  const [contentOffset, setContentOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(
    initialFilter || filters[0]
  );

  const hasHiddenContent = contentWidth > containerWidth;

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -120 : 120;
    const newOffset = contentOffset + scrollAmount;

    scrollViewRef.current?.scrollTo({
      x: newOffset,
      animated: true,
    });

    setContentOffset(newOffset);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <View style={styles.filterContainer}>
      {hasHiddenContent && (
        <TouchableOpacity
          onPress={() => scroll('left')}
          style={styles.arrowButton}
        >
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={(event) => {
          setContentOffset(event.nativeEvent.contentOffset.x);
        }}
        onContentSizeChange={(width) => {
          setContentWidth(width);
        }}
        onLayout={(event) => {
          setContainerWidth(event.nativeEvent.layout.width);
        }}
        scrollEventThrottle={16}
      >
        {filters.map((filter) => (
          <CarouselButton
            key={filter}
            title={filter}
            isActive={selectedFilter === filter}
            onPress={() => handleFilterSelect(filter)}
          />
        ))}
      </ScrollView>

      {hasHiddenContent && (
        <TouchableOpacity
          onPress={() => scroll('right')}
          style={styles.arrowButton}
        >
          <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 8,
  },
  arrowButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterCarousel;

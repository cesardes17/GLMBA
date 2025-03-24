import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CarouselButton from './CarouselButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../hooks/theme/useTheme';

const FilterCarousel = ({ filters, onFilterChange, initialFilter }) => {
  const { theme } = useTheme();
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

  // Remove hasHiddenContent since we're using showArrows
  const [showArrows, setShowArrows] = useState(false);
  // Remove duplicate scrollViewRef declaration since it's already declared above
  const containerRef = useRef(null);

  const handleContentSizeChange = (width) => {
    // Add padding to account for arrow buttons
    const actualContainerWidth = containerWidth - (showArrows ? 80 : 0);
    setContentWidth(width);
    setShowArrows(width > actualContainerWidth);
  };

  const handleLayout = (event) => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
    // Check content width again when container size changes
    if (contentWidth > 0) {
      handleContentSizeChange(contentWidth);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        ref={containerRef}
        style={styles.filterContainer}
        onLayout={handleLayout}
      >
        {showArrows && (
          <TouchableOpacity
            onPress={() => scroll('left')}
            style={styles.arrowButton}
          >
            <Icon name="chevron-left" size={20} color={theme.colorIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.scrollViewWrapper}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onContentSizeChange={handleContentSizeChange}
            scrollEventThrottle={16}
            onScroll={(event) => {
              setContentOffset(event.nativeEvent.contentOffset.x);
            }}
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
        </View>

        {showArrows && (
          <TouchableOpacity
            onPress={() => scroll('right')}
            style={styles.arrowButton}
          >
            <Icon name="chevron-right" size={20} color={theme.colorIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scrollViewWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arrowButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterCarousel;

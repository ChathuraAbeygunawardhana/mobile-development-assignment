import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
  StyleSheet,
} from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import { ItemClickContext } from '../../context/ItemClickContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'white',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 80, // Increased padding to account for FAB
  },
  gridItem: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  gridItemTitle: {
    marginTop: 8,
    marginBottom: 8,  // Added margin
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridItemContent: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,  // Added margin
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
  },
  listItemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  listItemContent: {
    flex: 1,
    padding: 12,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,  // Added margin
  },
  listItemText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,  // Added margin
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    left: 0,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
  },
});

const extractKmPerLiter = (wrString) => {
  const match = wrString.match(/(\d+\.?\d*)\s*km\/l/);
  return match ? `${match[1]}km/l` : 'N/A';
};

const cleanTitle = (title) => {
  return title.replace('Mercedes-Benz ', '');
};

const AllProductsScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const username = user?.username;
  const { itemPressCount, handleItemPress } = useContext(ItemClickContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(
      'https://cars-database-with-image.p.rapidapi.com/api/search?q=Mercedes',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
          'x-rapidapi-key':
            '970b4fa26fmsh397f674876f86dap1a656cjsna4e0c2863761',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          // Filter unique products by title
          const uniqueProducts = Array.from(
            new Set(data.results.map((p) => p.title))
          ).map((title) => data.results.find((p) => p.title === title));
          setProducts(uniqueProducts);
          setFilteredProducts(uniqueProducts);
        } else {
          setHasError(true);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
      });
  }, []);

  const renderGridItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <View
          style={{
            width: itemWidth,
            marginBottom: 16,
            marginLeft: index % 2 === 0 ? 0 : 22,
          }}
        >
          <View style={styles.gridItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.gridItemImage}
              resizeMode="contain"
            />
            <Text
              style={styles.gridItemTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cleanTitle(item.title)}
            </Text>
            <Text style={styles.gridItemContent}>
              <Text style={{ fontWeight: 'bold' }}>Description: </Text>
              {item.content}
            </Text>
            <Text style={styles.gridItemContent}>
              <Text style={{ fontWeight: 'bold' }}>status: </Text>
              {extractKmPerLiter(item.wr)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <View style={styles.listItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.listItemImage}
            resizeMode="contain"
          />
          <View style={styles.listItemContent}>
            <Text
              style={styles.listItemTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cleanTitle(item.title)}
            </Text>
            <Text style={styles.listItemText}>
              <Text style={{ fontWeight: 'bold' }}>Description: </Text>
              {item.content}
            </Text>
            <Text style={styles.listItemText}>
              <Text style={{ fontWeight: 'bold' }}>status: </Text>
              {extractKmPerLiter(item.wr)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const handleSearchIconPress = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    setSearchQuery('');
    setFilteredProducts(products);
  };

  useEffect(() => {
    if (isSearchBarVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      // Ensure search results maintain unique titles
      const uniqueFiltered = Array.from(
        new Set(filtered.map((p) => p.title))
      ).map((title) => filtered.find((p) => p.title === title));
      setFilteredProducts(uniqueFiltered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('SignIn')} />
        <Appbar.Content title={username || 'Shoes'} className="items-center" />
        {isSearchBarVisible && (
          <View style={styles.searchBar}>
            <TextInput
              ref={searchInputRef}
              style={{ flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleSearchIconPress}>
              <Ionicons name="close" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        )}
        <Appbar.Action
          icon="magnify"
          onPress={handleSearchIconPress}
          style={{ opacity: 0 }}
        />
      </Appbar.Header>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4e4e68" />
            <Text style={styles.loadingText}>Loading products</Text>
          </View>
        ) : hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Couldn't find any products</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              No products were found matching your selection
            </Text>
          </View>
        ) : (
          <FlatList
            key={isListView ? 'list' : 'grid'}
            data={filteredProducts}
            renderItem={isListView ? renderListItem : renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={isListView ? 1 : 2}
            contentContainerStyle={[styles.flatListContent, { paddingTop: 12 }]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Text style={styles.fabText}>{`Items Pressed: ${itemPressCount}`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllProductsScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getStyles, colors} from '../styles';
import {useTheme} from '../NewsAppContext';

const NewsCard = ({children, item, onPress}) => {
  const [loading, setLoading] = useState(true);
  const {darkMode} = useTheme();
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color={colors.accent}
          />
        )}
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>

      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '90%'}}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>

        {/* Pop up Menus Component */}
         {children}
        </View>

        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { UserType } from '@/hooks/types';
import CircleAvatar from '../core/circleAvatar';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/hooks/themeProvider';
import { getStyle } from '@/hooks/styles';

export default function UserTileComponent({ user, onClick }: { user: UserType; onClick?: () => void }) {
    const {currentTheme} = useTheme();
    const style = getStyle(currentTheme);
  return (
    <TouchableOpacity style={[styles.card,style.containerSecond]} onPress={onClick}>
      <CircleAvatar
        hidButton
        uri={user.imageUrl}
        size={50}
      />
      <View style={styles.textContainer}>
        <Text style={[style.body]}>{user.fullName}</Text>
        <FontAwesome name="send" size={24} color="gray" style={styles.chatIcon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatIcon: {
    marginLeft: 10,
  },
});
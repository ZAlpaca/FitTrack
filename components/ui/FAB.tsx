import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/theme';

export type LogType = 'steps' | 'calories' | 'water';

interface MenuItem {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  type: LogType;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Log Steps', icon: 'directions-run', type: 'steps' },
  { label: 'Log Calories', icon: 'local-fire-department', type: 'calories' },
  { label: 'Log Water', icon: 'local-drink', type: 'water' },
];

export interface FABProps {
  onLogActivity: (type: LogType) => void;
}

 /**
 * Floating Action Button with QuickActionMenu.
 *
 * Place inside a positioned parent, e.g.:
 *   <View style={{ position: 'absolute', bottom: 96, right: 20 }}>
 *     <FAB onLogActivity={handleLogActivity} />
 *   </View>
 */
export function FAB({ onLogActivity }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateTo = useCallback(
    (toValue: number, callback?: () => void) => {
      if (toValue === 1) {
        scaleAnim.setValue(0.8);
      }

      Animated.parallel([
        toValue === 1
          ? Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              friction: 8,
              tension: 100,
            })
          : Animated.timing(scaleAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
        Animated.timing(rotateAnim, {
          toValue,
          duration: toValue === 1 ? 200 : 150,
          useNativeDriver: true,
        }),
      ]).start(callback);
    },
    [scaleAnim, rotateAnim],
  );

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      animateTo(0, () => setIsOpen(false));
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsOpen(true);
    }
  }, [isOpen, animateTo]);

  // Animate in after isOpen becomes true (menu mounts)
  useEffect(() => {
    if (isOpen) {
      animateTo(1);
    }
  }, [isOpen, animateTo]);

  const handleItemPress = useCallback(
    (type: LogType) => {
      onLogActivity(type);
      animateTo(0, () => setIsOpen(false));
    },
    [onLogActivity, animateTo],
  );

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      {/* Quick Action Menu */}
      {isOpen && (
        <Animated.View
          style={[
            styles.menu,
            {
              opacity: scaleAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.type}
              onPress={() => handleItemPress(item.type)}
              style={({ pressed }) => [
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                pressed && styles.menuItemPressed,
              ]}
            >
              <AppText style={styles.menuItemLabel}>{item.label}</AppText>
              <MaterialIcons
                name={item.icon}
                size={18}
                color={Colors.brandVolt}
              />
            </Pressable>
          ))}
        </Animated.View>
      )}

      {/* FAB Button */}
      <Pressable
        onPress={toggleMenu}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <Animated.Text
          style={[
            styles.fabIcon,
            { transform: [{ rotate: rotateInterpolation }] },
          ]}
        >
          +
        </Animated.Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  menu: {
    marginBottom: 12,
    backgroundColor: Colors.light.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.light.glassBorder,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  menuItemPressed: {
    opacity: 0.6,
  },
  menuItemLabel: {
    color: Colors.brandVolt,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  fab: {
    width: 56,
    height: 56,
    backgroundColor: Colors.brandVolt,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.brandVolt,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.9 }],
  },
  fabIcon: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 30,
  },
});

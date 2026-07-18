import { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Modal as RNModal, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ModalOverlayProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function ModalOverlay({ visible, onClose, children, title }: ModalOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }
  }, [visible, fadeAnim, scaleAnim]);

  return (
    <RNModal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        {/* Backdrop dismiss */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Animated card container */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>

          {/* Title */}
          {title && (
            <AppText style={styles.title}>
              {title}
            </AppText>
          )}

          {/* Content */}
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 384,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#e2e2e2',
    marginBottom: 16,
    paddingRight: 32,
  },
});

export default ModalOverlay;

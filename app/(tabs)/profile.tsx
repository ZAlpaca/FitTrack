import { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Animated,
  Alert,
  StyleSheet,
} from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/use-app-context';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModalOverlay } from '@/components/ui/ModalOverlay';
import { VoltButton } from '@/components/ui/VoltButton';
import { ScreenErrorBoundary } from '@/components/ui/ScreenErrorBoundary';
import { Colors } from '@/constants/theme';

const PADDING_H = 20;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scroll: { flex: 1, paddingHorizontal: PADDING_H },
  scrollContent: { paddingBottom: 32 },

  /* ── Header ── */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Avatar Section ── */
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 16,
  },
  pulseGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 9999,
    backgroundColor: 'rgba(204,255,0,0.15)',
  },
  avatarBorder: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: Colors.brandVolt,
    padding: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 9999,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: Colors.brandVolt,
    padding: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#e2e2e2',
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.5)',
  },

  /* ── Stats Grid ── */
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statLabel: {
    marginBottom: 4,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.4)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.brandVolt,
  },

  /* ── Personal Records ── */
  recordsSection: {
    marginBottom: 32,
  },
  recordsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recordsTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#e2e2e2',
  },
  addRecordBtn: {
    opacity: 0.7,
  },
  addRecordText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandVolt,
  },
  recordScrollContent: {
    gap: 16,
    paddingRight: PADDING_H,
  },
  recordCard: {
    minWidth: 140,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  recordIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(204,255,0,0.2)',
    backgroundColor: 'rgba(204,255,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  recordLabel: {
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: Colors.brandVolt,
    marginBottom: 4,
  },
  recordValue: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
    color: '#e2e2e2',
  },

  /* ── Linked Devices ── */
  devicesSection: {
    marginBottom: 32,
  },
  sectionLabel: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#e2e2e2',
  },
  devicesCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  deviceRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  deviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  deviceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  deviceTime: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.4)',
  },
  deviceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deviceDotConnected: {
    backgroundColor: Colors.brandVolt,
  },
  deviceDotDisconnected: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  /* ── Settings ── */
  settingsSection: {
    marginBottom: 32,
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingsRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e2e2',
  },

  /* ── Logout Button ── */
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 24,
  },
  logoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.brandRed,
  },
  chevron: {
    color: 'rgba(255,255,255,0.4)',
  },

  /* ── Modal: Logout Confirm ── */
  modalContent: {
    alignItems: 'center',
    paddingTop: 8,
  },
  modalIcon: {
    marginBottom: 12,
  },
  modalTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  modalSubtitle: {
    marginTop: 4,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
  },
  modalBtnRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e2e2',
  },
  modalLogoutBtn: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: Colors.brandRed,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalLogoutText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e2e2',
  },

  /* ── Modal: Add Record ── */
  addRecordTitle: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: '900',
    color: '#e2e2e2',
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: 'rgba(255,255,255,0.5)',
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '400',
    color: '#e2e2e2',
  },
});

export default function ProfileScreen() {
  const { state, actions } = useAppContext();
  const { userProfile, devices, personalRecords } = state;
  const { toggleDevice, addRecord } = actions;

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [newRecordLabel, setNewRecordLabel] = useState('');
  const [newRecordValue, setNewRecordValue] = useState('');

  // Pulse animation for avatar glow
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const handleAddRecord = () => {
    if (!newRecordLabel.trim() || !newRecordValue.trim()) return;
    const icon =
      newRecordLabel.toLowerCase().includes('run') ||
      newRecordLabel.toLowerCase().includes('speed')
        ? 'trophy-award'
        : 'dumbbell';
    addRecord({
      id: `rec-${Date.now()}`,
      label: newRecordLabel.trim().toUpperCase(),
      value: newRecordValue.trim(),
      icon,
    });
    setNewRecordLabel('');
    setNewRecordValue('');
    setShowRecordModal(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    Alert.alert('Logout', 'Sign out simulated successfully!');
  };

  return (
    <ScreenErrorBoundary name="Profile">
      <SafeAreaView style={styles.root} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <View style={styles.headerRow}>
            <AppText style={styles.headerTitle}>Athlete Profile</AppText>
            <TouchableOpacity style={styles.calendarBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="calendar" size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          {/* ── Avatar Section ── */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              {/* Pulse glow ring */}
              <Animated.View
                style={[styles.pulseGlow, { opacity: pulseAnim }]}
              />
              {/* Avatar with Volt border */}
              <View style={styles.avatarBorder}>
                <Image
                  source={{ uri: userProfile.avatarUrl }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </View>
              {/* Verified badge */}
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={16}
                  color="#000"
                />
              </View>
            </View>
            <AppText style={styles.name}>{userProfile.name}</AppText>
            <AppText style={styles.subtitle}>
              {userProfile.role} • {userProfile.location}
            </AppText>
          </View>

          {/* ── Stats Grid ── */}
          <View style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <AppText style={styles.statLabel}>TOTAL WORKOUTS</AppText>
              <AppText style={styles.statValue}>{userProfile.totalWorkouts}</AppText>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <AppText style={styles.statLabel}>CURRENT STREAK</AppText>
              <AppText style={styles.statValue}>{userProfile.currentStreak} Days</AppText>
            </GlassCard>
          </View>

          {/* ── Personal Records ── */}
          <View style={styles.recordsSection}>
            <View style={styles.recordsHeader}>
              <AppText style={styles.recordsTitle}>Personal Records</AppText>
              <TouchableOpacity
                onPress={() => setShowRecordModal(true)}
                activeOpacity={0.7}
                style={styles.addRecordBtn}
              >
                <AppText style={styles.addRecordText}>+ ADD NEW</AppText>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recordScrollContent}
            >
              {personalRecords.map((record) => (
                <View key={record.id} style={styles.recordCard}>
                  <View style={styles.recordIconWrap}>
                    <MaterialCommunityIcons
                      name={record.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                      size={24}
                      color={Colors.brandVolt}
                    />
                  </View>
                  <AppText style={styles.recordLabel}>{record.label}</AppText>
                  <AppText style={styles.recordValue}>{record.value}</AppText>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* ── Linked Devices ── */}
          <View style={styles.devicesSection}>
            <AppText style={styles.sectionLabel}>Linked Devices</AppText>
            <View style={styles.devicesCard}>
              {devices.map((device, index) => {
                const isConnected = device.status === 'Synced';
                return (
                  <TouchableOpacity
                    key={device.id}
                    onPress={() => toggleDevice(device.id)}
                    activeOpacity={0.7}
                    style={[
                      styles.deviceRow,
                      index < devices.length - 1 && styles.deviceRowBorder,
                    ]}
                  >
                    <View style={styles.deviceLeft}>
                      <View style={styles.deviceIconWrap}>
                        <MaterialCommunityIcons
                          name={(device.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'watch'}
                          size={20}
                          color="rgba(255,255,255,0.7)"
                        />
                      </View>
                      <View>
                        <AppText style={styles.deviceName}>{device.name}</AppText>
                        <AppText style={styles.deviceTime}>{device.syncTimeText}</AppText>
                      </View>
                    </View>
                    <View style={styles.deviceRight}>
                      <View
                        style={[
                          styles.deviceDot,
                          isConnected ? styles.deviceDotConnected : styles.deviceDotDisconnected,
                        ]}
                      />
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={20}
                        color="rgba(255,255,255,0.4)"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── Settings ── */}
          <View style={styles.settingsSection}>
            <AppText style={styles.sectionLabel}>Settings</AppText>
            <View style={styles.settingsCard}>
              {/* Account Security */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.settingsRow, styles.settingsRowBorder]}
              >
                <View style={styles.settingsLeft}>
                  <MaterialCommunityIcons
                    name="account-lock"
                    size={20}
                    color="rgba(255,255,255,0.5)"
                  />
                  <AppText style={styles.settingsLabel}>Account Security</AppText>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                />
              </TouchableOpacity>

              {/* Push Notifications */}
              <View style={[styles.settingsRow, styles.settingsRowBorder]}>
                <View style={styles.settingsLeft}>
                  <MaterialCommunityIcons
                    name="bell"
                    size={20}
                    color="rgba(255,255,255,0.5)"
                  />
                  <AppText style={styles.settingsLabel}>Push Notifications</AppText>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: 'rgba(255,255,255,0.15)', true: Colors.brandVolt }}
                  thumbColor="#000"
                  ios_backgroundColor="rgba(255,255,255,0.15)"
                />
              </View>

              {/* Privacy & Data */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.settingsRow}
              >
                <View style={styles.settingsLeft}>
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={20}
                    color="rgba(255,255,255,0.5)"
                  />
                  <AppText style={styles.settingsLabel}>Privacy & Data</AppText>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                />
              </TouchableOpacity>
            </View>

            {/* ── Logout Button ── */}
            <TouchableOpacity
              onPress={() => setShowLogoutModal(true)}
              activeOpacity={0.7}
              style={styles.logoutRow}
            >
              <View style={styles.logoutLeft}>
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={Colors.brandRed}
                />
                <AppText style={styles.logoutText}>Log Out</AppText>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="rgba(255,255,255,0.4)"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ── Logout Confirm Modal ── */}
        <ModalOverlay
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalContent}>
            <MaterialCommunityIcons
              name="logout"
              size={40}
              color={Colors.brandRed}
              style={styles.modalIcon}
            />
            <AppText style={styles.modalTitle}>Sign Out?</AppText>
            <AppText style={styles.modalSubtitle}>
              Are you sure you want to log out of Apex Fitness?
            </AppText>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.7}
                style={styles.modalCancelBtn}
              >
                <AppText style={styles.modalCancelText}>Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.7}
                style={styles.modalLogoutBtn}
              >
                <AppText style={styles.modalLogoutText}>Log Out</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ModalOverlay>

        {/* ── Add Record Modal ── */}
        <ModalOverlay
          visible={showRecordModal}
          onClose={() => setShowRecordModal(false)}
        >
          <View>
            <AppText style={styles.addRecordTitle}>Log Personal Record</AppText>

            {/* Record Category */}
            <AppText style={styles.inputLabel}>Record Category Name</AppText>
            <TextInput
              value={newRecordLabel}
              onChangeText={setNewRecordLabel}
              placeholder="e.g. 10K SPEED, BENCH PRESS"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={styles.textInput}
            />

            {/* Achieved Value */}
            <AppText style={styles.inputLabel}>Achieved Value</AppText>
            <TextInput
              value={newRecordValue}
              onChangeText={setNewRecordValue}
              placeholder="e.g. 42:15, 120 kg, 45 Days"
              placeholderTextColor="rgba(255,255,255,0.3)"
              style={styles.textInput}
            />

            <VoltButton
              title="LOG PERSONAL RECORD"
              onPress={handleAddRecord}
            />
          </View>
        </ModalOverlay>
      </SafeAreaView>
    </ScreenErrorBoundary>
  );
}

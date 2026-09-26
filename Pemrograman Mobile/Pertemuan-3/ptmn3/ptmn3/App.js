import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Pressable,
  Alert,
  StatusBar,
  StyleSheet,
  FlatList,
  SectionList,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

// ============================================================
// LANGKAH 11: THEME / WARNA
// ============================================================
const COLORS = {
  bgMain: '#050510',
  bgCard: '#0d0d1d',
  bgCard2: '#121225',
  primary: '#8b3dff',
  primaryLight: '#a855f7',
  secondary: '#10e981',
  textPrimary: '#ffffff',
  textSecondary: '#b4b4c7',
  textMuted: '#77778c',
  border: '#292943',
  overlay: 'rgba(0,0,0,0.82)',
};

// ============================================================
// LANGKAH 2: DATA PROFILE
// ============================================================
const PROFILE = {
  name: 'Ahmad Aly',
  title: 'UI/UX Designer',
  email: 'ahmadali3862382368@gmail.com',
  phone: '0877-1641-0923',
  location: 'Cirebon, Jawa Barat',
  bio: 'Merancang wireframe dan desain aplikasi mobile dan web',
  avatar: require('./ahmdalyyy.jpeg'),
};

// ============================================================
// DATA SKILLS
// ============================================================
const SKILLS = [
  { id: '1', name: 'Figma Desain', level: 70, color: '#48ff00' },
  { id: '2', name: 'Photoshop', level: 60, color: '#0040ff' },
  { id: '3', name: 'Copy Writing', level: 70, color: '#0071f2' },
  { id: '4', name: 'HTML/CSS', level: 60, color: '#ff0015' },
  { id: '5', name: 'JavaScript', level: 20, color: '#fbff00' },
];

// ============================================================
// DATA RIWAYAT
// ============================================================
const SECTIONS = [
  {
    title: 'Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Junior UI/UX Designer',
        company: 'PT. Jasa Digital Indonesia',
        period: '2026-Sekarang',
        desc: 'Mengembangkan antarmuka pengguna aplikasi web dan mobile.',
      },
      {
        id: 'e2',
        role: 'UI/UX Designer',
        company: 'Startup Fintech-PayEasy',
        period: '2025-2026',
        desc: 'Merancang fitur pembayaran digital menggunakan Figma.',
      },
    ],
  },
  {
    title: 'Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024-2028',
        desc: 'IPK 3.72 / 4.00 · Cumlaude',
      },
    ],
  },
];

// ============================================================
// SOCIAL MEDIA
// ============================================================
const SOCIAL = [
  { id: 's1', label: 'GitHub', icon: '💻', url: 'github.com/ahmadali' },
  { id: 's2', label: 'TikTok', icon: '♪', url: 'tiktok.com/@ahmadali' },
  { id: 's3', label: 'Instagram', icon: '◎', url: 'instagram.com/ahmadali' },
];

// ============================================================
// LANGKAH 3: SKILL CARD
// ============================================================
const SkillCard = ({ item }) => {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={styles.skillLevel}>{item.level}%</Text>
      </View>
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${item.level}%`, backgroundColor: item.color },
          ]}
        />
      </View>
    </View>
  );
};

// ============================================================
// TIMELINE CARD
// ============================================================
const TimelineCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.timelineCard}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.timelineDot} />
      <View style={styles.timelineContent}>
        <Text style={styles.timelineRole}>{item.role}</Text>
        <Text style={styles.timelineCompany}>{item.company}</Text>
        <Text style={styles.timelinePeriod}>{item.period}</Text>
        {item.desc && <Text style={styles.timelineDesc}>{item.desc}</Text>}
        <Text style={styles.timelineHint}>Ketuk untuk detail →</Text>
      </View>
    </TouchableOpacity>
  );
};

// ============================================================
// APP
// ============================================================
export default function App() {
  // LANGKAH 4: STATE
  const [openToWork, setOpenToWork] = useState(true);
  const [activeTab, setActiveTab] = useState('Info');

  // Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Download
  const [pressing, setPressing] = useState(false);

  // HANDLE CARD
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // HANDLE SEND
  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      const nameTemp = senderName;
      setSenderName('');
      setMessage('');
      Alert.alert('Berhasil', `Pesan dari ${nameTemp} telah terkirim!`);
    }, 2000);
  };

  // SOCIAL
  const handleSocialPress = (item) => {
    Alert.alert(item.label, item.url);
  };

  // DOWNLOAD
  const handleDownload = () => {
    Alert.alert('Download CV', 'CV sedang diunduh...');
  };

  // RENDER
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.bgMain} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.documentIcon}>📄</Text>
          <Text style={styles.headerTitle}>Curriculum Vitae</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.openDot} />
          <Text style={styles.openText}>{openToWork ? 'Open' : 'Close'}</Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#444455', true: '#10b981' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* TAB NAVIGATION */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Info' && styles.activeTab]}
          onPress={() => setActiveTab('Info')}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={[styles.tabText, activeTab === 'Info' && styles.activeTabText]}>
            Info
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Skills' && styles.activeTab]}
          onPress={() => setActiveTab('Skills')}
        >
          <Text style={styles.tabIcon}>🛠</Text>
          <Text style={[styles.tabText, activeTab === 'Skills' && styles.activeTabText]}>
            Skills
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Kontak' && styles.activeTab]}
          onPress={() => setActiveTab('Kontak')}
        >
          <Text style={styles.tabIcon}>✉</Text>
          <Text style={[styles.tabText, activeTab === 'Kontak' && styles.activeTabText]}>
            Kontak
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* INFO TAB */}
        {activeTab === 'Info' && (
          <View>
            {/* PROFILE */}
            <View style={styles.profileSection}>
              {/* FOTO */}
              <View style={styles.avatarContainer}>
                <Image
                  source={PROFILE.avatar}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>

              {/* OPEN BADGE */}
              {openToWork && (
                <View style={styles.badge}>
                  <View style={styles.badgeDot} />
                  <Text style={styles.badgeText}>Open to Work</Text>
                </View>
              )}

              {/* NAMA, TITLE, BIO */}
              <Text style={styles.profileName}>{PROFILE.name}</Text>
              <Text style={styles.profileTitle}>{PROFILE.title}</Text>
              <Text style={styles.profileBio}>{PROFILE.bio}</Text>

              {/* CONTACT */}
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>📧 {PROFILE.email}</Text>
                <Text style={styles.contactText}>📍 {PROFILE.location}</Text>
                <Text style={styles.contactText}>📱 {PROFILE.phone}</Text>
              </View>

              {/* SOCIAL */}
              <View style={styles.socialContainer}>
                {SOCIAL.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.socialButton}
                    onPress={() => handleSocialPress(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.socialIcon}>{item.icon}</Text>
                    <Text style={styles.socialLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* DOWNLOAD */}
              <Pressable
                onPress={handleDownload}
                onPressIn={() => setPressing(true)}
                onPressOut={() => setPressing(false)}
                style={[styles.downloadButton, pressing && styles.downloadPressed]}
              >
                <Text style={styles.downloadText}>
                  {pressing ? '⏳ Mengunduh...' : '📄 Download CV (PDF)'}
                </Text>
              </Pressable>

              {/* GARIS UNGU */}
              <View style={styles.profileLine} />
            </View>

            {/* RIWAYAT */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>📋 Riwayat</Text>
              <Text style={styles.sectionSubtitle}>Pengalaman kerja dan pendidikan</Text>

              <SectionList
                sections={SECTIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TimelineCard item={item} onPress={handleCardPress} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
            </View>
          </View>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'Skills' && (
          <View style={styles.tabPage}>
            <Text style={styles.bigTitle}>Skills</Text>
            <Text style={styles.bigSubtitle}>Keahlian yang saya kuasai</Text>

            <FlatList
              data={SKILLS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SkillCard item={item} />}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          </View>
        )}

        {/* KONTAK TAB */}
        {activeTab === 'Kontak' && (
          <View style={styles.tabPage}>
            <Text style={styles.bigTitle}>Hubungi Saya</Text>
            <Text style={styles.bigSubtitle}>Silakan kirim pesan kepada saya</Text>

            <Text style={styles.inputLabel}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Anda"
              placeholderTextColor={COLORS.textMuted}
              value={senderName}
              onChangeText={setSenderName}
              editable={!sending}
            />

            <Text style={styles.inputLabel}>Pesan</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tulis pesan Anda..."
              placeholderTextColor={COLORS.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              textAlignVertical="top"
              editable={!sending}
            />

            {sending ? (
              <View style={styles.loading}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.loadingText}>Mengirim pesan...</Text>
              </View>
            ) : (
              <Button
                title="📨 Kirim Pesan"
                color={COLORS.primary}
                onPress={handleSend}
              />
            )}
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>📋 Detail Riwayat</Text>

                <Text style={styles.modalLabel}>Posisi</Text>
                <Text style={styles.modalValue}>{selectedItem.role}</Text>

                <Text style={styles.modalLabel}>Perusahaan / Institusi</Text>
                <Text style={styles.modalValue}>{selectedItem.company}</Text>

                <Text style={styles.modalLabel}>Periode</Text>
                <Text style={styles.modalValue}>{selectedItem.period}</Text>

                {selectedItem.desc && (
                  <>
                    <Text style={styles.modalLabel}>Deskripsi</Text>
                    <Text style={styles.modalDescription}>{selectedItem.desc}</Text>
                  </>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => {
                setModalVisible(false);
                setSelectedItem(null);
              }}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================================
// STYLESHEET
// ============================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgMain },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 30 },

  // HEADER
  header: {
    height: 58,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgMain,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  documentIcon: { fontSize: 15, marginRight: 7 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  openDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    marginRight: 4,
  },
  openText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    marginRight: 2,
  },

  // TAB
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  activeTab: { backgroundColor: COLORS.primary },
  tabIcon: { fontSize: 14, marginBottom: 2 },
  tabText: { color: COLORS.textMuted, fontSize: 10, fontWeight: '600' },
  activeTabText: { color: COLORS.textPrimary },

  // PROFILE
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 25,
    marginHorizontal: 12,
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    marginBottom: 10,
  },
  avatar: { width: '100%', height: '100%' },

  // BADGE
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,233,129,0.10)',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    marginRight: 5,
  },
  badgeText: { color: COLORS.secondary, fontSize: 10, fontWeight: '700' },

  // PROFILE TEXT
  profileName: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 3,
  },
  profileTitle: {
    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 9,
  },
  profileBio: {
    color: COLORS.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 12,
  },

  // CONTACT
  contactContainer: { alignItems: 'center', marginBottom: 14 },
  contactText: { color: COLORS.textMuted, fontSize: 9, marginBottom: 3 },

  // SOCIAL
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  socialButton: {
    width: 70,
    height: 55,
    backgroundColor: COLORS.bgCard2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: { color: COLORS.textPrimary, fontSize: 16, marginBottom: 3 },
  socialLabel: { color: COLORS.textSecondary, fontSize: 9 },

  // DOWNLOAD
  downloadButton: {
    width: 180,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  downloadPressed: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 0.97 }],
  },
  downloadText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },

  // GARIS UNGU
  profileLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.primary,
    marginTop: 24,
    borderRadius: 2,
  },

  // INFO SECTION
  infoSection: { marginHorizontal: 12, marginTop: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 4 },
  sectionSubtitle: { color: COLORS.textMuted, fontSize: 10, marginBottom: 12 },
  sectionHeader: {
    backgroundColor: COLORS.bgCard2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 7,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  sectionHeaderText: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '700' },

  // SKILL PAGE
  tabPage: { marginHorizontal: 14, marginTop: 12 },
  bigTitle: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  bigSubtitle: { color: COLORS.textMuted, fontSize: 11, marginBottom: 18 },
  skillCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '600' },
  skillLevel: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },
  progressBackground: {
    height: 7,
    backgroundColor: '#29293b',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 5 },

  // TIMELINE
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 13,
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
    marginTop: 5,
    marginRight: 10,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 3 },
  timelineCompany: { color: COLORS.textSecondary, fontSize: 11, marginBottom: 3 },
  timelinePeriod: { color: COLORS.primaryLight, fontSize: 10, marginBottom: 5 },
  timelineDesc: { color: COLORS.textMuted, fontSize: 10, lineHeight: 14, marginBottom: 5 },
  timelineHint: { color: '#f59e0b', fontSize: 9, fontStyle: 'italic' },

  // FORM
  inputLabel: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: COLORS.textPrimary,
    fontSize: 12,
    marginBottom: 8,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  loadingText: { color: COLORS.primaryLight, fontSize: 12, marginLeft: 8 },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700', marginBottom: 18 },
  modalLabel: { color: COLORS.textMuted, fontSize: 10, marginTop: 8, marginBottom: 3 },
  modalValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '600' },
  modalDescription: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 17 },
  modalClose: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
});
import { StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, Animated } from 'react-native';
import { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Components } from '@/constants/DesignSystem';

// Mock data - replace with API calls
const featuredCandidates = [
  {
    id: '1',
    name: 'Ram Prasad Sharma',
    party: 'Nepali Congress',
    photoUrl: 'https://via.placeholder.com/150',
    impactScore: 95,
    constituency: 'Kathmandu-1',
  },
  {
    id: '2',
    name: 'Sita Devi Thapa',
    party: 'CPN-UML',
    photoUrl: 'https://via.placeholder.com/150',
    impactScore: 92,
    constituency: 'Lalitpur-2',
  },
];

const quickStats = [
  { label: 'Total Candidates', value: '165', icon: 'users' },
  { label: 'Constituencies', value: '165', icon: 'map-marker' },
  { label: 'Political Parties', value: '24', icon: 'flag' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // TODO: Fetch fresh data
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Know Your Political Candidate</Text>
        <Text style={styles.heroSubtitle}>
          Make informed decisions with comprehensive candidate information
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <FontAwesome name={stat.icon as any} size={24} color="#3b82f6" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/search')}>
            <FontAwesome name="search" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/compare')}>
            <FontAwesome name="exchange" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Compare</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/rankings')}>
            <FontAwesome name="trophy" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Rankings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Candidates */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <TouchableOpacity onPress={() => router.push('/candidates')}>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>
        
        {featuredCandidates.map((candidate) => (
          <TouchableOpacity key={candidate.id} style={styles.candidateCard}>
            <Image source={{ uri: candidate.photoUrl }} style={styles.candidatePhoto} />
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <Text style={styles.candidateParty}>{candidate.party}</Text>
              <Text style={styles.candidateConstituency}>{candidate.constituency}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreValue}>{candidate.impactScore}</Text>
              <Text style={styles.scoreLabel}>Impact</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Browse by Level */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Level</Text>
        <TouchableOpacity style={styles.levelCard}>
          <Text style={styles.levelCardTitle}>Federal Level</Text>
          <Text style={styles.levelCardSubtitle}>House of Representatives</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelCard}>
          <Text style={styles.levelCardTitle}>Provincial Level</Text>
          <Text style={styles.levelCardSubtitle}>Provincial Assemblies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelCard}>
          <Text style={styles.levelCardTitle}>Local Level</Text>
          <Text style={styles.levelCardSubtitle}>Mayors & Deputy Mayors</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    padding: Spacing.xl,
    backgroundColor: Colors.primary,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['2xl'],
  },
  heroTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeight.tight * Typography.fontSize['3xl'],
  },
  heroSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: Spacing.base,
    gap: Spacing.md,
    marginTop: -Spacing.lg,
    paddingHorizontal: Spacing.base,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.lg,
  },
  statValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.tight * Typography.fontSize.xs,
  },
  section: {
    padding: Spacing.base,
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textDark,
    marginBottom: Spacing.base,
  },
  seeAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.accent,
    fontWeight: Typography.fontWeight.semibold,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    minHeight: 88,
    ...Shadows.md,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  candidateCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  candidatePhoto: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray200,
  },
  candidateInfo: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  candidateName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: Colors.textDark,
  },
  candidateParty: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs / 2,
  },
  candidateConstituency: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Spacing.md,
    backgroundColor: 'transparent',
    minWidth: 60,
  },
  scoreValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
  },
  scoreLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs / 2,
  },
  levelCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Shadows.md,
  },
  levelCardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: Colors.textDark,
  },
  levelCardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
  },
});

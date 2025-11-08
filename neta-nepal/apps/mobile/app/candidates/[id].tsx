import { StyleSheet, ScrollView, Image, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { candidatesAPI } from '@/lib/api';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'promises', label: 'Promises' },
  { id: 'works', label: 'Works' },
  { id: 'cases', label: 'Cases' },
];

export default function CandidateProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidate();
  }, [id]);

  const loadCandidate = async () => {
    try {
      setLoading(true);
      const response = await candidatesAPI.getById(id as string);
      setCandidate(response.data);
    } catch (error) {
      console.error('Failed to load candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${candidate.name} on Neta Nepal`,
        url: `netanepal://candidate/${id}`,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!candidate) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Candidate not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: candidate.name,
          headerBackTitle: 'Back',
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
              <FontAwesome name="share-alt" size={20} color="#3b82f6" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: candidate.photoUrl || 'https://via.placeholder.com/120' }} 
            style={styles.profilePhoto} 
          />
          <Text style={styles.name}>{candidate.name}</Text>
          {candidate.nameNepali && (
            <Text style={styles.nameNepali}>{candidate.nameNepali}</Text>
          )}
          <Text style={styles.party}>{candidate.party?.name}</Text>
          <Text style={styles.constituency}>{candidate.constituency?.name}</Text>
          
          {candidate.isVerified && (
            <View style={styles.verifiedBadge}>
              <FontAwesome name="check-circle" size={16} color="#10b981" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        {/* Score Cards */}
        <View style={styles.scoresContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{candidate.impactScore || 0}</Text>
            <Text style={styles.scoreLabel}>Impact</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{candidate.fulfillmentRate || 0}%</Text>
            <Text style={styles.scoreLabel}>Fulfillment</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={[styles.scoreValue, { color: '#ef4444' }]}>
              {candidate.scandalScore || 0}
            </Text>
            <Text style={styles.scoreLabel}>Scandal</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{candidate.popularityScore || 0}</Text>
            <Text style={styles.scoreLabel}>Popularity</Text>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'overview' && (
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.bioText}>{candidate.bio || 'No biography available'}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Age</Text>
                  <Text style={styles.detailValue}>{candidate.age} years</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gender</Text>
                  <Text style={styles.detailValue}>{candidate.gender}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Years in Politics</Text>
                  <Text style={styles.detailValue}>{candidate.yearsInPolitics} years</Text>
                </View>
              </View>

              {candidate.hasAllegations && (
                <View style={styles.warningCard}>
                  <FontAwesome name="exclamation-triangle" size={20} color="#f59e0b" />
                  <Text style={styles.warningText}>This candidate has allegations</Text>
                </View>
              )}

              {candidate.hasCriminalCases && (
                <View style={[styles.warningCard, { backgroundColor: '#fee2e2' }]}>
                  <FontAwesome name="exclamation-circle" size={20} color="#ef4444" />
                  <Text style={[styles.warningText, { color: '#991b1b' }]}>
                    This candidate has criminal cases
                  </Text>
                </View>
              )}
            </View>
          )}

          {activeTab === 'promises' && (
            <View style={styles.emptyState}>
              <FontAwesome name="list-alt" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Promises will be displayed here</Text>
            </View>
          )}

          {activeTab === 'works' && (
            <View style={styles.emptyState}>
              <FontAwesome name="briefcase" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Works will be displayed here</Text>
            </View>
          )}

          {activeTab === 'cases' && (
            <View style={styles.emptyState}>
              <FontAwesome name="gavel" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Legal cases will be displayed here</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    minHeight: 48,
    justifyContent: 'center',
    ...Shadows.md,
  },
  backButtonText: {
    color: Colors.surface,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  headerButton: {
    marginRight: Spacing.base,
  },
  header: {
    alignItems: 'center',
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: Spacing.lg,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  name: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  nameNepali: {
    fontSize: Typography.sizes.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  party: {
    fontSize: Typography.sizes.base,
    color: Colors.accent,
    marginBottom: Spacing.xs,
    fontWeight: Typography.weights.semibold,
  },
  constituency: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  verifiedText: {
    fontSize: Typography.sizes.xs,
    color: Colors.success,
    fontWeight: Typography.weights.semibold,
  },
  scoresContainer: {
    flexDirection: 'row',
    padding: Spacing.base,
    gap: Spacing.md,
    backgroundColor: Colors.background,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.lg,
  },
  scoreValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.success,
    marginBottom: Spacing.xs,
  },
  scoreLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  tabs: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: Spacing.base,
    flexGrow: 0,
    backgroundColor: Colors.surface,
  },
  tab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    marginRight: Spacing.sm,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  tabContent: {
    padding: Spacing.base,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.md,
    color: Colors.textPrimary,
  },
  bioText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.warningLight,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  warningText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.warningDark,
    fontWeight: Typography.weights.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
});

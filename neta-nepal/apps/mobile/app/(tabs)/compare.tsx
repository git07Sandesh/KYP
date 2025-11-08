import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

export default function CompareScreen() {
  const [selectedCandidates, setSelectedCandidates] = useState<any[]>([]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Compare Candidates</Text>
        <Text style={styles.subtitle}>Select up to 3 candidates to compare</Text>
      </View>

      {selectedCandidates.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No candidates selected yet</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Candidate</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.comparisonContainer}>
          {selectedCandidates.map((candidate, index) => (
            <View key={index} style={styles.candidateColumn}>
              <Image source={{ uri: candidate.photoUrl }} style={styles.candidatePhoto} />
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <Text style={styles.candidateParty}>{candidate.party}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Impact Score</Text>
                  <Text style={styles.statValue}>{candidate.impactScore}/100</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Fulfillment</Text>
                  <Text style={styles.statValue}>{candidate.fulfillmentRate}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Scandal Score</Text>
                  <Text style={styles.statValue}>{candidate.scandalScore}/100</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Swipe left or right to view more details
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    ...Shadows.sm,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    color: Colors.textDark,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  emptyState: {
    padding: Spacing['2xl'],
    paddingTop: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textMuted,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    minHeight: 48,
    ...Shadows.md,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  comparisonContainer: {
    padding: Spacing.base,
  },
  candidateColumn: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray200,
    ...Shadows.lg,
  },
  candidatePhoto: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.base,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  candidateName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    color: Colors.textDark,
  },
  candidateParty: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.lg,
    fontWeight: Typography.fontWeight.medium,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMedium,
    fontWeight: Typography.fontWeight.medium,
  },
  statValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.accent,
  },
  footer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});

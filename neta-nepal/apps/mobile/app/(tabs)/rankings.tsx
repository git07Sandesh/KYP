import { StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

const CATEGORIES = [
  { id: 'TOP_IMPACT', label: 'Top Impact', key: 'impactScore' },
  { id: 'CLEANEST_RECORDS', label: 'Cleanest', key: 'scandalScore' },
  { id: 'HIGHEST_FULFILLMENT', label: 'Fulfillment', key: 'fulfillmentRate' },
  { id: 'MOST_POPULAR', label: 'Popular', key: 'popularityScore' },
];

// Mock data - replace with API call
const mockRankings: any = {
  TOP_IMPACT: [
    { id: 1, rank: 1, name: 'Ram Prasad Sharma', party: 'Nepali Congress', score: 95, photoUrl: 'https://via.placeholder.com/50' },
    { id: 2, rank: 2, name: 'Sita Devi Thapa', party: 'CPN-UML', score: 92, photoUrl: 'https://via.placeholder.com/50' },
  ],
  CLEANEST_RECORDS: [],
  HIGHEST_FULFILLMENT: [],
  MOST_POPULAR: [],
};

export default function RankingsScreen() {
  const [activeCategory, setActiveCategory] = useState('TOP_IMPACT');

  const rankings = mockRankings[activeCategory] || [];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              activeCategory === category.id && styles.categoryTabActive
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === category.id && styles.categoryTabTextActive
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={rankings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rankingCard}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{item.rank}</Text>
            </View>
            
            <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
            
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{item.name}</Text>
              <Text style={styles.candidateParty}>{item.party}</Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreValue}>{item.score}</Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No rankings available for this category</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryTabs: {
    flexGrow: 0,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  categoryTab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    minHeight: 40,
    justifyContent: 'center',
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    ...Shadows.md,
  },
  categoryTabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textMedium,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  rankingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  rankText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray200,
  },
  candidateInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  candidateName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: Colors.textDark,
  },
  candidateParty: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    fontWeight: Typography.fontWeight.medium,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    minWidth: 60,
  },
  scoreValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
  },
  scoreLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs / 2,
  },
  emptyState: {
    padding: Spacing['2xl'],
    paddingTop: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
});

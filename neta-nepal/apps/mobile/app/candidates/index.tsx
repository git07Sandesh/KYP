import { StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

// Mock data - replace with API call
const mockCandidates = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: `Candidate ${i + 1}`,
  party: i % 2 === 0 ? 'Nepali Congress' : 'CPN-UML',
  photoUrl: 'https://via.placeholder.com/80',
  constituency: `Constituency-${i + 1}`,
  impactScore: 70 + i,
  isVerified: i % 3 === 0,
}));

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'impactScore', label: 'Impact' },
  { value: 'fulfillmentRate', label: 'Fulfillment' },
  { value: 'scandalScore', label: 'Cleanest' },
];

export default function CandidatesListScreen() {
  const router = useRouter();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleCandidatePress = (id: string) => {
    router.push(`/candidates/${id}`);
  };

  const handleLoadMore = () => {
    // TODO: Implement pagination
    console.log('Load more candidates...');
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'All Candidates',
          headerBackTitle: 'Back',
        }}
      />

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search candidates..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters Bar */}
        <View style={styles.filtersBar}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <FontAwesome name="sort" size={16} color="#3b82f6" />
            <Text style={styles.sortButtonText}>
              Sort: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
            </Text>
            <FontAwesome name="chevron-down" size={12} color="#3b82f6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <FontAwesome name="filter" size={16} color="#6b7280" />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Sort Menu Dropdown */}
        {showSortMenu && (
          <View style={styles.sortMenu}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.sortOption}
                onPress={() => {
                  setSortBy(option.value);
                  setShowSortMenu(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option.value && styles.sortOptionTextActive
                ]}>
                  {option.label}
                </Text>
                {sortBy === option.value && (
                  <FontAwesome name="check" size={16} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Candidates List */}
        <FlatList
          data={filteredCandidates}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.candidateCard}
              onPress={() => handleCandidatePress(item.id)}
            >
              <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
              <View style={styles.candidateInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.candidateName}>{item.name}</Text>
                  {item.isVerified && (
                    <FontAwesome name="check-circle" size={14} color="#10b981" />
                  )}
                </View>
                <Text style={styles.candidateParty}>{item.party}</Text>
                <Text style={styles.candidateConstituency}>{item.constituency}</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>{item.impactScore}</Text>
                <Text style={styles.scoreLabel}>Impact</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No candidates found</Text>
            </View>
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" style={styles.loader} />
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
    width: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  filtersBar: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.background,
    gap: Spacing.sm,
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primaryLight,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    minHeight: 44,
    ...Shadows.sm,
  },
  sortButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    minHeight: 44,
    ...Shadows.sm,
  },
  filterButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  sortMenu: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.xs,
    borderRadius: BorderRadius.lg,
    ...Shadows.lg,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    minHeight: 52,
  },
  sortOptionText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
  sortOptionTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  listContent: {
    paddingBottom: Spacing.base,
  },
  candidateCard: {
    flexDirection: 'row',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  candidateInfo: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
    backgroundColor: 'transparent',
  },
  candidateName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  candidateParty: {
    fontSize: Typography.sizes.sm,
    color: Colors.accent,
    marginBottom: Spacing.xs,
  },
  candidateConstituency: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Spacing.md,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  scoreValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.success,
  },
  scoreLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  emptyState: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  loader: {
    paddingVertical: Spacing.lg,
  },
});

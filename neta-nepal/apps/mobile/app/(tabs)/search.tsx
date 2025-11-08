import { StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

// TODO: Replace with actual API call
const mockSearch = async (query: string) => {
  return [
    {
      id: '1',
      name: 'Ram Prasad Sharma',
      party: 'Nepali Congress',
      photoUrl: 'https://via.placeholder.com/80',
      constituency: 'Kathmandu-1'
    },
  ];
};

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    // TODO: Implement actual API call
    const data = await mockSearch(text);
    setResults(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <FontAwesome name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search candidates by name..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={handleSearch}
            autoFocus
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultCard}>
              <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultParty}>{item.party}</Text>
                <Text style={styles.resultConstituency}>{item.constituency}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            query.length >= 2 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No candidates found</Text>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Start typing to search candidates</Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: Spacing.base,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    ...Shadows.sm,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.gray200,
    paddingHorizontal: Spacing.base,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: Typography.fontSize.base,
    color: Colors.textDark,
  },
  loader: {
    marginTop: Spacing.xl,
  },
  resultCard: {
    flexDirection: 'row',
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    ...Shadows.md,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray200,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  resultName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: Colors.textDark,
  },
  resultParty: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs / 2,
    fontWeight: Typography.fontWeight.medium,
  },
  resultConstituency: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  emptyState: {
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
});

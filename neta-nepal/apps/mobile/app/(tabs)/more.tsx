import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/DesignSystem';

const menuItems = [
  { id: 'about', label: 'About Neta Nepal', icon: 'info-circle', route: '/about' },
  { id: 'editorial', label: 'Editorial Policy', icon: 'file-text', route: '/editorial' },
  { id: 'faq', label: 'FAQs', icon: 'question-circle', route: '/faq' },
  { id: 'feedback', label: 'Send Feedback', icon: 'comment', route: '/feedback' },
  { id: 'terms', label: 'Terms of Service', icon: 'legal', route: '/terms' },
  { id: 'privacy', label: 'Privacy Policy', icon: 'lock', route: '/privacy' },
  { id: 'contact', label: 'Contact Us', icon: 'envelope', route: '/contact' },
];

export default function MoreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Neta Nepal</Text>
        <Text style={styles.subtitle}>Know Your Political Candidate</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Information</Text>
        {menuItems.slice(0, 3).map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name={item.icon as any} size={20} color="#6b7280" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#d1d5db" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        {menuItems.slice(3, 5).map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name={item.icon as any} size={20} color="#6b7280" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#d1d5db" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Legal</Text>
        {menuItems.slice(5, 7).map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name={item.icon as any} size={20} color="#6b7280" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#d1d5db" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for Nepal
        </Text>
        <Text style={styles.footerSubtext}>
          © 2025 Neta Nepal. All rights reserved.
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
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    ...Shadows.md,
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    color: Colors.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  version: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  menuSection: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    minHeight: 60,
    ...Shadows.sm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuIcon: {
    marginRight: Spacing.base,
    width: 28,
    color: Colors.accent,
  },
  menuItemText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textDark,
    fontWeight: Typography.fontWeight.medium,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  footerSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
});

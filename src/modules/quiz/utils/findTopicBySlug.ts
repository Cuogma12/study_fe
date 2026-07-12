import { TopicNode } from '@/modules/questions/services/topic.service';

export const findTopicIdBySlug = (nodes: TopicNode[], slug: string): string | null => {
  for (const node of nodes) {
    if (node.slug === slug) {
      return node.id;
    }
    if (node.children?.length) {
      const found = findTopicIdBySlug(node.children, slug);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

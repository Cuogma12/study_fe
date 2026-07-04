import axiosClient from '@/shared/utils/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api';

export interface TopicNode {
  id: string;
  name: string;
  slug?: string;
  grade_level?: number[] | null;
  parent_topic_id?: string | null;
  children?: TopicNode[];
}

/** Khớp logic BE: grade_level null/rỗng = áp dụng mọi lớp */
export const topicMatchesGrade = (topic: TopicNode, gradeLevel: number): boolean => {
  const levels = topic.grade_level;
  if (!levels || levels.length === 0) {
    return true;
  }
  return levels.includes(gradeLevel);
};

const collectTopicNodes = (nodes: TopicNode[]): TopicNode[] => {
  const items: TopicNode[] = [];
  for (const node of nodes) {
    items.push({
      id: node.id,
      name: node.name,
      slug: node.slug,
      grade_level: node.grade_level,
      parent_topic_id: node.parent_topic_id ?? null,
    });
    if (node.children?.length) {
      items.push(...collectTopicNodes(node.children));
    }
  }
  return items;
};

const buildTopicTree = (topics: TopicNode[]): TopicNode[] => {
  const nodes = new Map<string, TopicNode>();

  for (const topic of topics) {
    nodes.set(topic.id, { ...topic, children: [] });
  }

  const roots: TopicNode[] = [];

  for (const topic of topics) {
    const node = nodes.get(topic.id)!;
    const parentId = topic.parent_topic_id;
    if (parentId && nodes.has(parentId)) {
      nodes.get(parentId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortNodes = (list: TopicNode[]) => {
    list.sort((a, b) => a.name.localeCompare(b.name));
    list.forEach((node) => {
      if (node.children?.length) {
        sortNodes(node.children);
      }
    });
  };

  sortNodes(roots);
  return roots;
};

export const filterTopicTreeByGrade = (
  tree: TopicNode[],
  gradeLevel: number
): TopicNode[] => {
  const flat = collectTopicNodes(tree);
  const filtered = flat.filter((topic) => topicMatchesGrade(topic, gradeLevel));
  return buildTopicTree(filtered);
};

export const flattenTopicOptions = (
  nodes: TopicNode[],
  depth = 0
): { label: string; value: string }[] => {
  const items: { label: string; value: string }[] = [];

  for (const node of nodes) {
    const indent = depth > 0 ? `${'— '.repeat(depth)}` : '';
    items.push({ label: `${indent}${node.name}`, value: node.id });
    if (node.children?.length) {
      items.push(...flattenTopicOptions(node.children, depth + 1));
    }
  }

  return items;
};

export const topicService = {
  /** Lấy full cây chủ đề theo môn — không filter grade (filter trên FE). */
  getBySubject: async (subjectId: string): Promise<TopicNode[]> => {
    const res = await axiosClient.get(API_ENDPOINTS.SUBJECTS.TOPICS(subjectId));
    return res.data.items ?? [];
  },
};

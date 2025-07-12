import styles from "./AnunturiPromovate.module.scss";
import PostsSlider from "../../UI/PostsSlider/PostsSlider";
import AdContainer from "../../UI/AdContainer/AdContainer";
import { Post } from "@/types/Post";

interface ApiResponse {
  code: string;
  posts: Post[];
  count: number;
  totalCount: number;
  hasMore: boolean;
  promotedCount: number;
}

async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/latest?limit=20`,
      {
        next: { revalidate: 3 },
        /// 300
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export default async function AnunturiPromovate() {
  const posts = await fetchLatestPosts();
  const firstHalf = posts.slice(0, 10);
  const secondHalf = posts.slice(10, 20);

  return (
    <section className={styles.anunturipromovate}>
      <PostsSlider posts={firstHalf} uniqueId="1" />
      <AdContainer />
      <PostsSlider posts={secondHalf} uniqueId="2" />
      <AdContainer />
    </section>
  );
}

import SearchPage from "../../components/SearchPage/SearchPage";
import { use } from "react";

export default function CategorySearchPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  return <SearchPage category={category} />;
}

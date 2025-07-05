// app/[category]/search/page.tsx
import SearchPage from "../../components/SearchPage/SearchPage";

interface Props {
  params: {
    category: string;
  };
}

export default function CategorySearchPage({ params }: Props) {
  return <SearchPage category={params.category} />;
}

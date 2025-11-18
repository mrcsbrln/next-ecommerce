type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  return (
    <div className="container mx-auto py-4">
      <h1>Search</h1>
      <p>The query is {params.query ?? "not provided"}</p>
    </div>
  );
}

import useSWR from "swr";

const query = `
query Publication {
  publication(host:"fibbonachos.hashnode.dev") {
    isTeam,
    title
    posts(first:20){
      edges{
        node {
          title,
          brief,
          url
        }
      }
    }
  }
}
`;

function App() {
  const fetcher = async () => {
    const response = await fetch(`https://gql.hashnode.com`, {
      body: JSON.stringify({ query }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await response.json();
    return data;
  };

  const { data, error } = useSWR(query, fetcher);
  if (error) return <p>Error</p>;
  if (!data) return <p>Loading ...</p>;

  return (
    <div>
      {data.publication.posts.edges.map((result: any, index: number) => {
        return <div key={index}>{result.node.title}</div>;
      })}
    </div>
  );
}

export default App;

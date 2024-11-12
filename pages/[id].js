
export default function Movie({ movie }) {
    return <>(movie)</>
  };

export async function getServerSideProps() {
    return {
        props: {
            movie: 'ololosha'
        }
    }
}
export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/sign-in',
      permanent: false
    }
  }
}

export default function HomePage() {
  return null
}

import Head from "next/head";
import { Sidebar } from "../ui";


interface Props{
  children: React.ReactNode;
  title?: string;
}
export const Layout:React.FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
          <title> { `${title !== '' ? title : 'The Submission App' }`}  </title>
          <meta name="author" content="Agustin Pereira" />
          <meta property="og:title" content={`Información sobre ${title}`} />
          <meta property="og:description" content={`Ésta es la página sobre ${ title }`} />
      </Head>
    
      <div className="flex h-screen">
      {/* <div className="flex"> */}
        <Sidebar />

        <main style={{
            padding:'0px 20px',
            // width: '100%',
            flexGrow: 1,
        }}>
            { children }
        </main>
      </div>
    </>
  )
}

export default Layout;

import Head from "next/head";


interface Props{
  children: React.ReactNode;
  title?: string;
}
export const AuthLayout:React.FC<Props> = ({children, title}) => {

  return (
    <>
      <Head>
          <title> { `${title !== '' ? title : 'The Submission App' }`}  </title>
          <meta name="author" content="Agustin Pereira" />
          <meta property="og:title" content={`Información sobre ${title}`} />
          <meta property="og:description" content={`Ésta es la página sobre ${ title }`} />
      </Head>
    
      <div className="flex h-screen justify-center items-center">
        <main style={{
            // width: '100%',
            // flexGrow: 1,
        }}
            className={`${ title?.includes('Login') || title?.includes('Forgot password')  ? 'bg-slate-200' : 'bg-red-300' } flex w-full h-full justify-center items-center`}
        >
            { children }
        </main>
      </div>
    </>
  )
}

export default AuthLayout;

import './styles.css'

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <main className="">
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Spirit Number Code</h1>
        </header>
        <div className="">
          {children}
        </div>
      </main>
    </>
  )
}

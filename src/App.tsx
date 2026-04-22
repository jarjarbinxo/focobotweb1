import { useLang } from './hooks/useLang'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div>
      <p style={{ padding: 20 }}>Rebuilding... lang={lang} <button onClick={toggle}>toggle</button></p>
    </div>
  )
}

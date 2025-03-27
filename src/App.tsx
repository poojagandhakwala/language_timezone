import LanguageSelection from "./LanguageSelection.tsx";

function App() {
  const lng: string[] = ["en-US", "en-IN", "en-GB", "pt-BR", "ar-EG"];

  return (
    <>
      <LanguageSelection languages={lng} />
    </>
  );
}

export default App;

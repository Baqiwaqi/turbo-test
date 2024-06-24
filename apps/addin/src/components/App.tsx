import { TRPCProvider } from "./Api";
import Header from "./Header";

interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = () => {
  return (
    <TRPCProvider>
      <div>
        <Header />
        {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
        {/* <TextInsertion insertText={insertText} /> */}
      </div>
    </TRPCProvider>
  );
};

export default App;

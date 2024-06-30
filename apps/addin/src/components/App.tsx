import { TRPCProvider } from "./Api";
import { useAuth } from "./Auth";
import Header from "./Header";

interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = () => {
  return (
    <TRPCProvider>
      <div>
        <Header />
        <AuthShowcase />
        {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
        {/* <TextInsertion insertText={insertText} /> */}
      </div>
    </TRPCProvider>
  );
};

function AuthShowcase() {
  const auth = useAuth();
  const user = auth.useUser();
  const signIn = auth.useSignIn();
  const signOut = auth.useSignOut();

  return (
    <>
      <p className="pb-2 text-center text-xl font-semibold text-white">{user?.name ?? "Not logged in"}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => (user ? signOut() : signIn())} className="btn">
        {user ? "Sign Out" : "Sign In With Discord"}
      </button>
    </>
  );
}

export default App;

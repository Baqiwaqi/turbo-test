import { makeStyles, tokens } from "@fluentui/react-components";

import { Button } from "@repo/ui/button";
import { Code } from "@repo/ui/code";
import { api } from "./Api";

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    paddingTop: "100px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  message: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

const Header = () => {
  // const { title, logo, message } = props;
  const styles = useStyles();

  const mut = api.auth.getSession.useQuery();

  const data = api.post.all.useQuery();
  return (
    <section className={styles.welcome__header}>
      {/* <Image width="90" height="90" src={logo} alt={title} /> */}
      <h1 className={styles.message}>HELLO from dev</h1>
      {/* <span>{multiply(10, 7)}</span>
      <span>{subtract(10, 7)}</span> */}
      {/* <span>{multiply(10, 7)}</span> */}
      <Button appName="addin">Click me</Button>
      <Code>npm install @repo/math</Code>
      <pre>{JSON.stringify(mut, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <Code>import {add(2, 3)} from "@repo/math/add";</Code> */}
    </section>
  );
};

export default Header;

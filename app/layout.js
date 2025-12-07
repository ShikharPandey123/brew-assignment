import "../styles/app.scss";
import "../styles/header.scss";
import Header from "./header";
import { ContextProvider } from "../components/Clients";

export const metadata = {
  title: "TaskManager",
  description: "Task management app built with Next.js",
  icons: {
    icon: "/fav.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header />
          <main className="page-content">{children}</main>
        </ContextProvider>
      </body>
    </html>
  );
}

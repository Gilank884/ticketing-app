import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Hai Ticket",
  description: "Event ticketing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

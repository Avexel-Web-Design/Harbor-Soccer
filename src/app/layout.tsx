import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Replace Next.js font system with standard CSS imports
// You would need to import these fonts in your CSS or use a CDN link in your HTML

interface LayoutProps {
  children: React.ReactNode;
}

// Convert from Next.js RootLayout to standard React component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

// Note: For a complete React app, you would use this Layout in your App component:
// 
// function App() {
//   return (
//     <Layout>
//       <YourPageContent />
//     </Layout>
//   );
// }
//
// And add document head metadata with react-helmet or similar library if needed

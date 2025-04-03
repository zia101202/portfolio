
import "./globals.css";

import StarsCanvas from "@/components/ui/StarBackground";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      
      >
   
        
            {children}
         <StarsCanvas/>
          
      </body>
    </html>
  );
}

import "./globals.css";
import { Suspense } from "react";
import Cabecalho from "@/components/Cabecalho/Cabecalho";


export const metadata = {
  title: "FitNex - Gestão de Academia",
  description: "Sistema de gerenciamento de turmas da academia FitNex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense fallback={<div>Carregando...</div>}>
          <Cabecalho />
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
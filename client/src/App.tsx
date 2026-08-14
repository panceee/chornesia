/* RiffForge / rute ringan: halaman koleksi dan latihan dimuat saat benar-benar dibuka. */
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import SongDetail from "@/pages/SongDetail";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
const Practice = lazy(() => import("@/pages/Practice")); const Collections = lazy(() => import("@/pages/Collections"));
function LoadingRoute() { return <div className="route-loading">Memuat halaman…</div>; }
function Router() { return <Suspense fallback={<LoadingRoute />}><Switch><Route path="/" component={Home} /><Route path="/lagu/:slug" component={SongDetail} /><Route path="/latihan/:slug" component={Practice} /><Route path="/collections" component={Collections} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Suspense>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }

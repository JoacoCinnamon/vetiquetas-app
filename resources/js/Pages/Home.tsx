import { PageProps } from "@/types";
import Layout from "@/Layouts/DefaultLayout";

export default function Home({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Layout user={auth.user} >
                <section className="h-auto">
                    <div className="px-10 py-24 mx-auto max-w-7xl">
                        <div className="w-full mx-auto text-left md:text-center">
                            <h1 className="mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal  sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight text-center">
                                Vetiquetas: <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
                                    bordando identidades</span>
                                <span className="lg:block hidden">simplificando pedidos.</span>
                            </h1>
                            <p className="px-0 mb-6 text-lg text-muted-foreground md:text-xl lg:px-24">Durante más de 20 años, Vetiquetas ha liderado la industria de etiquetas bordadas, ofreciendo soluciones de identificación y diferenciación de marca de vanguardia. Únase a nosotros para experimentar una gestión completa de pedidos y cotizaciones con nuestro equipo capacitado y tecnología de última generación.</p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

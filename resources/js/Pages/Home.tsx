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
                            <div className="relative isolate">
                                <div
                                    aria-hidden='true'
                                    className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                        }}
                                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                                    />
                                </div>
                            </div>
                            <h1 className="text-balance mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal  sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight text-center">
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

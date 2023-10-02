import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Header } from "@/Components/header";

export default function Inicio({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header heading="Inicio" />}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

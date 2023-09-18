import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Inicio({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

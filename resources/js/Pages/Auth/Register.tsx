import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        apellido: "",
        documento: "",
        tipo_documento: "",
        cuit_cuil: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("registrar"));
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nombre" value="Nombre" />

                    <TextInput
                        id="nombre"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full"
                        autoComplete="nombre"
                        isFocused={true}
                        onChange={(e) => setData("nombre", e.target.value)}
                        required
                    />

                    <InputError message={errors.nombre} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="apellido" value="Apellido" />

                    <TextInput
                        id="apellido"
                        name="apellido"
                        value={data.apellido}
                        className="mt-1 block w-full"
                        autoComplete="apellido"
                        isFocused={true}
                        onChange={(e) => setData("apellido", e.target.value)}
                        required
                    />

                    <InputError message={errors.apellido} className="mt-2" />
                </div>

                <section className="md:flex md:flex-auto md:justify-between md:gap-2">
                    <div className="mt-4 md:flex md:flex-col w-full">
                        <InputLabel htmlFor="documento" value="Documento" />

                        <TextInput
                            id="documento"
                            name="documento"
                            value={data.documento}
                            maxLength={8}
                            className="mt-1 block w-full"
                            autoComplete="documento"
                            isFocused={true}
                            onChange={(e) =>
                                setData("documento", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.documento}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 md:flex md:flex-col w-full">
                        <InputLabel htmlFor="cuit_cuil" value="CUIT/CUIL" />

                        <TextInput
                            id="cuit_cuil"
                            name="cuit_cuil"
                            value={data.cuit_cuil}
                            maxLength={13}
                            className="mt-1 block w-full"
                            autoComplete="cuit_cuil"
                            isFocused={true}
                            onChange={(e) =>
                                setData("cuit_cuil", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.cuit_cuil}
                            className="mt-2"
                        />
                    </div>
                </section>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar contraseña"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("iniciar-sesion")}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        ¿Ya estás registrado?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

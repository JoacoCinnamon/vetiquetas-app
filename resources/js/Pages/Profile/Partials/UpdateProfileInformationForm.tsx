import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { Label, LabelError } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Spinner } from "@/Components/spinner";
import { Button } from "@/Components/ui/button";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("perfil.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">
                    Información del perfil
                </h2>

                <p className="mt-1 text-sm text-foreground/60">
                    Actualice la información de su cuenta y la dirección de
                    correo electrónico.
                </p>
            </header>

            <form onSubmit={submit}>
                <fieldset disabled={processing} className="group mt-6 space-y-6">
                    <div>
                        <Label htmlFor="nombre">
                            Nombre
                        </Label>

                        <Input
                            id="nombre"
                            className="mt-1 block w-full"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            required
                            // isFocused
                            autoComplete="nombre"
                        />

                        <InputError className="mt-2" message={errors.nombre} />
                    </div>

                    <div>
                        <Label htmlFor="apellido">
                            Apellido
                        </Label>
                        <Input
                            id="apellido"
                            className="mt-1 block w-full"
                            value={data.apellido}
                            onChange={(e) => setData("apellido", e.target.value)}
                            required
                            // isFocused
                            autoComplete="apellido"
                        />

                        <InputError className="mt-2" message={errors.apellido} />
                    </div>

                    <div>
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2">
                                Su dirección de correo electrónico no está
                                verificada.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-foreground/60 hover:text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    Haga clic aquí para reenviar el correo de
                                    verificación.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    Se ha enviado un nuevo enlace de verificación a
                                    su dirección de correo electrónico.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                            <Spinner className="absolute h-5 group-enabled:opacity-0" />
                            <span className="group-disabled:opacity-0">Guardar</span>
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-foreground/60">
                                Guardado.
                            </p>
                        </Transition>
                    </div>
                </fieldset>
            </form>
        </section>
    );
}

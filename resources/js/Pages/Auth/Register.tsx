import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label, LabelError } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Spinner } from "@/Components/spinner";
import { cn } from "@/lib/utils";

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
                <fieldset disabled={processing} className="group">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>

                        <Input
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            className="mt-1 block w-full"
                            autoComplete="nombre"
                            autoFocus={true}
                            onChange={(e) => setData("nombre", e.target.value)}
                            required
                        />

                        <LabelError message={errors.nombre} className="mt-2" />
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="apellido">Apellido</Label>

                        <Input
                            id="apellido"
                            name="apellido"
                            value={data.apellido}
                            className="mt-1 block w-full"
                            autoComplete="apellido"
                            autoFocus={true}
                            onChange={(e) => setData("apellido", e.target.value)}
                            required
                        />

                        <LabelError message={errors.apellido} className="mt-2" />
                    </div>

                    <section className="md:flex md:flex-auto md:justify-between md:gap-2">
                        <div className="space-y-2 mt-4 md:flex md:flex-col w-full">
                            <Label htmlFor="documento">Documento</Label>

                            <Input
                                id="documento"
                                name="documento"
                                value={data.documento}
                                className="mt-1 block w-full"
                                autoComplete="documento"
                                autoFocus={true}
                                onChange={(e) => setData("documento", e.target.value)}
                                required
                            />

                            <LabelError message={errors.documento} className="mt-2" />
                        </div>

                        <div className="space-y-2 mt-4 md:flex md:flex-col w-full">
                            <Label htmlFor="cuit_cuil">CUIT/CUIL</Label>

                            <Input
                                id="cuit_cuil"
                                name="cuit_cuil"
                                value={data.cuit_cuil}
                                className="mt-1 block w-full"
                                autoComplete="cuit_cuil"
                                autoFocus={true}
                                onChange={(e) => setData("cuit_cuil", e.target.value)}
                                required
                            />

                            <LabelError message={errors.cuit_cuil} className="mt-2" />
                        </div>
                    </section>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="email">Correo electrónico</Label>

                        <Input value={data.email}
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <LabelError className="mt-2" message={errors.email} />
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="password">Contraseña</Label>

                        <Input
                            id="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="password"
                            autoFocus={true}
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />

                        <LabelError message={errors.password} className="mt-2" />
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>

                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="password_confirmation"
                            autoFocus={true}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />

                        <LabelError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {!processing && (
                            <Link
                                disabled={processing}
                                href={route("iniciar-sesion")}
                                className={cn(buttonVariants({ variant: "link" }), "text-foreground/70 hover:text-foreground focus:text-foreground group-disabled:pointer-events-none")}
                            >
                                ¿Ya estás registrado?
                            </Link>
                        )}

                        <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none ml-4">
                            <Spinner className="absolute h-5 group-enabled:opacity-0" />
                            <span className="group-disabled:opacity-0">Registrar</span>
                        </Button>
                    </div>
                </fieldset>
            </form>
        </GuestLayout>
    );
}

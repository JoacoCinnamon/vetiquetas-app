import { useRef, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Label, LabelError } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Spinner } from "@/Components/spinner";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">
                    Actualizar contraseña
                </h2>

                <p className="mt-1 text-sm text-foreground/60">
                    Asegúrese que su cuenta esté usando una contraseña larga y
                    aleatoria para mantenerse seguro.
                </p>
            </header>

            <form onSubmit={updatePassword}>
                <fieldset disabled={processing} className="group mt-6 space-y-6">
                    <div>
                        <Label className="text-foreground/80" htmlFor="current_password">
                            Contraseña actual
                        </Label>

                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                        />

                        <LabelError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label className="text-foreground/80" htmlFor="password">
                            Nueva contraseña
                        </Label>

                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <LabelError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label className="text-foreground/80" htmlFor="password_confirmation">
                            Confirmar contraseña
                        </Label>

                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <LabelError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

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

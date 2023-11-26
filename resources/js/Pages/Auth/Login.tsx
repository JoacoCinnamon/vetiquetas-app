import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useEffect, FormEventHandler, useRef } from "react";
import { Checkbox } from "@/Components/ui/checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Label, LabelError } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Spinner } from "@/Components/spinner";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const captchaRef = useRef<HCaptcha>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        hcaptcha: captchaRef.current?.getResponse() ?? "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("iniciar-sesion"));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesion" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <fieldset disabled={processing} className="group">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input value={data.email}
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <LabelError className="mt-2" message={errors.email} />
                    </div>

                    <div className="mt-4 space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input value={data.password}
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="password"
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <LabelError className="mt-2" message={errors.password} />
                    </div>

                    <div className="block mt-4">
                        <HCaptcha
                            sitekey="2bb1ef6d-b043-4bce-b58d-4fb8a04a716c"
                            theme="dark"
                            onLoad={() => captchaRef.current?.execute()}
                            onVerify={(token) => setData("hcaptcha", token)}
                        />
                        <LabelError className="mt-2" message={errors.hcaptcha} />
                    </div>

                    <div className="block mt-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(e) => setData("remember", Boolean(e))}
                            />
                            <Label htmlFor="remember">
                                Recordarme
                            </Label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* {canResetPassword && (
                            <Link
                                disabled={processing}
                                href={route("password.request")}
                                className={buttonVariants({ variant: "link" })}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )} */}

                        <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none ml-4">
                            <Spinner className="absolute h-5 group-enabled:opacity-0" />
                            <span className="group-disabled:opacity-0">Iniciar Sesión</span>
                        </Button>
                    </div>
                </fieldset>
            </form>
        </GuestLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

type Analytics = {
    totalIncome: string;
    incomeChange: string;
    totalOrders: number;
    lastMonthOrders: number;
    ordersChange: string;
    totalDesigns: number;
    designsChange: string;
    totalUsers: number;
    usersChange: string;
    dailyOrders: {
        time: string,
        value: number
    }[],
    lastFiveSales: {
        nombre: string;
        apellido: string;
        email: string;
        precio: string;
    }[]
};

export default function Inicio({ auth, analytics }: PageProps<{ analytics: Analytics }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Inicio" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                            <div className="flex items-center space-x-2">
                                {/* <CalendarDateRangePicker /> */}
                                {/* <Button>Descargar</Button> */}
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Ingresos totales
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${analytics.totalIncome}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.incomeChange} desde el mes pasado
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Pedidos
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+{analytics.totalOrders}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.ordersChange} desde el mes pasado
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Diseños</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+{analytics.totalDesigns}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.designsChange} desde el mes pasado
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Usuarios
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+{analytics.totalUsers}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.usersChange} desde el mes pasado
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Últimos pedidos</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Chart data={analytics.dailyOrders} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Últimos pedidos de usuarios</CardTitle>
                                    <CardDescription>
                                        {analytics.lastMonthOrders === 0
                                            ? `No hicieron pedidos este mes.`
                                            : `Hicieron ${analytics.lastMonthOrders} ${analytics.lastMonthOrders === 1 ? 'pedido' : 'pedidos'} este mes.`
                                        }
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {analytics.lastFiveSales?.map(({ nombre, apellido, email, precio }) => {
                                            return <div className="flex items-center">
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none">{nombre} {apellido}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {email}
                                                    </p>
                                                </div>
                                                <div className="ml-auto font-medium">+${precio}</div>
                                            </div>
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}


type ChartProps = {
    data: {
        time: string;
        value: number;
    }[]
}

function Chart({ data }: ChartProps) {
    const colors = {
        backgroundColor: '#020817',
        lineColor: '#2962FF',
        textColor: 'white',
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    }

    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
            };

            const chart = createChart(chartContainerRef.current ?? "", {
                layout: {
                    background: { type: ColorType.Solid, color: colors.backgroundColor },
                    textColor: colors.textColor
                },
                grid: {
                    vertLines: {
                        visible: false
                    },
                    horzLines: {
                        color: '#363C4E',
                    },
                },
                width: chartContainerRef.current?.clientWidth,
                height: 350,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({
                lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor
            });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, colors.backgroundColor, colors.lineColor, colors.textColor, colors.areaTopColor, colors.areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};


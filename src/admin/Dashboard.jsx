function Dashboard() {
    return (
        <>
            <nav>
                <div className="flex items-center">
                    <div className="flex items-center ms-3">
                        <div>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                <img src="" alt="" className="w-8 h-8 rounded-full" />
                            </button>
                        </div>
                        <div className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="dropdown-user">
                            <div className="px-4 py-3 border-b border-default-medium" role="none">
                                <p className="text-sm font-medium text-heading" role="none">
                                    Neil Sims
                                </p>
                                <p className="text-sm text-body truncate" role="none">
                                    neil.sims@flowbite.com
                                </p>
                            </div>
                            <ul className="p-2 text-sm text-body font-medium" role="none">
                                <li>
                                    <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="p-4 sm:ml-64">

                <p className="text-4xl text-center">DASHBOARD ADMINISTRATEUR</p>
                <div className="flex gap-4 p-4 border-1 border-default border-dashed rounded-base">
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Nombres d'utilisateurs</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Nombres d'espaces</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Nombres d'equipements</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                </div>

                <div className="flex gap-4 p-4 border-1 border-default border-dashed rounded-base">
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Nombres de réservations</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Nombres de factures</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                    <div className="bg-[#B2F7EF] h-[150px] w-[350px] p-5 rounded-lg mt-5">
                        <h1 className="text-font text-xl text-">Total Factures</h1>
                        <p className="text-font text-4xl mb-2 mt-8">00</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;
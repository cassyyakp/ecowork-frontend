import { useState, useEffect } from 'react';
import CardEspace from './CardEspace';

function ListeEspaces() {
    const [espaces, setEspaces] = useState([]);
    const [ setTypes] = useState([]);
    const [filtre] = useState('tous');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        };

        const fetchData = async () => {
            try {
                const [resEspaces, resTypes] = await Promise.all([
                    fetch('http://localhost:8000/api/espaces', { headers }),
                    fetch('http://localhost:8000/api/typeespaces', { headers }),
                ]);
                const [dataEspaces, dataTypes] = await Promise.all([
                    resEspaces.json(),
                    resTypes.json(),
                ]); 
                setEspaces((Array.isArray(dataEspaces) ? dataEspaces : dataEspaces.data || []).slice(0, 3));
                setTypes(Array.isArray(dataTypes) ? dataTypes : dataTypes.data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const espacesFiltres = espaces.filter(e => {
        if (filtre === 'tous') return true;
        return e.id_type_espace === filtre;
    });

    return (
        <div className="py-16 px-8">
            
            <div className="flex justify-center items-center mb-10">
                <h1 className="text-gray-800 text-font text-5xl">QUELQUES ESPACES DISPONIBLES</h1>
            </div>

            {loading && <p className="text-center text-gray-400">Chargement...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {espacesFiltres.map(espace => (
                    <CardEspace key={espace.id_espace} espace={espace} />
                ))}
            </div>
        </div>
    );
}

export default ListeEspaces;
import React from "react";
import { useState, useEffect } from "react";

//Item Card
import Item from '../../src/components/Item';

//Spinner
import Spinner from '../../src/components/Spinner/Spinner'

function ItemsContainer() {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await fetch("https://api.spacexdata.com/v3/launches");
                const data = await response.json();
                setMissions(data);
                setLoading(false); 
            } catch (error) {
                console.log(error.message);
                setLoading(false); 
            }
        }
        fetchMissions();
    }, [])

    const cardsMission = missions.map((mission) => {
        return (
            <Item key={mission.id} mission={mission} />
        )
    })

    return (
        <section className="cards-section">
            {loading ? <Spinner /> : cardsMission}
        </section>
    )
}

export default ItemsContainer;
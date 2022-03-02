import React, { useEffect, useState } from 'react';
import { getAllPolicies, searchAllPolicies } from '../../requests';
import InsuranceTable from './insuranceTable';
import './insurance.scss';

function Insurance(props) {
    let typingTimer;
    const [policies, setPolicies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [searchClicked, setSearchClicked] = useState(false);

    const policySearch = async (event) => {
        setSearchClicked(true);
        clearTimeout(typingTimer);
        const id = event.target.value;
        const re = /^[0-9\b]+$/;
        if (id === '' || re.test(id)) {
            setSearchQuery(id);
        }
    }
    React.useEffect(() => {
        if (searchClicked) {
            typingTimer = setTimeout(async () => {
                setLoadingData(true);
                const data = await searchAllPolicies({ query_id: searchQuery });
                setPolicies(data["data"]);
                setLoadingData(false);
            }, 1000);
        }
    }, [searchQuery])

    useEffect(() => {
        setLoadingData(true);
        getAllPolicies().then(data => setPolicies(data["data"]));
        setLoadingData(false);
    }, [])

    // useEffect(() => {
    //     searchAllPolicies({ query_id: searchQuery })
    // }, [searchQuery])

    return (
        <div className="insuranceMainClass">
            <span className="Header">Insurance</span>
            <div className="input-group tableSearch">
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search with ID"
                    className="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={policySearch}
                />
            </div>
            <InsuranceTable data={policies} loadingData={loadingData} />
        </div>
    )

}
export default Insurance;

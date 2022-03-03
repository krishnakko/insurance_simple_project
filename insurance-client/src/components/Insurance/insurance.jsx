import React, { useEffect, useState, useReducer } from 'react';
import { getAllPolicies, searchAllPolicies } from '../../requests';
import InsuranceTable from './insuranceTable';
import './insurance.scss';

function Insurance(props) {
    let typingTimer;
    const [policies, setPolicies] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [searchClicked, setSearchClicked] = useState(false);
    const [paginationData, setPaginationData] = useState({ "limit": 10, "offset": 0, "count": 0 });

    const policySearch = async (event) => {
        setSearchClicked(true);
        clearTimeout(typingTimer);
        const id = event.target.value;
        const re = /^[0-9\b]+$/;
        if (id === '' || re.test(id)) {
            setSearchQuery(id);
        }
    }
    useEffect(() => {
        if (searchClicked) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            typingTimer = setTimeout(async () => {
                setLoadingData(true);
                let data = {};
                let payload = { "limit": 10, "offset": 0 };
                if (searchQuery === "") {
                    data = await getAllPolicies(payload);
                } else {
                    payload["query_id"] = searchQuery;
                    data = await searchAllPolicies(payload);
                }
                setPaginationData({ ...paginationData, offset: payload.offset, limit: payload.limit });
                setPolicies(data);
                setLoadingData(false);
            }, 1000);
        }
    }, [searchQuery])

    useEffect(() => {
        setLoadingData(true);
        getAllPolicies(paginationData).then(data => {
            setPolicies(data);
            setLoadingData(false);
            setPaginationData({ ...paginationData, count: data["count"] })
        });
    }, [])

    // useEffect(() => {
    //     let pgData = {};
    //     const oldFilters = { ...filters };
    //     pgData["offset"] = oldFilters.offset;
    //     pgData["limit"] = oldFilters.limit;
    //     setPaginationData(pgData);
    // }, []);

    useEffect(() => {
        let pgData = { ...paginationData };
        pgData["count"] = policies.count;
        setPaginationData(pgData);
    }, [policies])

    const paginationHandling = async (pager) => {
        let payload = { offset: pager.startIndex, limit: pager.pageSize };
        let data = {};
        if (searchQuery !== "") {
            payload["query_id"] = searchQuery;
            data = await searchAllPolicies(payload);
        } else {
            data = await getAllPolicies(payload);
        }
        payload["count"] = data["count"];
        setPaginationData(payload)
        setPolicies(data);
    }

    // useEffect(() => {
    //     searchAllPolicies({ query_id: searchQuery })
    // }, [searchQuery])

    return (
        <div className="insuranceMainClass">
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
            <InsuranceTable
                data={policies}
                loadingData={loadingData}
                paginationData={paginationData}
                paginationHandling={paginationHandling}
            />
        </div>
    )

}
export default Insurance;

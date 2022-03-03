import React from 'react';
import TableComponent from '../../shared/Table/tableComponent';
import './insurance.scss';


function InsuranceTable(props) {
    const { data, loadingData } = props;
    const columns = React.useMemo(
        () => [
            {
                label: 'Policy ID',
                id: 'policy_id',
                minWidth: 100,
            },
            {
                label: 'Customer ID',
                id: 'customer_id',
                minWidth: 120,
            },
            {
                label: 'Date of purchase',
                id: 'date_of_purchase',
                minWidth: 150,
            },
            {
                label: 'Fuel',
                id: 'fuel',
            },
            {
                label: 'Premium',
                id: 'premium',

            },
            {
                label: 'Customer Income Group',
                id: 'customer_income_group',
                minWidth: 180,
            },
            {
                label: 'Vehicle Segment',
                id: 'vehicle_segment',
                minWidth: 150,
            },
            {
                label: 'Bodily Injury Liability',
                id: 'bodily_injury_liability',
                minWidth: 180,
                format: (value) => value.toLocaleString('en-US'),
            },
            {
                label: 'Personal Injury Protection',
                id: 'personal_injury_protection',
                minWidth: 180,
            },
            {
                label: 'Property Damage Liability',
                id: 'property_damage_liability',
                minWidth: 180,
            },
            {
                label: 'Collision',
                id: 'collision',
            },
            {
                label: 'Comprehensive',
                id: 'comprehensive',
            },
            {
                label: 'Customer Gender',
                id: 'customer_gender',
                minWidth: 150,
            },
            {
                label: 'Customer Income Group',
                id: 'customer_income_group',
                minWidth: 180,
            },
            {
                label: 'Customer Region',
                id: 'customer_region',
            },
            {
                label: 'Customer Marital Status',
                id: 'customer_marital_status',
                minWidth: 180,
            },
        ],
        []
    )

    return (
        <TableComponent
            columns={columns}
            name={"InsuranceTable"}
            data={data}
            loadingData={loadingData}
            paginationData={props.paginationData}
            paginationHandling={props.paginationHandling}
        />
    );
}
export default InsuranceTable;

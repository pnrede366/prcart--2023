import React from 'react';
import "./nodatafound.scss"
import { Empty } from 'antd';

const NoDataFound = ({ title = 'No data found.' }) => {
    return (
        <div className='noDataFound'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    );
};

export default NoDataFound;

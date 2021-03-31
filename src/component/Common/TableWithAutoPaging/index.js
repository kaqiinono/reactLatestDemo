import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Table } from '@jd/jmtd';
import PropTypes from 'prop-types';

function TableWithAutoPaging({ dataSource, columns, onChange, ...rest }) {
    const [pagination, setPagination] = useState({
        pageSize: 10,
        total: dataSource.length,
        current: 1,
        showSizeChanger: true,
        showTotal: t => `总共${t}条`
    });

    useEffect(() => {
        setPagination({
            ...pagination,
            pageSize: 10,
            total: dataSource.length,
            current: 1
        });
    }, [dataSource]);

    const handledDataSource = useMemo(() => {
        const { pageSize, current } = pagination;
        const page = current - 1;
        return dataSource.slice(page * pageSize, (page + 1) * pageSize);
    }, [pagination]);

    const setTable = useCallback(
        ({ action, value }) => {
            if (action === 'paginate') {
                setPagination({
                    ...pagination,
                    ...value
                });
            }
            onChange && onChange({ action, value });
        },
        [pagination]
    );

    return <Table dataSource={handledDataSource} columns={columns} pagination={pagination} {...rest} onChange={setTable} />;
}

TableWithAutoPaging.defaultProps = {
    dataSource: [],
    onChange: null
};
TableWithAutoPaging.propTypes = {
    columns: PropTypes.any.isRequired,
    dataSource: PropTypes.array,
    onChange: PropTypes.func
};

export default TableWithAutoPaging;

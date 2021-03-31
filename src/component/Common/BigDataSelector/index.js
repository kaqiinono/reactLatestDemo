import { useState, useCallback } from 'react';
import { Select } from '@jd/jmtd';
import PropTypes from 'prop-types';

const BigDataSelector = props => {
    const { dataSource, filterProp, limit, onChange, defaultValue, ...selectorProps } = props;
    // eslint-disable-next-line no-unused-vars
    const [dataList, setDataList] = useState(dataSource && dataSource.slice(0, limit));
    const [selectValue, setSelectValue] = useState(defaultValue);
    const [searchValue, setSearchValue] = useState();

    const handleOnBlur = () => {
        setDataList(dataSource.slice(0, limit));
    };

    const dataRender = useCallback(() => {
        if (searchValue) {
            const datas = [];
            // 对fundList进行遍历，将符合搜索条件的数据放入datas中
            let start = 0;
            while (datas.length < limit && start < dataSource.length) {
                const newData = dataSource.slice(start, start + 10 * limit);
                for (let i = 0; i < newData.length; i++) {
                    const item = newData[i];
                    if (datas.length <= limit) {
                        if (item[filterProp].includes(searchValue)) {
                            datas.push(item);
                        }
                    } else {
                        break;
                    }
                }
                start += 10 * limit;
            }
            // 然后只显示符合搜索条件的所有数据中的前100条
            return datas;
        }
        return dataList;
    }, [searchValue, dataList]);

    const onSearch = val => {
        // setLoading(true);
        setSearchValue(val);
    };

    const onSelectChange = val => {
        setSelectValue(val);
        onChange(val);
    };
    return (
        <Select
            {...selectorProps}
            size="small"
            value={selectValue}
            onChange={onSelectChange}
            placeholder="请选择"
            showSearch
            data={dataSource}
            dataRender={dataRender}
            onSearch={onSearch}
            searchValue={searchValue}
            onBlur={handleOnBlur}
        />
    );
};

BigDataSelector.defaultProps = {
    limit: 500,
    defaultValue: null
};
BigDataSelector.propTypes = {
    dataSource: PropTypes.array.isRequired,
    filterProp: PropTypes.string.isRequired,
    limit: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.any
};

export default BigDataSelector;

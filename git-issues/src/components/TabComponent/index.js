import React, {useState} from 'react';
import { Tabs, Input } from 'antd';
import IssuesTable from './../IssuesTable'

const { TabPane } = Tabs;

const TabComponent = () => {

    const [name, setName] = useState({
        name: '',
        login: ''
    }),

    [searchParam, setSearchParam] = useState('');

    const { Search } = Input;

    const getOwnerName = (name, login) => {
        console.log(name)
        setName({
            name: name,
            login, login
        })
    }

    return (
        <div>
            <h1> {name.login} / {name.name}</h1>
            <Search
                placeholder="input search text"
                onSearch={value => setSearchParam(value)}
                style={{ width: 200 }}
            />
            <Tabs defaultActiveKey="1" type="card" size="large">
                <TabPane tab="Issues" key="1">
                    <IssuesTable getOwnerName={getOwnerName} searchParam={searchParam}></IssuesTable>
                </TabPane>
            </Tabs>

        </div>
    )
}

export default TabComponent;
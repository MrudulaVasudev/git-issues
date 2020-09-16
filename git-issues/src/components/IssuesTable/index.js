import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Tag, Space, Pagination } from 'antd';
import DetailsComponent from './../DetailsComponent';

const IssuesTable = ({getOwnerName, searchParam}) => {

    const [openIssues, setOpenIssues] = useState(),
    [data, setData] = useState([]),
    [pageData, setPageData] = useState({}),
    [detailsPage, setDetailsPage] = useState(false),
    // [name, setName] = useState(''),
    [totalPages, setTotalPages] = useState(0),
    [page, setPageNumber] = useState(1),

    rowClick = (url) => {
        setDetailsPage(true)
        setPageData({
            url: url
        })
    },

    columns = [
        {
            title: "",
            dataIndex: "title",
            key: "title",
            render: (text, row) => {
                return (
                    <div>
                        <div onClick={() => rowClick(row.url)}>
                            {text}
                        </div>
                    </div>
                )
            }
        }
    ],

    fetchIssuesData = () => {
        axios.get('https://api.github.com/repos/angular/angular')
            .then((response) => {
                console.log(response.data)
                setOpenIssues(response.data.open_issues_count)
                // setName(response.data.name)
                getOwnerName(response.data.name, response.data.owner.login)
                setTotalPages(Math.ceil(response.data.open_issues_count/10))
            })
            .catch((err) => {
                console.log(err)
            })
        },

    fetchTableData = (page = 1) => {
        axios.get(`https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=20&page=${page}`)
            .then((response) => {
                console.log(response)
                setData(response.data.items)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
       fetchTableData(page)
    }, [page])

    useEffect(() => {
        fetchIssuesData()
    }, [])

    return (
        <div>
            You are in the Issuestable
            <div>
                <span>{openIssues}</span> Open
                <span></span>
            </div>
            {!detailsPage &&
                <>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                    <Pagination defaultCurrent={page} total={totalPages} onChange={(page, pageSize) => {setPageNumber(page)}} />
                </>
            }

            {detailsPage && <DetailsComponent pageData={pageData}>Details Page</DetailsComponent>}
        </div>
    )
}

export default IssuesTable
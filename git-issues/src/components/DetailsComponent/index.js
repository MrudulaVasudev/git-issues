import React, {useEffect, useState} from 'react';
import axios from 'axios';

const DetailsComponent = ({pageData}) => {

    const [pageBody, setPageBody] = useState({}),

    wrapperDiv = {
        display: "flex"
    }

    useEffect(() => {
        axios.get(pageData.url)
            .then((result) => {
                console.log(result)
                setPageBody({
                    ...pageBody,
                    labels: result.data.labels,
                    body: result.data.body,
                    title: result.data.title,
                    state: result.data.state
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <div>
                <h1>{pageBody.title}</h1>
            </div>
            <div style={wrapperDiv}>
                <div style={{width: "60%", border: "1px solid black"}}>{pageBody.body}</div>
                <div style={{marginLeft: "100px"}}>
                    <div style={{border: "1px solid black", padding: "5px 50px"}}>
                        Labels
                        <div style={{display: "inline-block"}}>
                            <div>
                                {pageBody.length && (pageBody.labels).map((label) => {
                                    return (
                                        <div style={{border: "1px solid black", color: label.color}}>{label.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsComponent;
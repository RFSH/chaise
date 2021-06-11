// import 'Styles/bootstrap/bootstrap.css'
import "Legacy/common/alerts"
import "Legacy/common/authen"
import "Legacy/common/authen"
import "Legacy/common/bindHtmlUnsafe"
import "Legacy/common/config"
import "Legacy/common/delete-link"
import "Legacy/common/ellipsis"
import "Legacy/common/errors"
import "Legacy/common/export"
import "Legacy/common/faceting"
import "Legacy/common/filters"
import "Legacy/common/footer"
import "Legacy/common/inputs"
import "Legacy/common/login"
import "Legacy/common/modal"
import "Legacy/common/navbar"
import "Legacy/common/record"
import "Legacy/common/recordCreate"
import "Legacy/common/resizable"
import "Legacy/common/storage"
import "Legacy/common/table"
import "Legacy/common/upload"
import "Legacy/common/utils"
import "Legacy/common/validators"


import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

function RecordSetApp(props: any) {
    return (
        <React.StrictMode>
            <div>This is a recordset react app</div>
        </React.StrictMode>
    )
}

ReactDOM.render(
    <RecordSetApp/>,
    document.getElementById("recordset-app-root")
);

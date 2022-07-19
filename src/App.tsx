import React from 'react'

import style from './App.module.scss'

/* START - View App additional imports and module code. */
import Menu from './components/Menu'

const itemList = [
    {
        label: 'Navigation One',
        key: 'mail',
    },
    {
        label: 'Navigation Two',
        key: 'app',
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        children: [
            {
                label: 'Option 1',
                key: 'setting:1',
            },
            {
                label: 'Option 2',
                key: 'setting:2',
                children: [
                    {
                        label: 'Option 1.2',
                        key: 'setting:1.2',
                    },
                    {
                        label: 'Option 2.2',
                        key: 'setting:2.2',
                    },
                ],
            },
        ],
    },
    {
        label: 'Navigation Four',
        key: 'test',
    },
]

const App: React.FC = () => {
    return (
        <div className={style.container}>
            <Menu
                itemList={itemList}
                selectedItem={{
                    label: 'Option 1',
                    key: 'setting:1',
                }}
            />
        </div>
    )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'

import style from './Menu.module.scss'

export interface IMenuItem {
    label: string
    key: string
    children?: IMenuItem[]
    disabled?: boolean
}

export interface IMenuProps {
    itemList: IMenuItem[]
    selectedItem: IMenuItem | null
}

export interface IMenuListProps {
    itemList: IMenuItem[]
    selectedItem: IMenuItem | null
    offsetLeft?: number
}

export interface ISubMenuProps {
    item: IMenuItem
    children: React.ReactNode
    offsetLeft?: number
}

const getContentHeight = (contentRef: React.MutableRefObject<HTMLDivElement | null>): number | null => {
    if (contentRef.current) {
        const subMenuNodeList = contentRef.current.querySelectorAll('ul')

        let subMenuNodeListHeight = 0

        subMenuNodeList.forEach((subMenuNode: HTMLUListElement) => {
            subMenuNodeListHeight += subMenuNode.scrollHeight
        })

        return subMenuNodeListHeight
    }

    return null
}

const SubMenu: React.FC<ISubMenuProps> = ({ item, children, offsetLeft }) => {
    const [isSubMenuOpen, setSubMenuOpen] = React.useState(false)
    const [contentHeight, setContentHeight] = React.useState(0)

    const contentRef = React.useRef<HTMLDivElement | null>(null)

    const handleLabelClick = () => {
        setSubMenuOpen((prev) => !prev)

        if (contentRef.current) {
            const newContentHeight = getContentHeight(contentRef)

            if (newContentHeight) {
                setContentHeight(isSubMenuOpen ? 0 : newContentHeight)
            }
        }
    }

    return (
        <div className={style.subMenu}>
            <div className={style.subMenu__label} style={{ paddingLeft: offsetLeft }} onClick={handleLabelClick}>
                {item.label}
            </div>
            <div className={style.subMenu__content} ref={contentRef} style={{ maxHeight: contentHeight }}>
                {children}
            </div>
        </div>
    )
}

const MenuList: React.FC<IMenuListProps> = ({ itemList, selectedItem, offsetLeft = 16 }) => (
    <ul className={style.menu}>
        {itemList.map(
            (item: IMenuItem): JSX.Element =>
                item.children ? (
                    <SubMenu key={item.key} item={item} offsetLeft={offsetLeft}>
                        <MenuList itemList={item.children} selectedItem={selectedItem} offsetLeft={offsetLeft + 6} />
                    </SubMenu>
                ) : (
                    <li
                        className={`${style.menu__item} ${
                            selectedItem && selectedItem.key === item.key ? style.menu__item_active : ''
                        }`}
                        style={{ paddingLeft: offsetLeft }}
                        key={item.key}
                    >
                        {item.label}
                    </li>
                ),
        )}
    </ul>
)

const Menu: React.FC<IMenuProps> = ({ itemList, selectedItem }) => {
    return (
        <div className={style.container}>
            <MenuList itemList={itemList} selectedItem={selectedItem} />
        </div>
    )
}

export default Menu

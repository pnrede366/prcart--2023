export const getField = (item, icon) => {
    return <div className="header__category__item" onClick={item.onClick} >
        <span>
            <img src={icon} />
        </span>
        <span>
            {item.type}
        </span>
        <span>
            {item.icon}  {item.text}
        </span>

    </div>
}
export const getFieldHeader = (item, navigate) => {
    return <div className="header__category__item" onClick={() => navigate(item.path)} >
        <span>
            {item.type}
        </span>
        <span>
            {item.icon}  {item.text}
        </span>

    </div>
}
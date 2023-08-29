export const fields = [
    {
        label: 'Username:',
        type: 'text',
        id: 'username',
        placeholder: 'username',
        name: "username"
    },
    {
        label: 'Passowrd:',
        type: 'password',
        id: '',
        placeholder: 'password',
        name: "password"
    },
]

export const generateForm = (item, data, setdata) => {
    if (!item || !item.name) {
        return null; // Return null if item or item.name is not defined
    }
    const itemName = item?.name;
    if (item.type === "text" || item.type === "password" || item.type === "email") {
        return <div className="input__text">
            <label htmlFor={item.id}>{item.label}</label>
            <input
                type={item.type}
                id={item.id}
                value={data && data[itemName]}
                onChange={(e) => inputHandler(e, item.name, setdata)}
                placeholder={item.placeholder}
                className={item.class}
            />
        </div>
    }
    else if (item.type === "number") {
        return <div className="input__text">
            <label htmlFor={item.id}>{item.label}</label>
            <input
                type={item.type}
                id={item.id}
                value={data && data[itemName]}
                onChange={(e) => inputHandler(e, item.name, setdata)}
                placeholder={item.placeholder}
                className={item.class}
            />
        </div>
    }
    else if (item.type === "textarea") {
        return <div className="input__text">
            <label htmlFor={item.id}>{item.label}</label>
            <textarea
                type={item.type}
                id={item.id}
                value={data && data[itemName]}
                onChange={(e) => inputHandler(e, item.name, setdata)}
                placeholder={item.placeholder}
                className={item.class}
            />
        </div>
    }
    else if (item.type === "select") {
        return <div className="input__text">
            <label htmlFor={item.id}>{item.label}</label>
            {
                item.options &&
                <select value={data[itemName]} onChange={(e) => inputHandler(e, item.name, setdata)}>
                    {
                        item?.options?.map((item) => <option value={item}>{item}</option>)
                    }

                </select>
            }
        </div>
    }
    else if (item.type === "checkbox") {
        return <div className="input__checkbox">
            <label>
                <input
                    value={data && data[itemName]}
                    type="checkbox"
                    onChange={(e) => inputHandler(e, item.name, setdata)}
                    className={item.class}
                />
                <span>
                    {item.label}
                </span>
            </label>
        </div>
    }
    else if (item.type === "file") {
        return <div className="input__checkbox">
            <label>
                <span>
                    {item.label}
                </span>
                <input
                    type="file"
                    onChange={(e) => inputHandler(e, item.name, setdata, item)}
                    className={item.class}
                />
            </label>
        </div>
    }
}

const inputHandler = (e, name, setdata, item) => {
    if (item && item?.type === "file") {
        setdata((prev) => ({ ...prev, [name]: e.target.files[0] }))
    }
   else if (e.target.checked) {
        setdata((prev) => ({ ...prev, [name]: e.target.checked }))
    }
    else {
        setdata((prev) => ({ ...prev, [name]: e.target.value }))
    }
}
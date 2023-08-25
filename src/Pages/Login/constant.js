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
    // {
    //     label: 'Stay signed in',
    //     type: 'checkbox',
    //     id: 'checkbox',
    //     name: "staySignedIn"
    // }

]

export const generateForm = (item, data, setdata) => {
    if (item.type === "text" || item.type === "password" || item.type === "email") {
        return <div className="input__text">
            <label htmlFor={item.id}>{item.label}</label>
            <input
                type={item.type}
                id={item.id}
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
                onChange={(e) => inputHandler(e, item.name, setdata)}
                placeholder={item.placeholder}
                className={item.class}
            />
        </div>
    }
    else if (item.type === "checkbox") {
        return <div className="input__checkbox">
            <label>
                <input
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
}

const inputHandler = (e, name, setdata) => {

    if (e.target.checked) {
        setdata((prev) => ({ ...prev, [name]: e.target.checked }))
    }
    else if (e.target.value) {
        setdata((prev) => ({ ...prev, [name]: e.target.value }))
    }
}
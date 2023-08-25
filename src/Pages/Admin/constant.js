export const formFieldProduct = [
    {
        label: 'Title:',
        type: 'text',
        id: 'title',
        placeholder: 'title',
        name: "title"
    },
    {
        label: 'price:',
        type: 'number',
        id: 'price',
        placeholder: 'price',
        name: "price"
    },
    {
        label: 'description:',
        type: 'text',
        id: 'description',
        placeholder: 'description',
        name: "description"
    },
    {
        label: 'features:',
        type: 'textarea',
        id: 'features',
        placeholder: 'features',
        name: "features"
    },
]
export const productInitial={
    title: '',
    price: '',
    description: '',
    features: [],
}

export   const productColumns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'features',
      dataIndex: 'features',
      key: 'features',
    }
  ];
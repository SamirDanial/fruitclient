import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../../hooks/Product';

const EditProduct = () => {
    const params = useParams();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [productToEdit, setProductToEdit] = useState({
        name: "",
        description: "",
        price: 0,
        visible: null,
        category: "",
        imageUrls: [],
      });
    const [getProduct] = useLazyQuery(GET_PRODUCT, {
        variables: {
            ID: params.id
        }
    })

    useEffect(() => {
        getProduct().then((res) => {
            const product = res.data.getProduct;
            setSelectedCategory(product.categories);
            setImageUrls(product.photos);
            setProductToEdit({
                name: product.name,
                description: product.description,
                price: product.price,
                visible: product.visible,
            })
        }).catch(error => {
            console.log(error.message);
        })
    }, [params, getProduct])

    useEffect(() => {
        console.log(imageUrls);
    }, [imageUrls])
    return (
        <div>
            <h1>This is Edit product page</h1>
        </div>
    )
}

export default EditProduct

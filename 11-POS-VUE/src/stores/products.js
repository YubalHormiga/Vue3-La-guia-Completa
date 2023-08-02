import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()
    const categories = [
        { id: 1, name: 'Sudaderas' },
        { id: 2, name: 'Tenis' },
        { id: 3, name: 'Lentes' }
    ]

    const q = query(
        collection(db, 'products'),
        orderBy('availability','asc')
    )

    const productsCollection = useCollection(q) // si solo queremos los productos en vez de q añadimos  collection(db, 'products')

    async function createProduct(product) {
        // console.log(product)
        await addDoc(collection(db, 'products'), product)

    }

    const categoryOptions = computed(() => {
        const options = [
            { label: 'Seleccione', value: '', attrs: { disabled: true } },
            ...categories.map(category => (
                { label: category.name, value: category.id }
            ))
        ]
        return options
    })

    const noResults = computed(()=>{
        return productsCollection.value === 0
    })
    return {
        createProduct,
        categoryOptions,
        productsCollection,
        noResults

    }
})
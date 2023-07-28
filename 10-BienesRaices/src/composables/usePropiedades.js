import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function usePropiedades() {

    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    const propertyPrice = (price) =>
        Number(price).toLocaleString('es-EU', {
            style: 'currency',
            currency: 'EUR'
        })

    return {
        propiedadesCollection,
        propertyPrice
    }
}
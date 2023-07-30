export const propertyPrice = (price) =>
    Number(price).toLocaleString('es-EU', {
        style: 'currency',
        currency: 'EUR'
    })

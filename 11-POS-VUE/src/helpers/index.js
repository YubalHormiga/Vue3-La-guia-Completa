export const formatCurrency = amount => Number(amount).toLocaleString('es-EU', {
    style: 'currency',
    currency: 'EUR'
})
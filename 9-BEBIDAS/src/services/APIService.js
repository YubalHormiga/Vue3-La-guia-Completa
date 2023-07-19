import api from '../lib/axios'

export default{
    obtnerCategorias(){
        return api.get('/list.php?c=list')
    },
    buscarRecetas({categoria, nombre}){
       return api.get(`filter.php?c=${categoria}&i=${nombre}`)
    }
}
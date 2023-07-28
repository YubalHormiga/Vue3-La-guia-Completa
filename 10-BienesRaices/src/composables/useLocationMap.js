import { ref } from 'vue'

export default function useLocationMap() {

    const zoom = ref(17)
    const center = ref([41.3815892,2.1861437,12])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}
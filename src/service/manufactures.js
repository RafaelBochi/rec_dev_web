import axios from "axios";

export default class ManufactureService {
    async getManufactures() {
        const { data } = await axios.get('/manufactures/')
        return data.results;
    }

    async createManufacture(manufacture) {
        const { data } = await axios.post('/manufactures/', manufacture)
        return data;
    }

    async deleteManufacture(manufacture_id) {
        await axios.delete(`/manufactures/${manufacture_id}/`)
    }
}
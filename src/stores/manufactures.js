import { defineStore } from "pinia";

import ManufactureService from "@/service/manufactures";
import { ref } from "vue";
const manufactureService = new ManufactureService();

export const useManufacturesStore = defineStore('manufactures', () => {
    const manufactures = ref([])

    async function getManufactures() {
        manufactures.value = await manufactureService.getManufactures()
        console.log(manufactures.value)
    }

    async function createManufacture(manufacture) {
        try {
            await manufactureService.createManufacture(manufacture)
            getManufactures()
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteManufacture(manufacture_id) {
        await manufactureService.deleteManufacture(manufacture_id)
        getManufactures()
    }

    return { manufactures, getManufactures, createManufacture, deleteManufacture }
})

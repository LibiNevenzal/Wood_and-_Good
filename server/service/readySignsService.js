import { executeQuery } from './db.js'
import { addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery } from '../queries/genericQueries.js'
export class ReadySignsService {

    async getReadySigns(queryParams) {
        const { dataQuery, countQuery } = getByConditionQuery("ready_signs", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getReadySignById(id) {
        const querySign = getByIdQuery("ready_signs");
        const result = await executeQuery(querySign, [id]);
        return result;
    }

    async deleteContact(idKey, idValue) {
        const donors = await donorsService.getDonors({ filter: `contact_id=${idValue}` });
        for (const donor of donors.data) {
            await donorsService.patchDonor({ contact_id: null }, donor.id);
        }
        const query = deleteQuery("contacts", `${idKey}`);
        const result = await executeQuery(query, [idValue]);
        return result;
    }

    async updateContact(updatedItem, id) {
        const query = updateQuery("contacts", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addContact(newItem) {
        const values = Object.values(newItem);
        const queryUser = addQuery("contacts", newItem);
        const result = await executeQuery(queryUser, values);
        return result;
    }
}

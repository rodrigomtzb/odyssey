import { post } from "../utils/requests"

const createSupplier = (data) => {
    return post("suppliers", data);
}

const SupplierService = {
    createSupplier
}

export default SupplierService
import { get } from "../utils/requests";

const getTags = (search) => {
  return get(`tag-description?searchby=${search}`);
};

const TagService = {
  getTags,
};

export default TagService;

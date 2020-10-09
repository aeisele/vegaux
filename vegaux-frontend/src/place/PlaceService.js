export const fetchPlaces = async (page, size, sort, dir) => {
    const response = await fetch(`/api/places?page=${page}&size=${size}&sort=${sort},${dir}`);
    return response.json();
};

export const fetchPlaceById = async (id) => {
    const response = await fetch(`/api/places/${id}`);
    return response.json();
};
const baseUrl = '/api/places';
const defaultHeaders = {
    'Accept': 'application/json'
}

export const fetchPlaces = async (page, size, sort, dir) => {
    const response = await fetch(`${baseUrl}?page=${page}&size=${size}&sort=${sort},${dir}`, {
        headers: defaultHeaders
    });
    return response.json();
};

export const fetchPlaceById = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        headers: defaultHeaders
    });
    return response.json();
};

export const savePlace = async (place) => {
    const isNew = !!place.id;
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? baseUrl : `${baseUrl}/${place.id}`

    const response = await fetch(url, {
        method: method,
        headers: {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
    });
    return response.json();
};
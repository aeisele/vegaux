const apiUrl = 'https://nominatim.openstreetmap.org/search'

export const geoCode = async (address) => {
    const url = new URL(apiUrl);

    let addressLines = address.addressLine1;
    if (address.addressLine2) {
        addressLines += " " + address.addressLine2;
    }
    url.searchParams.append('street', addressLines);

    url.searchParams.append('postalCode', address.zipCode);
    url.searchParams.append('city', address.city);
    url.searchParams.append('country', address.country);

    if (address.state) {
        url.searchParams.append('state', address.state);
    }

    url.searchParams.append('format', 'jsonv2');

    let data;
    try {
        const response = await fetch(url.toString());
        data = await response.json();
    } catch (error) {
        console.error('error geocoding address', address, error);
    }

    if (data instanceof Array && data.length > 0) {
        const result = data[0];
        if (result.lat && result.lon) {
            return {
                latitude: result.lat,
                longitude: result.lon
            };
        }
    }

    return null;
};
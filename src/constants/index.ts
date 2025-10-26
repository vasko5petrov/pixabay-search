
export const url = `${import.meta.env.VITE_PIXABAY_API_URL}?key=${import.meta.env.VITE_PIXABAY_API_KEY
    }`;

export const additionalParams = "&image_type=photo&pretty=true";

export const perPage = 20;

export const defaultPage = 1;

export const FIVE_MINUTES = 5 * 60 * 1000;

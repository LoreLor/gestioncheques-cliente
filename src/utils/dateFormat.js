export const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR"); 
};


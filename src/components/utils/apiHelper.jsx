export const handleError = (res, data) => {
    const getMessage = () => {
        if (Array.isArray(data.error)) {
            return data.error.join('\n');
        }
        return data.error || 'Something went wrong';
    };

    switch (res.status) {
        case 404:
            alert("Not Found" + getMessage());
            break;
        case 401:
            alert("Unauthorized" + getMessage());
            break;
        case 500:
            alert("Server Error" + getMessage());
            break;
        default:
            alert("Something went wrong:" + getMessage());
    }
}
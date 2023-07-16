const ValidateEmail = (email) => {
    const regexPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexPattern.test(email);
};

export default ValidateEmail
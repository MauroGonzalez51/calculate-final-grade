export const toArray = (input) =>
    input instanceof NodeList ? Array.from(input) : [input];

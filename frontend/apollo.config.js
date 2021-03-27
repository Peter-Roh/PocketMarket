module.exports = {
    client: {
        includes: ["./src/**/*.tsx"],
        tagName: "gql",
        service: {
            name: "Pocket Market Backend",
            url: "http://localhost:4000/graphql",
        }
    },
};

module.exports = function(api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "inline-dotenv",
                {
                    path: ".env",
                },
            ],
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-export-namespace-from",
            "date-fns",
        ],
    };
};

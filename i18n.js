const i18n = require("i18n");

const configureI18n = (isGlobal) => {
    let i18nObj = {};

    i18n.configure({
        locales: ['pl', 'en'],
        directory: (__dirname, 'locales'),
        objectNotation: true,
        cookie: 'acme-hr-lang',
    });

    return [i18n, i18nObj];
};


module.exports = configureI18n;
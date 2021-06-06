// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#1DA57A',
                    '@link-color': '#1DA57A'
                }
            }
        }
    ]
};

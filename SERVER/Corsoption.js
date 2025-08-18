const allowedOrigins = [
    'http://localhost:5173',
    'vibe-binary-network.netlify.app',
    'vibe-binary-network.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

module.exports = corsOptions;
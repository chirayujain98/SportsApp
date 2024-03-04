const News = require('../models/news');

// Endpoint to create news
router.post('/news', async (req, res, next) => {
    try {
        const { title, description, matchId, tourId } = req.body;
        const news = new News({ title, description, matchId, tourId });
        const createdNews = await news.save();
        return res.status(201).json(createdNews);
    } catch (err) {
        return next(err);
    }
});

// Endpoint to fetch news by match ID
router.get('/news/match/:matchId', async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const news = await News.find({ matchId });
        return res.json(news);
    } catch (err) {
        return next(err);
    }
});

module.exports = {
    getAllMatches: getAllMatches
}

// Endpoint to fetch news by tour ID
router.get('/news/tour/:tourId', async (req, res, next) => {
    try {
        const tourId = req.params.tourId;
        const news = await News.find({ tourId });
        return res.json(news);
    } catch (err) {
        return next(err);
    }
});

router.get('/news/sport/:sportId', async (req, res, next) => {
    try {
        const sportId = req.params.sportId;
        // Assuming you have the mappings between tours and sports in your database
        const tours = await Tour.find({ sportId });
        const tourIds = tours.map(tour => tour._id);
        const news = await News.find({ tourId: { $in: tourIds } });
        return res.json(news);
    } catch (err) {
        return next(err);
    }
});
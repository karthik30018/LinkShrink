const URL = require('../models/url')


async function generateRandomString() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

async function handleGenerteNewShortURL(req,res){
    const body = req.body;
    console.log(body)
    if(!body.url) return res.status(400).json({error:"URL required!!"})
      
      const shortID = await generateRandomString();
      console.log(shortID)
      await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
      })

      return res.status(201).json({message:"Generated Successfully!!",id:shortID})

}


async function handleGetAnalytics(req,res){
    const shortID = req.params.shortID
    console.log(shortID)
    const result = await URL.findOne({shortID})
    console.log(result)
    return res.json({totalClicks:result.visitedHistory.length,analytics:result.visitedHistory})

}

async function handleGetRedirectedURL(req,res){
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortID,

    },
    {
        $push: {
            visitedHistory: {
                timestamp: Date.now(),
            },
        }
    }
)
res.redirect(entry.redirectURL)
}

module.exports = {
    handleGenerteNewShortURL,handleGetRedirectedURL,handleGetAnalytics
}
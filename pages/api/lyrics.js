import lyricsFinder from 'lyrics-finder'

export default async (req, res) => {
    if(req.method === "GET"){
        const { artist, title } = req.query;
        console.log(artist)
        console.log(title)
        const getLyrics = async (artist, title) => {
            let lyrics = await lyricsFinder(artist, title) || "Not found :(";
            console.log(lyrics);
            res.send(lyrics)
        }
        getLyrics(artist, title);
    }
}
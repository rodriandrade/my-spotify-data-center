import axios from 'axios'

const apiKey = "9kXAttPrniozbgsDkoq19uyNUF6o_RzjbKAxNU3E1zE1_zTZqMnLa67_-FfqPYEg"

export default async (req, res) => {

    const { artist, track } = req.query;
    
    // Get Artist ID
    const getId = await axios.get(`https://api.genius.com/search?q=${artist}`, {
        headers: {
            'Authorization': 'Bearer ' + apiKey
        }
    });
    //console.log(getId.data.response.hits[3].result.primary_artist.id)
    const id = getId.data.response.hits[3].result.primary_artist.id;

    // Get Track ID
    const fetchSongs = async (page) =>{
        let getSong = await axios.get(`https://api.genius.com/artists/${id}/songs?per_page=50&page=${page}`, {
            headers: {
                'Authorization': 'Bearer ' + apiKey
            }
        });
        let songsToFilter = getSong.data.response.songs;
        let nextPage = getSong.data.response.next_page;
        let filterSongs = songsToFilter.some( song =>{
            return song.title === track
        })

        let pickSong = 0;

        if(filterSongs === false){
            console.log("nope")
            fetchSongs(nextPage)
        } else if(filterSongs === true){
            console.log("YAAAY")
            const findSong = songsToFilter.find(song =>{
                if(song.title === track && song.primary_artist.name === artist){
                    return song
                }
            })
            pickSong = findSong;
        }
        
        if(pickSong.id){
            let trackToSend = await axios.get(`https://api.genius.com/songs/${pickSong.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + apiKey
                }
            });
            res.send(trackToSend.data.response.song)
        }

        return pickSong
    }
    fetchSongs(1)
    // 
}
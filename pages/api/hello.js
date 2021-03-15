// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import Twitter from 'twitter'
import ba64 from 'ba64'
import Cors from 'cors'
import NextCors from 'nextjs-cors';

const client = new Twitter({
  consumer_key: "LvUGWEPM8jgKcjTCWOOAoEdpx",
  consumer_secret: "6ess9trsAYNjDxAB2dmLsCpBuQaj4h2PUsVbVTTf9PR3pCuvBA",
  access_token_key: "303928459-yGJCzZYjuf7gmYT7y7SxQeS7E7KwyIDiwoptwkXO",
  access_token_secret: "L5GAgiYeJsYKhWptB52ArO5kGrEfy8OhRhk6DkSGuA0lg"
});

export default async (req, res) => {
  
 // await runMiddleware(req, res, cors)
  if (req.method === 'POST') {
    res.send("Funciona");
    /*
    const { dataUrl, tweet } = req.body;
  // console.log(dataUrl);
  console.log("hola")
  //deleteImage();
  ba64.writeImage("myimage", dataUrl, (err) => {
    if (err) {
      console.log("Write image error", err);
    }
    console.log("Image saved successfully");

    fs.readFile("myimage.png", (err, data) => {
      if (err) {
        console.log("Read file err", err);
      }
      try {
        console.log("try")
        client.post(
          "media/upload",
          {
            media: data,
          },
          function (error, media, response) {
            if (error) {
              console.log("MEDIA UPLOAD", error);
            } else {
              console.log("Ahora estamos acá")
              const status = {
                status: tweet,
                media_ids: media.media_id_string,
              };
              client.post("statuses/update", status, function (
                error,
                response
              ) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("final")
                  //console.log(response)
                  res.status(200).json({
                    message: response.entities.media[0].display_url,
                  });
                  // console.log("Display URL: ", response.entities.media[0].display_url);
                }
              });
            }
          }
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      //deleteImage();
    });
  });
  */
  }
}

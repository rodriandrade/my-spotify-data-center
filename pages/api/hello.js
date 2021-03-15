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
    
    
    const { dataUrl, tweet } = req.body;
  // console.log(dataUrl);
  console.log("hola")
  //deleteImage();
  ba64.writeImage("public/myimage", dataUrl, (err) => {
    if (err) {
      console.log("Write image error", err);
    }
    console.log("Image saved successfully");
    
    fs.readFile("public/myimage.png", (err, data) => {
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
              const status = {
                status: tweet,
                media_ids: media.media_id_string,
              };
              res.send(status)
              /*
              client.post("statuses/update", status)
              res.send("listo")
              */
            }
          }
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      //deleteImage();
    });
  });
  
  }
}

/*

export default async (req, res) => {
  
  // await runMiddleware(req, res, cors)
   if (req.method === 'POST') {
     
     
     const { dataUrl, tweet } = req.body;
   // console.log(dataUrl);
   console.log("hola")
   //deleteImage();
   ba64.writeImage("public/myimage", dataUrl, (err) => {
     if (err) {
       console.log("Write image error", err);
     }
     console.log("Image saved successfully");
     
     fs.readFile("public/myimage.png", (err, data) => {
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
               res.send("listo")
               console.log("Ahora estamos acá")
               const status = {
                 status: tweet,
                 media_ids: media.media_id_string,
               };
             }
           }
         );
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
       //deleteImage();
     });
   });
   
   }
 }

 */
import axios from "axios";
import config from '../config.json'
import _ from 'lodash';


export default async (videos, filters) => {
    const table_data = [];

    if(!videos || videos.length === 0 )
        return [{
            title: "No videos yet",
            italic : true,
            donTrim : false,
            contents: []
        }];

    await Promise.all(videos.map(async video => {
       var videoData = await getDetails(video.video_url);
       var videoStats = videoData.items[0].statistics;


        const object = {
            title: video.video_title,
            url: video.video_url,
            id: video.id,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){
            
                case "title" :
                    content = {
                        value: video.video_title
                    }
                    break; 
                case "views" : 
                content = {
                    value: videoStats.viewCount
                }
                    break;
                case "likes" :
                    content = {
                        value: videoStats.likeCount
                    }
                    break;
                case "dislikes" : 
                content = {
                    value: videoStats.dislikeCount
                }
                    break;
                
            }
            object.contents.push(content);
        });
        
        table_data.push(object);
    }))
    return table_data;
}

const getDetails = _.memoize(async(video_url) =>{

    var video_id = video_url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }


    const {data} = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video_id}&key=${config.google_api}`, {
        headers: {
            'Authorization': ``
        }
    });

 return data;
});


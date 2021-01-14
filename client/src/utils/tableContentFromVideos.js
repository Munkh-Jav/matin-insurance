import axios from "axios";
import config from '../config.json'
import _ from 'lodash';
import nFormatter from './nFormat'


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
       var videoThumbnail = videoData.items[0].snippet.thumbnails.high.url;
       var videoStats = videoData.items[0].statistics;


        const object = {
            title: "",
            image: videoThumbnail,
            url: video.video_url,
            id: video.id,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){

                case "title" :
                    content = {
                        value: video.video_title,
                        centered: false
                    }
                    break; 
                case "views" : 
                content = {
                    value: nFormatter(videoStats.viewCount, 1),
                    centered: true
                }
                
                    break;
                case "likes" :
                    content = {
                        value: nFormatter(videoStats.likeCount, 0),
                        centered: true
                    }
                    break;
                case "dislikes" : 
                content = {
                    value: nFormatter(videoStats.dislikeCount, 0),
                    centered: true
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




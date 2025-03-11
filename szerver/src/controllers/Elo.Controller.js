export default{
    //elo lekérdezése
    EloGet:async function(req,res){
        const apiKey = 'AIzaSyD399Pb6YebmjeW7lJcUSM_rG3fA2pjgXE';
        const channelId = 'UCtpmd1UDP0W9MOwtsClRBkw';
        return res.status(200).json({
            error:false,
            apikey:apiKey,
            channelId:channelId
        })
    }
}
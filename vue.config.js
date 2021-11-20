const path =require('path');
outputDir:path.resolve(__dirname,'../public'),
module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:3000/'
            }
        }
    }
}
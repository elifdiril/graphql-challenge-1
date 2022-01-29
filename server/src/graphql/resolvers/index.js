import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';


const resolversArray= loadFilesSync(join(__dirname),{extensions:['js'],
extractExports:(fileExports)=>{

    if(typeof fileExports === 'function'){
        return fileExports('query_root');
    }

    return fileExports;
}});


module.exports =mergeResolvers(resolversArray);

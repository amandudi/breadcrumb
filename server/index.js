const express = require("express");
const cors = require("cors")

const PORT = process.env.PORT || 3001;

let Root = require('./Root');   // import directory structure

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
    let pathnames_array = req.query.path == '/' ? ["home"] : req.query.path.split("/").filter((x) => x)
    let searchDir = pathnames_array.at(-1)    
    let file = false
	// *** Loop through the directory structure and return current directory object ***
	const dig = (obj, target) =>
		target in obj
			? obj[target]
			: Object.values(obj).reduce((acc, val) => {
				if (acc !== undefined) return acc;
				if (typeof val === 'object') return dig(val, target);
			}, undefined);
	var loc = dig(Root, searchDir);
    if(loc){
        let sub_dirs = [];
        var type = loc.type
        if(type =='file'){
            file = searchDir;
        }else{
            for(var x in loc.children){
                sub_dirs.push(x);
            }
        }
        console.log(sub_dirs)
        res.send({[0]:pathnames_array, dir: sub_dirs, file:file});
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
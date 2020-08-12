#!/usr/bin/env node
/*
* 为连续的帧动画图片资源命名 需传入参数文件地址 以文件夹名做前缀
*/
let fs = require('fs');
let path = require('path');
/**
 *  取地址
 * */
let args = process.argv.splice(2);

// createReadStream
// fs.createReadStream();
//地址
const viewdir =  args[0];//`/Users/qianjun/Documents/client/trunk/PalaceWar/src/game/view/activity`;
const ignoredir = args[1];
const isxlsx = args[2];

let str = '';
let arr = [];
let result = {};
if(isxlsx){
    result = JSON.parse(fs.readFileSync(ignoredir));
    console.log(result);
    console.log(`要删除${Object.keys(result).length}个活动`);
    fs.readdir(viewdir,function(err,menu){	
        if(!menu){
            console.log(viewdir);
            return;
        }
        menu.forEach(function(ele){	
            fs.stat(viewdir+"/"+ele,function(err,info){
                if(info.isDirectory()){
                    if(isDelete(ele,true)){
                        deleteall(viewdir+"/"+ele);
                    }
                    else{
                        console.log(`${ele.toLowerCase()}活动没有被删除，请检查项目里的活动命名并整改`);
                    }
                }
            })
        });
    }); 
}
else{
    fs.readFile(ignoredir,{encoding:"utf-8"}, function (err, fr){
        //readFile回调函数
        if(err){
            console.log(err);
        }else{
            str = fr;
        }
        arr = str.split(',');
        console.log(arr);
        fs.readdir(viewdir,function(err,menu){	
            if(!menu){
                console.log(viewdir);
                return;
            }
            menu.forEach(function(ele){	
                fs.stat(viewdir+"/"+ele,function(err,info){
                    if(info.isDirectory() && isDelete(ele)){
                        deleteall(viewdir+"/"+ele);
                    }
                })
            })			
        });    
    });
}

// fs.readdir(vodir,function(err,menu){	
//     if(!menu){
//         return;
//     }
//     menu.forEach(function(ele){	
//         fs.stat(vodir+"/"+ele,function(err,info){
//             if(info.isDirectory()){
//                 // readDir(path+"/"+ele);
//             }
//             else{
//                 if(isDelete(ele.split('.')[0])){
//                     deletefile(vodir+"/"+ele);
//                 }
//             }	
//         })
//     })			
// });

// fs.readdir(cfgdir,function(err,menu){	
//     if(!menu){
//         return;
//     }
//     menu.forEach(function(ele){	
//         fs.stat(cfgdir+"/"+ele,function(err,info){
//             if(info.isDirectory()){
//                 // readDir(path+"/"+ele);
//             }
//             else{
//                 if(isDelete(ele.split('.')[0])){
//                     deletefile(cfgdir+"/"+ele);
//                 }
//             }	
//         })
//     })			
// });

// let arr = [
//     'vipShop','newYear','tailor','wishtree','springCelebrate','carnivalCharge','carnivalCost','worldCup','doubleSeventh','crossServerServant','dailyGift','singleDay','lottery','allianceRechargeCount','treasureHunt','GroupCentralmarket','wealthComing',
//     'newYearCracker','skinPackage','luckyCarp','wealthCarp','laborDay','throwArrow','motherDay','questionnaire','beautyVote','arena','weiZheng','yunDingLongKu','arcade','enjoyNight','giftReturn','rechargeReset','throwStone','nationalDay','welcome','dechuanshidai','firstSightLove',
//     'rechargeBoxSP','yiyibushe','singleDay2019','courtDuty','nvyouComing','dailyRecharge','annualCelebration2020'
// ];

// let arr = ignorelist.split(',');
// console.log(arr);
function isDelete(fielname, isexcel=false){
    if(isexcel){
        if(result[fielname.toLowerCase()]){
            console.log("删除: "+fielname);
            return true;
        }
    }
    else{
        for(let i = 0; i < arr.length; ++ i){
            let unit = arr[i];
            if(`ac${unit}`.toLowerCase() == fielname.toLowerCase() || `ac${unit}vo`.toLowerCase() == fielname.toLowerCase() || `${unit}cfg`.toLowerCase() == fielname.toLowerCase()){
                console.log("删除: "+fielname);
                return true;
            }
        }
    }
    return false;
}

function deletefile(path) {
	var files = [];
	if(fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
}

function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

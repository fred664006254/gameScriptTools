/**
 * 
 */
namespace DiceHelper
{
    export function diceFindMonster(diceData:DiceData,isMe:boolean):MonsterVo[]
    {
        return DiceBt.find(diceData,isMe);
    }

    export function GunDiceFindMonster(diceData:DiceData,isMe:boolean,num:number):MonsterVo[]
    {
        //手槍及狙擊槍固定打一名敵人，雙手槍跟霰彈槍則根據星數打對應數量的敵人 1+n随机(不重复)
        let arr = DiceBt.find1(diceData,isMe);
        let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        let loop = 0;
        while(arr.length < num && monsterDataList.length > arr.length){
            let randomTarget = Math.floor(App.MathUtil.seededRandom(0,monsterDataList.length,BattleStatus.battleLogicHasTickTime/(diceData.index+loop)));
            let unit = monsterDataList[randomTarget];
            if(arr.indexOf(unit) == -1){
                arr.push(unit);
            }
            ++ loop;
        }
        return arr;
    }

    /**
     * 从路线上某一个点查找一定范围内的怪物
     * @param centerDis 需要查找的中心点距离
     * @param checkDis 查找半径
     * @param isMe 是否是自己
     */
    export function findRangMonster(centerDis:number,checkDis:number,isMe:boolean):MonsterVo[]
    {
        return DiceBt.findRange(centerDis,checkDis,isMe);
    }

    /**
     * 检测距离某一个点是否在某点的一定范围内
     * @param point 需要检测的点
     * @param checkDis 距离
     */
    export function checkSelfIsInPointRange(self:egret.Point,point:egret.Point,radis:number):boolean
    {
        let bool = false;
        if((self.x >= (point.x-radis) && self.x <= (point.x+radis)) && ((self.y >= (point.y-radis) && self.y <= (point.y+radis)))){
            bool = true;
        }
        return bool;
    }

    /**
     * 按照距离从前往后排，打死的和跑掉的放到最后面
     * @param voList 
     */
    export function sortByDis(voList:MonsterVo[]):void
    {
        voList.sort((a,b)=>{
            if(a.lost(a.isMe))
            {
                if(b.lost(b.isMe))
                {
                    return b.moveDis-a.moveDis;
                }
                else
                {
                    return 1;
                }
            }
            else if(b.lost(b.isMe))
            {
                return -1;
            }
            else
            {
                if(b.moveDis==a.moveDis)
                {
                    return a.birthTime-b.birthTime;
                }
                else
                {
                    return b.moveDis-a.moveDis;
                }
            }
        });
    }

    export function sortByHp(isMe:boolean,maxL:number):MonsterVo[]
    {
        let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        monsterDataList=monsterDataList.concat();
        monsterDataList.sort((a,b)=>{
            if(a.lost(isMe))
            {
                if(b.lost(isMe))
                {
                    return b.hp-a.hp;
                }
                else
                {
                    return 1;
                }
            }
            else if(b.lost(isMe))
            {
                return -1;
            }
            else
            {
                if(b.hp==a.hp)
                {
                    return b.moveDis-a.moveDis;
                }
                else
                {
                    return b.hp-a.hp;
                }
            }
        });
        let arr:MonsterVo[]=monsterDataList.slice(0,maxL);
        return arr;
    }

    namespace DiceBt
    {
        export function find(diceData:DiceData,isMe:boolean):MonsterVo[]
        {
            let target=diceData.target;
            if(!target)
            {
                return [];
            }
            if(DiceBt["find"+target])
            {
                return DiceBt["find"+target](diceData,isMe);
            }
            else
            {
                App.LogUtil.log("lost find"+target+"use find1");
                return DiceBt.find1(diceData,isMe);
            }
        }
        /**
         * 前边，0是最前面
         */
        export function find1(diceData:DiceData,isMe:boolean):MonsterVo[]
        {
            let resultArr:MonsterVo[]=[];
            let groupList = BattleStatus.getGroupList(isMe)||[];
            let gl=groupList.length;
            let maxL=1;
            if(diceData.id=="102"){
                maxL = 3;
            }
            else if(diceData.id=="309"){
                maxL = diceData.star;
            }
            let l=0;
            for(let gi=gl-1;gi>=0;gi--)
            {
                let glist=groupList[gi]||[];
                let gll=glist.length;
                if(glist&&gll>0)
                {
                    if(maxL==1)
                    {
                        resultArr=glist.slice(0,1);
                        break;
                    }
                    else
                    {
                        let resultL=resultArr.length;
                        if(resultL<maxL)
                        {
                            let enough=false;
                            b:for (let index = 0; index < gll; index++) {
                                const element = glist[index];
                                if(resultArr.indexOf(element)==-1)
                                {
                                    resultArr.push(element);
                                    if(resultArr.length>=maxL)
                                    {
                                        enough=true;
                                        break b;
                                    }
                                }
                            }
                            if(enough)
                            {
                                break;
                            }
                        }
                    }
                }
            }

            // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
            // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            // monsterDataList=monsterDataList.concat();
            // monsterDataList.sort((a,b)=>{
            //     if(a.lost())
            //     {
            //         if(b.lost())
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //         else
            //         {
            //             return 1;
            //         }
            //     }
            //     else if(b.lost())
            //     {
            //         return -1;
            //     }
            //     else
            //     {
            //         if(b.moveDis==a.moveDis)
            //         {
            //             return a.birthTime-b.birthTime;
            //         }
            //         else
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //     }
            // });
            // let resultArr:MonsterVo[]=[];
            // let l =monsterDataList.length
            // for (let i = 0; i < l; i++) 
            // {
            //     const vo = monsterDataList[i];
            //     if(vo.lost()){}
            //     else
            //     {
            //         resultArr.push(vo);
            //         if(resultArr.length==3)
            //         {
            //             break;
            //         }
            //     }
            // }
            // console.log("find num "+resultArr.length);
            return resultArr;
        }
    
        /**
         * 强敌，血量从大到小排序
         */
        export function find2(diceData:DiceData,isMe:boolean):MonsterVo[]
        {
            return BattleStatus.getMaxHpList(isMe).concat();

            // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
            // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            // monsterDataList=monsterDataList.concat();
            // monsterDataList.sort((a,b)=>{
            //     if(a.lost())
            //     {
            //         if(b.lost())
            //         {
            //             return b.hp-a.hp;
            //         }
            //         else
            //         {
            //             return 1;
            //         }
            //     }
            //     else if(b.lost())
            //     {
            //         return -1;
            //     }
            //     else
            //     {
            //         if(b.hp==a.hp)
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //         else
            //         {
            //             return b.hp-a.hp;
            //         }
            //     }
            // });
            // let arr:MonsterVo[]=[];
            // let l =monsterDataList.length
            // for (let i = 0; i < l; i++) 
            // {
            //     const vo = monsterDataList[i];
            //     if(vo.lost()){}
            //     else
            //     {
            //         arr.push(vo);
            //         break;
            //     }

            // }
            // return arr;
        }
    
        /**
         * 随机（纯随机）
         */
        export function find3(diceData:DiceData,isMe:boolean):MonsterVo[]
        {
            let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
            let arr:MonsterVo[]=[];
            let randomTarget = Math.floor(App.MathUtil.seededRandom(0,monsterDataList.length,BattleStatus.battleLogicHasTickTime/(diceData.index)));
            if(monsterDataList[randomTarget]){
                arr.push(monsterDataList[randomTarget]);
            }
            return arr;
        }
    
        /**
         * 随机（优先顺序）
         */
        export function find4(diceData:DiceData,isMe:boolean):MonsterVo[]
        {
            let resultArr:MonsterVo[]=[];
            let groupList = BattleStatus.getGroupList(isMe);
            let gl=groupList.length;
            let mstList=diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            let firstVo:MonsterVo=null;
            let isFind:boolean=false;
            for(let gi=gl-1;gi>=0;gi--)
            {
                let glist=groupList[gi]||[];
                let gll=glist.length;
                let buffNum:number=0;
                if(glist&&gll>0)
                {
                    // resultArr=glist.slice(0,1);
                    b:for (let idx = 0; idx < gll; idx++) {
                        const vo = glist[idx];
                        if(!firstVo)
                        {
                            firstVo=vo;
                        }
                        let mst=mstList[vo.getName()];
                        if(mst)
                        {
                            if(mst.checkHasBuff(diceData.id))
                            {
                                buffNum++;
                            }
                            else
                            {
                                resultArr[0]=vo;
                                isFind=true;
                                break b;
                            }
                        }
                    }
                }
                if(isFind)
                {
                    break;
                }
            }
            if(!isFind)
            {
                if(firstVo)
                {
                    resultArr=[firstVo];
                }
            }
            
            // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
            // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            // monsterDataList.sort((a,b)=>{
            //     let aM=monstersList[a.getName()];
            //     let bM=monstersList[b.getName()];
            //     if(a.lost())
            //     {
            //         if(b.lost())
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //         else
            //         {
            //             return 1;
            //         }
            //     }
            //     else if(b.lost())
            //     {
            //         return -1;
            //     }
            //     else if(aM.checkHasBuff(diceData.id))
            //     {
            //         if(bM.checkHasBuff(diceData.id))
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //         else
            //         {
            //             return 1;
            //         }
            //     }
            //     else if(bM.checkHasBuff(diceData.id))
            //     {
            //         return -1;
            //     }
            //     else
            //     {
            //         if(a.moveDis==b.moveDis)
            //         {
            //             return a.birthTime-b.birthTime;
            //         }
            //         else
            //         {
            //             return b.moveDis-a.moveDis;
            //         }
            //     }
            // });

            // let resultArr:MonsterVo[]=[];
            // let l =monsterDataList.length;
            // for (let i = 0; i < l; i++) 
            // {
            //     const vo = monsterDataList[i];
            //     if(vo.lost()){}
            //     else
            //     {
            //         resultArr.push(vo);
            //         break;
            //     }

            // }
            return resultArr;
        }

        /**
         * 检测距离某一个点一定范围内的怪物
         * @param centerDis 需要检测的点
         * @param checkDis 距离
         */
        export function findRange(centerDis:number,checkDis:number,isMe:boolean):MonsterVo[]
        {
            let resultArr:MonsterVo[]=[];
            let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
            // if(checkDis)
            // {
            //     let l =monsterDataList.length;
            //     for (let i = 0; i < l; i++) 
            //     {
            //         const vo = monsterDataList[i];
            //         if(!vo.lost())
            //         {
            //             // let tmonster = monstersList[vo.getName()];
            //             let voDis=vo.getdisRange(centerDis);
            //             if(voDis<=checkDis)
            //             {
            //                 resultArr.push(vo);
            //             }
            //         }
            //     }
            // }
            // return resultArr;

            let groupList = BattleStatus.getGroupList(isMe);
            let gl=groupList.length;

            let mstList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;

            let disList:number[] = BattleStatus.getDisGroupList();

            let maxDis = Math.min(disList.length-1,Math.floor(centerDis+checkDis));
            let minDis = Math.max(0,Math.floor(centerDis-checkDis));

            let minGroupIdx=disList[minDis];
            let maxGroupIdx=disList[maxDis];

            for (let tdis = maxGroupIdx; tdis >=minGroupIdx; tdis--) 
            {
                let glist=groupList[tdis]||[];
                let gl=glist.length;
                if(gl>0)
                {
                    for(let gi=gl-1;gi>=0;gi--)
                    {
                        let mVo = glist[gi];
                        let range=mVo.getRange();
                        if(range.max>(centerDis-checkDis)&&range.min<(centerDis+checkDis))
                        {
                            if(resultArr.indexOf(mVo)<0)
                            {
                                resultArr.push(mVo);
                            }
                        }
                    }
                }
            }

            return resultArr;
        }

    }
}
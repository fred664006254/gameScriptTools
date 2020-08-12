/**
 *
 */
var DiceHelper;
(function (DiceHelper) {
    function diceFindMonster(diceData, isMe) {
        return DiceBt.find(diceData, isMe);
    }
    DiceHelper.diceFindMonster = diceFindMonster;
    function GunDiceFindMonster(diceData, isMe, num) {
        //手槍及狙擊槍固定打一名敵人，雙手槍跟霰彈槍則根據星數打對應數量的敵人 1+n随机(不重复)
        var arr = DiceBt.find1(diceData, isMe);
        var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        var loop = 0;
        while (arr.length < num && monsterDataList.length > arr.length) {
            var randomTarget = Math.floor(App.MathUtil.seededRandom(0, monsterDataList.length, BattleStatus.battleLogicHasTickTime / (diceData.index + loop)));
            var unit = monsterDataList[randomTarget];
            if (arr.indexOf(unit) == -1) {
                arr.push(unit);
            }
            ++loop;
        }
        return arr;
    }
    DiceHelper.GunDiceFindMonster = GunDiceFindMonster;
    /**
     * 从路线上某一个点查找一定范围内的怪物
     * @param centerDis 需要查找的中心点距离
     * @param checkDis 查找半径
     * @param isMe 是否是自己
     */
    function findRangMonster(centerDis, checkDis, isMe) {
        return DiceBt.findRange(centerDis, checkDis, isMe);
    }
    DiceHelper.findRangMonster = findRangMonster;
    /**
     * 检测距离某一个点是否在某点的一定范围内
     * @param point 需要检测的点
     * @param checkDis 距离
     */
    function checkSelfIsInPointRange(self, point, radis) {
        var bool = false;
        if ((self.x >= (point.x - radis) && self.x <= (point.x + radis)) && ((self.y >= (point.y - radis) && self.y <= (point.y + radis)))) {
            bool = true;
        }
        return bool;
    }
    DiceHelper.checkSelfIsInPointRange = checkSelfIsInPointRange;
    /**
     * 按照距离从前往后排，打死的和跑掉的放到最后面
     * @param voList
     */
    function sortByDis(voList) {
        voList.sort(function (a, b) {
            if (a.lost(a.isMe)) {
                if (b.lost(b.isMe)) {
                    return b.moveDis - a.moveDis;
                }
                else {
                    return 1;
                }
            }
            else if (b.lost(b.isMe)) {
                return -1;
            }
            else {
                if (b.moveDis == a.moveDis) {
                    return a.birthTime - b.birthTime;
                }
                else {
                    return b.moveDis - a.moveDis;
                }
            }
        });
    }
    DiceHelper.sortByDis = sortByDis;
    function sortByHp(isMe, maxL) {
        var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        monsterDataList = monsterDataList.concat();
        monsterDataList.sort(function (a, b) {
            if (a.lost(isMe)) {
                if (b.lost(isMe)) {
                    return b.hp - a.hp;
                }
                else {
                    return 1;
                }
            }
            else if (b.lost(isMe)) {
                return -1;
            }
            else {
                if (b.hp == a.hp) {
                    return b.moveDis - a.moveDis;
                }
                else {
                    return b.hp - a.hp;
                }
            }
        });
        var arr = monsterDataList.slice(0, maxL);
        return arr;
    }
    DiceHelper.sortByHp = sortByHp;
    var DiceBt;
    (function (DiceBt) {
        function find(diceData, isMe) {
            var target = diceData.target;
            if (!target) {
                return [];
            }
            if (DiceBt["find" + target]) {
                return DiceBt["find" + target](diceData, isMe);
            }
            else {
                App.LogUtil.log("lost find" + target + "use find1");
                return DiceBt.find1(diceData, isMe);
            }
        }
        DiceBt.find = find;
        /**
         * 前边，0是最前面
         */
        function find1(diceData, isMe) {
            var resultArr = [];
            var groupList = BattleStatus.getGroupList(isMe) || [];
            var gl = groupList.length;
            var maxL = 1;
            if (diceData.id == "102") {
                maxL = 3;
            }
            else if (diceData.id == "309") {
                maxL = diceData.star;
            }
            var l = 0;
            for (var gi = gl - 1; gi >= 0; gi--) {
                var glist = groupList[gi] || [];
                var gll = glist.length;
                if (glist && gll > 0) {
                    if (maxL == 1) {
                        resultArr = glist.slice(0, 1);
                        break;
                    }
                    else {
                        var resultL = resultArr.length;
                        if (resultL < maxL) {
                            var enough = false;
                            b: for (var index = 0; index < gll; index++) {
                                var element = glist[index];
                                if (resultArr.indexOf(element) == -1) {
                                    resultArr.push(element);
                                    if (resultArr.length >= maxL) {
                                        enough = true;
                                        break b;
                                    }
                                }
                            }
                            if (enough) {
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
        DiceBt.find1 = find1;
        /**
         * 强敌，血量从大到小排序
         */
        function find2(diceData, isMe) {
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
        DiceBt.find2 = find2;
        /**
         * 随机（纯随机）
         */
        function find3(diceData, isMe) {
            var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
            var arr = [];
            var randomTarget = Math.floor(App.MathUtil.seededRandom(0, monsterDataList.length, BattleStatus.battleLogicHasTickTime / (diceData.index)));
            if (monsterDataList[randomTarget]) {
                arr.push(monsterDataList[randomTarget]);
            }
            return arr;
        }
        DiceBt.find3 = find3;
        /**
         * 随机（优先顺序）
         */
        function find4(diceData, isMe) {
            var resultArr = [];
            var groupList = BattleStatus.getGroupList(isMe);
            var gl = groupList.length;
            var mstList = diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            var firstVo = null;
            var isFind = false;
            for (var gi = gl - 1; gi >= 0; gi--) {
                var glist = groupList[gi] || [];
                var gll = glist.length;
                var buffNum = 0;
                if (glist && gll > 0) {
                    // resultArr=glist.slice(0,1);
                    b: for (var idx = 0; idx < gll; idx++) {
                        var vo = glist[idx];
                        if (!firstVo) {
                            firstVo = vo;
                        }
                        var mst = mstList[vo.getName()];
                        if (mst) {
                            if (mst.checkHasBuff(diceData.id)) {
                                buffNum++;
                            }
                            else {
                                resultArr[0] = vo;
                                isFind = true;
                                break b;
                            }
                        }
                    }
                }
                if (isFind) {
                    break;
                }
            }
            if (!isFind) {
                if (firstVo) {
                    resultArr = [firstVo];
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
        DiceBt.find4 = find4;
        /**
         * 检测距离某一个点一定范围内的怪物
         * @param centerDis 需要检测的点
         * @param checkDis 距离
         */
        function findRange(centerDis, checkDis, isMe) {
            var resultArr = [];
            var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
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
            var groupList = BattleStatus.getGroupList(isMe);
            var gl = groupList.length;
            var mstList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            var disList = BattleStatus.getDisGroupList();
            var maxDis = Math.min(disList.length - 1, Math.floor(centerDis + checkDis));
            var minDis = Math.max(0, Math.floor(centerDis - checkDis));
            var minGroupIdx = disList[minDis];
            var maxGroupIdx = disList[maxDis];
            for (var tdis = maxGroupIdx; tdis >= minGroupIdx; tdis--) {
                var glist = groupList[tdis] || [];
                var gl_1 = glist.length;
                if (gl_1 > 0) {
                    for (var gi = gl_1 - 1; gi >= 0; gi--) {
                        var mVo = glist[gi];
                        var range = mVo.getRange();
                        if (range.max > (centerDis - checkDis) && range.min < (centerDis + checkDis)) {
                            if (resultArr.indexOf(mVo) < 0) {
                                resultArr.push(mVo);
                            }
                        }
                    }
                }
            }
            return resultArr;
        }
        DiceBt.findRange = findRange;
    })(DiceBt || (DiceBt = {}));
})(DiceHelper || (DiceHelper = {}));
//# sourceMappingURL=DiceHelper.js.map
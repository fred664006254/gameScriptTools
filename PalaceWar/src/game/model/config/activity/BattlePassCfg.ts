namespace Config
{
	export namespace AcCfg
	{
        export class BattlePassCfg 
		{
            public extraTime : number = 0;
            /*轮数刷新时间(天)*/
            public refresh:number=0;
            /*每轮刷新任务数量(天)*/
            public taskNum:number=0;
            /*X天提醒玩家商店兑换(天)*/
            public remind:number=0;
            /*玩家单次活动期间最多只能购买X级政令等级*/
            public lvLimit:number=0;
            /*
            --战令分级显示
            --open:是否开启政令版本(1-开启，0不开启)
            --unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
            --unlockRecharge:解锁充值。玩家购买advanced后直接解锁intermediate
            --lvAdd:购买后直接赠送等级
            --unlockTask:open=1时，开放的任务
            */
            public show:any=null;

            /*
            --普通任务 - 固定任务
            --questType:任务类型
            --sortId:排序
            --value:任务参数
            --times:任务可完成次数，一轮
            --openType:任务跳转
            --expGet:获得经验值
            */
            public firmTask:any=null;

            /*
            --普通任务 - 随机任务
            --questType:任务类型
            --sortId:排序
            --value:任务参数
            --times:任务可完成次数，一轮
            --turn:X轮及X轮以后才可随机到该任务
            --right:任务随机权重
            --openType:任务跳转
            --expGet:获得经验值
            */
            public randomTask:any=null;

            /*
            --特殊悬赏任务
            --questType:任务类型
            --sortId:排序
            --value:任务参数
            --times:任务可完成次数，一轮
            --openType:任务跳转
            --expGet:获得经验值
            */
            public specialTask:any=null;

            /*
            --令牌兑换商店
            --limit:活动限购
            --cost:价格
            --goods:获得
            */
            public shop:any=null;

            /*
            --政令奖励
            --expNeed:升级需要经验
            --specialGift:特殊档位标识。1
            --primary:普通政令奖励
            --intermediate:黄金政令奖励
            --advanced:传世政令奖励
            */
            public battlePass:any=null;

            /**
             * intermediate奖励展示
             */
            public show1 :any = '';
            /**
             * advanced奖励展示
             */
            public show2 : any = '';
            /** 
             * --X等级下增加分割线。最核心奖励处
            */
            public segmentation=60;
            public showDetail:string[]=[];

            public formatData(data:any):void{
                for(let key in data){
                    this[key]=data[key];
                }
            }  

            //商店兑换
            public getShopArr():any[]{
                let arr = [];
                /**
                 *   --令牌兑换商店
                --limit:活动限购
                --cost:价格
                --goods:获得
                 */
                for(let i in this.shop){
                    let unit = this.shop[i];
                    arr.push({
                        limit : unit.limit,
                        cost : unit.cost || unit.costZhengling,
                        goods : unit.goods,
                        id : Number(i) + 1,
                    });
                }
                return arr;
            }

            //特殊悬赏
            public getSpecialTaskArr():any[]{
                let arr = [];
                //特殊任务
                /**
                 * --特殊悬赏任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值
                 */
                for(let i in this.specialTask){
                    let unit = this.specialTask[i];
                    // if((Number(unit.questType) == 120 && Api.switchVoApi.checkNewDailyBoss()) || (Number(unit.questType) == 953 && !Api.switchVoApi.checkNewDailyBoss())){
                    //     continue;
                    // }
                    arr.push({
                        questType : unit.questType,
                        sortId : unit.sortId,
                        value : unit.value,
                        value2 : unit.value2,
                        times : unit.times,
                        openType : unit.openType,
                        expGet : unit.expGet
                    });
                }
                return arr;
            }

            //任务
            private _arr = [];
            public getTaskArr():any[]{

                if (this._arr.length)
                {
                    return this._arr;
                }

                //固定任务
                /**
                 *  --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值 
                 */
                let firmTaskArr = [];
                for(let i in this.firmTask){
                    let unit = this.firmTask[i];
                    firmTaskArr.push({
                        questType : unit.questType,
                        sortId : unit.sortId,
                        value : unit.value,
                        value2 : unit.value2,
                        times : unit.times,
                        openType : unit.openType,
                        expGet : unit.expGet
                    });
                }
                //随机任务
                /*--普通任务 - 随机任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --turn:X轮及X轮以后才可随机到该任务
                --right:任务随机权重
                --openType:任务跳转
                --expGet:获得经验值*/
                let randonmArr = [];
                for(let i in this.randomTask){
                    let unit = this.randomTask[i];
                    randonmArr.push({
                        questType : unit.questType,
                        sortId : unit.sortId,
                        value : unit.value,
                        times : unit.times,
                        openType : unit.openType,
                        expGet : unit.expGet,
                        turn : unit.turn,
                        value2 : unit.value2,
                    });
                }
        
                this._arr = this._arr.concat(firmTaskArr).concat(randonmArr);
                return this._arr;
            }

            /*当前最大等级*/
            public get maxlevel():number{
                let num = 0;
                if(this.battlePass && this.battlePass.length){
                    num = this.battlePass.length;
                }
                return num;
            }
            //--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
            public getBattleInfo(type : string) : any{
                let tmp = null;
                // let arr = [`primary`, `intermediate`, `advanced`];
                if(this.show){
                    for(let i in this.show){
                        let unit = this.show[i];
                        if(unit.unlockBP === type){
                            tmp =  unit;
                        }
                    }
                }
                return tmp;
            }

            public getBattleCostArr() : any[]{
                let tmp = [];
                if(this.show){
                    for(let i in this.show){
                        let unit = this.show[i];
                        if(unit.cost){
                            tmp.push({
                                open : unit.open,
                                unlockBP : unit.unlockBP,
                                cost : unit.cost,
                                lvAdd : unit.lvAdd,
                                index : Number(i) + 1
                            });
                        }
                    }
                }
                return tmp;
            }

            //--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
            public getBattleInfoArr() : any[]{
                let tmp = [];
                let arr = [`advanced`, `intermediate`];
                if(this.show){
                    for(let k in arr){
                        let str = arr[k];
                        for(let i in this.show){
                            let unit = this.show[i];
                            if(str === unit.unlockBP){
                                tmp.push(unit);
                                break;
                            }
                        }
                    }
                }
                return tmp;
            }

            //获取与传入等级的最接近的特殊奖励信息
            public getRecentSpecialReward(level : number) : any{
                let tmp = null;
                if(this.battlePass){
                    for(let k = level; k <= this.battlePass.length; ++ k){
                        let unit = this.battlePass[k - 1];
                        if(unit && unit.specialGift){
                            tmp = {
                                expNeed : unit.expNeed,
                                specialGift : unit.specialGift,
                                primary : unit.primary,
                                intermediate : unit.intermediate,
                                advanced : unit.advanced,
                                level : k,
                                special1 : unit.special1,
                                special2 : unit.special2,
                                special3 : unit.special3,
                            };
                            break;
                        }
                    }
                }
                if(!tmp){
                    let len = this.battlePass.length - 1;
                    for(let i = len; i >= 0; -- i){
                        let unit = this.battlePass[i];
                        if(unit && unit.specialGift){
                            tmp = {
                                expNeed : unit.expNeed,
                                specialGift : unit.specialGift,
                                primary : unit.primary,
                                intermediate : unit.intermediate,
                                advanced : unit.advanced,
                                level : i + 1,
                                special1 : unit.special1,
                                special2 : unit.special2,
                                special3 : unit.special3,
                            };
                            break;
                        }
                    }
                }
                return tmp;
            }

            public getSpecialRewardInfo(type : string) : any{
                let obj : any = {};
                let tmp = [];
                let info = [];
                if(this.battlePass){
                    for(let k in this.battlePass){
                        let unit = this.battlePass[k];
                        if(unit && unit.specialGift && unit[type]){
                            tmp = tmp.concat(GameData.getRewardItemIcons(unit[type], true, false));
                            for(let i = 0; i < tmp.length; ++ i){
                                info.push(Number(k) + 1);
                            }
                        }
                    }
                }
                obj.icons = tmp;
                obj.info = info;
                return obj;
            }

            public getBattlePassReward():any[]{
                // --expNeed:升级需要经验
                // --specialGift:特殊档位标识。1
                // --primary:普通政令奖励
                // --intermediate:黄金政令奖励
                // --advanced:传世政令奖励
                let arr = [`primary`, `intermediate`, ``];
                for(let i in this.battlePass){

                }
                return this.battlePass;
            }
            private _taskObj = {};
            public getTaskCfgByQuestType(questType : string) : any{

                if (this._taskObj[questType])
                {
                    return this._taskObj[questType];
                }
                let arr = this.getTaskArr();
                let tmp = null;
                for(let i in arr){
                    if(arr[i] && arr[i].questType === questType){
                        tmp = arr[i];
                        break;
                    }
                }
                this._taskObj[questType] = tmp;
                return tmp;
            }

            public getSpecialTaskCfgByQuestType(questType : string) : any{
                let arr = this.getSpecialTaskArr();
                let tmp = null;
                for(let i in arr){
                    if(arr[i] && arr[i].questType === questType){
                        tmp = arr[i];
                        break;
                    }
                }
                return tmp;
            }
        }
	}
}
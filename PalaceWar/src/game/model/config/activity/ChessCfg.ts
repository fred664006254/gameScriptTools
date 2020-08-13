namespace Config{
    export namespace AcCfg{
        /**
         * 棋社对弈
         * author ycg
         * date 2020.5.6
         * @namespace CheeeCfg
         */
        export class ChessCfg{
            public extraTime:number;
            public cost:number;
            public discount:number;
            public freeTime:number;
            public number:number;
            public change:any = null;
            public show1:number = 0;
            public show2:number = 0;
            public getReward:string = null;
            private poolRewards:string = null;
            private achieveList:ChessAchieveItem[] = [];
            private rechargeList:ChessRechargeItem[] = [];
            private taskList:any[] = [];
            public long:number = 0;
            public weight:number = 0;
            public checkerBoard:any[] = [];
            public sepcialLimit:number = 0;
            // public cost1:number = 1;
            // public cost10:number = 10;

            public get cost1():number
            {
                return this.cost;
            }
            public get cost10():number
            {
                return Math.floor(10*this.cost*this.discount);
            }

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "chessNum"){
                        for (let k in data[key]){
                            let item = new ChessAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "chessRecharge"){
                        for (let k in data[key]){
                            let item = new ChessRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "chessTask"){
                        this.taskList = [];
                        let count = 1;
                        for (let i = 0; i < data[key].length; i++ )
                        {
                            for(let item in data[key][i])
                            {
                                let itemCfg = new FindSameTaskItem();
                                itemCfg.initData(data[key][i][item]);
                                itemCfg.id = String(count);
                                itemCfg.fid = String(i+1);
                                itemCfg.sid = item;
                                this.taskList.push(itemCfg);
                                count++;
                            }
                        }
                    }
                    else if (key == "chessPool"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            }

            public getAchieveCfg():ChessAchieveItem[]{
                return this.achieveList;
            }

            public getRechargeCfg():ChessRechargeItem[]{
                return this.rechargeList;
            }

            public getTaskCfg():ChessTaskItem[]{
                return this.taskList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_10631',personBone:"servant_full2_10631","nameId":"servant_name1063","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":'wife_skin_2371', personBone:"wife_full3_2371","nameId":"wifeName_237","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_10631",personBone:"servant_full2_10631","nameId":"servant_name1063","clickContinue":true},
                }
            };        
        }

        //**进度奖励item */
        export class ChessAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class ChessRechargeItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需额度 */
            public needGem:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**任务奖励item */
        export class ChessTaskItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            public openType:string = null;
            public questType:number = 0;
            public value:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
            public fid:string;
            public sid:string;            
        } 
    }
}
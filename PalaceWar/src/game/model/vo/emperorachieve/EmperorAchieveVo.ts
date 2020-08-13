/**
 * 帝王成就vo
 * author yangchengguo
 * date 2019.12.10
 * @class EmperorAchieveVo
 */

class EmperorAchieveVo extends BaseVo{
    public achieveKing1:any; //帝位成就
    public achieveKing2:any; //王位成就
    public info:any;
    public outingst:number;
    public outingArr:any; //出巡列表
    public outingList:any[] = [];
    public shownotice:number = null;
    public popularity:number = 0;
    public barragePool:number[];
    public barrage:any;
    public getPopularityRwd:any;
    public bonus:any;
    public getBonus:any;
    public barrageNum:any;

    public constructor(){
        super()
    }

    public initData(data:any):void{
        if (data.achieve){
            this.achieveKing1 = data.achieve.king1;
            this.achieveKing2 = data.achieve.king2;
        }
        if (data.info){
            this.info = data.info;
            if (data.info.shownotice){
                this.shownotice = data.info.shownotice;
            }
            if (data.info.barragePool){
                this.barragePool = data.info.barragePool;
            }
            if (data.info.barrage){
                this.barrage = data.info.barrage;
            }
            if (data.info.getPopularityRwd){
                this.getPopularityRwd = data.info.getPopularityRwd;
            }
            if (data.info.bonus){
                this.bonus = data.info.bonus;
            }
            if (data.info.getBonus){
                this.getBonus = data.info.getBonus;
            }
            if (data.info.barrageNum){
                this.barrageNum = data.info.barrageNum;
            }
        }
        
        if (data.outingArr){
            this.outingArr = data.outingArr;
            this.formatOutingArr();
            if (data.outingArr.popularity){
                this.popularity = data.outingArr.popularity;
            }
            
        }
        if (data.outingst || data.outingst == 0){
            this.outingst = data.outingst;
        }
    }

    //获取人气值
    public getPopularScoreByUid(uid:number):number{
        let data = this.outingList;
        for (let i = 0; i < data.length; i++){
            if (data[i].uid == uid){
                return data[i].data.popularity;
            }
        }
        return 0;
    }

    //出巡列表排序
    public formatOutingArr():void{
        let length = Object.keys(this.outingArr).length;
        if (length <= 0){
            this.outingList = [];
            return ;
        }
        this.outingList = [];
        let arr:any[] = [];
        let pUid = Api.playerVoApi.getPlayerID();
        for (let key in this.outingArr){
            let sortId = this.outingArr[key].outingst;
            if (pUid == Number(key)){
                sortId = 0;
            }
            let st = this.outingArr[key].outingst;
            if (GameData.serverTime >= st && GameData.serverTime < (st + Config.EmperoroutingCfg.lastTime)){
                let _data = {uid: Number(key), st: this.outingArr[key].outingst, data: this.outingArr[key], sortId: sortId};
                this.outingList.push(_data);
            }
            // let _data = {uid: Number(key), st: this.outingArr[key].outingst, data: this.outingArr[key], sortId: sortId};
            // this.outingList.push(_data);
            
        }
        if (length > 1){
            // for (let i = 0; i < this.outingList.length; i++){
            //     let tmp:any = this.outingList[i];
            //     if (pUid == this.outingList[i].uid){
            //         let first:any = this.outingList[0];
            //         this.outingList[i] = first;
            //         this.outingList[0] = tmp;
            //     }
            // }
            this.outingList.sort((a, b)=>{ return a.sortId - b.sortId});
        }
    }

    public dispose():void{
        this.outingList = [];
    }

}
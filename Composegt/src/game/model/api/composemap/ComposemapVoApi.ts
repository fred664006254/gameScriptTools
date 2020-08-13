/**
 * 合成api
 * author 陈可
 * date 2019/12/02
 * @class ComposemapVoApi
 */
class ComposemapVoApi extends BaseVoApi
{
    private composemapVo:ComposemapVo;
    private _unlockGroupList:string[]=[];

    public constructor()
    {
		super();
    }

    public formatUnlockGroupList():void
    {
        this._unlockGroupList = Config.MapinfoCfg.getUnlockGroupList(Api.challengeVoApi.getHasPassId());
    }

    public checkOpenUnlock():boolean
    {
        return this.getMaxLv()>=6;
    }

    public checkUnlock(group:string):boolean
    {
        return this._unlockGroupList.indexOf(group)>-1;
    }

    public openFunction(group:string):void
    {
        let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
		switch(cfg.building)
		{
			case 1:
				break;
			case 2:
                ViewController.getInstance().openView(ViewConst.COMMON.LEVYVIEW);
				break;
			case 3:
                SceneController.getInstance().goCity();
				break;
		}
    }

    /**
     * 获取所有小人按照等级key分组列表
     * 注意每次调用会重新计算，返回最新list
     * 
     */
    public getMapinfoLvData():{[lv:number]:ComposemapItemVo[]}
    {
        let list=this.composemapVo.mapInfoList;
        let lvData:{[lv:number]:ComposemapItemVo[]}={};
        for(let key in list)
        {
            if(list.hasOwnProperty(key))
            {
                let info=list[key];
                if(info&&info.lv)
                {
                    if(!lvData[info.lv])
                    {
                        lvData[info.lv]=[];
                    }
                    lvData[info.lv].push(info);
                }
            }
        }
        return lvData;
    }

    public getUnlockStrByGroup(group:string):string
    {
        let str="";
        let unlockId=Config.MapinfoCfg.getUnlockByGroup(group);
        if(unlockId)
        {
            let bid=Api.challengeVoApi.getBigChannelIdByCid2(unlockId);
            //str=ChallengeCfg.getLocalStrByBigId(String(bid));
            str=String(bid);
            str=LanguageManager.getlocal("composeUnlockDesc",[str]);
        }
        return str;
    }

    /**
     * 检测是否可以合并，目前逻辑是检测是否达到最大合成上限
     * @param clv 参与合成的小人等级
     */
    public checkCanCompose(clv:number):boolean
    {
        let result=true;
        let mid=Api.playerVoApi.getPlayerMinLevelId();
        let lvCfg=Config.MinlevelCfg.getCfgByMinLevelId(mid);
        let canMaxLv = this.getCanHaveMaxPersonLv();
        let maxComposeLv= canMaxLv||this.getMaxLv();
        if(clv>=maxComposeLv)
        {
            result=false;
        }
        return result;
    }

    public checkMaxCfgLv(clv:number):boolean
    {
        return clv>=Config.PersoninfoCfg.getMaxLv();
    }

    public getMinLonelyId():string
    {
        let data = this.composemapVo.minLvData;
        if(data&&(data.num%2==1)&&(data.lv<this.normalBuyPersonLv()))
        {
            return data.item.id;
        }
        return null;
    }

    /**
     * 弹板提示不满足合成条件
     * @param callback 确定回调
     * @param thisObj 回调执行对象
     */
    public showCannotComposeView(callback?:Function,thisObj?:any):void
    {
        // let msg="";
        // if(Api.playerVoApi.checkMaxPlayerLevel())
        // {
        //     msg=LanguageManager.getlocal("servant_skilllLvTop");
        // }
        // else
        // {
        //     let nextLv=Api.playerVoApi.getPlayerNextLevel();
        //     msg=Api.playerVoApi.getPlayerOfficeByLevel(nextLv);
        //     msg=LanguageManager.getlocal("composeNeedLvupDesc",[msg]);

        // }
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        //     title:"composeNeedLvupTitle",
        //     msg:msg,
        //     yesKey:"composeGoChallenge",
        //     callback:()=>{ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);},
        //     handler:this,
        //     showCloseBtn:true,
        // });
        if(this.isChallengeLv() && Api.challengeVoApi.getHasPassId() >= 370){
            ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDLVUPNEWVIEW);  
        }else{
            if(!Api.playerVoApi.checkMaxMinLv())
            {
                ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDLVUPVIEW);
            }
        }

    }

    public showConfirmDel(id:string,callback?:Function,thisObj?:any):void
    {
        let data = this.getCellDataById(id);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal("composeDelPersionDesc",[this.getBuyTimeByLv(data.lv)+Config.RewardCfg.getNameByTypeAndId(ItemEnums.gold)]),
            // yesKey:"composeGoChallenge",
            callback:callback,
            handler:thisObj,
            showCloseBtn:true,
        });
    }

    public checkOpenUnlockGroup():boolean
    {
        return Api.composemapVoApi.getMaxLv()>=6;
    }

    public getNextUnlockGroup():string
    {
        let cid=Api.challengeVoApi.getHasPassId();
        let group=Config.MapinfoCfg.getNextUnlockGroup(cid);
        if(group)
        {
            while(Config.MapinfoCfg.getCfgByGroup(group))
            {
                if(this.hasGroupData(group))
                {
                    group=String(Number(group)+1);
                }
                else
                {
                    break;
                }
            }
        }
        return group;
    }

    public hasGroupData(group:string):boolean
    {
        let pos = Config.MapinfoCfg.getStartPosCfgByGroup(String(group));
        return !!this.getCellDataById(pos.id);
    }

    public getAllComposeNum():number
    {
        let allCost:number=this._waitBuyData?this._waitBuyData.length:0;
        // if(this._waitBuyData)
        // {
        //     for(let i=0;i<this._waitBuyData.length;i++)
        //     {
        //         let lv=this._waitBuyData[i][1];
        //         // allCost+=this.getComposeCostByLv(lv);
        //     }
        // }
        return allCost;
    }

    /**
     * 下次购买小人的价格
     */
    // public getComposeCost():number
    // {
    //     return 111;//this.getComposeCostByLv(this.curBuyPersonLv());
    // }

    // public getComposeCostByLv(lv:number):number
    // {
    //     return Config.PersoninfoCfg.getGoldCostByLv(lv);
    // }

    public getBuyTimeByLv(lv:number):number
    {
        return Config.PersoninfoCfg.getBuyTimeByLv(lv);
    }
    
    
    /**
     * 当前购买单次恢复时间
     */
    private getCurBuyTime():number
    {
        return this.getBuyTimeByLv(this.curBuyPersonLv());
    }

    public getBuyNum():number
    {
        return Math.min(this.getMaxBuyNum(),this.composemapVo.attinfo.num+Math.floor((GameData.serverTime-this.composemapVo.attinfo.st)/this.getCurBuyTime()));
    }

    public getNextRecoverPassT():number
    {
        return (GameData.serverTimeMs-this.composemapVo.attinfo.st*1000)%(this.getNextRecoverMaxT()*1000);
    }

    public getNextRecoverMaxT():number
    {
        return Config.PersoninfoCfg.getBuyTimeByLv(this.curBuyPersonLv());
    }

    public getMaxBuyNum():number
    {
        return Config.MinlevelCfg.getbuyLimitByMinLvId(Api.playerVoApi.getPlayerMinLevelId());
    }

    private curBuyPersonLv():number
    {
        let loneId=this.getMinLonelyId();
        let curBuyLv = loneId?this.getCellDataById(loneId).lv:this.normalBuyPersonLv();
        return curBuyLv;
    }

    private normalBuyPersonLv():number
    {
        return Math.max(1,this.getMaxLv()-5);
    }

    /**
     * 下次购买小人的资源
     */
    public getcurBuyRes():string
    {
        return Config.MapinfoCfg.getPersonResBig(this.curBuyPersonLv());
    }
    

    /**
     * 
     * @param id 
     * @param allstatus 是否返回全部状态的地块信息，默认不返回地块动画未播放完成的地块
     */
    public getCellDataById(id:string,allstatus?:boolean):ComposemapItemVo
    {
        let item:ComposemapItemVo=this.composemapVo.mapInfoList[String(id)];
        let rookieCfg=RookieCfg.getRookieCfg(Api.rookieVoApi.curStep);
        let idCfg={"10100":1,"10200":1};
        if(Api.rookieVoApi.isInGuiding&&rookieCfg&&rookieCfg.moveHand)
        {
            if(!idCfg[id])
            {
                item=null;
            }
        }
        // if(!allstatus)
        // {
        //     if(item&&item.unlocking)
        //     {
        //         item=null;
        //     }
        // }
        return item;
    }

    // public setunlockingStatusById(id:string):void
    // {
    //     let item = this.getCellDataById(id,true);
    //     item&&(item.unlocking=true);
    // }
    // public setunlockedStatusById(id:string):void
    // {
    //     let item = this.getCellDataById(id,true);
    //     item&&(item.unlocking=false);
    // }

    public getAllCellData():{[key:string]:ComposemapItemVo}
    {
        return this.composemapVo.mapInfoList;
    }
    public move(oid:string,nid:string):void
    {
        this.composemapVo.move(oid,nid);
    }

    public removeData(id:string):void
    {
        this.composemapVo.removeData(id);
    }

    /**
     * 获取当前已经解锁的地块总数
     */
    public getUnlockCellNum() {
        let cells = this.getAllCellData();
        // let rsl: number = 0;
        // for (var p in cells) {
        //     if (cells[p].unlocking == false) {
        //         rsl++;
        //     }
        // }
        return Object.keys(cells).length;
    }

    /**
     * 获取当前地图上小人数量
     */
    public getOwnRenNum():number
    {
        let num=0;
        let cells = this.getAllCellData();
        for (const key in cells) {
            if (Object.prototype.hasOwnProperty.call(cells, key)) 
            {
                const vo:ComposemapItemVo = cells[key];
                if(vo.lv>0)
                {
                    num++;
                }
            }
        }
        return num;
    }

    /**
     * 获取当前拥有的小人的最大等级
     */
    public getOwnCoposeMaxLv():number
    {
        return this.composemapVo.maxinfo.plv;
    }

    /**
     * 获取当前可以合并的最大等级
     */
    public getCanComposeMaxLv():number
    {
        let mid=Api.playerVoApi.getPlayerMinLevelId();
        let cfg=Config.MinlevelCfg.getCfgByMinLevelId(mid);
        let maxLv=(cfg&&cfg.personLv)||this.composemapVo.maxinfo.plv;
        return maxLv;
    }
    
    private _timeCount:number=-1;
    private _waitBuyData:[string,number][]=null;

    private checkAndStartCount(pos:string,lv:number):void
    {
        if(!this._waitBuyData)
        {
            this._waitBuyData=[];
        }
        this._waitBuyData.push([pos,lv]);
        if(this._timeCount!=-1)
        {
            egret.clearTimeout(this._timeCount);
        }
        this._timeCount=egret.setTimeout(()=>{
            this.checkAndStopCount();
        },this,300);
    }

    public checkAndStopCount():boolean
    {
        let result=false;
        if(this._timeCount!=-1)
        {
            egret.clearTimeout(this._timeCount);
            this._timeCount=-1;
            if(this._waitBuyData)
            {
                if(this._waitBuyData.length>0)
                {
                    NetManager.request(NetRequestConst.REQUEST_MAP_BUYPERSON,{poslvs:this._waitBuyData});
                }
                this._waitBuyData=null;
            }
            result=true;
        }
        return result;
    }

    /**
     * 检测是否开启一键购买小人
     */
    public checkCanFastBuyPerson():boolean
    {
        return Api.playerVoApi.getPlayerLevel()>=Config.MinlevelCfg.oneClickBuy;
    }

    public buyPerson():boolean
    {
        // console.log(Api.playerVoApi.getPlayerGold(),this.getAllComposeCost()+this.getComposeCost());
        if(this.getBuyNum()<this.getAllComposeNum()+1)
        {
            // if(MainUI.getInstance().getUnlockIndex()>=10)
            // {
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDGOLDPOPUPVIEW);
            //     return false;
            // }else{
                let leftT=Math.ceil(Api.composemapVoApi.getNextRecoverMaxT()-Api.composemapVoApi.getNextRecoverPassT()/1000);
                App.CommonUtil.showTip(LanguageManager.getlocal("composewaittime",[App.DateUtil.getFormatBySecond(leftT)]));
                return false;
            // }
            
        }
        
        let posId:string = "";
        let groupList=Config.MapinfoCfg.groupIdArr;
        let l=groupList.length;
        for(let i=0;i<l;i++)
        {
            let groupCfg=Config.MapinfoCfg.getCfgByGroup(String(groupList[i]))

            if(groupCfg)
            {
                let ll=groupCfg.length;
                for(let j=0;j<ll;j++)
                {
                    let item=groupCfg[j];
                    let data = this.getCellDataById(item.id);
                    
                    if(data&&!data.lv)
                    {
                        posId=item.id;
                        if(GameData.isNewUser&&ComposeStatus.buyNum==0&&posId==groupCfg[0].id&&!this.getCellDataById(groupCfg[1].id).lv)
                        {
                            posId=groupCfg[1].id;
                            ComposeStatus.isBuyStop=true;
                        }else if(GameData.isNewUser&&ComposeStatus.buyNum==1&&posId==groupCfg[0].id&&!this.getCellDataById(groupCfg[2].id).lv)
                        {
                            posId=groupCfg[2].id;
                            ComposeStatus.isBuyStop=true;
                        }
                        let lv=this.curBuyPersonLv();
                        let result = this.composemapVo.addClientItem(posId,lv);
                        if(result)
                        {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_ADDPERSON);
                            this.checkAndStartCount(posId,lv);
                        }
                        // NetManager.request(NetRequestConst.REQUEST_MAP_BUYPERSON,{pos:posId,lv:this.curBuyPersonLv()});
                        return true;
                    }
                }
            }
        }
        if (Api.challengeVoApi.getHasPassId() >= Config.MapinfoCfg.maxUnLock) {
            App.CommonUtil.showTip(LanguageManager.getlocal("composeNoSpace"));
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("composeNoSpaceLock"));
        }
        return false;
    }

    public checkAutoSelect():boolean
    {
        return GameData.isNewUser&&ComposeStatus.buyNum==2;
    }

    public getAddPresonList():string[]
    {
        return this.composemapVo.addList;
    }

    public clearAddPersonList():void
    {
        this.composemapVo.addList.length=0;
    }

    public getNeedDelPersonList():string[]
    {
        return this.composemapVo.delList;
    }

    public delClientPerson():void
    {
        this.composemapVo.delClientitem();
    }

    public getLvList(lv:number):string[]
    {
        return this.composemapVo.mapInfoLvList[lv]||[];
    }

    public getMaxLv():number
    {
        return this.composemapVo.maxinfo.plv;
    }

    public checkCanBath():boolean
    {
        // return Api.rookieVoApi.isInGuiding==false;
        if(Api.rookieVoApi.isInGuiding)
        {
            return false;
        }  else{
            return Api.playerVoApi.getPlayerMinLevelId() >= 5;
        } 
        // return false;
    }

    /**
     * 是否可以放下or合并
     */
    public checkCanPos():boolean
	{
		let {x,y} = ComposeStatus.curStopPos;
		let id = Config.MapinfoCfg.getIdByPos(x,y);
		let selectId=Config.MapinfoCfg.getIdByPos(ComposeStatus.curSelectPos.x,ComposeStatus.curSelectPos.y);
		let stopitem=this.getCellDataById(id);
		let moveitem=this.getCellDataById(selectId);
		let result=false;
		if(Config.MapinfoCfg.checkHasPos(x,y)&&moveitem&&moveitem.lv)
		{
			if(stopitem&&stopitem.id!=moveitem.id)
			{
				// if((stopitem.lv==moveitem.lv)||(!stopitem.lv))
				// {
					result=true;
				// }
			}
		}
		return result;
		
    }
    
    public getLeftTopPos():{x:number,y:number}
    {
        return {x:this.composemapVo.minX,y:this.composemapVo.minY};
    }

    public getRightButtomPos():{x:number,y:number}
    {
        let unlockX=0;
        let unlockY=0;
        if(this.checkOpenUnlockGroup())
        {
            let nextgroup = this.getNextUnlockGroup();
            if(nextgroup)
            {
                let cfg = Config.MapinfoCfg.getStartPosCfgByGroup(nextgroup);
                unlockX=cfg.x;
                unlockY=cfg.y;
            }
        }
        return {x:Math.max(this.composemapVo.maxX,unlockX),y:Math.max(this.composemapVo.maxY,unlockY)};
    }

    public getOfficePersonLv():number{
        let curMinLvId = Api.playerVoApi.getPlayerMinLevelId();
		let curLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLvId);
        return curLvCfg.personLv || 1;
    }
    public getChallengeAddPersonLv():number{
        if(!this.isChallengeLv()){
            return 0;
        }
        let hasPasId = Api.challengeVoApi.getHasPassId();
        return Config.ChallengelvCfg.getAddPersonLvByChallengeId(hasPasId);
    }

    public isChallengeLv():boolean
    {
        if(JSON.stringify(GameConfig.config.challengelvCfg) === '{}')
        {
            return false;
        }
        return true;
    }

    public getCanHaveMaxPersonLv(){
        let maxLv = this.getOfficePersonLv() + this.getChallengeAddPersonLv();
        maxLv = Math.min(maxLv,60);
        return maxLv

    }
    public getCanHavePreviewPersonLv(){
        let previewlv =  this.getOfficePersonLv() + this.getChallengeAddPersonLv() + 1;
        previewlv = Math.min(previewlv,60);
        return previewlv;
    }
    
    public dispose():void
    {
        this.checkAndStopCount();
        this.composemapVo=null;
        this._unlockGroupList.length=0;
        super.dispose();
    }
}
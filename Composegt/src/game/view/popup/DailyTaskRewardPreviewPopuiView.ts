/**
 * 每日奖励宝箱奖励预览弹板
 * author yanyuling qianjun 通用于转盘宝箱
 * date 2017/10/30
 * @class DailyTaskRewardPreviewPopuiView
 */
class DailyTaskRewardPreviewPopuiView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _lastY:number=0;
    // private _bg:BaseBitmap=null;
    public constructor() 
	{
		super();
    }
    
    protected resetBgSize():void
	{
        super.resetBgSize();
        let bg=BaseBitmap.create("commonview_woodbg");
        bg.width=553;
        bg.height=this.viewBg.height-91;
        bg.x=(this.viewBg.width-bg.width)*0.5+4;
        bg.y=this.viewBg.y+61;
        this.addChildAt(bg,this.getChildIndex(this.viewBg)+1);
    }
    protected getBgExtraHeight():number
	{
		return 60;
	}

	public initView():void
	{	
        Api.rookieVoApi.checkNextStep();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let data = this.param.data;
        let rewardId = data.id;
        let rewardCfg = null;
        let need : number = 0;
        let mustStr = '';
        let canReward = null;
        if(data.type == AcMayDayView.AID){
            let cfg : Config.AcCfg.MayDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
            rewardCfg = cfg.getBoxRewardById(rewardId);
            need = rewardCfg.needNum;
            mustStr = rewardCfg.getReward;
        } else if(data.type == AcMayDayRechargeView.AID){
            let cfg : Config.AcCfg.MayDayRechargeCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
            rewardCfg = cfg.getBoxRewardById(rewardId);
            need = rewardCfg.needNum;
            mustStr = rewardCfg.getReward;
        } else if (data.type == AcHuLaoView.AID) {
            let activeCfg:Config.AcCfg.HuLaoCfg = Config.AcCfg.getCfgByActivityIdAndCode(data.type, data.activeCode);
            mustStr = activeCfg.lotteryNum[rewardId].getReward;
            need = Math.floor(100 - activeCfg.lotteryNum[rewardId].needNum / activeCfg.attackNum * 100);
        } else if (data.type == AcBuildingWorshipView.AID) {
            let activeCfg:Config.AcCfg.BuildingWorshipCfg = Config.AcCfg.getCfgByActivityIdAndCode(data.type, data.activeCode);
            mustStr = activeCfg.lotteryNum[rewardId].getReward;
            need = Math.floor(activeCfg.lotteryNum[rewardId].needNum / activeCfg.getMaxBoxNeedNum() * 100);
        }  else if (data.type == AcSpringOutingView.AID) {
            let activeCfg:Config.AcCfg.SpringOutingCfg = Config.AcCfg.getCfgByActivityIdAndCode(data.type, data.activeCode);
            mustStr = activeCfg.lotteryNum[rewardId].getReward;
            need = activeCfg.lotteryNum[rewardId].needNum;//Math.floor(activeCfg.lotteryNum[rewardId].needNum / activeCfg.getMaxBoxNeedNum() * 100);
        }  else if (data.type == AcChaseBanditView.AID) {
            let activeCfg:Config.AcCfg.ChaseBanditCfg = Config.AcCfg.getCfgByActivityIdAndCode(data.type, data.activeCode);
            mustStr = activeCfg.lotteryNum[rewardId].getReward;
            need = Math.floor(activeCfg.lotteryNum[rewardId].needNum / activeCfg.getMaxBoxNeedNum() * 100);
        }
        else if (data.type == "rescue") {
            let activeCfg:Config.AcCfg.RescueCfg = Config.AcCfg.getCfgByActivityIdAndCode(data.type, data.activeCode);
            mustStr = activeCfg.interimReward[rewardId].reward;
            need = Math.floor(activeCfg.interimReward[rewardId].interim / activeCfg.Hp * 100);
        }else{
            rewardCfg = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(rewardId);
            need = rewardCfg.needLiveness;
            let expReward = rewardCfg.expReward;
            let mustReward = rewardCfg.mustReward;
            for (const key in expReward) {
                if (Object.prototype.hasOwnProperty.call(expReward, key)) 
                {
                    const str = expReward[key];
                    mustStr+=(mustStr==""?str:"|"+str);
                }
            }
            mustStr = mustStr + (mustStr==""?"":"|")+ mustReward[0] + "_" + mustReward[1]+ "_0";
            canReward = rewardCfg.canReward;
        }
        
        let ofy:number=51;
        // let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // this._bg=bg;
		// bg.width = 520;
		// bg.height = 205;
		// bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        // bg.y = 116 - ofy + 15;
		// // bg.y = 116-ofy;
		// this._nodeContainer.addChild(bg);

        // let topBg = BaseBitmap.create("public_tc_bg02");
        // topBg.width = 272;
        // topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        // topBg.y = 65-ofy;
        // this._nodeContainer.addChild(topBg)


        let lockTxt = "dailyTask_rewardCase"
        if(data.type == AcMayDayView.AID)
        {
            lockTxt = "acMayDayBoxDesc";
        }else if(data.type == AcMayDayRechargeView.AID)
        {
            lockTxt = "acMayDayBoxDesc";
        }else if(data.type == AcHuLaoView.AID)
        {
            if(AcHuLaoView.CODE == "1"){
                lockTxt = "achulaounlockbox";
            } else if(AcHuLaoView.CODE == "2"){
                lockTxt = "achulaounlockbox-2";
            }
            

        }else if(data.type == AcBuildingWorshipView.AID)
        {
            if (data.activeCode == '4' || data.activeCode == '5' || data.activeCode == '6') {
                lockTxt = `acbuildingworshipunlockbox${data.activeCode}`;
            } else {
                lockTxt = "acbuildingworshipunlockbox";
            }
        }else if(data.type == AcSpringOutingView.AID)
        {
            if(LanguageManager.checkHasKey("acSpringOutingUnlock-"+AcSpringOutingView.CODE)){
                lockTxt = "acSpringOutingUnlock-"+AcSpringOutingView.CODE;
            } else {
                lockTxt = "acSpringOutingUnlock-1";
            }
            
        }else if(data.type == AcChaseBanditView.AID)
        {
            if(LanguageManager.checkHasKey("acChaseBanditUnlock-"+AcChaseBanditView.CODE)){
                lockTxt = "acChaseBanditUnlock-"+AcChaseBanditView.CODE;
            } else {
                lockTxt = "acChaseBanditUnlock-1";
            }
            
        }
        else if(data.type == "rescue")
        {
            lockTxt = "rescueunlockbox";
        }

        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(lockTxt,[String(need)]);
        tipTxt1.x = this.viewBg.x + this.viewBg.width/2 - tipTxt1.width/2;
        tipTxt1.y =33;
        this._nodeContainer.addChild(tipTxt1);
        
        // let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // tipTxt2.text = LanguageManager.getlocal(data.type == 'Daily' ? "dailyTask_rewardTip" : 'acMayDayBoxDesc1');
        // tipTxt2.x = bg.x+10;
        // tipTxt2.y = bg.y + 20;
        // this._nodeContainer.addChild(tipTxt2);
        
        if (!canReward){
            canReward = [];
        }
        if(mustStr)
        {
            this.initPartReward(mustStr,true);
        }
        let resultStr = '';
        for (var index = 0; index < canReward.length; index++) {
            resultStr = (resultStr==""?"":resultStr+"|") + canReward[index];
        }
        if(resultStr)
        {
            this.initPartReward(resultStr);
        }
        // let rewardArr = GameData.formatRewardItem(resultStr);
        // let lineNum = Math.ceil(rewardArr.length / 4);
        // let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// rbg.width = bg.width-30;
		// rbg.height = 120*lineNum +15;
		// rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        // rbg.y = tipTxt2.y + tipTxt2.height + 10;
		// this._nodeContainer.addChild(rbg);


        // let leftF = BaseBitmap.create("public_tcdw_bg01");
		// leftF.x = rbg.x + 5 ;
		// leftF.y = rbg.y +3;
		// this._nodeContainer.addChild(leftF);

		// let rightF = BaseBitmap.create("public_tcdw_bg02");
		// rightF.x = rbg.x + rbg.width - rightF.width - 5 ;
		// rightF.y = rbg.y +3;
		// this._nodeContainer.addChild(rightF);

        // bg.height = rbg.height + 70;
        // let rewardX = rbg.x + ((data.type == AcMayDayView.AID || data.type == AcMayDayRechargeView.AID) ? ((500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2): 15);//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        // let rewardY = rbg.y +12;
        // for (var index = 0; index < rewardArr.length; index++) {
		// 	let iconItem = GameData.getItemIcon(rewardArr[index],true);
        //     let numLb = iconItem.getChildByName("numLb");
        //     if(numLb && data.type != AcMayDayView.AID && data.type != AcMayDayRechargeView.AID && data.type != AcHuLaoView.AID && data.type != AcSpringOutingView.AID && data.type != AcChaseBanditView.AID)
        //     {
        //         numLb.visible = false;
        //     }
        //     if (index > 0 )
        //     {   
        //         rewardX +=  (iconItem.width+15);
        //         if( index%4 == 0){
        //             rewardX = rewardX = rbg.x + ((data.type == AcMayDayView.AID || data.type == AcMayDayRechargeView.AID) ? ((500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2): 15);
        //             rewardY += iconItem.height + 15;
        //         }
        //     }
		// 	iconItem.x =  rewardX ;
        //     iconItem.y = rewardY;
            
		// 	this._nodeContainer.addChild(iconItem);
		// }
    }

    protected isHaveTitle():boolean
	{
		return true;
	}

    private initPartReward(resultStr:string,must?:boolean):void
    {
        let size={x:50,y:70,w:522};
        let data = this.param.data;
        let rewardArr = GameData.formatRewardItem(resultStr);
        let lineNum = Math.ceil(rewardArr.length / 4);
        let rbg:BaseBitmap = BaseBitmap.create("public_listbg3");
        
		rbg.width = size.w;
		rbg.height = 120*lineNum +15+35;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        rbg.y = this._lastY?this._lastY+5:size.y + 10;
        this._nodeContainer.addChild(rbg);
        this._lastY=rbg.y+rbg.height;

        let redBg=BaseBitmap.create("shopview_redbg");
        redBg.setPosition(rbg.x+3,rbg.y+11);
        this._nodeContainer.addChild(redBg);

        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_CROSS_WHITE);
        tipTxt2.text = LanguageManager.getlocal(must?'acMayDayBoxDesc1':"dailyTask_rewardTip");
        tipTxt2.x = redBg.x+20;
        tipTxt2.y = redBg.y+(redBg.height-tipTxt2.height)*0.5+1;
        this._nodeContainer.addChild(tipTxt2);



        // let leftF = BaseBitmap.create("public_tcdw_bg01");
		// leftF.x = rbg.x + 5 ;
		// leftF.y = rbg.y +3;
		// this._nodeContainer.addChild(leftF);

		// let rightF = BaseBitmap.create("public_tcdw_bg02");
		// rightF.x = rbg.x + rbg.width - rightF.width - 5 ;
		// rightF.y = rbg.y +3;
		// this._nodeContainer.addChild(rightF);

        let rewardX = rbg.x + ((data.type == AcMayDayView.AID || data.type == AcMayDayRechargeView.AID) ? ((500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2): 15);//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        let rewardY = rbg.y +12;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true);
            let numLb = iconItem.getChildByName("numLb");
            if(numLb && data.type != AcMayDayView.AID && data.type != AcMayDayRechargeView.AID && data.type != AcHuLaoView.AID && data.type != AcSpringOutingView.AID && data.type != AcChaseBanditView.AID)
            {
                if(must&&rewardArr[index].num>0)
                {}
                else
                {
                    numLb.visible = false;
                }
            }
            if (index > 0 )
            {   
                rewardX +=  (iconItem.width+15);
                if( index%4 == 0){
                    rewardX = rewardX = rbg.x + ((data.type == AcMayDayView.AID || data.type == AcMayDayRechargeView.AID) ? ((500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2): 15);
                    rewardY += iconItem.height + 15;
                }
            }
			iconItem.x =  rewardX ;
            iconItem.y = rewardY+35;
            
			this._nodeContainer.addChild(iconItem);
		}
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "commonview_woodbg","shopview_redbg"
		]);
	}

	public dispose():void
	{
        this._nodeContainer = null
        this._lastY=0;
        super.dispose();
    }
}
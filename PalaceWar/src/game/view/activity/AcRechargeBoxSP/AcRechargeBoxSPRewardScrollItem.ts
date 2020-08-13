/**
 * @class AcRechargeBoxSPPopupScrollItem
 */
class AcRechargeBoxSPRewardScrollItem extends ScrollListItem
{

    private _code:string = "";
    private _aid:string = "";
    private _desc1:BaseTextField = null;
    private _desc2Bg:BaseBitmap = null;
    private _desc2:BaseTextField = null;
    private _rechargeBtn:BaseButton = null;
    private _receiveBtn:BaseButton = null;
    private _bg:BaseBitmap = null;
    private _isNeedDialog = false;

    private _boxItemCfg:Config.AcCfg.RechargeBoxSPItemCfg = null;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,boxItemCfg:Config.AcCfg.RechargeBoxSPItemCfg,itemParam):void
	{

        this.width = 620;
        this.height = 251;
        this._code = itemParam.code;
        this._aid = itemParam.aid;
        this._boxItemCfg = boxItemCfg;
        
        let bgName = "";
        let rewardVoList = GameData.formatRewardItem(boxItemCfg.getReward);

        if(boxItemCfg.backGround == 0){
            bgName = "acrechargeboxspview_rewardbg0";
        } else {
            if(rewardVoList[0].type == 6 || rewardVoList[0].type == 11){
                bgName = "acrechargeboxspview_rewardbg1";
            } else {
                bgName = "acrechargeboxspview_rewardbg2";
            }
        }

        let bg = BaseBitmap.create(bgName);
		bg.width = 603;
		bg.height = 251;
		bg.x = this.width / 2 - bg.width/2;
        bg.y = 0;
        this._bg = bg;
        this.addChild(bg);
        
        if (this._code == "2"){
            let flag = BaseBitmap.create("acrechargeboxspview_flower_"+this._code);
            flag.setPosition(bg.x - 13, bg.y);
            this.addChild(flag);
        }

        let titleText = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupTitle-"+boxItemCfg.id +"_"+ this._code),22,TextFieldConst.COLOR_BROWN);
        titleText.x = bg.x + 195 - titleText.width/2;
        titleText.y = bg.y + 47 - titleText.height/2;
        this.addChild(titleText);

        let titleLineLeft = BaseBitmap.create("acrechargeboxsp_line");
        titleLineLeft.setPosition(titleText.x - titleLineLeft.width - 30, titleText.y + titleText.height/2 - titleLineLeft.height/2);
        this.addChild(titleLineLeft);

        let titleLineRight = BaseBitmap.create("acrechargeboxsp_line");
        titleLineRight.anchorOffsetX = titleLineRight.width/2;
        titleLineRight.anchorOffsetY = titleLineRight.height/2;
        titleLineRight.setPosition(titleText.x + titleLineRight.width/2 + 30 + titleText.width, titleText.y + titleText.height/2 - titleLineRight.height/2 + 5);
        titleLineRight.rotation = 180;
        this.addChild(titleLineRight);

        //500  40
        let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc-"+this._boxItemCfg.id + "_"+this._code),18,TextFieldConst.COLOR_WARN_GREEN2);
        desc1.textAlign = egret.HorizontalAlign.CENTER;
        desc1.x = bg.x + 200 - desc1.width/2;
        desc1.y = bg.y + 200 - desc1.height/2 - 16;
		this.addChild(desc1);

        // /**
        // 507 123
        App.LogUtil.log("rewardVoList[0].type: "+rewardVoList[0].type+ " rewardVoList[0].id:"+rewardVoList[0].id);
        if(rewardVoList[0].type == 6 || rewardVoList[0].type == 11){
            let rewardDB = GameData.getItemIcon(rewardVoList[0], true, false);
            rewardDB.x = bg.x + 507 - rewardDB.width/2 + 15;
            rewardDB.y = bg.y + 135 - rewardDB.height/2 - 35;
            let b = rewardDB.getChildByName("iconBg");
            if(b){
                b.alpha = 0;
            }
            let numLb = rewardDB.getChildByName("numLb");
            numLb.x = 80;
            numLb.y = 80;
            this.addChild(rewardDB);

            if (rewardDB.getChildByName("numbg"))
            {
                rewardDB.getChildByName("numbg").visible = false;
            }

            let anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim",10,70);
            anim.x = rewardDB.x + rewardDB.width/2 - 190/2;
            anim.y = rewardDB.y + rewardDB.height/2 - 190/2;
            anim.blendMode = egret.BlendMode.ADD; 
            this.addChild(anim);
            anim.playWithTime(-1);
            if (rewardVoList[0].type == 11 && rewardVoList[0].id == 4033){
                //衣装预览
                let btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type, true);
                this.addChild(btnContainer);
                btnContainer.setPosition(this.width - 190, bg.y + 82);
            }
    
        } else if(rewardVoList[0].type == 10){
            //红颜
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-6 + 16;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.29;
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+ rewardVoList[0].id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 82);

        } else if(rewardVoList[0].type == 16){
            //红颜皮肤
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.29;
            let wifeBM =  BaseLoadBitmap.create("wife_skin_"+ rewardVoList[0].id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 82);
        }
        else if(rewardVoList[0].type == 8){
            //门客
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.55;
            let wifeBM =  BaseLoadBitmap.create("servant_full_"+ rewardVoList[0].id);
            wifeBM.width = 405;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 82);
        }
        //  */
        
        let rewardOffX = bg.x + 30;
        if (this._code == "2"){
            rewardOffX = bg.x + 65;
        }
		for(let i = 1;i<rewardVoList.length;i++)
		{
			let rewardDB = GameData.getItemIcon(rewardVoList[i],true,true);
			rewardDB.setScale(0.7);
            rewardDB.x = rewardOffX + (rewardDB.width * rewardDB.scaleX + 10) * (i - 1);
            rewardDB.y = bg.y + 80;
			this.addChild(rewardDB);
		}

        //195 223
        this._desc1 = desc1;

        let desc2Bg = BaseBitmap.create("public_9_bg87");
        this.addChild(desc2Bg);
        this._desc2Bg = desc2Bg;

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2",["0"]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.x = bg.x + 200 - desc2.width/2 + 5;
        desc2.y = bg.y + 213 - desc2.height/2;
		this.addChild(desc2);
        this._desc2 = desc2;
        desc2Bg.width = desc2.width + 40;
        desc2Bg.height = desc2.height + 10;
        desc2Bg.x = desc2.x + desc2.width/2 - desc2Bg.width/2;
        desc2Bg.y = desc2.y + desc2.height/2 - desc2Bg.height/2;

        
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acRechargeBoxSPPopupViewGoRecharge",this.rechargeClick,this);
        this._rechargeBtn.x = bg.x + 530 - this._rechargeBtn.width/2 - 5;
        this._rechargeBtn.y = bg.y + 240 - this._rechargeBtn.height/2 -30;
		this.addChild(this._rechargeBtn);

		this._receiveBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRechargeBoxSPPopupViewReceive",this.receiveClick,this);
        this._receiveBtn.x = bg.x + 530 - this._receiveBtn.width/2 - 5;
        this._receiveBtn.y = bg.y + 240 - this._receiveBtn.height/2 - 30;
		this.addChild(this._receiveBtn);

        this.refreshData(index);
	}


	public refreshData(index:number)
	{	
        let status = 0; // 0->未解锁   1->前往充值  2->领取  3->已领取
        let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        let cfg =  <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);

        
        // let boxCfg =  cfg.getBoxData(boxInfo.needGem);
        let rechargeNum = vo.getBoxReChargeNum(this._boxItemCfg.needGem);
        let receiveNum = vo.getBoxReceiveNum(this._boxItemCfg.needGem);

        if(this._boxItemCfg.rechargeTimeLimit > rechargeNum){
            //不可领取
            //判断是否已经解锁了
            if(this._boxItemCfg.rechargeTimeLimit == rechargeNum + 1){
                status = 1;
            } else {
                status = 0;
            }

        } else if(this._boxItemCfg.rechargeTimeLimit <= rechargeNum){
            //可以领取
            //判断是否已经领取了
            let num = vo.getReceiveNumById(String(this._boxItemCfg.id));
            if(num == 0){
                status = 2;
            } else {
                status = 3;
            }
        }
        this._desc2.text = "";
        switch(status){
            case 0: // 0->未解锁
                this._rechargeBtn.visible = true;
                this._rechargeBtn.setEnable(false);
                this._rechargeBtn.setText("acRechargeBoxSPPopupViewLock");

                this._receiveBtn.visible = false;

                let unlockID:number = this._boxItemCfg.unlockID;
                
                if(unlockID > 0){
  
                    this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc3",[LanguageManager.getlocal("acRechargeBoxSPPopupTitle-"+unlockID +"_"+ this._code)]);
                    // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                    this._desc2.x = this._bg.x + 198 - this._desc2.width/2 + 5;
                    this._desc2Bg.width = this._desc2.width + 30;
                    this._desc2Bg.x = this._desc2.x + this._desc2.width/2 - this._desc2Bg.width/2;
                }

                break;
            case 1: //1->前往充值
                this._rechargeBtn.visible = true;
                this._rechargeBtn.setEnable(true);
                this._rechargeBtn.setText("acRechargeBoxSPPopupViewGoRecharge");

                this._receiveBtn.visible = false;

                                 
                let rechargecfg =  Config.RechargeCfg.getRechargeItemCfgByKey(this._boxItemCfg.needGem);
                if(rechargecfg && rechargecfg.gemCost){
                    this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc4",[String(rechargecfg.gemCost)]);
                    // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                    this._desc2.x = this._bg.x + 198 - this._desc2.width/2 + 5;
                    this._desc2Bg.width = this._desc2.width + 30;
                    this._desc2Bg.x = this._desc2.x + this._desc2.width/2 - this._desc2Bg.width/2;
                }
                break;
            case 2: //2->领取 
                this._rechargeBtn.visible = false;

                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(true);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceive");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc5");
                // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                this._desc2.x = this._bg.x + 195 - this._desc2.width/2 + 5;
                this._desc2Bg.width = this._desc2.width + 30;
                this._desc2Bg.x = this._desc2.x + this._desc2.width/2 - this._desc2Bg.width/2;
                break;
            case 3: //3->已领取
                this._rechargeBtn.visible = false;

                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(false);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceived");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc6");
                // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                this._desc2.x = this._bg.x + 198 - this._desc2.width/2 + 5; 
                this._desc2Bg.width = this._desc2.width + 30;
                this._desc2Bg.x = this._desc2.x + this._desc2.width/2 - this._desc2Bg.width/2;   
                break;
        }	
	}

	/**
	 * 前往充值按钮
	 */
	private rechargeClick()
	{
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, {rechargeId: this._boxItemCfg.needGem});
	}
	/**
	 * 领取按钮
	 */
	private receiveClick()
	{
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		if(!vo || !vo.isStart){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
		}
        if(this._isNeedDialog){
            // ViewController.getInstance().openView(ViewConst.BASE.ACRECHARGEBOXSPAVGVIEW,{

            //     idx : 1,
            //     buidId : "first",
            //     aid : this._aid,
            //     code : this._code,
            //     f:this.receiveClickCallback,
            //     o:this
            // });
        } else {
            this.receiveClickCallback();
        }
	}

    private receiveClickCallback(){
		let activeId = this._aid + "-" + this._code;
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,{"activeId":activeId,"rechargeId":this._boxItemCfg.id});

    }

	public getSpaceY():number
	{
		return -7;
    }
    
    //衣装预览按钮
    private getSkinBtnContainer(id:number|string, type:number|string, isOther?:boolean):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        // skinTxtEffect.touchEnabled = false;
        
        let skinTxtStr = "acwealthcarpview_servantskintxt";
        if (isOther){
            skinTxtStr = "acgiftreturnview_common_skintxt"
        }
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		// skinTxt.touchEnabled = false;

		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		// skinTxteffect.touchEnabled = false;
		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        // let touchPos = BaseBitmap.create("public_9_viewmask");
		// touchPos.width = 160;
		// touchPos.height = 158;
        // touchPos.setPosition(25, -60);
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
        let showData = vo.getShowSkinData();
        let showType = type+"_"+id+"_1";
		touchPos.addTouchTap(() => {
            let data = null;
            if (this._code == "1"){
                let wifeRechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(showData[1].needGem);
                let servantRechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(showData[0].needGem);
                let wifeTopMsg = LanguageManager.getlocal("acRechargeBoxSpWifeTopMsg-"+this._code, [""+wifeRechargeCfg.gemCost]);
                let servantTopMsg = LanguageManager.getlocal("acRechargeBoxSpWifeSkinTopMsg-"+this._code, [""+servantRechargeCfg.gemCost]);
                let wifeOtherTip = LanguageManager.getlocal("acRechargeBoxSpPreviewWifeTip-"+this._code);
                let wifId = Config.WifeCfg.formatRewardItemVoStr(showData[1].idType);
                let servantId = Config.ServantCfg.formatRewardItemVoStr(showData[0].idType);
                let titleId = Config.TitleCfg.formatRewardItemVoStr(showData[2].idType);
                data = {data:[
                    {idType: servantId, topMsg:servantTopMsg, bgName:"", scale:0.73, offY: -3},
                    {idType: wifId, topMsg:wifeTopMsg, bgName:"", scale:0.62, otherTip:wifeOtherTip},
                    {idType: titleId}
                ], showType:showType};
            }
            else if (this._code == "2"){
                // let skinid = vo.getShowSkinData();
				// let topMsg = LanguageManager.getlocal("acRechargeBoxSpServantSkinTopMsg-"+this._code, [""+vo.getShowSkinNeedRecharge()]);
				// let serSkinId = Config.ServantskinCfg.formatRewardItemVoStr(skinid);
				// data = {data:[
				// 	{idType: serSkinId, topMsg:topMsg, bgName:""},
				// ], showType:null};
				// ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }

	public dispose():void
	{
        this._code = "";
        this._aid = "";
        this._desc1 = null;
        this._desc2 = null;
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._bg = null;
        this._boxItemCfg = null;
        this._desc2Bg = null;

		super.dispose();
	}
}
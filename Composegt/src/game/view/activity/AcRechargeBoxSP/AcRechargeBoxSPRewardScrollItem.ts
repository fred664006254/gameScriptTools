/**
 * @class AcRechargeBoxSPPopupScrollItem
 */
class AcRechargeBoxSPRewardScrollItem extends ScrollListItem
{

    private _code:string = "";
    private _aid:string = "";
    private _desc1:BaseTextField = null;
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

        this.width = 640;
        this._code = itemParam.code;
        this._aid = itemParam.aid;
        this._boxItemCfg = boxItemCfg;
        
        if(PlatformManager.checkIsJPSp() && index == 2){
            this._isNeedDialog = true;

        }
        // let bg = BaseBitmap.create("public_tc_bg01");
		// bg.width = 620;
		// bg.height = 230;
		// bg.setPosition(0, 0);
		// this.addChild(bg);
        let bgName = "";
        let rewardVoList = GameData.formatRewardItem(boxItemCfg.getReward);

        if(boxItemCfg.backGround == 0){
            bgName = "acrechargeboxspview_rewardbg0";
        } else {
            if(rewardVoList[0].type == 6){
                bgName = "acrechargeboxspview_rewardbg1";
            } else {
                bgName = "acrechargeboxspview_rewardbg2";
            }
        }

        let bg = BaseBitmap.create(bgName);
		bg.width = 624;
		bg.height = 276;
		bg.x = this.width / 2 - bg.width/2;
        bg.y = 0;
        this._bg = bg;
		this.addChild(bg);





        let titleText = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupTitle-"+boxItemCfg.id +"_"+ this._code),22,TextFieldConst.COLOR_BROWN);
        titleText.x = bg.x + 195 - titleText.width/2;
        titleText.y = bg.y + 62 - titleText.height/2;
        this.addChild(titleText);

            //500  40
        let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc-"+this._boxItemCfg.id + "_"+this._code),18,TextFieldConst.COLOR_WARN_GREEN);//0x20eb37);
        // desc1.width = 126;
        desc1.textAlign = egret.HorizontalAlign.CENTER;
        // desc1.x = bg.x + 507 - desc1.width/2;
        // desc1.y = bg.y +48 - desc1.height/2;

        desc1.x = bg.x + 200 - desc1.width/2;
        desc1.y = bg.y + 215 - desc1.height/2 - 8;

		this.addChild(desc1);

		
        // 507 123
        if(rewardVoList[0].type == 6){
            let rewardDB = GameData.getItemIcon(rewardVoList[0],true,false);
            rewardDB.x = bg.x + 507 - rewardDB.width/2;
            rewardDB.y = bg.y + 135 - rewardDB.height/2;
            let b = rewardDB.getChildByName("iconBg");
            if(b){
                b.alpha = 0;
            }
            let numLb = rewardDB.getChildByName("numLb");
            numLb.x = 80;
            numLb.y = 80;
            this.addChild(rewardDB);

            let anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim",10,70);
            anim.x = rewardDB.x + rewardDB.width/2 - 190/2;
            anim.y = rewardDB.y + rewardDB.height/2 - 190/2;
            anim.blendMode = egret.BlendMode.ADD; 
            
            this.addChild(anim);
            anim.playWithTime(-1);
            
            if(rewardVoList[0].id == 1962){
                let lockbg = BaseBitmap.create("public_lockbg");
                lockbg.width = 175;
                lockbg.height = 25;
                lockbg.x = this.width - 230 - 12 + 230/2 - lockbg.width/2;
                lockbg.y = bg.y + 175;
                this.addChild(lockbg);
                let wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVoList[0].id);
                let txt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPRewardTxt3"),18,TextFieldConst.COLOR_WHITE);
                txt.x = lockbg.x + lockbg.width/2 - txt.width/2;
                txt.y = lockbg.y + lockbg.height/2 - txt.height/2;
                this.addChild(txt);
            } else if(rewardVoList[0].id == 1963){
                let lockbg = BaseBitmap.create("public_lockbg");
                lockbg.width = 175;
                lockbg.height = 25;
                lockbg.x = this.width - 230 - 12 + 230/2 - lockbg.width/2;
                lockbg.y = bg.y + 175;
                this.addChild(lockbg);
                let wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVoList[0].id);
                let txt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPRewardTxt4"),18,TextFieldConst.COLOR_WHITE);
                txt.x = lockbg.x + lockbg.width/2 - txt.width/2;
                txt.y = lockbg.y + lockbg.height/2 - txt.height/2;
                this.addChild(txt);
            } 




        } else if(rewardVoList[0].type == 10){
            //红颜
            //w250  h276
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 250 -20;
            mask.height = 276-15;
            mask.x = this.width - mask.width-10-2;
            mask.y = 10;
            this.addChild(mask);

            let scaleNum = 0.33;
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+ rewardVoList[0].id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum + 17;
            wifeBM.mask = mask;
            this.addChild(wifeBM);
            // desc1.visible = false;

            let lockbg = BaseBitmap.create("public_lockbg");
    
            this.addChild(lockbg);
            let wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVoList[0].id);
            let txt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPRewardTxt2",[String(wifeCfg.glamour)]),18,TextFieldConst.COLOR_WHITE);


            lockbg.width = 175;
            lockbg.height = txt.height + 7;
            // lockbg.height = 25;
            lockbg.x = mask.x + mask.width/2 - lockbg.width/2;
            lockbg.y = bg.y + 175 + 25 - lockbg.height;

            txt.x = lockbg.x + lockbg.width/2 - txt.width/2;
            txt.y = lockbg.y + lockbg.height/2 - txt.height/2;


            this.addChild(txt);

        } else if(rewardVoList[0].type == 8){
            //门客
            //w250  h276
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 250 -20;
            mask.height = 276-15;
            mask.x = this.width - mask.width-10-2;
            mask.y = 10;
            this.addChild(mask);

            let scaleNum = 0.55;
            let wifeBM =  BaseLoadBitmap.create("servant_full_"+ rewardVoList[0].id);//1058
            // let wifeBM =  BaseLoadBitmap.create("servant_full_1058");
            wifeBM.width = 640;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            wifeBM.mask = mask;
            this.addChild(wifeBM);
            // desc1.visible = false;

            let lockbg = BaseBitmap.create("public_lockbg");
            // lockbg.width = 175;
            // lockbg.height = 25;
            // lockbg.x = mask.x + mask.width/2 - lockbg.width/2;
            // lockbg.y = bg.y + 175;
            this.addChild(lockbg);
            let servantCfg = Config.ServantCfg.getServantItemById(rewardVoList[0].id);
            let starNum = Config.ServantCfg.getServantItemById(rewardVoList[0].id).getStarNums();
            let txt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPRewardTxt1",[String(starNum)]),18,TextFieldConst.COLOR_WHITE);
            lockbg.width = 175;
            lockbg.height = txt.height + 7;
            // lockbg.height = 25;
            lockbg.x = mask.x + mask.width/2 - lockbg.width/2;
            lockbg.y = bg.y + 175 + 25 - lockbg.height;

            txt.x = lockbg.x + lockbg.width/2 - txt.width/2;
            txt.y = lockbg.y + lockbg.height/2 - txt.height/2;
            this.addChild(txt);

        }
		


		for(let i = 1;i<rewardVoList.length;i++)
		{

			let rewardDB = GameData.getItemIcon(rewardVoList[i],true,true);
			rewardDB.setScale(0.7);
            rewardDB.x = bg.x + 15 + (rewardDB.width * rewardDB.scaleX + 10) * (i - 1);
            rewardDB.y = bg.y + 95;
			this.addChild(rewardDB);

		}






        //195 223
        this._desc1 = desc1;
		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2",["0"]),18,TextFieldConst.COLOR_BROWN);
		// desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 8);
        desc2.x = bg.x + 200 - desc2.width/2;
        desc2.y = bg.y + 233 - desc2.height/2;
       
		this.addChild(desc2);
		this._desc2 = desc2;

        //511 225
        if(PlatformManager.checkIsViSp()){
            this._rechargeBtn = ComponentManager.getButton("acrechargeboxspview_bluebtn","acRechargeBoxSPPopupViewGoRecharge",this.rechargeClick,this,null,null,18);
        } else {
            this._rechargeBtn = ComponentManager.getButton("acrechargeboxspview_bluebtn","acRechargeBoxSPPopupViewGoRecharge",this.rechargeClick,this);
        }
		
		// this._rechargeBtn.setPosition(rewardbg.x + rewardbg.width - this._rechargeBtn.width,desc1.y);
        this._rechargeBtn.x = bg.x + 511 - this._rechargeBtn.width/2 - 5;
        this._rechargeBtn.y = bg.y + 240 - this._rechargeBtn.height/2
        this._rechargeBtn.setColor(TextFieldConst.COLOR_BTN_BLUE);
       
		this.addChild(this._rechargeBtn);

		this._receiveBtn =  ComponentManager.getButton("acrechargeboxspview_yellowbtn","acRechargeBoxSPPopupViewReceiveReward",this.receiveClick,this);
        this._receiveBtn.x = bg.x + 511 - this._receiveBtn.width/2 - 5;
        this._receiveBtn.y = bg.y + 240 - this._receiveBtn.height/2;
        this._receiveBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);
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
                    this._desc2.x = this._bg.x + 198 - this._desc2.width/2;
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
                     this._desc2.x = this._bg.x + 198 - this._desc2.width/2;
                }
                break;
            case 2: //2->领取 
                this._rechargeBtn.visible = false;

                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(true);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceive");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc5");
                // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                 this._desc2.x = this._bg.x + 195 - this._desc2.width/2;
                break;
            case 3: //3->已领取
                this._rechargeBtn.visible = false;

                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(false);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceived");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc6");
                // this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                this._desc2.x = this._bg.x + 198 - this._desc2.width/2;    
                break;
        }	
	}

	/**
	 * 前往充值按钮
	 */
	private rechargeClick()
	{
        if(""+this._code == "5"){
			App.CommonUtil.showTip(LanguageManager.getlocal("acRechargeBoxSP_rechargetip-code5"));
            return;
		}
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
            ViewController.getInstance().openView(ViewConst.BASE.ACRECHARGEBOXSPAVGVIEW,{

                idx : 1,
                buidId : "first",
                aid : this._aid,
                code : this._code,
                f:this.receiveClickCallback,
                o:this
            });
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

		super.dispose();
	}
}
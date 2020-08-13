/*
author : jiang
date : 2018.7.5
desc : 福袋
*/
class AcLuckBagView extends AcCommonView{
    public constructor(){
        super();
    }

    private _loopContainer:BaseDisplayObjectContainer = null;
    private _timerText = null;
    private _lastPosX = 0;
    //可抽奖次数
    private _remainderText: BaseTextField = null;

    private _bottomBg: BaseBitmap = null;
    private _curRewardBoxId = 0;
    private _isPlayAnim = false;
    private _lastDropIndex = -1;
    private _progress = null;

    private _totalTitle: BaseTextField = null;
    private _totalText: BaseTextField = null;
    private _descText1: BaseTextField = null;
    private _descText2: BaseTextField = null;

    private _bagList = null;

    public static AID = null;
    public static CODE = null;


    private get cfg() : Config.AcCfg.LuckBagCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLuckBagVo{
        return <AcLuckBagVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initView(){
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHBAG,this.refreshBag,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGLOTTERY),this.buyBtnHandlerCaller,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGREWARD),this.rewardBoxClickhandlerCallBack,this);

        AcLuckBagView.AID = this.aid;
        AcLuckBagView.CODE = this.code;
        let cfgObj : Config.AcCfg.LuckBagCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        
		let showItem = cfgObj.lotteryPool;
       

        let bg = BaseBitmap.create("acluckbagview_bei");
        bg.x = 0;
        bg.y = 70 + 52 + 90;
        this.addChild(bg);
        this.createBags();

        this._bottomBg = BaseBitmap.create("public_bottombg1");
        this._bottomBg.height = 112;
        
        this._bottomBg.y = GameConfig.stageHeigth - 69 - this._bottomBg.height;
        this.addChild(this._bottomBg);


        //边框
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 69;
		borderBg.y = 69;
		this.addChild(borderBg);

        let timeBg = BaseBitmap.create("dinner_finish_dt01");
        timeBg.width = GameConfig.stageWidth;
        timeBg.height = 52;
		timeBg.x = GameConfig.stageWidth/2 - timeBg.width/2;
		timeBg.y = 70;
		this.addChild(timeBg);

        let shadow = BaseBitmap.create("commonview_titlebgshadow");
		shadow.width = GameConfig.stageWidth;
		shadow.height = 8;
        shadow.x = 0;
        shadow.y = 69;
		this.addChild(shadow);


        let stTxt = App.DateUtil.getFormatBySecond(this.vo.st, 9);
		let etTxt = App.DateUtil.getFormatBySecond(this.vo.et, 9);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTime",[stTxt,etTxt]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
		this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);



        let loopBg = BaseBitmap.create("public_v_bg01");
        loopBg.height = 90;
        loopBg.x = 0;
        loopBg.y = timeBg.y + timeBg.height;
        this.addChild(loopBg);




        this._loopContainer = new BaseDisplayObjectContainer(); 
        this.addChild(this._loopContainer);

        this._loopContainer.width = GameConfig.stageWidth;
        this._loopContainer.height = 100;
        this._loopContainer.x = 0;
        this._loopContainer.y = loopBg.y + loopBg.height/2 - this._loopContainer.height/2;


        let rewardStr = "";
        for (let i = 0; i < showItem.length; i++){
            if (i == showItem.length -1){
                rewardStr += showItem[i][0];
            } else {
                rewardStr += showItem[i][0]+"|";
            }
        
        }


        let rewardArr =  GameData.formatRewardItem(rewardStr);
        let iconItem = null;
        let itemSpace = 10;
        let baseScale = 0.7;
        let itemWidth = 106;
        
        let perTime = 2000;
        let perSpeed = (itemSpace + itemWidth * baseScale)/perTime;
     
        this._lastPosX = itemSpace + (rewardArr.length - 1) * (itemWidth* baseScale + itemSpace);
        


        for (let index = 0; index < rewardArr.length; index++){
            iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(baseScale);
            iconItem.x = itemSpace + index * (itemWidth * baseScale + itemSpace);
            iconItem.y = this._loopContainer.height/2 - iconItem.height * baseScale / 2;
            this._loopContainer.addChild(iconItem);
   
            egret.Tween.get(iconItem,{loop:true})
            .to({x: - itemWidth * baseScale}, (index + 1) * perTime)
            .set({x: this._lastPosX}, iconItem)
            .to({x: iconItem.x }, 
                (this._lastPosX - iconItem.x) / perSpeed
                )
                // (rewardArr.length - index) * perTime - itemSpace * perTime / (itemSpace + iconItem.width * baseScale));

        }
        this._totalTitle = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTotalText"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._totalTitle.x = 20;
        this._totalTitle.y = loopBg.y + loopBg.height + 20;
        this.addChild(this._totalTitle);


        this._totalText = ComponentManager.getTextField((this.vo.totalCount.toString()),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._totalText.x = this._totalTitle.x + this._totalTitle.width/2 - this._totalText.width/2;
        this._totalText.y = this._totalTitle.y + this._totalTitle.height + 5;
        this.addChild(this._totalText);

        //进度条
        
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",377);
		this._progress.x = 170;
        this._progress.y = loopBg.y + loopBg.height + 60 ;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

        //初始化宝箱
		let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);


        let startX = this._progress.x;
        let perWidth = this._progress.width/4;
       
		
		let progressBg =  BaseBitmap.create("dailytask_dt_03");
        let progressBgY = this._progress.y + this._progress.height/2 - progressBg.height/2;
		progressBg.x = startX - progressBg.width/2;
		progressBg.y = progressBgY;
		this.addChild(progressBg);

        let numTxt =  ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        numTxt.x = progressBg.x + progressBg.width/2 - numTxt.width/2;
        numTxt.y = progressBg.y + progressBg.height/2 - numTxt.height/2;
        this.addChild(numTxt);

		for (let index = 0; index < rewardList.length; index++) {
			let tmprcfg = rewardList[index];
			// let perY = startY - (index+1) * perHeight;
            progressBg = BaseBitmap.create("dailytask_dt_03");
            progressBg.x = startX + (index + 1) * perWidth - progressBg.width/2;
            progressBg.y = progressBgY
            this.addChild(progressBg);


			let rStatus = this.getBoxStatusById(rkeys[index]);
			let imgres = "dailytask_box1_";
			if (index > 1){
				imgres = "dailytask_box2_";
			}
			let boxImg = BaseBitmap.create(imgres + String(rStatus));
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+rkeys[index];
			boxImg.x = progressBg.x + progressBg.width/2;
			boxImg.y = progressBgY - 23;
			
			let lightImg =  BaseBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 40;
			lightImg.anchorOffsetY = 40;
		
			lightImg.name = "lightImg"+rkeys[index]
            lightImg.x = boxImg.x;
			lightImg.y = boxImg.y;
			lightImg.visible = false;
			this.addChild(lightImg);
			this.addChild(boxImg);

            boxImg.addTouchTap(this.rewardBoxClickhandler,this,[rkeys[index]]);
            let rewardCfg = this.cfg.getBoxRewardById(Number(rkeys[index]));
            let need = rewardCfg.needNum;
			numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = progressBg.x + progressBg.width/2 - numTxt.width/2;
			numTxt.y = progressBg.y + progressBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}

        this._descText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewDesc1",[this.cfg.needGem.toString()]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._descText1.x = GameConfig.stageWidth/2 - this._descText1.width/2;
        this._descText1.y = this._progress.y + 50;
        this.addChild(this._descText1);

        this._descText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewDesc2",[this.cfg.needPoint.toString()]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._descText2.x = GameConfig.stageWidth/2 - this._descText2.width/2;
        this._descText2.y = this._descText1.y + 30;
        this.addChild(this._descText2);




        this._remainderText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewRemainder",[this.vo.remainderCount.toString()]),26,TextFieldConst.COLOR_WHITE);
        this._remainderText.x = this._bottomBg.width/2 - this._remainderText.width/2
        this._remainderText.y = this._bottomBg.y + 30;
        this.addChild(this._remainderText);


        //抽一次按钮
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"acLuckBagViewOnceBtnText",this.buyBtnHandler,this,[1]);
        onceBtn.x = this._bottomBg.x + 60;
        onceBtn.y = this._bottomBg.y + 90;
        this.addChild(onceBtn);

        // let onceBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewOnceBtnText"),26,TextFieldConst.COLOR_BTN_BLUE);
        // onceBtnText.x = onceBtn.width/2-onceBtnText.width/2;
        // onceBtnText.y = onceBtn.height/2-onceBtnText.height/2;
        // onceBtn.addChild(onceBtnText);

        //抽十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acLuckBagViewTenBtnText",this.buyBtnHandler,this,[10]);
        tenBtn.x = this._bottomBg.x + this._bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;
        this.addChild(tenBtn);

        // let tenBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTenBtnText"),26,TextFieldConst.COLOR_BTN_YELLOW);
        // tenBtnText.x = tenBtn.width/2-tenBtnText.width/2;
        // tenBtnText.y = tenBtn.height/2-tenBtnText.height/2;
        // tenBtn.addChild(tenBtnText);



        this.refreshProfress();

        this.updateStatus();
    }

    private createBags()
    {   //90,410   180,420  270,440  350,435  435,415  560,433
        this._bagList = [
            {x: 90, y: 410, bagItem:null, bag:null, line:null},
            {x: 180, y: 420, bagItem:null, bag:null, line:null},
            {x: 270, y:440, bagItem:null, bag:null, line:null},
            {x: 350, y:435, bagItem:null, bag:null, line:null},
            {x: 435, y: 415, bagItem:null, bag:null, line:null},
            {x: 560, y: 433, bagItem:null, bag:null, line:null}];

        let bagItem = null;
        let line = null;
        let bag = null;
        // this._bagList = {};
        for(let i = 0; i < this._bagList.length; i ++){

            bagItem = new BaseDisplayObjectContainer();
            

            line = BaseBitmap.create("acluckbagview_sheng");
            line.height = 80 + Math.floor((Math.random() * 150));

            bagItem.width = line.width;
            bagItem.height = line.height;
            line.x = 0;
            line.y = 0;
            bagItem.addChild(line);

            bagItem.anchorOffsetX = bagItem.width/2;
            bagItem.anchorOffsetY = 0;
            bagItem.x = this._bagList[i].x;
            bagItem.y = this._bagList[i].y;
            this.addChild(bagItem);

            bag = BaseBitmap.create("acluckbagview_dai");
            bag.anchorOffsetX = bag.width/2 - 10;
            bag.anchorOffsetY = bag.height/2;
            bag.x = line.x + line.width/2;
            bag.y = line.y + line.height + bag.height/2 - 5;
            bagItem.addChild(bag);
            this._bagList[i].bagItem = bagItem;
            this._bagList[i].bag = bag;
            this._bagList[i].line = line;
            let randomT = 800 + Math.floor(Math.random()*1000);
            let randomR = 1.5 + Math.random();
            egret.Tween.get(bagItem,{loop:true})
            .to({rotation:randomR},randomT,egret.Ease.quadOut)
            .to({rotation:-randomR},randomT*2,egret.Ease.quadInOut)
            .to({rotation:0},randomT,egret.Ease.quadIn);

        }



    }
    //宝箱奖励领取回调
	protected rewardBoxClickhandlerCallBack(event:egret.Event)
	{
        let data = event.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if(Number(this._curRewardBoxId) == 3){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        }
        
		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
		
		let boxImg = this.getChildByName("boxImg" + this._curRewardBoxId);
		let pos = boxImg.localToGlobal(boxImg.width/2,50);
        App.CommonUtil.playRewardFlyAction(rList,pos);
		this.refreshProfress();
	}
    //判断宝箱状态 1未完成 2可领取 3已经领取
    protected getBoxStatusById(boxIndex)
	{
        let cfg = this.cfg;
        let vo = this.vo;
		let rStatus = 1;
        if(vo.isCollected(Number(boxIndex)+1)){
            rStatus = 3;
        } else {
            let boxCfg = cfg.getBoxRewardById(Number(boxIndex));
            if (boxCfg.needNum <= vo.totalCount){
                rStatus = 2;
            }
        }

		return rStatus;
	}

        //奖励宝箱点击
    protected rewardBoxClickhandler(obj:any,param:any)
	{
        

        let boxRewardId = param;
		let status = this.getBoxStatusById(boxRewardId);
		/**
		 *  1未完成 2可领取 3已领取
		 */
		if (status == 2)
		{
			this._curRewardBoxId = boxRewardId;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGREWARD,{activeId : this.aid+"-"+this.code,index : Number(boxRewardId) + 1});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGBOXREWARDPOPUPVIEW,{'type' : this.aid,'id' : boxRewardId});
		}
    }
        //处理进度条进度值
	private getProgressPercent():number{
        // return 0.5;
        let curTurn = this.vo.totalCount;
		let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);
		if (curTurn == 0)
			return 0;
		if (curTurn >= rewardList[String(rkeys.length - 1)].needNum)
			return 100;

		let perV = 1 / rkeys.length;
		for (var index = 0; index < rkeys.length; index++) {
			if(curTurn <= rewardList[String(index)].needNum)
			{
				let result = perV * index;
				let tmpV1 = 0;
				if(index > 0)
				{
					tmpV1 = rewardList[String(index - 1)].needNum;
				}
				let tmpV2 = rewardList[String(index)].needNum;
				result += (curTurn-tmpV1) / (tmpV2 - tmpV1) * perV;
				return result;
			}
		}
    }
    //购买按钮点击
    private buyBtnHandler(num : number):void{
        if(this._isPlayAnim){
            return;
        }
        if(this.vo.et - GameData.serverTime <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }

        if (num > this.vo.remainderCount){
            // App.CommonUtil.showTip(LanguageManager.getlocal("acLuckBagLess1"));
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGJUMPPOPUPVIEW,{aid:this.aid,code:this.code,callback:this.hide,target:this});

            return;
        }

        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGLOTTERY,{activeId : this.aid+"-"+this.code, stype : num == 1 ? 1 : 2});
     
    }
    //奖励回调 调用动画
    private buyBtnHandlerCaller(event):void{
        let data = event.data.data.data;

       
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if(event.data.data.ret == -3){
            App.CommonUtil.showTip(LanguageManager.getlocal("acLuckBagLess1"));
            return;
        }
        
     
        this.refreshProfress();
        
        let rewards : string = data.rewards || '';
        let reward_arr = rewards.split('|');
    
        if(reward_arr.length < 2){
            //播放福袋掉落动画
            this._isPlayAnim = true;
            
            // this._bagList {x: 90, y: 410, bagItem:null, bag:null},
            let dropIndex = Math.floor(this._bagList.length * Math.random());
            this._lastDropIndex = dropIndex;
            let bagCfg = this._bagList[dropIndex];
            egret.Tween.removeTweens(bagCfg.bagItem);
            egret.Tween.get(bagCfg.bagItem).to({rotation:0},100);
            egret.Tween.get(bagCfg.bag).wait(100)
            .to({rotation:10},50)
            .to({rotation:-8},100)
            .to({rotation:6},100)
            .to({rotation:-4},100)
            .to({rotation:2},100)
            .to({rotation:0},50)
            .wait(100)
            .to({y:bagCfg.bag.y+1000},500,egret.Ease.sineIn)
            .call(()=>{
                this._isPlayAnim = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGREWARDPOPUPVIEW, rewards);
            });
        }
        else{
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGREWARDPOPUPVIEW, rewards);
        }
    }
    //关闭奖励弹出框刷新福袋
    private refreshBag(): void{
        
        if (this._lastDropIndex == -1){
            return;
        }

        let bagCfg = this._bagList[this._lastDropIndex]
        egret.Tween.removeTweens(bagCfg.bagItem);
        egret.Tween.removeTweens(bagCfg.bag);
                    

        bagCfg.bag.x = bagCfg.line.x + bagCfg.line.width/2;
        bagCfg.bag.y = bagCfg.line.y + bagCfg.line.height + bagCfg.bag.height/2 - 5;

        
        let randomT = 800 + Math.floor(Math.random()*1000);
        let randomR = 1.5 + Math.random();
        egret.Tween.get(bagCfg.bagItem,{loop:true})
        .to({rotation:randomR},randomT,egret.Ease.quadOut)
        .to({rotation:-randomR},randomT*2,egret.Ease.quadInOut)
        .to({rotation:0},randomT,egret.Ease.quadIn);
        this._lastDropIndex = -1;

    }


    //每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress() : void
	{	
	
        
        let newPro =  this.getProgressPercent();
		let oldPro = this._progress.getPercent();
		egret.Tween.get(this._progress,{loop:false}).to({percent:newPro},(newPro-oldPro)*5000);
		let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);
		for (var index = 0; index < rkeys.length; index++) {
			let tmpK = String(rkeys[index]);
			let boxImg = this.getChildByName("boxImg"+tmpK);
			let lightImg =  this.getChildByName("lightImg"+ tmpK);

			let rStatus = this.getBoxStatusById(tmpK);
			let imgres = "dailytask_box1_";
			if (index >1){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
	}

    

    public hide():void 
    {
    
        if(!this._isPlayAnim){
            super.hide();
        }
        
        

    }

    
    protected getTitleButtomY():number
	{
		return 148;
	}
	protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    protected getRuleInfo():string
	{
		return super.getRuleInfo();
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "itemeffect",
            "dailytask_box1_1","dailytask_box1_2","dailytask_box1_3",
            "dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",
            "dailytask_box_light",
            "dailytask_dt_02",
            "dailytask_dt_01",
            "dailytask_dt_03",
            "dinner_finish_dt01",
            "commonview_titlebgshadow",
            "acluckbagview_bei",
            "acluckbagview_dai",
            "acluckbagview_sheng"
        ]);
    } 


    private updateStatus(): void{
        this._totalText.text = this.vo.totalCount.toString();
        this._totalText.x = this._totalTitle.x + this._totalTitle.width/2 - this._totalText.width/2;
        
        this._remainderText.text = LanguageManager.getlocal("acLuckBagViewRemainder",[this.vo.remainderCount.toString()]);
        this._remainderText.x = this._bottomBg.width/2 - this._remainderText.width/2
    }
    
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHVO,this.updateStatus,this); 


        this._loopContainer = null;
        this._timerText = null;
        this._remainderText = null;

        this._bottomBg = null;
        this._curRewardBoxId = 0;
        this._isPlayAnim = false;
        this._lastDropIndex = -1;
        this._progress = null;
  
        this._totalTitle = null;
        this._totalText = null;
        this._descText1 = null;
        this._descText2 = null;
        this._bagList = null;
        AcLuckBagView.AID = null;
        AcLuckBagView.CODE = null;
        super.dispose();
    }
}
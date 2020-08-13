/**
 * 充值转盘
 * @author 赵占涛
 */
class AcMayDayRechargeViewTab1 extends CommonViewTab
{
    // public _isCircleRun: boolean = false;

    //圆盘
    private _scrollList:ScrollList = null;

    private _circleGroup : BaseDisplayObjectContainer = null;
    //底部进度条
    private _progress : ProgressBar = null;

    private _timerText = null;
    private _curnturnText: BaseTextField = null;

    //转盘
    private _turnTable : BaseBitmap = null;

    //向上的指针
    private _upArrow : BaseBitmap = null;
    //转到奖励的光
    // private _selectLight: BaseBitmap = null;

    private _turnGroup: BaseDisplayObjectContainer = null;

	private _findNumTF:BaseTextField = null;
    
	public constructor() 
	{
		super();
		this.initView();
    }

    private get cfg() : Config.AcCfg.MayDayRechargeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
    }

    private get vo() : AcMayDayRechargeVo{
        return <AcMayDayRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
    }

    private get acTivityId() : string{
        return `${AcMayDayRechargeView.AID}-${AcMayDayRechargeView.CODE}`;
    }
    
	protected initView():void
	{ 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY),this.buyBtnHandlerCaller,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESHTURNTABLE,this.fresh_table,this);
        
        


		let timeBg = BaseBitmap.create("acnewyear_middlebg");
		timeBg.x = GameConfig.stageWidth/2 - timeBg.width/2;
		timeBg.y = 0;
		this.addChild(timeBg);

        let vo = this.vo;
        let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
		let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
		this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);
        //大背景图
        let bg = BaseLoadBitmap.create("acturntable_beijingtu");
        bg.width = 624;
        bg.height = 914;
        bg.x = GameConfig.stageWidth/2 - bg.width/2;
        bg.y = timeBg.y + timeBg.height;
        this.addChild(bg);

        //适配值
        let adaptiveVal = GameConfig.stageHeigth / 960;
        
        //进度条
        
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",377);
		this._progress.x = bg.x + 170;
        this._progress.y = bg.y + 60 + (adaptiveVal>1 ? (adaptiveVal-1) * 100 : 0);
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

        // 当前总次数
        let numTotalBg = BaseBitmap.create("common_numbg");
        numTotalBg.setPosition(30,this._progress.y + this._progress.height - numTotalBg.height + 5);
        this.addChild(numTotalBg);

        let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF.setPosition(numTotalBg.x + numTotalBg.width / 2 - numTF.width / 2,numTotalBg.y + 52 - numTF.height/2);
        this.addChild(numTF);

        this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._findNumTF.width = 50;
        this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._findNumTF.setPosition(numTotalBg.x + numTotalBg.width / 2 - this._findNumTF.width / 2,numTotalBg.y + 20 - this._findNumTF.height/2);
        this.addChild(this._findNumTF);

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
            let rewardCfg = this.cfg.getBoxRewardById(rkeys[index]);
            let need = rewardCfg.needNum;
			numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = progressBg.x + progressBg.width/2 - numTxt.width/2;
			numTxt.y = progressBg.y + progressBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}


        //bottomBg
        let bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 120 + (adaptiveVal>1 ? (adaptiveVal-1) * 100 : 0);
        
        bottomBg.y = GameConfig.stageHeigth - 69 - 94 - bottomBg.height;
        

        //当前次数
        let numBg = BaseBitmap.create("prisonview_1");
        numBg.x = GameConfig.stageWidth/2 - numBg.width/2;
        numBg.y = bottomBg.y - numBg.height +15;

        //转盘父节点
        this._circleGroup = new BaseDisplayObjectContainer();
        this._circleGroup.width = GameConfig.stageWidth;
        this._circleGroup.height = 550;
        this._circleGroup.x = 0;
        this._circleGroup.y = this._progress.y + 15 + (numBg.y - this._progress.y + 15)/2 - this._circleGroup.height/2;
        this.addChild(this._circleGroup);


        this.addChild(numBg);
        this.addChild(bottomBg);

        this._curnturnText = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayRechargeCurnNum',[this.vo.lotterynum.toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curnturnText.x = GameConfig.stageWidth / 2 - this._curnturnText.width / 2
        this._curnturnText.y = numBg.y + numBg.height / 2 - this._curnturnText.height / 2;
     
        this.addChild(this._curnturnText);



        //背景图片
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 69 - 94 + 15;
		borderBg.y = 0;
		this.addChild(borderBg);

        //bottom里面的组件
        
        //按钮上物品显示
        // let itemCfg = GameData.getRewardItemVoByIdAndType(1,1001);
        //购买区域
        let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(this.cfg.getReward);
        //转动一次按钮
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"acMayDayRecharge_lottery1",this.buyBtnHandler,this,[1]);
        //转动十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acMayDayRecharge_lottery10",this.buyBtnHandler,this,[10]);

        //抽十次的描述文字
        let tofacebookgetnum = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayRecharge_tofacebookgetnum"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tofacebookgetnum.x = bottomBg.width/2 - tofacebookgetnum.width/2;
        tofacebookgetnum.y = bottomBg.y + 20;


        //设置位置
        onceBtn.x = bottomBg.x + 60;
        onceBtn.y = tofacebookgetnum.y + tofacebookgetnum.height + 5;        
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;

        this.addChild(onceBtn);
        this.addChild(tenBtn);
        this.addChild(tofacebookgetnum);

        this.refreshProfress();

        //转盘


        let circleBg = BaseBitmap.create("acturntable_bg2");
        circleBg.x = this._circleGroup.width/2 - circleBg.width/2;
        circleBg.y = this._circleGroup.height/2 - circleBg.height/2;
        this._circleGroup.addChild(circleBg);

        //转盘
        this._turnTable = BaseBitmap.create("acturntable_bg");
        this._turnTable.anchorOffsetX = this._turnTable.width/2;
        this._turnTable.anchorOffsetY = this._turnTable.height/2;


        this._turnGroup = new BaseDisplayObjectContainer();
        this._turnGroup.width = this._turnTable.width;
        this._turnGroup.height = this._turnTable.height;
        this._turnGroup.anchorOffsetX = this._turnGroup.width/2;
        this._turnGroup.anchorOffsetY = this._turnGroup.height/2;

        this._turnTable.x = this._turnGroup.width/2;
        this._turnTable.y = this._turnGroup.height/2;

        this._turnGroup.x = this._circleGroup.width/2;
        this._turnGroup.y = this._circleGroup.height/2;

        this._turnGroup.addChild(this._turnTable);

        this._circleGroup.addChild(this._turnGroup);


        // this._selectLight = BaseBitmap.create("acturntable_on");
        // this._selectLight.anchorOffsetX = this._selectLight.width/2;
        // this._selectLight.anchorOffsetY = this._selectLight.height;
        // this._selectLight.x = this._circleGroup.width/2;
        // this._selectLight.y = this._circleGroup.height/2 -3;
        // this._selectLight.visible = false;
        // this._circleGroup.addChild(this._selectLight);



        let midCircle = BaseBitmap.create("acturntable_pointcircle");
        midCircle.x = this._circleGroup.width/2 - midCircle.width/2;
        midCircle.y = this._circleGroup.height/2 - midCircle.height/2;
        this._circleGroup.addChild(midCircle);

        this._upArrow = BaseBitmap.create("acturntable_point");
        this._upArrow.anchorOffsetX = this._upArrow.width/2;
        this._upArrow.anchorOffsetY = 120;
        this._upArrow.x = this._circleGroup.width/2;
        this._upArrow.y = this._circleGroup.height/2;
        this._circleGroup.addChild(this._upArrow);



        let cfg = this.cfg;
        let total = cfg.lotteryPool.length;
        let rad = Math.PI / 180;
        let radius = this._turnGroup.height / 1.7;
        let rewardTab = [];
        for (var key in cfg.lotteryPool) {
            rewardTab.push(cfg.lotteryPool[key][0]);
        }
        let centerX = this._turnGroup.width / 2;
        let centerY = this._turnGroup.height/2;
        let rIcons = GameData.getRewardItemIcons(rewardTab.join("|"),true,false);
        for(let i = 0; i < total; ++ i){
            //计算角度
            let angle = 360 / total * rad * i;

            //加物品icon
            let itemicon = rIcons[i];
            itemicon.setScale(0.6);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            let itemX = (radius + 30) * Math.sin(angle + 360 / total * rad / 2) / 2;
            let itemY = (radius + 30) * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.x = centerX - itemX;// + (itemX > 0 ? -1 : 1) * itemicon.width * Math.sin(angle + 360 / total * rad / 2) / 2;
            itemicon.y = centerY - itemY;// + (itemY > 0 ? -1 : 1) * itemicon.height * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.name = `item${i}`;
            this._turnGroup.addChild(itemicon);
        }
        


        // /转盘
        // this._turnTable = null;
        // //中间的圆圈
        // this._midCircle = null;
        // //向上的指针
        // this._upArrow = null;
        // //转到奖励的光
        // this._selectLight = null;


    }

    private _curRewardBoxId : string = '';

    //奖励宝箱点击
    protected rewardBoxClickhandler(obj:any,param:any)
	{
        if(AcMayDayRechargeView._isCircleRun){
            return;
        }
        let boxRewardId = param;
		let status = this.getBoxStatusById(boxRewardId);
		/**
		 *  1未完成 2可领取 3已领取
		 */
		if (status == 2)
		{
			this._curRewardBoxId = boxRewardId;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA,{activeId : this.acTivityId,lotteryId : Number(boxRewardId) + 1});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayRechargeView.AID,'id' : boxRewardId});
		}
    }

    //判断宝箱状态 1未完成 2可领取 3已经领取
    protected getBoxStatusById(boxId)
	{
        let cfg = this.cfg;
        let vo = this.vo;
		let rStatus = 1;
        if (vo.isGetTurnProgress(Number(boxId) + 1))
		{
			rStatus = 3;
		}else
		{
            let tmpRew = cfg.getBoxRewardById(boxId);
            if(tmpRew.needNum <= vo.getTurnTotal()){
                rStatus = 2;
            }
		}
		return rStatus;
	}

    //处理进度条进度值
	private getProgressPercent():number{
        let curTurn = this.vo.getTurnTotal();
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
    
    //每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress() : void
	{	
        this._findNumTF.text = String(this.vo.getTurnTotal());
        this._curnturnText.text = LanguageManager.getlocal('acMayDayRechargeCurnNum',[this.vo.lotterynum.toString()]);
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
	// 页签类型
	protected getSheepType():number
	{
		return 1;
    }
    //购买按钮点击
    private buyBtnHandler(num : number):void{
        if(AcMayDayRechargeView._isCircleRun){
            return;
        }
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(this.vo.lotterynum < num ){
            App.CommonUtil.showTip(LanguageManager.getlocal('acMayDayRecharge_lotterynum_notenough'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY,{activeId : this.acTivityId, lotterynum : num });
    }
    
    //转盘点击

    private _rewardItem : number = 0;

    //转盘动画
    private buyBtnHandlerCaller(event):void{
        let data = event.data.data.data;
       
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if(event.data.data.ret < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip") + event.data.data.ret);
            return;
        }
        
        this.refreshProfress();
        
        let rewards : string = data.rewards || '';
        let reward_arr = rewards.split('|');
        


        if(reward_arr.length == 2){
            AcMayDayRechargeView._isCircleRun = true;
            reward_arr.splice(reward_arr.indexOf(this.cfg.getReward), 1);
            this._rewardItem = this.cfg.getSelectItemIdx(reward_arr[0]);
            let total = 8;
            let endRotation = 360 / 16 + 360/ 8 * this._rewardItem;


            let turnRotation = endRotation + (4 + Math.floor(Math.random() * 3)) * 360; //0<=n<1   3 ,4 ,5
            let turnTime = 5000 + Math.floor(Math.random() * 2000);
            let view = this;

            // egret.Tween.get(this._upArrow,{loop:true,onChange:()=>{
            //     view._upArrow.rotation
            // }})
            // .to({rotation: 8},200);





            egret.Tween.get(this._turnGroup,{onChange:()=>{


                view._upArrow.rotation = Math.sin(view._turnGroup.rotation);

                let total = this.cfg.lotteryPool.length;
                for(let i = 0; i < total; ++ i){
                    let item = view._turnGroup.getChildByName(`item${i}`);
                    if(item){
                        item.rotation = 0 - view._turnGroup.rotation;
                    }
                }
            }})
            .to({rotation: turnRotation},turnTime,egret.Ease.quartInOut)
            .call(()=>{
                // view._selectLight.visible = true;
                view._upArrow.rotation = 0 ;
            })
            .wait(500)
            .call(()=>{
                AcMayDayRechargeView._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYRECHARGEREWARDPOPUPVIEW, rewards);
            });
        }
        else{
            ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYRECHARGEREWARDPOPUPVIEW, rewards);
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

    public refreshWhenSwitchBack(){
        let view = this;
        view.fresh_table();
    }

    private fresh_table() : void{
        let view = this;
        // view._selectLight.visible = false;
        view._turnGroup.rotation = 0;
        let total = this.cfg.lotteryPool.length;
        for(let i = 0; i < total; ++ i){
            let item = view._turnGroup.getChildByName(`item${i}`);
            if(item){
                item.rotation = 0;
            }
        }
        
    }
    



	public dispose():void
	{	 
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY),this.buyBtnHandlerCaller,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESHTURNTABLE,this.fresh_table,this);
        egret.Tween.removeTweens(view._turnGroup);
        egret.Tween.removeTweens(this._progress);
        for (var index = 0; index < 4; index++) {
			let boxImg = this.getChildByName("boxImg" + index);
            let lightImg =  this.getChildByName("lightImg"+ index);
            egret.Tween.removeTweens(boxImg);
            egret.Tween.removeTweens(lightImg);
        }

        view._turnGroup.removeTouchTap();
        view._circleGroup.removeTouchTap();
        view._circleGroup.removeChildren();
  
        view._progress = null;
  
        view._circleGroup = null;
        this._timerText = null;

        this._curnturnText = null;
        AcMayDayRechargeView._isCircleRun = false;

        //转盘
        this._turnTable = null;

        //向上的指针
        this._upArrow = null;
        //转到奖励的光
        // this._selectLight = null;

        this._turnGroup = null;

        this._findNumTF = null;
        super.dispose();
	}
}
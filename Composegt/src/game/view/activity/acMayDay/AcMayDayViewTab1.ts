/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab1 活动好礼
*/

class AcMayDayViewTab1 extends CommonViewTab
{
    // public _isCircleRun: boolean = false;

    //圆盘
    private _scrollList:ScrollList = null;

    private _circleGroup : BaseDisplayObjectContainer = null;
    //排行榜按钮
    private _rankBtn : BaseButton = null;
    //底部进度条
    private _progress : ProgressBar = null;

    private _freeText : BaseTextField = null;

    private _onceDescText: BaseTextField = null;

    private _timerText = null;
    private _curnturnText: BaseTextField = null;

    //转盘
    private _turnTable : BaseBitmap = null;

    //向上的指针
    private _upArrow : BaseBitmap = null;
    //转到奖励的光
    // private _selectLight: BaseBitmap = null;

    private _turnGroup: BaseDisplayObjectContainer = null;

    
	public constructor() 
	{
		super();
		this.initView();
    }

    private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get acTivityId() : string{
        return `${AcMayDayView.AID}-${AcMayDayView.CODE}`;
    }
    
	protected initView():void
	{ 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY),this.buyBtnHandlerCaller,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE,this.fresh_table,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.fresh_free,this);
        
        


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
        //排行榜按钮
        this._rankBtn = ComponentManager.getButton("acturntable_rankicon_2", null, this.rankClick, this);
        this._rankBtn.x = 40;
        this._rankBtn.y = bg.y + 5 + (adaptiveVal>1 ? (adaptiveVal-1) * 100 : 0);
        this.addChild(this._rankBtn);
        
        //进度条
        
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",377);
		this._progress.x = bg.x + 170;
        this._progress.y = bg.y + 60 + (adaptiveVal>1 ? (adaptiveVal-1) * 100 : 0);
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

        this._curnturnText = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayCurnNum',[this.vo.getTurnTotal().toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,null,this.buyBtnHandler,this,[1]);
        //转动一次按钮文字


        let onceBtnIcon = BaseLoadBitmap.create("itemicon1001");
        onceBtnIcon.setScale(0.5);
        onceBtnIcon.x =  40;                                            //onceBtnText.x + onceBtnText.width;
        onceBtnIcon.y = onceBtn.height/2 - 100 * onceBtnIcon.scaleY / 2;//onceBtnText.y + onceBtnText.height/2 - 100 * onceBtnIcon.scaleY / 2;
        onceBtn.addChild(onceBtnIcon);

        let onceBtnIconDescText = ComponentManager.getTextField("x1", 28,TextFieldConst.COLOR_BTN_BLUE); 
        onceBtnIconDescText.x = onceBtnIcon.x + 100 * onceBtnIcon.scaleX ;
        onceBtnIconDescText.y = onceBtn.height / 2 - onceBtnIconDescText.height / 2;//onceBtnText.y;
        onceBtn.addChild(onceBtnIconDescText);

        let onceBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),28,TextFieldConst.COLOR_BTN_BLUE);
        onceBtnText.x = onceBtnIconDescText.x + onceBtnIconDescText.width;//50;
        onceBtnText.y = onceBtn.height/2 - onceBtnText.height/2;
        onceBtn.addChild(onceBtnText);




        //转动十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,null,this.buyBtnHandler,this,[10]);

        let tenBtnIcon = BaseLoadBitmap.create("itemicon1001");
        tenBtnIcon.setScale(0.5);
        tenBtnIcon.x = 40;
        tenBtnIcon.y = tenBtn.height/2 - 100 * tenBtnIcon.scaleY / 2;//tenBtnText.y + tenBtnText.height/2 - 100 * tenBtnIcon.scaleY / 2;
        tenBtn.addChild(tenBtnIcon);


        let tenBtnIconDescText = ComponentManager.getTextField("x10", 28,TextFieldConst.COLOR_BTN_YELLOW);
        tenBtnIconDescText.x = tenBtnIcon.x + 100 * tenBtnIcon.scaleX ;
        tenBtnIconDescText.y = tenBtn.height / 2 - tenBtnIconDescText.height / 2;//tenBtnText.y;
        tenBtn.addChild(tenBtnIconDescText);

        //转动十次按钮文字
        let tenBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),28,TextFieldConst.COLOR_BTN_YELLOW);
        tenBtnText.x = tenBtnIconDescText.x + tenBtnIconDescText.width;//50;
        tenBtnText.y = tenBtn.height/2 - tenBtnText.height/2;
        tenBtn.addChild(tenBtnText);



        let discountIcon = BaseBitmap.create("acturntable_7zhe");
        discountIcon.x = 2;
        discountIcon.y = -3;
        tenBtn.addChild(discountIcon);



        //第一次免费的时候描述文字
        this._freeText = ComponentManager.getTextField(LanguageManager.getlocal("sysFreeDesc"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        //抽一次的描述文字
        this._onceDescText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnDesc",[this.cfg.cost.toString(),"1"]), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        //抽十次的描述文字
        let tenDescText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnDesc",[(this.cfg.cost * this.cfg.discount * 10).toString(),"10"]), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);


        //设置位置
        onceBtn.x = bottomBg.x + 60;
        this._freeText.x = onceBtn.x + onceBtn.width/2 - this._freeText.width/2;
        this._onceDescText.x = onceBtn.x + onceBtn.width/2 - this._onceDescText.width/2;

        this._freeText.y = bottomBg.y + bottomBg.height/2 - (this._freeText.height + 3 + onceBtn.height)/2 + 10;
        this._onceDescText.y = this._freeText.y;
        onceBtn.y = this._freeText.y + this._freeText.height + 2;

        
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;

        tenDescText.x = tenBtn.x + tenBtn.width/2 - tenDescText.width/2;
        tenDescText.y = this._freeText.y;

        this.addChild(onceBtn);
        this.addChild(tenBtn);
        this.addChild(this._freeText);
        this.addChild(this._onceDescText);
        this.addChild(tenDescText);

        this.fresh_free();
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
        if(AcMayDayView._isCircleRun){
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
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA,{activeId : this.acTivityId,lotteryId : Number(boxRewardId) + 1});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});
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

    private fresh_free() : void{
       
        if(!this.vo){
            return;
        }
        let checkIsFree = this.vo.isFree();
        this._onceDescText.visible = !checkIsFree;
        this._freeText.visible = checkIsFree;


        // let icon : any = view._nodeGroup.getChildByName('item1');
        // let text : any = view._nodeGroup.getChildByName('desc1');
        // let freetext : any = view._nodeGroup.getChildByName('freetxt');
        // icon.visible = text.visible = !view.vo.isFree();
        // freetext.visible = view.vo.isFree();
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
	
        this._curnturnText.text = LanguageManager.getlocal('acMayDayCurnNum',[this.vo.getTurnTotal().toString()]);
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
        if(AcMayDayView._isCircleRun){
            return;
        }
        if(this.vo.et - GameData.serverTime - 86400 * 1 <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }
        let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY,{activeId : this.acTivityId, isTenPlay : num == 10 ? 1 : 0});
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
        if(event.data.data.ret == -3){
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        
        this.fresh_free();
        this.refreshProfress();
        
        let rewards : string = data.rewards || '';
        let reward_arr = rewards.split('|');
        


        if(reward_arr.length == 2){
            AcMayDayView._isCircleRun = true;
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
                AcMayDayView._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, rewards);
            });






            /*
            view._isCircleRun = true;
            let total = this.cfg.lotteryPool.length;
            reward_arr.splice(reward_arr.indexOf(this.cfg.getReward), 1);
            view._rewardItem = this.cfg.getSelectItemIdx(reward_arr[0]);

            let rad = Math.PI / 180;
            let endRotation = 360 / total * view._rewardItem;
            //100ms 360度
            egret.Tween.get(view._circleGroup,{onChange:()=>{
                let total = this.cfg.lotteryPool.length;
                for(let i = 0; i < total; ++ i){
                    let item = view._circleGroup.getChildByName(`item${i}`);
                    if(item){
                        item.rotation = 0 - view._circleGroup.rotation;
                    }
                }
            }}).
            to({rotation : 9000}, 1500).
            to({rotation : 9360}, 100).
            to({rotation : 9720}, 200).
            to({rotation : 10080}, 400).
            to({rotation : 10440 - (endRotation + 360 / total / 2)}, 800).wait(500).
            call(()=>{
                view._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, rewards);
            },this);
            */
            // ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, rewards);
        }
        else{
            ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, rewards);
        }
    }

    private rankClick():void
	{
        // this._acVo.et = GameData.serverTime + 10;
        if(AcMayDayView._isCircleRun){
            return;
        }
		AcMayDayRankPopupView.aid = AcMayDayView.AID;
		AcMayDayRankPopupView.code = AcMayDayView.CODE;
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
		ViewController.getInstance().openView(ViewConst.POPUP.ACTMAYDAYRANKPOPUPVIEW,{aid:AcMayDayRankPopupView.aid,code:AcMayDayRankPopupView.code});
    }
    
    // public hide():void
	// {
	// 	if (!this._isCircleRun){
    //         super.hide();
    //     }
	// }

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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY),this.buyBtnHandlerCaller,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE,this.fresh_table,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.fresh_free,this);
        egret.Tween.removeTweens(view._turnGroup);
        egret.Tween.removeTweens(this._progress);
        for (var index = 0; index < 4; index++) {
			let boxImg = this.getChildByName("boxImg" + index);
            let lightImg =  this.getChildByName("lightImg"+ index);
            egret.Tween.removeTweens(boxImg);
            egret.Tween.removeTweens(lightImg);
        }

        view._rankBtn.removeTouchTap();
        view._rankBtn.dispose();

        view._turnGroup.removeTouchTap();
        view._circleGroup.removeTouchTap();
        view._circleGroup.removeChildren();
  
        view._rankBtn = null;
        view._progress = null;
  
        view._circleGroup = null;
        this._timerText = null;

        this._freeText = null;

        this._onceDescText = null;
        this._curnturnText = null;
        AcMayDayView._isCircleRun = false;

        //转盘
        this._turnTable = null;

        //向上的指针
        this._upArrow = null;
        //转到奖励的光
        // this._selectLight = null;

        this._turnGroup = null;
        super.dispose();
	}
}
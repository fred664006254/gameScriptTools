/**
 * 任务
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskView
 */

class DailyTaskView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList = null;
	private _progress:ProgressBar;
	private _livenessIcon:BaseBitmap;
	private _curLivenessTxt:BaseTextField;
	private _maxLivenessValue:number=0;
	private _curRewardBoxId:string;
	public constructor() {
		super();
	}
	// 背景图名称
	protected getBgName():string
	{
	
		return "commonview_woodbg";
	}
	public initView():void
	{
		if(!Api.gameinfoVoApi.checkDailyTaskStepGuideComplete())
		{
			NetManager.request(NetRequestConst.REQUEST_USER_RECORDGUILD,{key:"dailyTaskStepGuide",value:1});
			Api.rookieVoApi.curGuideKey = "dailyTask";
			Api.rookieVoApi.insertWaitingGuide({"idx":"dailyTask_1"},true);
			Api.rookieVoApi.checkWaitingGuide();
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let topBg = BaseLoadBitmap.create("dailytask_topbg");
		topBg.width = 621;
		topBg.height = 204;
		topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
		topBg.y = -14;
		this._nodeContainer.addChild(topBg);
		let scroY =  topBg.y+ topBg.height;

		let upBorder = BaseBitmap.create("commonview_border1");
		upBorder.width = 640;
		upBorder.height = topBg.height;
		upBorder.x = 0;
		upBorder.y = topBg.y ;
		this._nodeContainer.addChild(upBorder);

		let upBottomBg = BaseBitmap.create("commonview_border2");
		upBottomBg.width = 640;
		upBottomBg.x = 0;
		upBottomBg.y = topBg.y + topBg.height - upBottomBg.height + 10;
		this._nodeContainer.addChild(upBottomBg);

		//边框
		// let bottomBg = BaseBitmap.create("public_9v_bg03");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = GameConfig.stageHeigth - topBg.height - 69 ;
		// bottomBg.x = 0;
		// bottomBg.y = topBg.y + topBg.height;
		// this.addChildToContainer(bottomBg);


		
		//活跃度信息
		// this._livenessIcon = BaseBitmap.create("dailytask_liveness")
		// this._livenessIcon.x = 13;
		// this._livenessIcon.y = topBg.y + topBg.height/2 - this._livenessIcon.height/2 +10;
		// this._nodeContainer.addChild(this._livenessIcon);

		// let innerIcon = BaseLoadBitmap.create("itemicon6");
		// innerIcon.setScale(0.8)
		// innerIcon.x = this._livenessIcon.x + this._livenessIcon.width/2 - 50 * 0.8;
		// innerIcon.y = this._livenessIcon.y + 4 ;
		
		// this._nodeContainer.addChild(innerIcon);

		let txt_desc=BaseBitmap.create("dailytask_desc_txt");
		txt_desc.setPosition(topBg.x+(topBg.width-txt_desc.width)*0.5,topBg.y+8);
		this._nodeContainer.addChild(txt_desc);

		let liveBg=BaseBitmap.create("dailytask_tip1bg");
		liveBg.setPosition(topBg.x+(topBg.width-liveBg.width)*0.5,txt_desc.y+txt_desc.height-5);
		this._nodeContainer.addChild(liveBg);

		let livenessTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        livenessTxt.text = LanguageManager.getlocal("dailyTask_todayliveness");
        livenessTxt.x = liveBg.x + liveBg.width/2 - livenessTxt.width/2 - 10;
        livenessTxt.y = liveBg.y + (liveBg.height-livenessTxt.height)*0.5+1;
        this._nodeContainer.addChild(livenessTxt);

		this._curLivenessTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curLivenessTxt.x = livenessTxt.x + livenessTxt.width + 10;//this._livenessIcon.x + this._livenessIcon.width/2 - this._curLivenessTxt.width/2;
        this._curLivenessTxt.y = livenessTxt.y;//this._livenessIcon.y + this._livenessIcon.height - 26;
        this._nodeContainer.addChild(this._curLivenessTxt);
			// 		"progress_type1_yellow2",
			// "progress_type3_bg"
		this._progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",520);
		this._progress.x = GameConfig.stageWidth/2 - this._progress.width/2;//this._livenessIcon.x + this._livenessIcon.width + 18;
		this._progress.y = topBg.y + 145+3;
		this._progress.setPercentage(this.getProgressPercent());
		this._nodeContainer.addChild(this._progress);

		let leftMark = BaseBitmap.create("dailytask_borderitem");
		leftMark.scaleX = -1;
		leftMark.x = this._progress.x + leftMark.width+8;
		leftMark.y = this._progress.y + this._progress.height/2 - leftMark.height/2;
		this._nodeContainer.addChild(leftMark);


		let rightMark = BaseBitmap.create("dailytask_borderitem");
		rightMark.x = this._progress.x + this._progress.width - rightMark.width-8;
		rightMark.y = this._progress.y + this._progress.height/2 - leftMark.height/2;
		this._nodeContainer.addChild(rightMark);

		//初始化宝箱
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let perWidth = 500/rkeys.length;
		let startX = this._progress.x +10;
		this._maxLivenessValue = rewardList[String(rkeys.length)].needLiveness;

		//进度是0

		let perX = startX;
		// let numTxt =  ComponentManager.getTextField("0" ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		// numTxt.x = perX - numTxt.width/2 ;
		// numTxt.y = this._progress.y + this._progress.height + 3;
		// this._nodeContainer.addChild(numTxt);

		for (var index = 0; index < rkeys.length; index++) {

			let tmprcfg = rewardList[String(index+1)];
			let perX = startX + (index+1) * perWidth;
			// let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
			if(tmprcfg.mustReward){
				
				let rStatus = Api.dailytaskVoApi.getBoxStatusById(rkeys[index]);
				let imgres = "dailytask_newbox1_";
				if (index >2){
					imgres = "dailytask_newbox2_";
				}
				imgres=imgres + String(rStatus);
				let boxImg = BaseLoadBitmap.create(imgres);
				boxImg.anchorOffsetX = 112/2;
				boxImg.anchorOffsetY = 110/2;
				boxImg.name = "boxImg"+rkeys[index];
				boxImg.x = perX + 10;
				boxImg.y = this._progress.y - 10 - 40+10;//this._progress.y - 64/2-5 - 10;
				
				let lightImg =  BaseLoadBitmap.create("dailytask_box_light");
				lightImg.anchorOffsetX = 80/2;
				lightImg.anchorOffsetY = 80/2;
				lightImg.x = perX + 5;
				lightImg.name = "lightImg"+rkeys[index]
				lightImg.y = this._progress.y - 40;
				lightImg.visible = false;
				this._nodeContainer.addChild(lightImg);
				
				this._nodeContainer.addChild(boxImg);
				boxImg.addTouchTap(this.rewardBoxClickhandler,this,[rkeys[index]]);

			}

			


			// let arrowImg = BaseBitmap.create("dailytask_dt_03");
			// arrowImg.x = perX - arrowImg.width/2;
			// arrowImg.y = this._progress.y + this._progress.height/2 - arrowImg.height/2;
			// this._nodeContainer.addChild(arrowImg);



			if(index != rkeys.length-1){
				let livenuseeBg =  BaseBitmap.create("dailytask_line");
			
				livenuseeBg.x = Math.round(perX - livenuseeBg.width/2);

				livenuseeBg.y = this._progress.y + this._progress.height/2 - livenuseeBg.height/2;
				this._nodeContainer.addChild(livenuseeBg);
			}

			if( index < rkeys.length - 1){
				let numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				numTxt.x = perX - numTxt.width/2;
				numTxt.y = this._progress.y + this._progress.height + 3;
				this._nodeContainer.addChild(numTxt);
			}


			
		}
		this.refreshProfress();

		// //底部列表
		// let innerbg1 = BaseBitmap.create("public_9v_bg02");
		// innerbg1.width = GameConfig.stageWidth;
		// innerbg1.height = GameConfig.stageHeigth - scroY - this.container.y;
		// innerbg1.x = 0;
		// innerbg1.y = scroY;
		// this._nodeContainer.addChild(innerbg1);

		// let innerbg2 = BaseBitmap.create("public_9v_bg02");
		// innerbg2.width = GameConfig.stageWidth-4;
		// innerbg2.height = innerbg1.height - 4;
		// innerbg2.x = 2;
		// innerbg2.y = innerbg1.y +2;
		// this._nodeContainer.addChild(innerbg2);

		let innery = scroY;
		//门客滚顶区域
		let scrollH = GameConfig.stageHeigth-innery  - this.container.y - 20 - 15;
		let rect = new egret.Rectangle(0,0,600,scrollH);

		let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		this._scrollList = ComponentManager.getScrollList(DailyTaskScrollItem,list ,rect);
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this._scrollList.y = innery+10;
		this._nodeContainer.addChild(this._scrollList);

		let border = BaseBitmap.create("commonview_border1");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth-innery  - this.container.y - 20;
		border.x = 0;
		border.y = scroY;
		this.addChildToContainer(border);

		let bottom = BaseBitmap.create("commonview_bottom");
		bottom.x = 0;
		bottom.y = GameConfig.stageHeigth - bottom.height ;
		this.addChild(bottom);
		
		let leftItem = BaseBitmap.create("commonview_item1");
		leftItem.scaleX = -1;
		leftItem.x = leftItem.width;
		leftItem.y = border.y;
		this.addChildToContainer(leftItem);

		let rightItem = BaseBitmap.create("commonview_item1");
		rightItem.x = border.x + border.width - rightItem.width;
		rightItem.y = border.y;
		this.addChildToContainer(rightItem);	

	}
	//每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress()
	{	
		let newPro =  this.getProgressPercent();
		let oldPro = this._progress.getPercent();
		egret.Tween.get(this._progress,{loop:false}).to({percent:newPro},(newPro-oldPro)*5000);
		this._curLivenessTxt.text = String(Api.dailytaskVoApi.getCurLivenessValue());
		// this._curLivenessTxt.x = 80 - this._curLivenessTxt.width/2 ;

        // this._curLivenessTxt.x = this._livenessIcon.x + this._livenessIcon.width/2 - this._curLivenessTxt.width/2;
        // this._curLivenessTxt.y = this._livenessIcon.y + 30;

		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let startX = this._progress.x;
		for (var index = 0; index < rkeys.length; index++) {

			let tmprcfg = rewardList[String(index+1)];
			if(!tmprcfg.mustReward){
				break;
			}
			let tmpK = String(rkeys[index]);
			let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
			let boxImg = this._nodeContainer.getChildByName("boxImg"+tmpK);
			let lightImg =  this._nodeContainer.getChildByName("lightImg"+ tmpK);

			let rStatus = Api.dailytaskVoApi.getBoxStatusById(tmpK);
			let imgres = "dailytask_newbox1_";
			if (index >2){
				imgres = "dailytask_newbox2_";
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
	/**
	 * 处理进度条进度值
	 */
	protected getProgressPercent()
	{
		let curLiveness = Api.dailytaskVoApi.getCurLivenessValue();
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		
		if (curLiveness == 0)
			return 0;
		if (curLiveness >= rewardList[String(rkeys.length)].needLiveness)
			return 100;

		let perV = 1/rkeys.length;
		for (var index = 1; index <= rkeys.length; index++) {
			if(curLiveness <= rewardList[String(index)].needLiveness)
			{
				let result = perV *(index-1);
				let tmpV1 = 0;
				if(index > 1)
				{
					tmpV1 = rewardList[String(index-1)].needLiveness;
				}
				let tmpV2 = rewardList[String(index)].needLiveness;
				result += (curLiveness-tmpV1)/(tmpV2 - tmpV1)*perV;
				return result;
			}
		}
	}
	//宝箱奖励领取回调
	protected rewardBoxClickhandlerCallBack(event:egret.Event)
	{
		let data = event.data.data.data;
		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
		
		let boxImg = this._nodeContainer.getChildByName("boxImg"+this._curRewardBoxId);
		let pos = boxImg.localToGlobal(boxImg.width/2,50);
		App.CommonUtil.playRewardFlyAction(rList,pos);
		this.refreshProfress();
	}

	protected rewardBoxClickhandler(obj:any,param:any)
	{
		let boxRewardId = param;
		let status = Api.dailytaskVoApi.getBoxStatusById(boxRewardId);
		/**
		 *  1未完成 2可领取 3已领取
		 */
		if (status == 2)
		{
			this._curRewardBoxId = boxRewardId;
			NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS,{liveKey:boxRewardId });
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{type : 'Daily', id : boxRewardId});
		}
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "dailytask_topbg",
			"dailytask_icon1",
			// "dailytask_liveness",
			// "dailytask_box1_1","dailytask_box1_2","dailytask_box1_3",
			// "dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",

			"dailytask_newbox1_1","dailytask_newbox1_2","dailytask_newbox1_3",
			"dailytask_newbox2_1","dailytask_newbox2_2","dailytask_newbox2_3",
			
			"progress6_bg",
			"dailytask_dt_01",
			"dailytask_dt_02",
			"dailytask_dt_03",
			"commonview_border1",
			"commonview_border2",
			"progress_type1_yellow2",
			"progress_type3_bg",
			"dailytask_line",
			"achievement_bg",
			"commonview_bottom",
			"commonview_border1",
			"commonview_item1",
			"commonview_woodbg",
			"achievement_state3",
			"dailytask_borderitem",
			"dailytask_desc_txt",
			"dailytask_tip1bg"
		
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this._nodeContainer = null;
		this._scrollList = null;
		this._progress = null;
		this._livenessIcon = null;
		this._curLivenessTxt = null;
		this._curRewardBoxId = null;


		super.dispose();
	}
}
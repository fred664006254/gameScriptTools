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
	private _curLivenessTxt:BaseTextField|BaseBitmapText;
	private _maxLivenessValue:number=0;
	private _curRewardBoxId:string;
	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected getContainerY():number
	{
		return 0;
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this.setBigFameY(178);
		this.setBigFameCorner(2);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let topBg = BaseBitmap.create("dailytask_topbg");
		topBg.y = 0;
		this._nodeContainer.addChild(topBg);
		//活跃度信息
		let livenessIcon = BaseBitmap.create("dailytask_liveness")
		livenessIcon.x = 25;
		livenessIcon.y = topBg.y + topBg.height/2 - livenessIcon.height/2+10;
		this._nodeContainer.addChild(livenessIcon);

		let numbg = BaseBitmap.create("public_9_bg80");
		numbg.width = 120;
		numbg.height = 32;
		numbg.alpha = 0.6;
		numbg.setPosition(livenessIcon.x+livenessIcon.width/2-numbg.width/2+2,livenessIcon.y-36);
		this._nodeContainer.addChild(numbg);

		let livenessTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        livenessTxt.text = LanguageManager.getlocal("dailyTask_todayliveness");
        livenessTxt.x = numbg.x +numbg.width/2 - livenessTxt.width/2 ;
        livenessTxt.y = numbg.y +5;
        this._nodeContainer.addChild(livenessTxt);

		this._curLivenessTxt =  ComponentManager.getBitmapText("0","tip_fnt",TextFieldConst.COLOR_LIGHT_YELLOW,TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._curLivenessTxt.x = 63 - this._curLivenessTxt.width/2 ;
        this._curLivenessTxt.y = livenessIcon.y +livenessIcon.height/2 - this._curLivenessTxt.height/2-1 ;
        this._nodeContainer.addChild(this._curLivenessTxt);

		this._progress = ComponentManager.getProgressBar("progress18","progress18_bg",488);
		this._progress.x = livenessIcon.x + livenessIcon.width + 5;
		this._progress.y = livenessIcon.y + livenessIcon.height/2 - this._progress.height/2;
		this._progress.setPercentage(this.getProgressPercent());
		this._nodeContainer.addChild(this._progress);

		//初始化宝箱
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let perWidth = (488+5)/rkeys.length;
		let startX = this._progress.x;
		this._maxLivenessValue = rewardList[String(rkeys.length)].needLiveness;
		for (var index = 0; index < rkeys.length; index++) {

			let tmprcfg = rewardList[String(index+1)];
			let perX = startX + (index+1) * perWidth;

			if (index==1)
			{
				perX+=4;
			}
			else if (index==2)
			{
				perX+=6;
			}
			else if (index==3)
			{
				perX+=10;
			}

			// let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
			let arrowImg = BaseBitmap.create("progress18_line");
			arrowImg.x = perX - arrowImg.width/2+2;
			arrowImg.y = this._progress.y - 6;
			this._nodeContainer.addChildAt(arrowImg,2);

			let rStatus = this.getBoxStatusById(rkeys[index]);
			let imgres = "dailytask_box1_";
			if (index >2){
				imgres = "dailytask_box2_";
			}
			let boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
			boxImg.anchorOffsetX = 53/2;
			boxImg.anchorOffsetY = 51/2;
			boxImg.name = "boxImg"+rkeys[index];
			boxImg.x = perX;
			boxImg.y = this._progress.y - 51/2-5;
			
			let lightImg =  BaseLoadBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 67/2;
			lightImg.anchorOffsetY = 65/2;
			lightImg.x = perX;
			lightImg.name = "lightImg"+rkeys[index]
			lightImg.y = this._progress.y - 30;
			lightImg.visible = false;
			this._nodeContainer.addChild(lightImg);
			
			this._nodeContainer.addChild(boxImg);
			boxImg.addTouchTap(this.rewardBoxClickhandler,this,[rkeys[index]]);

			// let livenuseeBg =  BaseBitmap.create("dailytask_liveness_numbg");
			// livenuseeBg.width = 85;
			// livenuseeBg.x = perX - 40;
			// livenuseeBg.y = this._progress.y +35;
			// this._nodeContainer.addChild(livenuseeBg);

			let txtBg:BaseBitmap=BaseBitmap.create("public_numbg");//"public_9_bg20");
			let getRewardTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("shortGetReward"),12,TextFieldConst.COLOR_WHITE);
			getRewardTxt.setPosition(boxImg.x+(boxImg.width-getRewardTxt.width)/2,boxImg.y+boxImg.height+boxImg.anchorOffsetY-getRewardTxt.height);
			this._nodeContainer.addChild(txtBg);
			this._nodeContainer.addChild(getRewardTxt);
			getRewardTxt.name="getRewardTxt"+rkeys[index];
			getRewardTxt.visible=false;
			txtBg.name="txtBg"+rkeys[index];
			// txtBg.width=getRewardTxt.width+4;
			// txtBg.height=getRewardTxt.height+4;
			txtBg.scaleX=(getRewardTxt.width+16)/txtBg.width;
			txtBg.scaleY=(getRewardTxt.height+8)/txtBg.height;
			txtBg.setPosition(getRewardTxt.x+(getRewardTxt.width-txtBg.width*txtBg.scaleX)/2,getRewardTxt.y+(getRewardTxt.height-txtBg.height*txtBg.scaleY)/2);

			let numTxt = null;
			if(this.shieldCn()){
				numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness + "",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

			} else {
				numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness + LanguageManager.getlocal("dailyTask_liveness"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

			}
			numTxt.x = perX - numTxt.width/2;
			numTxt.y = this._progress.y +42;
			this._nodeContainer.addChild(numTxt);
			
			
		}
		this.refreshProfress();


		//门客滚顶区域
		let scrollH = GameConfig.stageHeigth-295;
		let rect = new egret.Rectangle(0,0,600,scrollH);

		let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		this._scrollList = ComponentManager.getScrollList(DailyTaskScrollItem,list ,rect);
		this._scrollList.x = 20;
		this._scrollList.y = topBg.y+topBg.height+13;
		this._nodeContainer.addChild(this._scrollList);
	}

	/**
	 * 处理进度条进度值
	 */
	protected getProgressPercent()
	{
		let curLiveness = Api.dailytaskVoApi.getCurLivenessValue();
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		
		// curLiveness = 140;
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

	//每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress()
	{	
		let newPro =  this.getProgressPercent();
		let oldPro = this._progress.getPercent();
		egret.Tween.get(this._progress,{loop:false}).to({percent:newPro},(newPro-oldPro)*5000);
		this._curLivenessTxt.text = String(Api.dailytaskVoApi.getCurLivenessValue());
		this._curLivenessTxt.x = 64 - this._curLivenessTxt.width/2 ;
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let startX = this._progress.x;
		for (var index = 0; index < rkeys.length; index++) {

			let tmpK = String(rkeys[index]);
			let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
			let boxImg = this._nodeContainer.getChildByName("boxImg"+tmpK);
			let lightImg =  this._nodeContainer.getChildByName("lightImg"+ tmpK);
			let getRewardTxt = this._nodeContainer.getChildByName("getRewardTxt"+ tmpK);
			let txtBg = this._nodeContainer.getChildByName("txtBg"+ tmpK);

			let rStatus = this.getBoxStatusById(tmpK);
			let imgres = "dailytask_box1_";
			if (index >2){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				if(getRewardTxt)
				{
					getRewardTxt.visible=true;
				}
				if(txtBg)
				{
					txtBg.visible=true;
				}
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				if(getRewardTxt)
				{
					getRewardTxt.visible=false;
				}
				if(txtBg)
				{
					txtBg.visible=false;
				}
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
	}
	
	protected getBoxStatusById(boxId:string)
	{
		let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
		let rStatus = 1;
		if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId( boxId))
		{
			rStatus = 3;
		}else
		{
			if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
				rStatus = 2;
		}
		return rStatus;
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
		let status = this.getBoxStatusById(boxRewardId);
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
            "dailytask_topbg","dailytask_topbg",
			"dailytask_liveness","dailytask_box1_1","dailytask_box1_2","dailytask_box1_3","dailytask_liveness_numbg",
			"dailytask_arrow","dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",
			"public_scrollitembg","progress17_bg", "progress17","progress19_bg","progress19_cloud",
			"public_titlebg","progress18_bg","progress18","progress18_line","acchristmasview_smalldescbg",
		]);
	}
	/**
	 * 需要屏蔽的cn字库
	 */
	private shieldCn():boolean
	{
		return PlatformManager.checkIsThSp()||PlatformManager.checkIsEnLang();
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this._nodeContainer = null;
		this._scrollList = null;
		this._progress = null;
		this._curLivenessTxt = null;
		this._curRewardBoxId = null;

		super.dispose();
	}
}
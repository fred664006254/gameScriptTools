/**
  * 赵云活动Tab1
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeViewTab1
  */
class AcMazeViewTab1 extends AcCommonViewTab {

	private _isOpen:boolean = false;
	private _updateBtn:BaseButton[] = [];
	private _updateBM:BaseBitmap[] = [];
	private _updateTF:BaseTextField[] = [];
	private _updateNumTF:BaseTextField[] = [];
	private _updateIcon:BaseLoadBitmap[] = [];
	private _updateIconTF:BaseTextField[] = [];
	private _updateYinPiaoIcon:BaseBitmap[] = [];
	private _updateheadBg:BaseBitmap[] = [];
	private _updateDiscount:BaseBitmap[] = []
	private _isSendMessage:boolean = false;
	private _isPlayAni:boolean = false;
	private _btnIndex:number = 0;
	private _mazeBM:BaseBitmap = null;
	private _mazeBM1:BaseBitmap = null;
	private _mazeBM2:BaseBitmap = null;
	private _mazeBM3:BaseBitmap = null;
	private _rewardData:any = null;
	private _indexLine_eff:number = 0;
	private _textbg:BaseBitmap = null;
	private _textBM:BaseBitmap = null;
	private _killText:BaseBitmapText|BaseTextField= null;


	private _timeTF:BaseTextField = null;

	private _timeBg:BaseBitmap = null;
	public constructor() {
		super();
		this.initView();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.MazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.rewardClickHandler,this);

		let customClip = ComponentManager.getCustomMovieClip("critmyspeed",5,100);
		customClip.setPosition(10,500);
		this.addChild(customClip);

		this.createView();

		let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("AcArcherViewTime",[this.vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		acTimeTF.setPosition(GameConfig.stageWidth / 2 - acTimeTF.width / 2,GameConfig.stageHeigth -  this.getViewTitleButtomY() - acTimeTF.height - 5);
		
		let scaleNum = 0.75;
		this._mazeBM2 = BaseBitmap.create("acmazeview_maze");
		this._mazeBM2.width *= scaleNum;
		this._mazeBM2.height *= scaleNum;
		this._mazeBM2.setPosition(acTimeTF.x + acTimeTF.width / 2  - this._mazeBM2.width / 2,acTimeTF.y - this._mazeBM2.height - 10);
		this.addChild(this._mazeBM2);
		this._mazeBM2.alpha = 0;
		this._mazeBM2.filters = [this.addHeroFilter(2)];

		this._mazeBM3 = BaseBitmap.create("acmazeview_maze");
		this._mazeBM3.width *= scaleNum;
		this._mazeBM3.height *= scaleNum;
		this._mazeBM3.setPosition(acTimeTF.x + acTimeTF.width / 2  - this._mazeBM3.width / 2,acTimeTF.y - this._mazeBM3.height - 10);
		this.addChild(this._mazeBM3);
		this._mazeBM3.alpha = 0;
		this._mazeBM3.filters = [this.addHeroFilter(1)];

		this._mazeBM = BaseBitmap.create("acmazeview_maze");
		this._mazeBM.width *= scaleNum;
		this._mazeBM.height *= scaleNum;
		this._mazeBM.setPosition(acTimeTF.x + acTimeTF.width / 2  - this._mazeBM.width / 2,acTimeTF.y - this._mazeBM.height - 10);
		this.addChild(this._mazeBM);

		this._mazeBM1 = BaseBitmap.create("acmazeview_maze");
		this._mazeBM1.width *= scaleNum;
		this._mazeBM1.height *= scaleNum;
		this._mazeBM1.setPosition(acTimeTF.x + acTimeTF.width / 2  - this._mazeBM1.width / 2,acTimeTF.y - this._mazeBM1.height - 10);
		this.addChild(this._mazeBM1);
		this._mazeBM1.alpha = 0;
		this._mazeBM1.filters = [this.addHeroFilter(0)];

		let buttombg = BaseBitmap.create("acmazeview_buttombg");
		buttombg.setPosition(0,GameConfig.stageHeigth -  this.getViewTitleButtomY() - buttombg.height )
		this.addChild(buttombg);
		this.addChild(acTimeTF);


		let rankBtn = ComponentManager.getButton("acturntable_rankicon",null,this.rankClick,this);
		rankBtn.setPosition(20,GameConfig.stageHeigth -  this.getViewTitleButtomY() - rankBtn.height - 50);
		this.addChild(rankBtn);
		
		let infoBtn = ComponentManager.getButton("acmazeview_infobtn",null,this.infoClick,this)
		infoBtn.setPosition(rankBtn.x,rankBtn.y - infoBtn.height - 35);
		this.addChild(infoBtn);
	
		this._textbg = BaseBitmap.create("acmazeview_textbg");
		this._textbg.setPosition(infoBtn.x + infoBtn.width / 2, infoBtn.y - this._textbg.height - 50);
		this.addChild(this._textbg);

		this._textBM = BaseBitmap.create("acmazeview_text");
		this._textBM.anchorOffsetX = this._textBM.width / 2;
		this._textBM.anchorOffsetY = this._textBM.height / 2;
		this._textBM.setPosition(this._textbg.x + this._textbg.width / 2 - 15,this._textbg.y + this._textbg.height / 2 - 20);
		this.addChild(this._textBM);
		//
		this._killText = ComponentManager.getBitmapText(String(this.vo.getMazeNum()),TextFieldConst.FONTNAME_ITEMTIP);
		this._killText.anchorOffsetX = this._killText.width / 2;
		this._killText.anchorOffsetY = this._killText.height / 2;
		this._killText.rotation = -24;
		this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
		this.addChild(this._killText);
		
		if(this.vo.getMazeNum() <= 0)
		{
			this._textbg.setVisible(false);
			this._textBM.setVisible(false);
			this._killText.setVisible(false);
		}
		let openBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"AcMazeViewOpenTitle",()=>{
			let deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        	if(deltaT < 0){
            	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            	return;
        	}
			if(this._isOpen)
			{
				this._isOpen = false;
				openBtn.setBtnBitMap(ButtonConst.BTN_BIG_YELLOW);
				openBtn.setText("AcMazeViewOpenTitle",true);
			}
			else
			{
				this._isOpen = true;
				openBtn.setBtnBitMap(ButtonConst.BTN_BIG_RED);
				openBtn.setText("AcMazeViewCloseTitle",true);
			}
			this.refreshTopView();
		},this);
		openBtn.setPosition(acTimeTF.x + acTimeTF.width / 2  - openBtn.width / 2,acTimeTF.y - openBtn.height - 10)
		this.addChild(openBtn);

		let explainTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewExplain"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		explainTF.setPosition(openBtn.x + openBtn.width / 2  - explainTF.width / 2 , openBtn.y - explainTF.height - 10);
		this.addChild(explainTF);

		let mazeBg = BaseBitmap.create("public_9_bg41");
		mazeBg.width = 194;
		mazeBg.height = 60;
		mazeBg.setPosition(explainTF.x + explainTF.width / 2  - mazeBg.width / 2,explainTF.y - mazeBg.height - 10);
		this.addChild(mazeBg);

		let servantcfg = Config.ServantCfg.getServantItemById("2016");
		//资质
		let servantAbility = Api.servantVoApi.getServantStarsNumWithId("2016");
		let qualityTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewQuality",[String(servantAbility)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		qualityTF.setPosition(mazeBg.x + mazeBg.width / 2 - qualityTF.width / 2,mazeBg.y + 7);
		this.addChild(qualityTF);

		let speStr = LanguageManager.getlocal("AcMazeViewSpecialty",[LanguageManager.getlocal("servantInfo_speciality" + [ String(servantcfg.speciality[0])])])
		let specialtyTF = ComponentManager.getTextField(speStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		specialtyTF.setPosition(qualityTF.x + qualityTF.width / 2 - specialtyTF.width / 2,qualityTF.y + qualityTF.height + 7);
		this.addChild(specialtyTF);

		this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = 17;
		this.addChild(this._timeBg);

		let vo = <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
		this.addChild(this._timeTF);

		TickManager.addTick(this.tick,this);
		this.tick();

	}
	private tick() {
		let vo = <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._timeTF.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._timeTF.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]);
		}
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);

	}
	/**
	 * 创建顶部的UI
	 */
	private createView()
	{
		let rewardPool = this.vo.getMazePool();
		for(let i = 0;i < 3;i++ )
		{
			//头像图片的背景
			let headbg = BaseBitmap.create("acmazeview_headbg");
			let startPosX = (GameConfig.stageWidth  - headbg.height * 3) / 4;
			headbg.setPosition((i + 1 ) * startPosX + i * headbg.width,60);
			this.addChild(headbg);
			headbg.addTouchTap((event:egret.TouchEvent,type)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ACMAZEREWARDPOPUPVIEW,{"type":type})
			},this,[i]);
			this._updateheadBg.push(headbg);

			let dicountbg =  BaseBitmap.create("acmazeview_discount");
			dicountbg.setPosition(headbg.x,headbg.y);
			this.addChild(dicountbg);
			dicountbg.setVisible(this._isOpen);
			this._updateDiscount.push(dicountbg);


			let item = BaseBitmap.create("acmazeview_type" + rewardPool[i]);
			item.width *= 0.8;
			item.height *= 0.8;
			item.setPosition(headbg.x + headbg.width - item.width - 10,headbg.y + headbg.height - item.height - 10);
			this.addChild(item);
			this._updateBM.push(item);

			let singleBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,null,this.buyBtnClick,this,[i]);
			singleBtn.setPosition(headbg.x + headbg.width / 2 - singleBtn.width / 2,headbg.y + headbg.height + 15);
			this.addChild(singleBtn);
			this._updateBtn.push(singleBtn);

			let rewardItemVo = GameData.formatRewardItem(this.cfg.getRewardIcon())[0];
			let singleIcon = BaseLoadBitmap.create(rewardItemVo.icon);	
			singleIcon.width = 35;
			singleIcon.height = 35;
			singleIcon.setPosition(singleBtn.x + singleBtn.width / 2 - singleIcon.width / 2 + 12,singleBtn.y + singleBtn.height / 2 - singleIcon.height / 2);
			this.addChild(singleIcon);
			this._updateIcon.push(singleIcon);

			let singleIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
			singleIconTF.setPosition(singleIcon.x - singleIconTF.width,singleIcon.y + singleIcon.height / 2 - singleIconTF.height / 2);
			this.addChild(singleIconTF);
			this._updateIconTF.push(singleIconTF);

			let singleIconNum = ComponentManager.getTextField(this._isOpen?"X10":"X1",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
			singleIconNum.setPosition(singleIcon.x + singleIcon.width,singleIcon.y + singleIcon.height / 2 - singleIconNum.height / 2);
			this.addChild(singleIconNum);
			this._updateNumTF.push(singleIconNum);

			let singleStr = this._isOpen?String(this.cfg.cost * 10 * this.cfg.discount):this.vo.isFree?LanguageManager.getlocal("sysFreeDesc"):String(this.cfg.cost);
			let singleTF = ComponentManager.getTextField(singleStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			singleTF.setPosition(singleBtn.x + singleBtn.width / 2,singleBtn.y + singleBtn.height + 15);
			this.addChild(singleTF);
			this._updateTF.push(singleTF);
			//赠送 1 个 银票图片 。itemicon1001  public_icon1
			let singleBM = BaseBitmap.create("public_icon1")
			singleBM.width = 42;
			singleBM.height = 42;
			singleBM.setPosition(singleBtn.x + singleBtn.width / 2 - singleBM.width,singleBtn.y + singleBtn.height + 2);
			this.addChild(singleBM);
			this._updateYinPiaoIcon.push(singleBM);

		}
	}
	/**
	 * 仅客户端改变View
	 */
	private refreshTopView()
	{
		for(let i = 0;i < 3;i++)
		{
			//this._updateBtn[i].setBtnBitMap(this._isOpen?ButtonConst.BTN_NORMAL_RED:ButtonConst.BTN_NORMAL_YELLOW);
			this._updateNumTF[i].text = this._isOpen?"X10":"X1";
			let str = this._isOpen?String(this.cfg.cost * 10 * this.cfg.discount):this.vo.isFree?LanguageManager.getlocal("sysFreeDesc"):String(this.cfg.cost); 
			this._updateTF[i].text = str;
			this._updateDiscount[i].setVisible(this._isOpen&&!this._isPlayAni);
		}
	}
	/**
	 * 服务返回数据更新View
	 */
	private refreshTopViewVo()
	{
		let rewardPool = this.vo.getMazePool();
		for(let i = 0;i < 3;i++)
		{
			let str = this._isOpen?String(this.cfg.cost * 10 * this.cfg.discount):this.vo.isFree?LanguageManager.getlocal("sysFreeDesc"):String(this.cfg.cost); 
			this._updateTF[i].text = str;
			this._updateBM[i].texture = ResourceManager.getRes(String("acmazeview_type" + rewardPool[i]))
		}
	}
	

	/**
	 * 赵云任务的属性说明
	 */
	private infoClick()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACMAZEINFOPOPUPVIEW);
	}
	/**
	 * 排行榜
	 */
	private rankClick()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACMAZERANKPOPUPVIEW);
	}
	/**
	 * 购买抽奖
	 */
	private buyBtnClick(index:any)
	{
		let deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this._isSendMessage)
		{
			return;
		}
		let cost:number;
		if(this._isOpen)
		{
			cost = this.cfg.cost * 10 * this.cfg.discount;
		}
		else
		{
			if(this.vo.isFree)
			{
				cost = 0;
			}
			else
			{
				cost = this.cfg.cost
			}
			
		}
		if(Api.playerVoApi.getPlayerGem() < cost)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return ;
		}
		this._btnIndex = index;
		let poolId = index + 1;
		let isTenPlay = this._isOpen? 1:0;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,{"activeId":AcMazeView.ACTIVEID,"isTenPlay":isTenPlay,"poolId":poolId});
		this._isSendMessage = true;

	}
	/**
	 * 抽奖返回的数据
	 */
	private rewardClickHandler(event:egret.Event)
	{
		this._rewardData = event.data.data.data;
		if(event.data.data.ret < 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			this._isSendMessage = false;
			return;
		}
		// this.refreshTopViewVo();
		this._isPlayAni = true;
		if(this._isOpen)
		{
			this.tenPlayAni();
		}
		else
		{
			this.onePlayAni();
		}
		// ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, data.rewards);
		// this._isSendMessage = false;
		
	}
	/**
	 * 一次的动画
	 */
	private onePlayAni()
	{
		this.refreshAniView();
		egret.Tween.get(this._mazeBM).wait(500).to({x:this._updateheadBg[this._btnIndex].x + this._updateheadBg[this._btnIndex].width / 2 - this._mazeBM.width / 2 * 0.85,
		y:this._updateheadBg[this._btnIndex].y + this._updateheadBg[this._btnIndex].height / 2,
		scaleX:0.85,scaleY:0.85
		},60).wait(50).call(()=>{
			this._updateheadBg[this._btnIndex].setVisible(false);
			this._updateBM[this._btnIndex].setVisible(false);
			
			let left = BaseBitmap.create("acmazeview_left");
			left.setPosition(this._updateheadBg[this._btnIndex].x,this._updateheadBg[this._btnIndex].y);
			this.addChildAt(left,0);
			let right = BaseBitmap.create("acmazeview_right");
			right.setPosition(this._updateheadBg[this._btnIndex].x,this._updateheadBg[this._btnIndex].y);
			this.addChildAt(right,0);
			//音效
			SoundManager.playEffect("effect_acmaze_attack1");
			egret.Tween.get(left).wait(30).to({x:this._updateheadBg[this._btnIndex].x + 60,y:this._updateheadBg[this._btnIndex].y - 60,alpha:0},500).wait(50).call(()=>{
				// left.alpha = 0;
			},this).wait(300).call(()=>{
				this.refreshTopViewVo();
				this._updateheadBg[this._btnIndex].setVisible(true);
				this._updateBM[this._btnIndex].setVisible(true);
				this._isPlayAni = false;
				this.refreshAniView();
				this.removeChild(left);
				left.dispose();
				left = null;
			},this);
			egret.Tween.get(right).wait(30).to({x:this._updateheadBg[this._btnIndex].x - 60,y:this._updateheadBg[this._btnIndex].y + 60,alpha:0},500).wait(50).call(()=>{
				this.removeChild(right);
				right.dispose();
				right = null;

			},this);

			let line_eff = ComponentManager.getCustomMovieClip("acmazeline_",7,50);
			line_eff.setScale(2);
			line_eff.rotation = 45;
			line_eff.anchorOffsetX = 45;
			line_eff.anchorOffsetY = 107;
			line_eff.setPosition(this._updateheadBg[this._btnIndex].x + this._updateheadBg[this._btnIndex].width / 2 ,this._updateheadBg[this._btnIndex].y + this._updateheadBg[this._btnIndex].height / 2);
			this.addChildAt(line_eff,1);
			line_eff.playWithTime(1);
			line_eff.setEndCallBack(()=>{
				this.removeChild(line_eff);
				line_eff.dispose();
				line_eff = null;
				
			},this);

		},this).wait(50).to({x:this._mazeBM1.x,y:this._mazeBM1.y,scaleX:1,scaleY:1},500).wait(200).call(()=>{
			this._isSendMessage = false;
			if(this.vo.getMazeNum() > 0)
			{
				this._textbg.setVisible(true);
				this._textBM.setVisible(true);
				this._killText.setVisible(true);
			}
			this._killText.text = String(this.vo.getMazeNum());
			this._killText.anchorOffsetX = this._killText.width / 2;
			this._killText.anchorOffsetY = this._killText.height / 2;
			this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
			ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, {rewards : this._rewardData.rewards, aid : this.aid, code : this.code});

		},this);
		// this._updateheadBg[this._btnIndex].setVisible
		// this._updateBM
		
	}
	/**
	 * 10次的动画
	 */
	private tenPlayAni()
	{
		this.refreshAniView();
		egret.Tween.get(this._mazeBM).call(()=>{
			let flash_eff = ComponentManager.getCustomMovieClip("critmyflash",3,30);
			flash_eff.scaleX = flash_eff.scaleY = 2;
			flash_eff.x = this._mazeBM.x + this._mazeBM.width / 2 - 160 * 2;
			flash_eff.y = this._mazeBM.y + 60;
			this.addChild(flash_eff);
			flash_eff.setEndCallBack(()=>{
				this.removeChild(flash_eff);
				flash_eff.dispose();
				flash_eff = null;
			},this);
			flash_eff.playWithTime(1);
			egret.Tween.get(this._mazeBM1).wait(50).to({alpha:1},200).call(()=>{
				this._mazeBM1.alpha = 0;
			},this);
		},this).call(()=>{
			let speed_eff = ComponentManager.getCustomMovieClip("critmyspeed",5,50);
			speed_eff.width = GameConfig.stageWidth;
			// speed_eff.height = 170;
			speed_eff.anchorOffsetY = speed_eff.height;
			speed_eff.alpha = 0;
			speed_eff.setPosition(0,this._mazeBM.y + speed_eff.height / 2 + 110);
			speed_eff.scaleY = 0.005;
			let index = this.getChildIndex(this._mazeBM2);
			this.addChildAt(speed_eff,index - 1);
			speed_eff.playWithTime(-1);
			egret.Tween.get(speed_eff).wait(100).to({alpha:1,scaleY:1.2},130).wait(750).to({scaleY:0.005},65).call(()=>{
				this.removeChild(speed_eff);
				speed_eff.dispose();
				speed_eff = null;
			},this)

			let critbg = BaseBitmap.create("atkrace_crit_bg");
			critbg.anchorOffsetX = critbg.width / 2;
			critbg.anchorOffsetY = critbg.height / 2;
			critbg.setPosition(GameConfig.stageWidth - critbg.width / 2,this._mazeBM1.y + this._mazeBM1.height / 2);
			critbg.setScale(3);
			critbg.alpha = 0;
			this.addChild(critbg);
			egret.Tween.get(critbg).wait(200).to({scaleX:1,scaleY:1,alpha:1},150).wait(500).to({x:GameConfig.stageWidth + critbg.width},300).call(()=>{
				this.removeChild(critbg);
				critbg.dispose();
				critbg = null;
			},this);

			let critText = BaseBitmap.create("atkrace_crit_text");
			critText.anchorOffsetX = critText.width / 2;
			critText.anchorOffsetY = critText.height / 2;
			critText.setPosition(critbg.x,critbg.y);
			critText.setScale(3);
			critText.alpha = 0;
			this.addChild(critText);
			egret.Tween.get(critText).wait(200).to({scaleX:1,scaleY:1,alpha:1},150).wait(500).to({x:GameConfig.stageWidth + critText.width},300).call(()=>{
				this.removeChild(critText);
				critText.dispose();
				critText = null;
			},this);



			
		},this).wait(1000).call(()=>{
			//音效
			SoundManager.playEffect("effect_acmaze_attack2");
			egret.Tween.get(this._mazeBM1).to({alpha:1},100).to({alpha:0},0);
		},this).wait(130).to({x:this._updateheadBg[this._btnIndex].x + this._updateheadBg[this._btnIndex].width / 2 - this._mazeBM.width / 2 * 0.85,
		y:this._updateheadBg[this._btnIndex].y + this._updateheadBg[this._btnIndex].height / 2,
		scaleX:0.85,scaleY:0.85
		},30).call(()=>{
			let guanyun = BaseBitmap.create("acmazeview_guangyun");
			guanyun.setPosition(this._updateheadBg[this._btnIndex].x + this._updateheadBg[this._btnIndex].width / 2 - guanyun.width / 2,this._updateheadBg[this._btnIndex].y + this._updateheadBg[this._btnIndex].height / 2 - guanyun.height / 2)
			this.addChild(guanyun);
			egret.Tween.get(guanyun).to({alpha:0},100).call(()=>{
				TimerManager.doTimer(10,10,this.playLine_eff,this);
				// egret.Tween.get(this._updateheadBg[this._btnIndex]).to({x:this._updateheadBg[this._btnIndex].x +10,y:this._updateheadBg[this._btnIndex].y + 10},10).to({
				// 	x:this._updateheadBg[this._btnIndex].x - 10,y:this._updateheadBg[this._btnIndex].y - 10
				// },10)
				let ten_eff = ComponentManager.getCustomMovieClip("acmazeten_",7,150);
				this._updateheadBg[this._btnIndex].setVisible(false);
				this._updateBM[this._btnIndex].setVisible(false);
				
				ten_eff.anchorOffsetX = 58;
				ten_eff.anchorOffsetY = 67;
				ten_eff.setScale(2);
				ten_eff.setPosition(guanyun.x + guanyun.width / 2,guanyun.y + guanyun.height / 2,)
				this.addChildAt(ten_eff,2);
				ten_eff.playWithTime(1);
				ten_eff.setEndCallBack(()=>{		
					this._updateheadBg[this._btnIndex].setVisible(true);
					this._updateBM[this._btnIndex].setVisible(true);
					this._isPlayAni = false;
					this.refreshAniView();
					this.refreshTopViewVo();
					this.removeChild(ten_eff);
					ten_eff.dispose();
					ten_eff = null;		
				},this);


			},this).call(()=>{
				this.removeChild(guanyun);
				guanyun.dispose();
				guanyun = null;
			},this);

			
		},this).wait(30).call(()=>{
			this._mazeBM2.setPosition(this._mazeBM.x,this._mazeBM.y);
			this._mazeBM2.alpha = 1;
			this._mazeBM2.setScale(0.85);

			this._mazeBM3.setPosition(this._mazeBM.x,this._mazeBM.y);
			this._mazeBM3.alpha = 1;
			this._mazeBM3.setScale(0.85);

			egret.Tween.get(this._mazeBM2).wait(30).to({x:this._mazeBM1.x,y:this._mazeBM1.y,scaleX:1,scaleY:1},500).to({alpha:0},0);
			egret.Tween.get(this._mazeBM3).wait(60).to({x:this._mazeBM1.x,y:this._mazeBM1.y,scaleX:1,scaleY:1},500).to({alpha:0},0);
		},this).to({x:this._mazeBM1.x,y:this._mazeBM1.y,scaleX:1,scaleY:1},500).wait(200).call(()=>{
			SoundManager.stopEffect("effect_acmaze_attack2");
			this._isSendMessage = false;
			if(this.vo.getMazeNum() > 0)
			{
				this._textbg.setVisible(true);
				this._textBM.setVisible(true);
				this._killText.setVisible(true);
			}
			this._killText.text = String(this.vo.getMazeNum());
			this._killText.anchorOffsetX = this._killText.width / 2;
			this._killText.anchorOffsetY = this._killText.height / 2;
			this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
			ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, {rewards : this._rewardData.rewards, aid : this.aid, code : this.code});
		},this);

	}
	private addHeroFilter(index:number)
	{
		let color_matrix = [ [
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,50,
			0,0,0,1,0
		], [
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,30,
			0,0,0,1,0
		],[
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,50,
			0,0,0,1,0
		]];
		var colorFlilter = new egret.ColorMatrixFilter(color_matrix[index]);
		return colorFlilter;
	}
	private refreshAniView()
	{
		this.refreshTopView();
		if(this._isPlayAni)
		{
			for(let i = 0; i < 3;i++)			
			{
				this._updateBtn[i].setVisible(false);
				this._updateIcon[i].setVisible(false);
				this._updateIconTF[i].setVisible(false);
				this._updateNumTF[i].setVisible(false);
				this._updateYinPiaoIcon[i].setVisible(false);
				this._updateTF[i].setVisible(false);
			}
		}
		else
		{
			for(let i = 0; i < 3;i++)			
			{
				this._updateBtn[i].setVisible(true);
				this._updateIcon[i].setVisible(true);
				this._updateIconTF[i].setVisible(true);
				this._updateNumTF[i].setVisible(true);
				this._updateYinPiaoIcon[i].setVisible(true);
				this._updateTF[i].setVisible(true);
			}
		}
	}
	private playLine_eff()
	{
		this._indexLine_eff = this._indexLine_eff%10;
		let line_effX:number[] = [64,44,2, 41,2,38,-4,-1,20,-35];
		let line_effY:number[] = [50,-35,-3,20,-65,-21,-37,91,44,32];
		let line_effRotation:number[] = [163,124,45,324,110,34,70,40,5,296];
		let line_effScaleX:number[] =[1.23,0.79,0.77,0.71,0.76,0.76,0.76,0.76,0.76,0.76];
		let line_effScaleY:number[] =[0.81,0.89,0.98,0.62,0.9,1.18,0.9,0.9,1.18,1.18];
		let line_eff = ComponentManager.getCustomMovieClip("acmazeline_",7,50);
		line_eff.anchorOffsetX = 45;
		line_eff.anchorOffsetY = 107;
		line_eff.scaleX = line_effScaleX[this._indexLine_eff] * 2;
		line_eff.scaleY = line_effScaleY[this._indexLine_eff] * 2;
		line_eff.rotation = line_effRotation[this._indexLine_eff];
		line_eff.setPosition(this._updateheadBg[this._btnIndex].x + this._updateheadBg[this._btnIndex].width / 2 + line_effX[this._indexLine_eff],this._updateheadBg[this._btnIndex].y + this._updateheadBg[this._btnIndex].height / 2 + line_effY[this._indexLine_eff]);
		this.addChild(line_eff);
		line_eff.playWithTime(1);
		line_eff.setEndCallBack(()=>{
			this.removeChild(line_eff);
			line_eff.dispose();
			line_eff = null;
			if(this._indexLine_eff == 9)
			{
				TimerManager.remove(this.playLine_eff,this);
			}
		},this);
		this._indexLine_eff ++;
				
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.rewardClickHandler,this);
		TimerManager.remove(this.playLine_eff,this);
		TickManager.removeTick(this.tick,this);
		this._isOpen = false;
		this._updateBtn = [];
		this._updateBM = [];
		this._updateTF = [];
		this._updateNumTF = [];
		this._updateheadBg = [];
		this._btnIndex = 0;
		this._isPlayAni = false;
		this._mazeBM = null;
		this._mazeBM1 = null;
		this._mazeBM2 = null;
		this._mazeBM3 = null;
		this._rewardData = null;
		this._indexLine_eff = 0;
		this._updateIcon = [];
		this._updateIconTF = [];
		this._updateYinPiaoIcon = [];
		this._isSendMessage = false;
		this._updateDiscount = [];
		this._textbg = null;
		this. _textBM = null;
		this._killText = null;
		this._timeTF = null;
		this._timeBg = null;
		super.dispose();
	}
}
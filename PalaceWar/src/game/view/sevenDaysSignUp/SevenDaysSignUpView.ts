/**
 * 七日好礼
 * @author 张朝阳
 * date 2019/3/18
 * @class SevenDaysSignUpView
 */
class SevenDaysSignUpView extends CommonView {

	private _loginScrollList: ScrollList = null;
	private _taskScrollList: ScrollList = null;
	private _fqScrollList: ScrollList = null;
	private _tabbar: TabBarGroup = null;
	private _tabbarIndex: number = 0;
	private _dayIndex: number = 0;
	private _btnlist: BaseButton[] = [];
	private _timeTF: BaseTextField = null;
	private _topbg: BaseLoadBitmap = null;
	private _infoBtn: BaseButton = null;
	private _nowType: number = 1;
	private _connerMarker:BaseDisplayObjectContainer = null;

	private _isEnSp:boolean=false;
	private _thisRewards:string=null;
	private _viewlistNum:number = 0;

	public constructor() {
		super();
	}

	private _posCfg = {
		1 : {x : 10, y : 50}, 
		2 : {x : 218, y : 50}, 
		3 : {x : 10, y : 88}, 
		4 : {x : 114, y : 88}, 
		5 : {x : 218, y : 88}, 
		6 : {x : 322, y : 88}, 
		7 : {x : 10, y : 126}, 

	}
	public initView() 
	{
		this._isEnSp = Api.sevenDaysSignupLoginVoApi.isEnSp();
		this._viewlistNum = ViewController.getInstance().getShowedView().length;

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSIGN3REWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGNUP_GEREWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.addNetMessage("sevendaysign", this.payHandle, this);
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.payHandle, this);

		let res = "sevendayssignupview_topbg_" + Api.sevenDaysSignupLoginVoApi.nowType();
		if(PlatformManager.checkIsRuSp()){
			res += `_ru`;
		}
		if(this._isEnSp)
		{
			res += `_en`;
		}
		if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${res}_blueType`)){
			res = `${res}_blueType`;
		}
		this._topbg = BaseLoadBitmap.create(res);
		this._topbg.width = 640;
		this._topbg.height = 233;
		if(this._isEnSp)
		{
			this._topbg.setPosition(0, 90);
		}else
		{
			this._topbg.setPosition(0, -15);
		}
		this.addChildToContainer(this._topbg); 

		this._btnlist.length = 0;
		for (let i = 1; i <= 7; i++) {
			if(PlatformManager.checkIsRuSp() || this._isEnSp)
			{
				let smallBtnRes = "sevendayssignupview_common_smallbtn";
				if(i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
					smallBtnRes = "sevendayssignupview_common_smallredbtn";
				}
				if(i == 1 || i == 2){
					smallBtnRes = `sevendayssignupview_common_bigbtn`;
					if(i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
						smallBtnRes = "sevendayssignupview_common_bigredbtn";
					}
				}
				else if(i == 7){
					smallBtnRes = `sevendayssignupview_common_bigbtn_ru`;
					if(i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
						smallBtnRes = "sevendayssignupview_common_bigredbtn_ru";
					}
				}
				let smallBtn = ComponentManager.getButton(smallBtnRes, "sevenDaysSignUpViewBtn" + i, this.refreshViewByTabbar, this, [i], 3)
				smallBtn.x = this._posCfg[i].x;
				smallBtn.y = this._posCfg[i].y;
				if(this._isEnSp)
				{
					smallBtn.y = this._posCfg[i].y + 110;
				}
				smallBtn.setColor(0x671b0a);
				smallBtn.setTextSize(18);
				if(PlatformManager.checkIsRuSp())
				{
					smallBtn.setText("sevenDaysSignUpViewBtn"+i+'_ru');
				}else if(this._isEnSp)
				{
					smallBtn.setText("sevenDaysSignUpViewBtn"+i+'_en');
				}
				this.addChildToContainer(smallBtn);
				this._btnlist.push(smallBtn)

				if(i == 1 || i == 2){
					let effectRing = BaseBitmap.create("sevendayssignupview_effect_ring");
					effectRing.setPosition(smallBtn.x + smallBtn.width / 2 - effectRing.width / 2, smallBtn.y + smallBtn.height / 2 - effectRing.height / 2);
					this.addChildToContainer(effectRing);
					effectRing.blendMode = egret.BlendMode.ADD;
					effectRing.alpha = 0;

					let effectClip = ComponentManager.getCustomMovieClip("sevendayssignup_effect", 16, 70);
					let effectBM = BaseBitmap.create("sevendayssignup_effect1");
					effectClip.setPosition(smallBtn.x + smallBtn.width / 2 - effectBM.width / 2, smallBtn.y + smallBtn.height / 2 - effectBM.height / 2);
					this.addChildToContainer(effectClip);
					effectClip.blendMode = egret.BlendMode.ADD;

					egret.Tween.get(effectRing, { loop: true }).call(() => {
						effectClip.playWithTime(1);
					}, this).wait(160).to({ alpha: 1 }, 670).to({ alpha: 0.8 }, 500).to({ alpha: 0 }, 1150);
				}
				if(i == 7){
					let effectClip = ComponentManager.getCustomMovieClip("sevendaysignuprueff", 13, 140);
					effectClip.width = 500;
					effectClip.height = 70;
					effectClip.setPosition(-15, smallBtn.y + smallBtn.height / 2 - effectClip.height / 2);
					this.addChildToContainer(effectClip);
					effectClip.blendMode = egret.BlendMode.ADD;
					effectClip.playWithTime(-1);
				}
			}
			else{
				if (i == 1 || i == 3 || i == 6) {
					let smallBtnRes = "sevendayssignupview_common_smallbtn";
					if (i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
						smallBtnRes = "sevendayssignupview_common_smallredbtn";
					}
					let smallBtn = ComponentManager.getButton(smallBtnRes, "sevenDaysSignUpViewBtn" + i, this.refreshViewByTabbar, this, [i])
					smallBtn.x = this._topbg.x + 45;
					if (i == 1) {
						smallBtn.y = this._topbg.y + 60;
					}
					else if (i == 3) {
						smallBtn.y = this._topbg.y + 102;
					}
					else if (i == 6) {
						smallBtn.y = this._topbg.y + 144;
					}
					smallBtn.setColor(0x671b0a);
					smallBtn.setTextSize(18);
					smallBtn.setText("sevenDaysSignUpViewBtn" + i);
					this.addChildToContainer(smallBtn);
					this._btnlist.push(smallBtn);
	
				}
				else if (i == 2 || i == 7) {
					let bigBtnRes = "sevendayssignupview_common_bigbtn";
					if (i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
						bigBtnRes = "sevendayssignupview_common_bigredbtn";
					}
					let bigBtn = ComponentManager.getButton(bigBtnRes, "sevenDaysSignUpViewBtn" + i, this.refreshViewByTabbar, this, [i])
					bigBtn.x = this._topbg.x + 150;
					if (i == 2) {
						bigBtn.y = this._topbg.y + 60;
					}
					else if (i == 7) {
						bigBtn.y = this._topbg.y + 144;
					}
					bigBtn.setColor(0x671b0a);
					bigBtn.setTextSize(18);
					bigBtn.setText("sevenDaysSignUpViewBtn" + i);
					this.addChildToContainer(bigBtn);
	
	
					let effectRing = BaseBitmap.create("sevendayssignupview_effect_ring");
					effectRing.setPosition(bigBtn.x + bigBtn.width / 2 - effectRing.width / 2, bigBtn.y + bigBtn.height / 2 - effectRing.height / 2);
					this.addChildToContainer(effectRing);
					effectRing.blendMode = egret.BlendMode.ADD;
					effectRing.alpha = 0;
	
					let effectClip = ComponentManager.getCustomMovieClip("sevendayssignup_effect", 16, 70);
					let effectBM = BaseBitmap.create("sevendayssignup_effect1");
					effectClip.setPosition(bigBtn.x + bigBtn.width / 2 - effectBM.width / 2, bigBtn.y + bigBtn.height / 2 - effectBM.height / 2);
					this.addChildToContainer(effectClip);
					effectClip.blendMode = egret.BlendMode.ADD;
	
					egret.Tween.get(effectRing, { loop: true }).call(() => {
						effectClip.playWithTime(1);
					}, this).wait(160).to({ alpha: 1 }, 670).to({ alpha: 0.8 }, 500).to({ alpha: 0 }, 1150);
	
					this._btnlist.push(bigBtn)
				}
				else if (i == 4 || i == 5) {
					let smallBtnRes = "sevendayssignupview_common_smallbtn";
					if (i == Api.sevenDaysSignupLoginVoApi.nowDay()) {
						smallBtnRes = "sevendayssignupview_common_smallredbtn";
					}
					let smallBtn = ComponentManager.getButton(smallBtnRes, "sevenDaysSignUpViewBtn" + i, this.refreshViewByTabbar, this, [i])
					smallBtn.y = this._topbg.y + 102;
					if (i == 4) {
						smallBtn.x = this._topbg.x + 150;
					}
					else if (i == 5) {
						smallBtn.x = this._topbg.x + 254;
					}
					smallBtn.setColor(0x671b0a);
					smallBtn.setTextSize(18);
					smallBtn.setText("sevenDaysSignUpViewBtn" + i);
					this.addChildToContainer(smallBtn);
	
					this._btnlist.push(smallBtn)
				}
			}
		}
		this._nowType = Api.sevenDaysSignupLoginVoApi.nowType();

		let btnRes = "sevendayssignupview_infobtn_" + Api.sevenDaysSignupLoginVoApi.nowType();
		if(PlatformManager.checkIsRuSp()){
			btnRes = `sevendayssignupview_infobtn_2`;
		}
		if(this._isEnSp)
		{
			btnRes = `sevendayssignupview_infobtn_2`;
		}
		this._infoBtn = ComponentManager.getButton(btnRes, null, () => {
			if(PlatformManager.checkIsRuSp())
			{
				let needstr = ``;//LanguageManager.getlocal("sevenDaysSignUpViewTip3");;
				let wifId = Config.WifeCfg.formatRewardItemVoStr(310);
				let sid = Config.ServantCfg.formatRewardItemVoStr(1050);
				let skinid = Config.WifeskinCfg.formatRewardItemVoStr(3101);
				let showType = '';
				if (this._nowType == 1) {
					showType = sid;
				}
				else if (this._nowType == 2) {
					showType = wifId;
				}
				else if (this._nowType == 7) {
					showType = skinid;
				}
				let data = {data:[
					{idType: sid, topMsg:LanguageManager.getlocal("sevenDaysSignUpViewTip3_1"), bgName:"", scale: 0.63, title:`` },
					{idType: wifId, topMsg:LanguageManager.getlocal("sevenDaysSignUpViewTip3_2"), bgName:"", scale: 0.6, title:``},
					{idType: skinid, topMsg: LanguageManager.getlocal("sevenDaysSignUpViewTip3_3"), bgName:"", scale: 0.6, title:``},
			   ], showType:showType};
				ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
			}
			else if(this._isEnSp)
			{
				let needstr = ``;//LanguageManager.getlocal("sevenDaysSignUpViewTip3");;
				let wifId = Config.WifeCfg.formatRewardItemVoStr(310);
				let sid = Config.ServantCfg.formatRewardItemVoStr(1050);
				let skinid = Config.WifeskinCfg.formatRewardItemVoStr(3101);
				let showType = '';
				if (this._nowType == 1) {
					showType = sid;
				}
				else if (this._nowType == 2) {
					showType = wifId;
				}
				else if (this._nowType == 7) {
					showType = skinid;
				}
				let data = {data:[
					{idType: sid, topMsg:LanguageManager.getlocal("sevenDaysSignUpViewTip4_1"), bgName:"", scale: 0.63, title:`` },
					{idType: wifId, topMsg:LanguageManager.getlocal("sevenDaysSignUpViewTip4_2"), bgName:"", scale: 0.6, title:``},
					{idType: skinid, topMsg: LanguageManager.getlocal("sevenDaysSignUpViewTip4_3"), bgName:"", scale: 0.6, title:``},
			   ], showType:showType};
				ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);				
			}
			else{
				if (this._nowType == 2) {
					ViewController.getInstance().openView(ViewConst.POPUP.SEVENDAYSSINGNUPSERVANTINFOPOPUPVIEW);
				}
				else {
					ViewController.getInstance().openView(ViewConst.POPUP.SEVENDAYSSINGNUPWIFEINFOPOPUPVIEW);
				}
			}
		}, this);
		this._infoBtn.setPosition(this._topbg.x + this._topbg.width - this._infoBtn.width - 15, this._topbg.y + this._topbg.height - this._infoBtn.height - 5);
		if(PlatformManager.checkIsRuSp()){
			this._infoBtn.x += 17;
		}
		else if(this._isEnSp)
		{
			this._infoBtn.x += 17;
		}
		else{
			if(PlatformManager.checkIsTextHorizontal()){
				this._infoBtn.setPosition(this._topbg.x + this._topbg.width - 260,this._topbg.y  + 15);
			}
		}
		
		this.addChildToContainer(this._infoBtn);

		let timecnstr = this._isEnSp ? "sevenDaysSignUpViewTime_en" : "sevenDaysSignUpViewTime";
		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal(timecnstr), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeTF.setPosition(203 - this._timeTF.width / 2, this._topbg.y + this._topbg.height - 18 - this._timeTF.height / 2);
		this.addChildToContainer(this._timeTF);

		let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		bottomBg.width = 640;
		bottomBg.height = GameConfig.stageHeigth - this.getTitleButtomY() - this._topbg.height + 15 - 3;
		bottomBg.setPosition(0, this._topbg.y + this._topbg.height - 5);
		this.addChildToContainer(bottomBg);

		let midbg = BaseBitmap.create("public_9_bg21");// -85 - 30
		midbg.width = 610;
		midbg.height = bottomBg.height - 80 - 25;
		midbg.setPosition(bottomBg.x + bottomBg.width / 2 - midbg.width / 2, bottomBg.y + 80);
		this.addChildToContainer(midbg);

		let tabbarText = ["sevenDaysSignUpViewTab1", "sevenDaysSignUpViewTab2", "sevenDaysSignUpViewTab3"];
		if(this._isEnSp)
		{
			bottomBg.visible = false;
			midbg.visible = false;

			let tabbg = BaseBitmap.create("commonview_tabbar_bg");
			tabbg.x = 10;
			tabbg.y = this._topbg.y+this._topbg.height;;
			tabbg.height = 70;
			this.addChildToContainer(tabbg);

			let framebg = BaseBitmap.create("commonview_bigframe");
			framebg.x = 0;
			framebg.y = this._topbg.y+this._topbg.height;
			framebg.width = GameConfig.stageWidth;
			framebg.height = GameConfig.stageHeigth - framebg.y;
			this.addChildToContainer(framebg);		

			this._tabbar = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB,tabbarText,this.tabbarClick,this);
			this._tabbar.setSpace(0);
			this._tabbar.setColor(0xe1ba86,0x472c26);
			this._tabbar.setPosition(10, bottomBg.y + 6);
			this.addChildToContainer(this._tabbar);
		}else
		{
			this._tabbar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabbarText, this.tabbarClick, this);
			this._tabbar.setPosition(30, bottomBg.y + 23);
			this.addChildToContainer(this._tabbar);
		}		

		let rect = new egret.Rectangle(0, 0, midbg.width - 10, midbg.height - 10);
		if(this._isEnSp)
		{
			rect.height += 20;
		}

		this._loginScrollList = ComponentManager.getScrollList(SevenDaysSignUpLoginScrollItem, null, rect, { signUpItemCfg: Config.SevendayssignupCfg.getSignUpCfgById("1") });
		this._loginScrollList.setPosition(midbg.x + midbg.width / 2 - this._loginScrollList.width / 2, midbg.y + midbg.height / 2 - this._loginScrollList.height / 2);
		this.addChildToContainer(this._loginScrollList);

		this._taskScrollList = ComponentManager.getScrollList(SevenDaysSignUpTaskScrollItem, null, rect, { day: 1 });
		this._taskScrollList.setPosition(midbg.x + midbg.width / 2 - this._taskScrollList.width / 2, midbg.y + midbg.height / 2 - this._taskScrollList.height / 2);
		this.addChildToContainer(this._taskScrollList);

		this._fqScrollList = ComponentManager.getScrollList(SevenDaysSignUpFqScrollItem, null, rect, { day: 1 });
		this._fqScrollList.setPosition(midbg.x + midbg.width / 2 - this._fqScrollList.width / 2, midbg.y + midbg.height / 2 - this._fqScrollList.height / 2);
		this.addChildToContainer(this._fqScrollList);

		if(this._isEnSp)
		{
			this._loginScrollList.y += 5;
			this._taskScrollList.y += 5;
			this._fqScrollList.y += 5;
		}

		this.tabbarClick({ index: 0 });
		this.refreshViewByTabbar(Api.sevenDaysSignupLoginVoApi.nowDay());

		this.tick();
	}
	public tick() {
		let timecnstr = this._isEnSp ? "sevenDaysSignUpViewTime_en" : "sevenDaysSignUpViewTime";
		this._timeTF.text = LanguageManager.getlocal(timecnstr, [Api.sevenDaysSignupLoginVoApi.CountDownTime()]);
		this._timeTF.x = 203 - this._timeTF.width / 2;

		let num = ViewController.getInstance().getShowedView().length;
		if(num == this._viewlistNum)
		{
			this.onThisTopHandler();
		}
	}
	/**刷新按钮 */
	private refreshBtn(index) {
		for (let i = 0; i < this._btnlist.length; i++) {
			if (i == index) {
				this._btnlist[i].updateButtonImage(BaseButton.BTN_STATE2);
				this._btnlist[i].touchEnabled = false;
			}
			else {
				this._btnlist[i].updateButtonImage(BaseButton.BTN_STATE1);
				this._btnlist[i].touchEnabled = true;
			}
			if (Api.sevenDaysSignupLoginVoApi.checkSingleLoginShowRedDot(i + 1) || Api.sevenDaysSignupLoginVoApi.checkSinfleTaskShowRedDot(i + 1) || Api.sevenDaysSignupLoginVoApi.checkSingleReadShowRedDot(i + 1)) {
				App.CommonUtil.addIconToBDOC(this._btnlist[i]);
			}
			else {
				App.CommonUtil.removeIconFromBDOC(this._btnlist[i]);
			}

		}
	}
	/**标签刷新 */
	private refreshViewByTabbar(data, isRequest: boolean = false) {
		if (this._dayIndex == Number(data) && isRequest == false) {
			return;
		}
		this._dayIndex = Number(data);
		let signUpItemCfg = Config.SevendayssignupCfg.getSignUpCfgById(String(this._dayIndex));
		if(PlatformManager.checkIsRuSp() && this._dayIndex == 1){
			this._loginScrollList.refreshData([1, 2, 3], { signUpItemCfg: signUpItemCfg,});
		}
		else if(this._isEnSp && this._dayIndex == 1){
			this._loginScrollList.refreshData([1, 2, 3], { signUpItemCfg: signUpItemCfg,});
		}
		else{
			this._loginScrollList.refreshData([1, 2], { signUpItemCfg: signUpItemCfg });
		}
		

		// let taskCfg = Config.SevendayssignupCfg.getTaskCfgById(String(this._dayIndex));
		let taskCfg = Api.sevenDaysSignupLoginVoApi.getSortTask(this._dayIndex)
		taskCfg.sort((a, b) => {
			return a.sortId - b.sortId;
		})
		this._taskScrollList.refreshData(taskCfg, { day: this._dayIndex });

		let pic = Config.SevendayssignupCfg.getPicCfgById(String(this._dayIndex));
		let picInfoList: { id: string, titleNumber: number }[] = [];
		for (let key in pic.pic) {
			// let picInfo: { id: string, titleNumber: number };
			// picInfo.id = key;
			// picInfo.titleNumber = pic.pic[key];
			picInfoList.push({ id: key, titleNumber: pic.pic[key][0] });
		}
		picInfoList.push({ id: "signUp3",titleNumber:0});

		this._fqScrollList.refreshData(picInfoList, { day: this._dayIndex });

		this.refreshBtn(Number(data) - 1);
		this.refreshViewByTopBgAndInfoBtn();
		this.refreshViewByTabbarRedDot();
	}
	/**刷新标签的小红点 */
	private refreshViewByTabbarRedDot() {
		if (Api.sevenDaysSignupLoginVoApi.checkSingleLoginShowRedDot(this._dayIndex)) {
			this._tabbar.addRedPoint(0);
		}
		else {
			this._tabbar.removeRedPoint(0);
		}
		if (Api.sevenDaysSignupLoginVoApi.checkSinfleTaskShowRedDot(this._dayIndex)) {
			this._tabbar.addRedPoint(1);
		}
		else {
			this._tabbar.removeRedPoint(1);
		}
		if (Api.sevenDaysSignupLoginVoApi.checkSingleReadShowRedDot(this._dayIndex)) {
			this._tabbar.addRedPoint(2);
		}
		else {
			this._tabbar.removeRedPoint(2);
		}
	}
	/**刷新界面资源 */
	private refreshViewByTopBgAndInfoBtn() {
		if(PlatformManager.checkIsRuSp())
		{
			if (this._dayIndex <= 2) {
				this._nowType = this._dayIndex;
			}
			else if (this._dayIndex == 7) {
				this._nowType = 7;
			}
			else {
				this._nowType = Api.sevenDaysSignupLoginVoApi.nowType();
			}
		}
		else if(this._isEnSp)
		{
			if (this._dayIndex <= 2) {
				this._nowType = this._dayIndex;
			}
			else{
				this._nowType = 7;
			}
		}
		else{
			if (this._dayIndex == 2) {
				this._nowType = 2;
			}
			else if (this._dayIndex == 7) {
				this._nowType = 7;
			}
			else {
				this._nowType = Api.sevenDaysSignupLoginVoApi.nowType();
			}
		}
		let res = "sevendayssignupview_topbg_" + this._nowType;
		if(PlatformManager.checkIsRuSp()){
			res += `_ru`;
		}
		if(this._isEnSp){
			res += `_en`;
		}		
		if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${res}_blueType`)){
			res = `${res}_blueType`;
		}
		this._topbg.setload(res);
		if(PlatformManager.checkIsRuSp() || this._isEnSp){

		}
		else{
			this._infoBtn.setBtnBitMap("sevendayssignupview_infobtn_" + this._nowType);
		}

		if (this._connerMarker)
		{
			this._connerMarker.dispose();
			this._connerMarker = null;
		}
		if ((PlatformManager.checkIsRuSp()&&this._nowType==1) || (this._isEnSp&&this._nowType==1) || (!PlatformManager.checkIsRuSp()&&!this._isEnSp&&this._nowType==2))
		{
			let servantCfg = Config.ServantCfg.getServantItemById("1050");
			if(servantCfg.quality2 )
			{
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 400;
				cornerImg.y = 200;
				this.addChild(cornerImg);
				this._connerMarker = cornerImg;

				if (PlatformManager.checkIsRuSp())
				{
					cornerImg.x = 440;
				}
				if(this._isEnSp)
				{
					cornerImg.x = 440;
				}
			}
		}

	}

	private tabbarClick(data: any) {
		this._tabbarIndex = data.index;
		if (this._tabbarIndex == 0) {
			this._loginScrollList.visible = true;
			this._taskScrollList.visible = false;
			this._fqScrollList.visible = false;
		}
		else if (this._tabbarIndex == 1) {
			this._loginScrollList.visible = false;
			this._taskScrollList.visible = true;
			this._fqScrollList.visible = false;
		}
		else if (this._tabbarIndex == 2) {
			this._loginScrollList.visible = false;
			this._taskScrollList.visible = false;
			this._fqScrollList.visible = true;
		}
	}
	/**登陆的奖励领取 */
	private sevenLoginRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			this._thisRewards = rewards;
			
			let rewardVoList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);
			// this.refreshViewByTabbar(this._dayIndex, true);
		}
	}
	private onThisTopHandler():void
	{
		if(this._thisRewards)
		{
			let itemstrarr:string[] = this._thisRewards.split("|");
			for(let i = 0; i < itemstrarr.length; i++)
			{
				if(itemstrarr[i].split("_")[1] == "1050")
				{
					ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPFIRSHOWVIEW);
					this.refreshViewByTabbar("2");
					this._thisRewards = null;
					break;
				}
				if(itemstrarr[i].split("_")[1] == "310")
				{
					ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPLASSHOWVIEW);
					this.refreshViewByTabbar("7");
					this._thisRewards = null;
					break;
				}				
			}
		}
	}	
	private payHandle() {
		this.refreshViewByTabbar(this._dayIndex, true);
	}
	protected getRuleInfo(){
		return "sevenDaysSignUpView_RuleInfo"
	}
	protected getRuleBtnName():string
	{	
		if(Api.sevenDaysSignupLoginVoApi.isEnSp())
		{
			return ButtonConst.BTN2_RULE;
		}else
		{
			return ButtonConst.BTN_RULE;
		}
	}	
	protected getTitleBgName():string
	{
		if(Api.sevenDaysSignupLoginVoApi.isEnSp())
		{
			return 'sevendayssignuptitle_en';
		}else
		{
			return "commonview_titlebg"+this.uiType;
		}
	}	
	protected getTitleStr():string
	{
		if(Api.sevenDaysSignupLoginVoApi.isEnSp())
		{
			return null;
		}
		return App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
	}	
	protected getResourceList(): string[] {
		let arr = [
			"sevendayssignupview_common_smallbtn_down", "sevendayssignupview_common_smallbtn",
			"sevendayssignupview_common_bigbtn_down", "sevendayssignupview_common_bigbtn",
			"activity_charge_red","shopview_greenbar", "sevendayssignupview_common_unbegin", "sevendayssignup_effect",
			"sevendayssignupview_effect_ring", "sevendayssignupview_common_smallredbtn", "sevendayssignupview_common_bigredbtn",
			"sevendayssignupview_common_smallredbtn_down", "sevendayssignupview_common_bigredbtn_down",
		];
		if(PlatformManager.checkIsRuSp()){
			arr.push(`sevendayssignupview_topbg_1_ru`,`sevendayssignupview_topbg_2_ru`,`sevendayssignupview_topbg_7_ru`,`sevendayssignupview_common_bigbtn_ru_down`,`sevendayssignupview_common_bigbtn_ru`,`sevendayssignupview_common_bigredbtn_ru`);
		}
		if(Api.sevenDaysSignupLoginVoApi.isEnSp()){
			arr.push(`sevendayssignupview_topbg_1_en`,`sevendayssignupview_topbg_2_en`,`sevendayssignupview_topbg_7_en`,`sevendayssignupview_common_bigbtn_ru_down`,`sevendayssignupview_common_bigbtn_ru`,`sevendayssignupview_common_bigredbtn_ru`,
			"sevendayssignuptitle_en","commonview_bigframe","commonview_tabbar_bg","shopview_itemtitle","public_popupscrollitembg",
			"public_scrolllistbg");
		}		
		return super.getResourceList().concat(arr);
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSIGN3REWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD, this.sevenLoginRewardHandle, this);
		App.MessageHelper.removeNetMessage("sevendaysign", this.payHandle, this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.payHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SEVENDAYSIGNUP_GEREWARD, this.sevenLoginRewardHandle, this);
		this._btnlist.length = 0;
		this._loginScrollList = null;
		this._taskScrollList = null;
		this._fqScrollList = null;
		this._dayIndex = 0;
		this._tabbarIndex = 0;
		this._tabbar = null;
		this._timeTF = null;
		this._topbg = null;
		this._infoBtn = null;
		this._nowType = null;
		this._connerMarker = null;

		super.dispose();
	}
}

/**
 * 才情加成
 * author jiangliuyang
 */
class AcCrossServerWifeTalentPlusPopupView extends PopupView
{
	// 滑动列表

	
	private bottomBg : BaseBitmap = null;
    //////////////////////////////////
	//才情总览按钮
	private _allTalentBtn:BaseButton = null;
	//去册封按钮
	private _plusBtn:BaseButton = null;
	//册封加成描述
	private _plusDesc:BaseTextField = null;

	private _rankText:BaseTextField = null;
	private _nameText:BaseTextField = null;
	private _scoreText:BaseTextField = null;
	private _descText:BaseTextField = null;

	///////////////////////////////////
	private _plusDesc2:BaseTextField = null;
	private _acDesc:BaseTextField = null;
	private _rankText2:BaseTextField = null;
	private _nameText2:BaseTextField = null;
	private _scoreText2:BaseTextField = null;
	private _descText2:BaseTextField = null;

	//去提升按钮
	private _plusBtn2:BaseButton = null;
	
	private _scrollList1 = null;
	private _scrollList2 = null;

	private _isHaveBuff = null;
	public constructor() 
	{
		super();
	}

	private checkHaveBuff():boolean
	{
		return true;
	}

	private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
    }
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
 		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acsweetgift_make_infobg-1","progress3","progress3_bg",
		]);
	}

	private modelRefresh()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.modelRefresh,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.hide,this);
	}
	

	public initView():void
	{		
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.modelRefresh,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,{activeId:this.vo.aidAndCode});

		let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,528,435);

		let view = this;
		let add: number = this.vo.test ? 0 : this.vo.wifebattlecross.info.tmpattr.statusadd;  //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
		let statusadd:number = add?add:0;//Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
		let titleBg = BaseBitmap.create("acsweetgift_make_infobg-1");
        titleBg.width =scrollListBgRect.width; //538
		titleBg.scaleY= 100/188;
        titleBg.x = this.viewBg.width / 2 - titleBg.width/2;
        titleBg.y = 10;
        this.addChildToContainer(titleBg);
		this["titleBg1"] = titleBg;

		let plusDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1",[(statusadd).toFixed(0)]),20,TextFieldConst.COLOR_BROWN);
		plusDesc.x = titleBg.x + 35;
		plusDesc.y = titleBg.y + 35;
		this._plusDesc = plusDesc;
		this.addChildToContainer(plusDesc);

		this._allTalentBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewAllBtn",this.goPlusHandler,this);
		this._allTalentBtn.x = titleBg.x + titleBg.width - 40 - this._allTalentBtn.width;
		this._allTalentBtn.y = titleBg.y + titleBg.height*titleBg.scaleY/2 - this._allTalentBtn.height/2;
		this.addChildToContainer(this._allTalentBtn);
		
		let model = this.vo.wifebattlecross;//Api.wifebattleVoApi.wifebattleVo;
		let allTalentValue =  this.vo.test ? 0 : model.info.totaltalent;
		let actadd =   this.vo.test ? 0 : model.info.tmpattr.actadd;

		let rankBuff = 0;
		let titleBg2 = undefined;

		let bg2= BaseBitmap.create("public_line3");
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeTalentPlusPopupViewTab1`),22,TextFieldConst.COLOR_BLACK);
		bg2.width = tipTxt.textWidth + 290;
        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = titleBg.y + titleBg.height*titleBg.scaleY + 10;
		this.addChildToContainer(bg2);
		
		tipTxt.x = this.viewBg.width/2 - tipTxt.width/2;
        tipTxt.y = bg2.y + (bg2.height - tipTxt.height) / 2;
		this.addChildToContainer(tipTxt);

		let contentBg = BaseBitmap.create("public_9_bg36");
		contentBg.width = scrollListBgRect.width; //538
		contentBg.height =485; //666
		contentBg.x = this.viewBg.width / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = tipTxt.y + tipTxt.textHeight + 10;
		view.addChildToContainer(contentBg);

		let bg1= BaseBitmap.create("public_9_bg33");
		bg1.width = contentBg.width;
		bg1.height = 30;
		bg1.x = this.viewBg.width/2 - titleBg.width/2;
		bg1.y = contentBg.y;
        this.addChildToContainer(bg1);

		let bottomBg = BaseBitmap.create("public_9_bg1");
		bottomBg.width = bg1.width;;
		bottomBg.height = 92;
		bottomBg.setPosition(contentBg.x,contentBg.y + contentBg.height + 9);
		view.bottomBg = bottomBg;
		this.addChildToContainer(bottomBg);

		let scroRect = new egret.Rectangle(0, 0, contentBg.width, contentBg.height - 15 - bg1.height);
		let infoList:any[] =[];

		let wifestatusList:Array<Config.WifestatusItemCfg> = Config.WifestatusCfg.getWifestatusList();
		let maxNum = 0;
		for(let i = 0;i<wifestatusList.length;i++){
			if(wifestatusList[i].maxNum){
				maxNum += wifestatusList[i].maxNum;
			}
		}

		for(let j = 1; j <= maxNum;j++ )
		{
			let obj = null;
			let effect = Config.WifebattleCfg.talentStatusBuff * j;
			if(effect <= statusadd){
				obj = {level:j,num:j, effect:effect, isused:true};
			} else {
				obj = {level:j,num:j, effect:effect, isused:false};
			}
			
			infoList.push(obj);
		}

		this._scrollList1 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem, infoList, scroRect);
		this._scrollList1.x = this.viewBg.width/2 - this._scrollList1.width/2;
		this._scrollList1.y = bg1.y + bg1.height + 5;
		this.addChildToContainer(this._scrollList1);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(100 +GameData.popupviewOffsetX, bg1.y+bg1.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);
		this._rankText = rankText

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(225 +GameData.popupviewOffsetX, rankText.y);
		this.addChildToContainer(nameText);
		this._nameText = nameText

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(430 +GameData.popupviewOffsetX, rankText.y);
		this.addChildToContainer(scoreText);
		this._scoreText = scoreText

		let descText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		descText.x = bottomBg.x + 25;
		descText.y = bottomBg.y + bottomBg.height/2 - descText.height/2;
		descText.textAlign = egret.HorizontalAlign.CENTER;
		this.addChildToContainer(descText);
		this._descText = descText

		let plusBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewBtn",this.goStatus,this);
		plusBtn.x = bottomBg.x + bottomBg.width - 20 - plusBtn.width;
		plusBtn.y = bottomBg.y + bottomBg.height/2 - plusBtn.height/2;
		this.addChildToContainer(plusBtn);
		this._plusBtn = plusBtn;
		//--------------------
		// if(this.checkHaveBuff()){
		// 	let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// 	rankText2.setPosition(100 , bg1.y+bg1.height/2 - rankText2.height/2);
		// 	this.addChildToContainer(rankText2);
		// 	this._rankText2 = rankText2

		// 	let nameText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// 	nameText2.setPosition(225 , rankText2.y);
		// 	this.addChildToContainer(nameText2);
		// 	this._nameText2 = nameText2

		// 	let scoreText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// 	scoreText2.setPosition(430 , rankText2.y);
		// 	this.addChildToContainer(scoreText2);
		// 	this._scoreText2 = scoreText2

		// 	let descText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// 	descText2.x = bottomBg.x + 40;
		// 	descText2.y = bottomBg.y + bottomBg.height/2 - descText2.height/2;
		// 	descText2.textAlign = egret.HorizontalAlign.CENTER;
		// 	this.addChildToContainer(descText2);
		// 	this._descText2 = descText2
			
		// 	let plusBtn2:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewBtn2",this.goPlusHandler,this);
		// 	plusBtn2.x = bottomBg.x + bottomBg.width - 20 - plusBtn2.width;
		// 	plusBtn2.y = bottomBg.y + bottomBg.height/2 - plusBtn2.height/2;
		// 	this.addChildToContainer(plusBtn2);
		// 	this._plusBtn2 = plusBtn2;
		// }
		

		//--------------------
		let wifestatusView = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
		if(wifestatusView && wifestatusView.isShow()){
			plusBtn.visible = false;
			descText.x = bottomBg.x +bottomBg.width/2- descText.width/2;
		}

		this.clickTabbarHandler({index:0});

	}

	private goStatus(){
		ViewController.getInstance().hideAllView();
		ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);

	}
	protected goPlusHandler(){

		// let viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);//hideAllView
		// ViewController.getInstance().hideAllView();
		
		if(!this.checkCanJoin()){
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleUpLockDesc"));
			return;
		}

		ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW,{
			aid:this.param.data.aid,
			code:this.param.data.code
		});
		this.hide();
		AcCrossServerWifeBattleView.isOpenWin = true;
		// this.hide();
	}
	//检测是否有红颜获得位分
	public checkCanJoin():boolean
	{
		let wifestatusVoObj:Object = Api.wifestatusVoApi.getWifestatusVo().info;
		let unlockCount = Config.WifebattleCfg.unlock_wifeStar;
		let curCount = 0;
		for(let key in wifestatusVoObj)
		{
			for (var index = 0; index < wifestatusVoObj[key].length; index++) {
				curCount ++;
				if(curCount >= unlockCount){
					return true;
				}	
			}
		}
		return false;
	}



	protected clickTabbarHandler(params:any){
		let view = this;
		super.clickTabbarHandler(params);

		if(params.index == 1){
			this._allTalentBtn.visible = false;
			this._plusBtn.visible = false;
			this._plusDesc.visible = false;
			this._rankText.visible = false;
			this._nameText.visible = false;
			this._scoreText.visible = false;
			this._descText.visible = false;
			this._scrollList1.visible = false;
			if(this._plusDesc2){
				this._plusDesc2.visible = true;
				this._acDesc.visible = true;
				this._rankText2.visible = true;
				this._nameText2.visible = true;
				this._scoreText2.visible = true;
				this._descText2.visible = true;
				this._plusBtn2.visible = true;
				this._scrollList2.visible = true;
			}
			this["titleBg1"].visible = false;
			if(this["lvtxt1"]){
				this["lvtxt1"].visible =  this["lvtxt2"].visible =  this["ruleBtn"].visible =  this["progressBar"].visible =  this["titleBg2"].visible = true;
			}
		} else {

			this._allTalentBtn.visible = true;
			this._plusBtn.visible = true;
			this._plusDesc.visible = true;
			this._rankText.visible = true;
			this._nameText.visible = true;
			this._scoreText.visible = true;
			this._descText.visible = true;
			this._scrollList1.visible = true;
			if(this._plusDesc2){
				this._plusDesc2.visible = false;
				this._acDesc.visible = false;
				this._rankText2.visible = false;
				this._nameText2.visible = false;
				this._scoreText2.visible = false;
				this._descText2.visible = false;
				this._plusBtn2.visible = false;
				this._scrollList2.visible = false;
			}
			if(this["lvtxt1"]){
				this["lvtxt1"].visible =  this["lvtxt2"].visible =  this["ruleBtn"].visible =  this["progressBar"].visible =  this["titleBg2"].visible = false;
			}
			this["titleBg1"].visible = true;
		}


	}

	// protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
	// 	// --返回 data.rankArr 所有人排行信息
	// 	// --返回 data.myrankArr 我的排行信息
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
	// }
	private showBuffLvUI(param:any)
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW,{p:param,aid:this.param.data.aid,code:this.param.data.code});
	}
	protected getShowHeight():number{
 		return 830;
	}
	
	protected getTitleStr():string{
		return 'wifeTalentPlusPopupViewTitle';
	}

	private refreshList():void
	{

	}
	public hide():void{
		AcCrossServerWifeBattleView.isOpenWin = false;
		super.hide();
	}


	public dispose():void{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.modelRefresh,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.hide,this);
			this.bottomBg  = null;
    //////////////////////////////////
	//才情总览按钮
		this._allTalentBtn = null;
	//去册封按钮
		this._plusBtn = null;
	//册封加成描述
		this._plusDesc = null;

		this._rankText = null;
		this._nameText = null;
		this._scoreText = null;
		this._descText = null;

	///////////////////////////////////
		this._plusDesc2 = null;
		this._acDesc = null;
		this._rankText2 = null;
		this._nameText2 = null;
		this._scoreText2 = null;
		this._descText2 = null;

	//去提升按钮
		this._plusBtn2 = null;
	
		this._scrollList1 = null;
		this._scrollList2 = null;
		this._isHaveBuff = null;
		super.dispose();
	}
}
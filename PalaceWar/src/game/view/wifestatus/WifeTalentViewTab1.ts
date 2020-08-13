/**
 * 标签1 册封加成
 * author qianjun
 */
class WifeTalentViewTab1 extends ViewTab {
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
		
		private _scrollList1:ScrollList= null;
		private _scrollList2:ScrollList = null;
		private _acVo = null;
	
		private _isHaveBuff = null;
		public constructor() 
		{
			super();
			this.initView();
		}
	
		// protected getRequestData():{requestType:string,requestData:any}
		// {
		// 	return {requestType:NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,requestData:{}};
		// }
	
		// protected request(requestType:string,requestData:any):void
		// {
		// 	console.log("refreshed----");
		// 	this.initView();
		// }
	 
		private tick(){
			if(!this._acVo){
				this._acVo = this.getAcVo();
			}
			if(!this._acVo){
				return;
			}
			let t = this._acVo.et - GameData.serverTime - 86400 * 1;
	
			let isHaveBuff = false;
			if(t > 0){
				isHaveBuff = true;
			} else {
				isHaveBuff = false;
			}
	
			if(this._isHaveBuff != null && isHaveBuff != this._isHaveBuff){
				App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
				NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,{});
				// this.hide();
			}
	
			this._isHaveBuff = isHaveBuff;
	
	
		}
		private checkHaveBuff():boolean
		{
			let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
			for(let i in modelList){
				let unit = modelList[i];
				if(unit.atype == `22`){
					let t = unit.et - GameData.serverTime - 86400 * 1;
					if(t>0){
						return true;
					}
				}
			}
			return false;
		}
		private getAcVo():AcBaseVo
		{
			let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
			for(let i in modelList){
				let unit = modelList[i];
				if(unit.atype == `22`){
					let t = unit.et - GameData.serverTime - 86400 * 1;
					if(t>0){
						return unit;
					}
				}
			}
			return null;
	
		}
	
		private getCfg() {
			return Config.WifebattleCfg;
		}
	
		protected getResourceList():string[]
		{
			return super.getResourceList().concat([
				"acsweetgift_make_infobg-1","progress3","progress3_bg",`wifeview_artistryicon`,
			]);
		}
	
		private modelRefresh()
		{
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.modelRefresh,this);
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
	
	
			// this._scrollList2 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, scroRect);
			if(this._scrollList2){
				let infoList2 = [];
				if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
					infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
				}
	
				infoList2 = infoList2?infoList2:[];
				this._scrollList2.refreshData(infoList2);
			}
			
		}
		
	
		public initView():void
		{		
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.modelRefresh,this);
			NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,{});
	
			let scrollListBgRect=egret.Rectangle.create();
			scrollListBgRect.setTo(0,0,614,435);
			let view = this;
			let add:number = 0;
			if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd){
				add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
			}
			let statusadd:number = add?add:0;//Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
			let titleBg = BaseBitmap.create("wifetalenttopbg");
			titleBg.width =scrollListBgRect.width; //538
			titleBg.scaleY= 150/118;
			titleBg.x = GameConfig.stageWidth / 2 - titleBg.width/2;
			titleBg.y = 15;
			this.addChild(titleBg);
			this["titleBg1"] = titleBg;
	
			let plusDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1",[(statusadd).toFixed(0)]),20,TextFieldConst.COLOR_WARN_YELLOW2);
			plusDesc.x = titleBg.x + 35;
			plusDesc.y = titleBg.y + 45;
			this._plusDesc = plusDesc;
			this.addChild(plusDesc);

			let plusDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewTip"),20,TextFieldConst.COLOR_BROWN);
			plusDesc2.lineSpacing = 8;
			plusDesc2.x = plusDesc.x;
			plusDesc2.y = plusDesc.y + plusDesc.textHeight + 8;
			this.addChild(plusDesc2);
	
			this._allTalentBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"wifeTalentPlusPopupViewBtn",this.goStatus,this);
			this._allTalentBtn.x = titleBg.x + titleBg.width - 40 - this._allTalentBtn.width;
			this._allTalentBtn.y = titleBg.y + 60;
			this.addChild(this._allTalentBtn);
			
			let model = Api.wifebattleVoApi.wifebattleVo;
			let allTalentValue = model.info.totaltalent;
			let actadd =  0;
			if(model.info.tmpattr && model.info.tmpattr.actadd){
				actadd = model.info.tmpattr.actadd
			}		
		
			let contentBg = BaseBitmap.create("public_9_bg32");
			contentBg.width = scrollListBgRect.width; //538
			contentBg.height = GameConfig.stageHeigth - 170 - titleBg.height * titleBg.scaleY - 23; //666
			contentBg.x = GameConfig.stageWidth / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
			contentBg.y = titleBg.y + titleBg.height * titleBg.scaleY + 8;
			view.addChild(contentBg);

			let title= BaseBitmap.create("qingyuanitemtitlebg");
			title.width = contentBg.width - 20;
			title.x = contentBg.x + contentBg.width/2 - title.width/2;
			title.y = contentBg.y + 10;
			this.addChild(title);
	
			let scroRect = new egret.Rectangle(0, 0, title.width, contentBg.height - 20 - title.height);
			let infoList:any[] =[];
	
			let wifestatusList:Array<Config.WifestatusItemCfg> = Config.WifestatusCfg.getWifestatusList();
			let maxNum = 0;
			for(let i = 0;i<wifestatusList.length;i++){
				if(wifestatusList[i].maxNum){
					maxNum += wifestatusList[i].maxNum;
				}
			}
	
			let index = 0;
			for(let j = 1; j <= maxNum;j++ )
			{
				let obj = null;
				let effect = Config.WifebattleCfg.talentStatusBuff * j;
				if(effect <= statusadd){
					if(effect == statusadd){
						index = j - 1;
					}
					obj = {level:j,num:j, effect:effect, isused:true};
				} else {
					obj = {level:j,num:j, effect:effect, isused:false};
				}
				
				infoList.push(obj);
			}
	
			this._scrollList1 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem, infoList, scroRect);
			this._scrollList1.x = GameConfig.stageWidth/2 - this._scrollList1.width/2;
			this._scrollList1.y = title.y + title.height + 7;
			this.addChild(this._scrollList1);

			// if(this.checkHaveBuff()){
			// 	this._plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcDesc",[""+rankBuff]),20,TextFieldConst.COLOR_BROWN);
			// 	this._plusDesc2.width = 450;
			// 	this._plusDesc2.x = titleBg2.x + 35;
			// 	this._plusDesc2.y = titleBg2.y + 35;
			// 	this.addChild(this._plusDesc2);
	
			// 	let acTime = this.getAcVo().getAcLocalTime();
			// 	// this._acDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcStr",[acTime]),20,0x46fe3c);
			// 	this._acDesc = ComponentManager.getTextField(acTime,20,TextFieldConst.COLOR_WARN_GREEN);
			// 	this._acDesc.width = 450;
			// 	this._acDesc.x = this._plusDesc2.x;
			// 	this._acDesc.y = this._plusDesc2.y + this._plusDesc2.height + 5;
			// 	this.addChild(this._acDesc);
	
			// 	let infoList2 = [];
			// 	if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
			// 		infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
			// 	}
			// 	infoList2 = infoList2?infoList2:[];
			// 	this._scrollList2 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, scroRect);
			// 	this._scrollList2.x = this.viewBg.width/2 - this._scrollList2.width/2;
			// 	this._scrollList2.y = bg2.y + bg2.height + 5;
			// 	this.addChild(this._scrollList2);
			// }
	
			let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			rankText.setPosition(100 , title.y+title.height/2 - rankText.height/2);
			this.addChild(rankText);
			this._rankText = rankText
	
			let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			nameText.setPosition(225 , rankText.y);
			this.addChild(nameText);
			this._nameText = nameText
	
			let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			scoreText.setPosition(430 , rankText.y);
			this.addChild(scoreText);
			this._scoreText = scoreText;
	
			//--------------------
			// if(this.checkHaveBuff()){
			// 	let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			// 	rankText2.setPosition(100 , bg1.y+bg1.height/2 - rankText2.height/2);
			// 	this.addChild(rankText2);
			// 	this._rankText2 = rankText2
	
			// 	let nameText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			// 	nameText2.setPosition(225 , rankText2.y);
			// 	this.addChild(nameText2);
			// 	this._nameText2 = nameText2
	
			// 	let scoreText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			// 	scoreText2.setPosition(430 , rankText2.y);
			// 	this.addChild(scoreText2);
			// 	this._scoreText2 = scoreText2
	
			// 	let descText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			// 	descText2.x = bottomBg.x + 25;
			// 	descText2.y = bottomBg.y + bottomBg.height/2 - descText2.height/2;
			// 	descText2.textAlign = egret.HorizontalAlign.CENTER;
			// 	this.addChild(descText2);
			// 	this._descText2 = descText2
				
			// 	let plusBtn2:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewBtn2",this.goPlusHandler,this);
			// 	plusBtn2.x = bottomBg.x + bottomBg.width - 20 - plusBtn2.width;
			// 	plusBtn2.y = bottomBg.y + bottomBg.height/2 - plusBtn2.height/2;
			// 	this.addChild(plusBtn2);
			// 	this._plusBtn2 = plusBtn2;
			// }
			this._scrollList1.setScrollTopByIndex(index);
		}
	
		private goStatus(){
			let viewList : any = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
			if(viewList && viewList._isShow){
				let WifeTalentView = ViewController.getInstance().getView(`WifeTalentView`);
				if(WifeTalentView){
					WifeTalentView.hide();
				}
			}
			else{
				ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);

				let WifeTalentView = ViewController.getInstance().getView(`WifeTalentView`);
				if(WifeTalentView){
					WifeTalentView.hide();
				}

				let wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.WIFEBATTLEVIEW);
				if(wifebattle){
					wifebattle.hide();
				}
			}
			
			
		}
		// protected goPlusHandler(){
	
			
			
		// 	if(!this.checkCanJoin()){
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleUpLockDesc"));
		// 		return;
		// 	}
		// 	let viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);//hideAllView
		// 	if(viewList){

		// 	}
		// 	else{
		// 		ViewController.getInstance().openView(ViewConst.COMMON.WIFEALLTALENTVIEW);
		// 	}
		// 	//ViewController.getInstance().hideAllView();
		// 	// ViewController.getInstance().openView(ViewConst.COMMON.WIFEALLTALENTVIEW);
		// }
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
	
		// protected getRequestData():{requestType:string,requestData:any}
		// {
		// 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
		// 	// --返回 data.rankArr 所有人排行信息
		// 	// --返回 data.myrankArr 我的排行信息
		// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
		// }
		private showBuffLvUI(param:any)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW,param);
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
			super.hide();
		}
	
	
		public dispose():void{
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.modelRefresh,this);
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
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
			this._acVo = null;
			this._isHaveBuff = null;
			super.dispose();
		}
}
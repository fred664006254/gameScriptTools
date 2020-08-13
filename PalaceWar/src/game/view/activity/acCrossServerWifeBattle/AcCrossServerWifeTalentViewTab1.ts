/**
 * 标签1 册封加成
 * author qianjun
 */
class AcCrossServerWifeTalentViewTab1 extends ViewTab {
		// 滑动列表

	
		private bottomBg : BaseBitmap = null;
		//////////////////////////////////
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
	
		private _isHaveBuff = null;
		public constructor(data?) 
		{
			super();
			this.param = data;
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

		private checkHaveBuff():boolean
		{
			return true;
		}

		protected getResourceList():string[]
		{
			return super.getResourceList().concat([
				"acsweetgift_make_infobg-1","progress3","progress3_bg",`wifeview_artistryicon`,
			]);
		}
	
		private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
			return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
		}
		private get vo() : AcCrossServerWifeBattleVo{
			return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
		}
		
	
		public initView():void
		{		
			let scrollListBgRect=egret.Rectangle.create();
			scrollListBgRect.setTo(0,0,614,435);
			let view = this;
			let model = this.vo.wifebattlecross;//Api.wifebattleVoApi.wifebattleVo;
			let add:number = 0;
			if(model && model.info && model.info.tmpattr && model.info.tmpattr.statusadd){
				add = model.info.tmpattr.statusadd;
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

			
			let allTalentValue = 0;
			let actadd =  0;
			if(model && model.info && model.info.tmpattr && model.info.tmpattr.actadd){
				actadd = model.info.tmpattr.actadd
				allTalentValue = model.info.totaltalent;
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

			this._scrollList1.setScrollTopByIndex(index);
		}
	
		private goStatus(){
			let viewList : any = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
			if(viewList && viewList._isShow){
				// let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
				// if(WifeTalentView){
				// 	WifeTalentView.hide();
				// }
			}
			else{
				ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);

				// let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
				// if(WifeTalentView){
				// 	WifeTalentView.hide();
				// }

				// let wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW);
				// if(wifebattle){
				// 	wifebattle.hide();
				// }
			}
			
			
		}

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
			this.bottomBg  = null;
		//////////////////////////////////
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
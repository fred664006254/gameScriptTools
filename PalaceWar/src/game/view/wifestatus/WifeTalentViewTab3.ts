/**
 * 标签3 文思泉涌
 * author qianjun
 */
class WifeTalentViewTab3 extends ViewTab {
	private _scrollList:ScrollList = null;
	private _allTalentTxt:BaseTextField = null;
	private _descTxt:BaseTextField = null;
	private _acTxt:BaseTextField = null;

	private _barWifeTxt:BaseTextField = null;
	private _barStatusTxt:BaseTextField = null;
	private _caiyiTxt:BaseTextField = null;
	private _caiqingTxt:BaseTextField = null;
	private _orderImg:BaseButton = null;
	private _opTxt:BaseTextField = null;
	private _title:BaseBitmap = null;

	private _isOrderDown: boolean = true;
	private _acVo = null;
	private _isHaveBuff = null;

	public constructor() {
		super();
		this.initView();
	}

	public initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH,this.refreshList,this);
		let isHaveBuff = false;
		let h = 80;
		if(this.checkHaveBuff()){
			isHaveBuff = true;
			h = 168;
		}
		let topBg = BaseBitmap.create("wifetalenttopbg");
		topBg.width = 614;
		topBg.x = 640/2 - topBg.width/2;
		topBg.height = 200;
		topBg.y = 15;
		this.addChild(topBg);

		let acTime = this.getAcVo().getAcLocalTime(true);
		this._acTxt = ComponentManager.getTextField(acTime,20,TextFieldConst.COLOR_BLACK);
		this._acTxt.x = topBg.x + topBg.width / 2 - this._acTxt.width / 2;
		this._acTxt.y = topBg.y + 40;
		this.addChild(this._acTxt);

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeBattleAllTalentDesc2`), 20, TextFieldConst.COLOR_BLACK);
		tiptxt.x = this._acTxt.x + this._acTxt.width / 2 - tiptxt.width / 2;
		tiptxt.y = this._acTxt.y + this._acTxt.height + 5;
		tiptxt.lineSpacing = 5;
		tiptxt.textAlign = egret.HorizontalAlign .CENTER;
		this.addChild(tiptxt);


		let model = Api.wifebattleVoApi.wifebattleVo;
		let plusv = model.info.totaltactadd?model.info.totaltactadd:0;
		let rankBuff = 0;
		let titleBg2 = BaseBitmap.create("public_9_managebg");
		titleBg2.width = 560; //538
		titleBg2.height = 65; //666
		titleBg2.x = topBg.x + topBg.width / 2 - titleBg2.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		titleBg2.y = tiptxt.y + tiptxt.height + 10;
		this.addChild(titleBg2);;

		if(this.checkHaveBuff()){
			let rcfg = Config.WifebattleCfg;
			let wifeBattleBuff = rcfg.wifeBattleBuff;
			let curlv = 1;
			let maxV = 0;
			let artsum = model.info.artsum?model.info.artsum:0;
			for (let index = 0; index < wifeBattleBuff.length; index++) {
				let element = wifeBattleBuff[index];
				let artistryRange = element.artistryRange;
				if(artistryRange[0]<=artsum && artsum <= artistryRange[1])
				{
					rankBuff = element.rankBuff;
					maxV = artistryRange[1];
					break;
				}
				++curlv;
			}
			let nextAdd = 0;
			let lvStr = ""
			let lvStr2 = ""
			let percV = 0;
			let percStr = ""
			if(curlv < wifeBattleBuff.length){
				nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
				lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[""+curlv ])  ;
				lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2",["1",""+nextAdd]);
				percV = artsum /maxV;
				percStr = artsum+"/"+ maxV ;
			}else{
				let paramStr = LanguageManager.getlocal("wifeSkillMaxShow");
				lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[paramStr])  ;
				nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
				lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2",["1",""+nextAdd]);
				percV = 1.0;
				percStr =paramStr;
			}
			// if(curlv == )
			maxV +=1;
			//才情当前等级txt1
			let lvtxt1 = ComponentManager.getTextField(lvStr,18,TextFieldConst.COLOR_WARN_YELLOW2);
			lvtxt1.setPosition(titleBg2.x+15 , titleBg2.y+7);
			this.addChild(lvtxt1);

			let lvtxt2 = ComponentManager.getTextField(lvStr2 ,18,TextFieldConst.COLOR_WARN_YELLOW2);
			lvtxt2.setPosition(lvtxt1.x + lvtxt1.width + 30 , lvtxt1.y);
			this.addChild(lvtxt2);

			let progressBar = ComponentManager.getProgressBar("progress3","progress3_bg",460);
			progressBar.x = titleBg2.x+7;
			progressBar.y = lvtxt1.y + lvtxt1.textHeight + 5;
			progressBar.setTextSize(18);
			progressBar.setPercentage( percV);
			progressBar.setText( percStr);
			this.addChild(progressBar);
			
			let ruleBtn = ComponentManager.getButton("btn_rule","",this.showBuffLvUI,this,[wifeBattleBuff]);
			//ruleBtn.setScale(0.65);
			ruleBtn.x = progressBar.x + progressBar.width + 10;
			ruleBtn.y = titleBg2.y + (titleBg2.height - ruleBtn.height * ruleBtn.scaleY) / 2 + 3;
			this.addChild(ruleBtn);


			this["lvtxt1"] = lvtxt1;
			this["lvtxt2"] = lvtxt2;
			this["ruleBtn"] = ruleBtn;
			this["progressBar"] = progressBar;
			this["titleBg2"] = titleBg2;
		}
		//边框
		let borderBg = BaseBitmap.create("public_9_bg32");
		borderBg.width = 610;
		borderBg.height =  GameConfig.stageHeigth - 143 - 215-40-8+20; //666
		borderBg.x = 320-borderBg.width/2;
		borderBg.y = topBg.y + topBg.height * topBg.scaleY + 8;
		this.addChild(borderBg);

		let title= BaseBitmap.create("qingyuanitemtitlebg");
		title.width = borderBg.width - 20;

        title.x = borderBg.x + borderBg.width/2 - title.width/2;
        title.y = borderBg.y + 15;
		this._title = title;
        this.addChild(title);

		this._barWifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._barWifeTxt.x = title.x + 47;
		this._barWifeTxt.y = title.y + title.height/2 - this._barWifeTxt.height/2;
		this.addChild(this._barWifeTxt);

		this._barStatusTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarStatus"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._barStatusTxt.x = 198- 19 - this._barStatusTxt.height/2;
		this._barStatusTxt.y = title.y + title.height/2 - this._barStatusTxt.height/2;
		this.addChild(this._barStatusTxt);

		this._caiyiTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._caiyiTxt.x = 280-23 - this._caiyiTxt.height/2;
		this._caiyiTxt.y = title.y + title.height/2 - this._caiyiTxt.height/2;
		this.addChild(this._caiyiTxt);

		this._caiqingTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._caiqingTxt.x = 400 - 16 - this._caiqingTxt.height/2;
		this._caiqingTxt.y = title.y + title.height/2 - this._caiqingTxt.height/2;
		this.addChild(this._caiqingTxt);

		this._opTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarOp"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._opTxt.x = 505;
		this._opTxt.y = title.y + title.height/2 - this._opTxt.height/2;
		this.addChild(this._opTxt);

		this._orderImg = ComponentManager.getButton("wifebattleview_updown",null,this.orderHandler,this,null,3);
		this._orderImg.scaleY = -1
		this._orderImg.x = this._caiqingTxt.x + this._caiqingTxt.width - 50;
		this._orderImg.y = title.y + title.height/2 - this._orderImg.height * this._orderImg.scaleY/2;
		// this._orderImg.y = title.y + title.height/2 - this._orderImg.height/2;
		this.addChild(this._orderImg);

		let rect = new egret.Rectangle(0,0,600,borderBg.height - 70);

		// let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		// let list = [];
		// if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
		// 	list = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
		// }
		// list = list?list:[];
		// list.sort((a,b)=>{
		// 	return b.talentadd - a.talentadd;
		// });
		let infoList2 = [];
		if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
			infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
		}
		infoList2 = infoList2?infoList2:[];
		infoList2.sort((a,b)=>{
			let levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
			let levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));

			if(levela == 1 && levelb > 1){
				return 1;
			}
			else if(levelb == 1 && levela > 1){
				return -1;
			}
			else{
				return b.talentadd - a.talentadd;
			}
			
		});
		// let wifelist = Api.wifeVoApi.getWifeInfoVoList();
		// for(let i in wifelist){
		// 	let unit = wifelist[i];
		// 	if(Api.wifestatusVoApi.getWifestatusLevelById(unit.id.toString()) == "1"){
		// 		infoList2.push(element);
		// 	}
		// }
		this._scrollList = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, rect);
		this._scrollList.x = 320 - this._scrollList.width/2;
		this._scrollList.y = title.y+title.height + 5;
		this.addChild(this._scrollList);
	}

	private freshView():void{
		let model = Api.wifebattleVoApi.wifebattleVo;
		let plusv = model.info.totaltactadd?model.info.totaltactadd:0;
		let rankBuff = 0;
		let rcfg = Config.WifebattleCfg;
		let wifeBattleBuff = rcfg.wifeBattleBuff;
		let curlv = 1;
		let maxV = 0;
		let artsum = model.info.artsum?model.info.artsum:0;
		for (let index = 0; index < wifeBattleBuff.length; index++) {
			let element = wifeBattleBuff[index];
			let artistryRange = element.artistryRange;
			if(artistryRange[0]<=artsum && artsum <= artistryRange[1])
			{
				rankBuff = element.rankBuff;
				maxV = artistryRange[1];
				break;
			}
			++curlv;
		}
		let nextAdd = 0;
		let lvStr = ""
		let lvStr2 = ""
		let percV = 0;
		let percStr = ""
		if(curlv < wifeBattleBuff.length){
			nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
			lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[""+curlv ])  ;
			lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2",["1",""+nextAdd]);
			percV = artsum /maxV;
			percStr = artsum+"/"+ maxV ;
		}else{
			nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
			lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2",["1",""+nextAdd]);
			let paramStr = LanguageManager.getlocal("wifeSkillMaxShow");
			lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[paramStr])  ;
			percV = 1.0;
			percStr =paramStr;
		}
		// if(curlv == )
		maxV +=1;

		this["lvtxt1"].text = lvStr;
		this["lvtxt2"].text = lvStr2;
		this["progressBar"].setPercentage( percV);
		this["progressBar"].setText( percStr);
	}
 
 	private orderHandler():void
	{
		this._isOrderDown = !this._isOrderDown;
		if(this._isOrderDown){
			this._orderImg.scaleY = -1;
		} else {
			this._orderImg.scaleY = 1;
		}
		this._orderImg.y = this._title.y + this._title.height/2 - this._orderImg.height * this._orderImg.scaleY/2;

		this.refreshList();
	}

	private showBuffLvUI(param:any)
	{
		ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW,param);
	}

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

	// private tick(){
    //     if(!this._acVo){
    //         this._acVo = this.getAcVo();
    //     }
    //     let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     if(t<0){
    //          App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //          this.hide();
    //     } 
    // }
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
	
	private getCfg(){
        return Config.WifebattleCfg;
	}
	
	private refreshList():void
	{

		let model = Api.wifebattleVoApi.wifebattleVo;
		let plusv = model.info.totaltactadd?model.info.totaltactadd:0;

		let list = [];
		if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
			list = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
		}
		list = list?list:[];
		if(this._isOrderDown){
			list.sort((a,b)=>{
				let levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
				let levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));
	
				if(levela == 1 && levelb > 1){
					return 1;
				}
				else if(levelb == 1 && levela > 1){
					return -1;
				}
				else{
					return b.talentadd - a.talentadd;
				}
				
			});
			this._scrollList.refreshData(list);
		} else {
			list.sort((a,b)=>{
				let levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
				let levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));
	
				if(levela == 1 && levelb > 1){
					return 1;
				}
				else if(levelb == 1 && levela > 1){
					return -1;
				}
				else{
					return a.talentadd - b.talentadd;
				}  
				
			});
			this._scrollList.refreshData(list);
		}
		this.freshView();

	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH,this.refreshList,this);
		this._scrollList = null;
		this._allTalentTxt = null;
		this._descTxt = null;
	

		this._barWifeTxt = null;
		this._barStatusTxt = null;
		this._caiyiTxt = null;
		this._caiqingTxt = null;
		this._orderImg = null;
		this._opTxt = null;
		this._title = null;

		this._isOrderDown = true;

		this._acVo = null;
		this._isHaveBuff = null;
		this._acTxt = null;
		super.dispose();
	}
}
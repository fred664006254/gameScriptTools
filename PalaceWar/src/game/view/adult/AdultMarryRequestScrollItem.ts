/**
 *向我提亲的子嗣列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
class AdultMarryRequestScrollItem extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	private _timeText : BaseTextField;
	private _childInfo:any;
	private _timer : any;
	
	public constructor() 
	{
		super();
	}
	//{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
	public initItem(index:number,childInfo:any):void
	{
		this.width = 618;
		this.height = 208+this.getSpaceY();
		
		// childInfo.total
		this._childInfo = childInfo;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg31");
		bg.width = this.width;
		bg.height = 208;
		bg.x = 5;
		// nameBg.x = 25;
		// nameBg.y = 40;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_smallbg");
		this.addChild(childbg);
		childbg.x = bg.x + 10;
		childbg.y = bg.y + bg.height/2 - childbg.height/2;

		let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
		bg2.width = 370;
		bg2.height = 100;
		bg2.x = childbg.x + childbg.width + 10;
		bg2.y = childbg.y + 10;
		this.addChild(bg2);
		let iconStr = "adult_boy";
		if(childInfo.sex == 2){
			iconStr = "adult_girl";
		}	
		if(Api.switchVoApi.checkOpenAdultImage() && childInfo.aquality != 7){
			iconStr = `adult_${childInfo.sex}_${childInfo.aquality}`;
		}
		
		let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
		qualityBg.x = childbg.x + 10;
		qualityBg.y = childbg.y + 10;
		this.addChild(qualityBg);

		let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + childInfo.aquality);
		qualityBB.x = childbg.x + 10;
		qualityBB.y = childbg.y + 15;
		qualityBB.setScale(0.7);
		this.addChild(qualityBB);
		if(PlatformManager.checkIsThSp())
		{
			qualityBB.setPosition(qualityBg.x + qualityBg.width / 2 - qualityBB.width / 2,qualityBg.y + qualityBg.height / 2 - qualityBB.height / 2 + 7);
		}

		let icon:BaseLoadBitmap = BaseLoadBitmap.create(iconStr);
		icon.x = bg.x + 40;
		icon.y = 20;
		icon.setScale(0.45)
		this.addChild(icon);

		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		nameTF.x = bg2.x + 5;
		nameTF.y = bg2.y + 7;
		this.addChild(nameTF);

		let fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
		let fatherTF = ComponentManager.getTextField(fatherStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		fatherTF.x = nameTF.x;
		fatherTF.y = nameTF.y + nameTF.height + 10;
		this.addChild(fatherTF);

		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		attrTF.x = nameTF.x;
		attrTF.y = fatherTF.y + nameTF.height + 10;
		this.addChild(attrTF);
		//新增亲家
		if(Api.adultVoApi.judgeIsSudan(childInfo.uid)){
			let info = Api.adultVoApi.getFreiendNums(childInfo.uid);
			let friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums',[info.num.toString()]), 20, TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.righttop, friendnum, bg2, [13,7]);
			this.addChild(friendnum);

			let progress = ComponentManager.getProgressBar("progress11","progress11_bg",102);
			this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, friendnum, [0,friendnum.textHeight + 10]);
			this.addChild(progress);
			progress.setPercentage(info.percent, LanguageManager.getlocal(`adultFriendDesc${info.quality}`), TextFieldConst.COLOR_WHITE);
			//this.setLayoutPosition(LayoutConst.righttop, lynumTxt, bg2, [5,7]);
			progress.setTextSize(18);
			//属性加成
			if(!childInfo.visittype){
				// let str = '';//Api.adultVoApi.getVisitLevel(childInfo);
			
				// if(childInfo.visit == bData.uid){
				// 	baifang = true;
				// }
				
				// hufang = baifang && laifang;
				// if(hufang){
				// 	str = 'adulthavehufang';
				// }else if(baifang){
				// 	str = 'adulthavevisit';
				// }else if(laifang){
				// 	str = 'adulthavevisited';
				// }
				
				// if(childInfo.visit == Api.playerVoApi.getPlayerID()){
				// 	laifang = true;
				// }
				let level = 0;
				let childInfoList = Api.adultVoApi.getAdultVoListByIdByAttr(this._childInfo.aquality,this._childInfo.sex);
				if(childInfoList.length){
					let baifang = false;
					let laifang = false;
					let hufang = false;

					if(childInfo.visit == Api.playerVoApi.getPlayerID()){
						laifang = true;
					}
					for(let i in childInfoList){
						let unit = childInfoList[i];
						if(unit.visit == childInfo.uid){
							baifang = true;
							break;
						}
					}
					hufang = baifang && laifang;

					if(hufang){
						level = 3;
					}else if(baifang){
						level = 1;
					}else if(laifang){
						level = 2;
					}
				}
				if(level){
					let arrtnum = Config.SadunCfg[`addExtent${level == 3 ? 2 : 1}`] * 100;
					let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${level}`,[arrtnum.toString()]), 20, 0x3e9b00);
					this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
					this.addChild(attradd);
				}
				
				// let visitlevel = Api.adultVoApi.getVisitLevel(childInfo);
				// if(visitlevel){
				// 	let arrtnum = Config.SadunCfg[`addExtent${visitlevel == 3 ? 2 : 1}`] * 100;
				// 	let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${visitlevel}`,[arrtnum.toString()]), 20, 0x3e9b00);
				// 	this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
				// 	this.addChild(attradd);
				// }
			}
		}
		else{
			let lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums',[Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30,0]);
			this.addChild(lynumTxt);
		}

		let tipbg = BaseBitmap.create('public_9_bg15');
		tipbg.width = 180;
		tipbg.height = 30;
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0,10]);
		this.addChild(tipbg);

		let lastTime = 0;
		if(this._childInfo.et){
			lastTime = this._childInfo.et - GameData.serverTime;
		}
		this._timeText = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeText, tipbg);
		this.addChild(this._timeText);

		//绑定计时器
		if(1){
			this.clearTimer();
			this._timer = new egret.Timer(1000);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
			this._timer.start();
			this.show_round();
		}
		

		let str1 = '' ,str2 = '';
		if(childInfo.visittype){
			str1 = "adultvisitaccept";
			str2 = "adultvisitrefuse";
		}
		else{
			let costStr = LanguageManager.getlocal("adultMarryRequestCost");
			let costTF = ComponentManager.getTextField(costStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.lefttop, costTF, bg2, [5,bg2.height + 5]);
			this.addChild(costTF);

			let gemBg = BaseLoadBitmap.create("itemicon1");
			gemBg.setScale(0.45);
			this.setLayoutPosition(LayoutConst.lefttop, gemBg, costTF, [-20,costTF.textHeight-5]);
			this.addChild(gemBg);

			let costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;

			let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

			let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
			let costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
			let costNum = costGem.toString();

			let costNumTF = ComponentManager.getTextField(costNum,18,TextFieldConst.COLOR_WARN_GREEN2);
			this.setLayoutPosition(LayoutConst.lefttop, costNumTF, costTF, [23, costTF.textHeight + 10]);
			this.addChild(costNumTF);
			str1 = "adultMarryRequestChooseChild";
			str2 = "adultMarryRequestRefuse";
		}
		//choose
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str1, this.chooseBtnClick,this);
		// chooseBtn.x = refuseBtn.x + refuseBtn.width + 5;
		// chooseBtn.y = costTF.y + costTF.height + 7;
		this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [10,20]);
		this.addChild(chooseBtn);
		chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		//拒绝
		let refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, str2, this.refuseBtnClick,this);
		//this.setLayoutPosition(LayoutConst.);
		this.setLayoutPosition(LayoutConst.lefttop, refuseBtn, chooseBtn, [-refuseBtn.width - 15,0]);
		this.addChild(refuseBtn);
		refuseBtn.setColor(TextFieldConst.COLOR_BLACK);
	}

	private show_round():void{
		let lastTime = this._childInfo.et - GameData.serverTime;
		this._timeText.text = App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd");
		if(lastTime <= 0){
			if(this._childInfo.visittype){
				Api.adultVoApi.param = [this._childInfo.name,this._childInfo.fatherName];
				NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
					fchildId : this._childInfo.id, 
					fuid : this._childInfo.uid 
				});
			}
			else{
			}
		}
	}

    private refuseBtnClick()
    {
		if(this._childInfo.visittype){
			Api.adultVoApi.param = [this._childInfo.name,this._childInfo.fatherName];
			NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
				fchildId : this._childInfo.id, 
				fuid : this._childInfo.uid 
			});
			Api.adultVoApi.param = [this._childInfo.name, Api.adultVoApi.getSadunInfoByUid(this._childInfo.uid).name];
		}
		else{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,{"id":this._childInfo.id,"childId":this._childInfo.id});
		}
	}

	private chooseBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		if(this._childInfo.visittype){
			//弹出接待列表
			ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSERECEICEVIEW,{"childInfo":this._childInfo});
		}
		else{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,{"childInfo":this._childInfo});
		}
	}
	
	private clearTimer():void{
		let view = this;
		if(view._timer){
            view._timer.stop();
			view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
			view._timer = null;
		}
	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._intimacyTF = null;
		this._childInfo = null;
		this._timeText = null;
		this.clearTimer();
		super.dispose();
	}
}
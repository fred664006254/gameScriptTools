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
		this.height = 185+this.getSpaceY();
		
		// childInfo.total
		this._childInfo = childInfo;
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width-5;
		bg.height = 185;
		bg.x = 5;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_middlebg");
		this.addChild(childbg);
		childbg.x = bg.x + 6;
		childbg.y = bg.y + bg.height/2 - childbg.height/2-4;

		// let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
		// bg2.width = 370;
		// bg2.height = 100;
		// bg2.x = childbg.x + childbg.width + 10;
		// bg2.y = childbg.y + 10;
		// this.addChild(bg2);
		let iconStr = "adult_boy";
		if(childInfo.sex == 2){
			iconStr = "adult_girl";
		}	


		let icon:BaseBitmap = BaseBitmap.create(iconStr);
		icon.x = bg.x + 40;
		icon.y = 13;
		icon.setScale(0.42)
		this.addChild(icon);
		
		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		nameTF.x = childbg.x + childbg.width + 10;
		nameTF.y = childbg.y + 7;
		this.addChild(nameTF);

		let fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
		let fatherTF = ComponentManager.getTextField(fatherStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		fatherTF.x = nameTF.x;
		fatherTF.y = nameTF.y + 27;
		this.addChild(fatherTF);

		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		attrTF.x = nameTF.x;
		attrTF.y = fatherTF.y + 27;
		this.addChild(attrTF);
		//新增亲家
		if(Api.adultVoApi.judgeIsSudan(childInfo.uid)){
			let info = Api.adultVoApi.getFreiendNums(childInfo.uid);
			let friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums',[info.num.toString()]), 20, TextFieldConst.COLOR_BROWN);
			// this.setLayoutPosition(LayoutConst.righttop, friendnum, bg2, [13,7]);
			friendnum.x = fatherTF.x + 280;
			friendnum.y = fatherTF.y ;
			this.addChild(friendnum);

			let progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",120);
			this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, friendnum, [0,friendnum.textHeight + 10]);
			this.addChild(progress);
			progress.setPercentage(info.percent, LanguageManager.getlocal(`adultFriendDesc${info.quality}`), TextFieldConst.COLOR_WHITE);
			//this.setLayoutPosition(LayoutConst.righttop, lynumTxt, bg2, [5,7]);
			progress.setTextSize(16);
			//属性加成
			if(!childInfo.visittype){
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
			}
		}
		else{
			let lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums',[Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BROWN);
			// this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30,0]);
			lynumTxt.x = fatherTF.x + 240;
			lynumTxt.y = fatherTF.y ;
			this.addChild(lynumTxt);
		}

		let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
		qualityBg.x = childbg.x + 10;
		qualityBg.y = childbg.y + 10;
		qualityBg.setScale(0.7);
		this.addChild(qualityBg);

		let qualityBB:BaseBitmap = BaseLoadBitmap.create("adult_q" + childInfo.aquality);
		qualityBB.width = 46;
		qualityBB.height = 156;
		qualityBB.x = childbg.x + 10;
		qualityBB.y = childbg.y + 15;
		qualityBB.setScale(0.7);
		this.addChild(qualityBB);
		

		let tipbg = BaseBitmap.create('servant_middlebg');
		tipbg.width = 180;
		tipbg.height = 30;
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0,10]);
		this.addChild(tipbg);

		if(PlatformManager.checkIsTextHorizontal()){
			qualityBg.rotation = -90;
			qualityBg.x = childbg.x + 40;
			qualityBg.y = childbg.y + childbg.height - 30;
			qualityBB.width = 156;
			qualityBB.height = 46 ;
			qualityBB.x =  qualityBg.x;
			qualityBB.y =  qualityBg.y - 32;
			this.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, childbg, [0,0]);
		}

		let lastTime = 0;
		if(this._childInfo.et){
			lastTime = this._childInfo.et - GameData.serverTime;
		}
		this._timeText = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeText, tipbg);
		this.addChild(this._timeText);

		//绑定计时器
		if(1){
			this.clearTimer();
			this._timer = new egret.Timer(1000);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
			this._timer.start();
		}


		let str1 = '' ,str2 = '';
		if(childInfo.visittype){
			str1 = "adultvisitaccept";
			str2 = "adultvisitrefuse";
		}
		else{
			let costStr = LanguageManager.getlocal("adultMarryRequestCost");
			let costTF = ComponentManager.getTextField(costStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			costTF.x = nameTF.x;
			costTF.y = attrTF.y + 27;
			this.addChild(costTF);


			let gemBg = BaseLoadBitmap.create("itemicon1");
			gemBg.setScale(0.35);
			gemBg.x = costTF.x + costTF.width - 7;
			gemBg.y = 90-2;
			this.addChild(gemBg);

			let costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
			let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

			let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
			let costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
			let costNum = costGem + "/" + itemCfg.name;

			let costNumTF = ComponentManager.getTextField(costNum,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			costNumTF.x = nameTF.x + 110;
			costNumTF.y = costTF.y;
			this.addChild(costNumTF);                           
			
			str1 = "adultMarryRequestChooseChild";
			str2 = "adultMarryRequestRefuse";
		}
		// //拒绝
		//choose
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str1, this.chooseBtnClick,this);
		this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [17,25]);
		this.addChild(chooseBtn);
		//拒绝
		let refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, str2, this.refuseBtnClick,this);
		this.setLayoutPosition(LayoutConst.lefttop, refuseBtn, chooseBtn, [-refuseBtn.width - 10,0]);
		this.addChild(refuseBtn);

	}

	private show_round():void{
		let lastTime = this._childInfo.et - GameData.serverTime;
		this._timeText.text = App.DateUtil.getFormatBySecond(lastTime, 1) + LanguageManager.getlocal("adultTimeEnd");
		if(lastTime <= 0){
			this._timeText.text = '';
			NetManager.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
			if(this._childInfo.visittype){
				NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
					fchildId : this._childInfo.id, 
					fuid : this._childInfo.uid 
				});
			}
		}
	}

    private refuseBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		if(this._childInfo.visittype){
			NetManager.request(NetRequestConst.REQUEST_SADUN_REFUSEVISIT, {
				fchildId : this._childInfo.id, 
				fuid : this._childInfo.uid 
			});
			App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive', [this._childInfo.name, Api.adultVoApi.getSadunInfoByUid(this._childInfo.uid).name]));
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
			ViewController.getInstance().openView(ViewConst.COMMON.ADULTCHOOSERECEICEVIEW,{"childInfo":this._childInfo});
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
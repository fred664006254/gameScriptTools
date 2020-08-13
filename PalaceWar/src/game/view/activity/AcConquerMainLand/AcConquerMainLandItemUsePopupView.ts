/**
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
class AcConquerMainLandItemUsePopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	private _txt2:BaseTextField;
	public constructor() 
	{
		super();
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	protected getTitleStr():string{
		return `itemUsePopupViewTitle`;
	}
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}

	protected initView():void
	{
		let view = this;
		let rewardstr = this.vo.checkIsJJL ? "1059" : "1016";
		let itemInfoVo:RewardItemVo = GameData.formatRewardItem(rewardstr+`_1_0_${view.getUiCode()}`)[0];
		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let itemName:string = itemInfoVo.name;
		let iconPic:string = itemInfoVo.icon;
		let effectDesc:string = itemInfoVo.desc;
		this._maxNum = view.vo.getItemNum();
		if(this.param.data.maxNum){
			this._maxNum = Math.min(this.param.data.maxNum,view.vo.getItemNum());
		} 
		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let temX = 35+GameData.popupviewOffsetX;
		let temY = 23;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);
		
		//点击物品增加文字说明 添加物品iconitem
		let iconItem = GameData.getItemIcon(itemInfoVo,true,false,true,this.vo.getItemNum());
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);

		// let numTF:BaseTextField = ComponentManager.getTextField(itemInfoVo.num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		// numTF.x = temX + itembg.width - numTF.width - 5;
		// numTF.y = temY + itembg.height - numTF.height - 5;
		// this.addChildToContainer(numTF);
		
		
		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg1.width = 387;
		bg1.height = temH;
		bg1.x = temX + temW + 10;
		bg1.y = temY;
		this.addChildToContainer(bg1);

		let nameTF:BaseTextField = ComponentManager.getTextField(itemName,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
		nameTF.x = bg1.x + 8;
		nameTF.y = bg1.y + 8;
		this.addChildToContainer(nameTF);

		let code = this.getUiCode();
		if(this.vo.checkIsJJL)
		{
			let txt1 = ComponentManager.getTextField(LanguageManager.getlocal(`acmainlangdiconjjlUseTxt1-${code}`,[String(this.cfg.addReward)]),18,TextFieldConst.COLOR_WHITE);
			txt1.x = nameTF.x;
			txt1.y = nameTF.y + nameTF.height + 5;
			this.addChildToContainer(txt1);

			let txt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acmainlangdiconjjlUseTxt2-${code}`),18,TextFieldConst.COLOR_WHITE);
			txt2.x = txt1.x;
			txt2.y = txt1.y + txt1.height + 5;
			this.addChildToContainer(txt2);
			this._txt2 = txt2;
			this.freshTxt2();
		}else
		{
			let effectDescTF:BaseTextField = ComponentManager.getTextField(itemInfoVo.desc,20);
			effectDescTF.x = nameTF.x;
			effectDescTF.y = nameTF.y + nameTF.height + 5;
			effectDescTF.width = 366;
			this.addChildToContainer(effectDescTF);
		}

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = temX + 55;
		dragProgressBar.y = bg1.y + bg1.height + 27;
		this.addChildToContainer(dragProgressBar);

		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 90;
		this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
		this._numBg.y = bg1.y + bg1.height + 20;
		this.addChildToContainer(this._numBg);

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		
		this._selectedNumTF.y = this._numBg.y + this._numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		// this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
		this._maxNumTF.y = this._numBg.y + this._numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		this.freshTxt2();
	}

	private freshTxt2():void
	{
		if(this._txt2)
		{
			let num = this.param.data.scoreper;
			this._txt2.text = LanguageManager.getlocal(`acmainlangdiconjjlUseTxt2-${this.getUiCode()}`,[this._useNum+"",String(this._useNum*num*this.cfg.addReward)]);
		}
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private useHandler(param:any):void{
		let view = this;
		if(this.vo.checkIsJJL)
		{
			let num = this.param.data.scoreper;
			let total = this._useNum*num*this.cfg.addReward;
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				msg : LanguageManager.getlocal(`acConquerMainLandTip45-${view.getUiCode()}`, [String(this._useNum),String(total)]),
				title : `itemUseConstPopupViewTitle`,
				touchMaskClose : true,
				callback : ()=>{
					if(!view.vo.isInActivity()){
						App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
						return;
					}		
					//发兑换消息
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT,{
						activeId : view.acTivityId, 
						teamnum : view.param.data.army,
						usenum : this._useNum,
					});
					view.hide();
				},
				handle : view,
				needClose : 1,
				needCancel : true,
			});
		}else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				msg : LanguageManager.getlocal(`acConquerMainLandTip22-${view.getUiCode()}`, [`${this._useNum}`, LanguageManager.getlocal(`acmainlandarmy${view.param.data.army}-${view.getUiCode()}`), `${App.StringUtil.changeIntToText(view.vo.getAddpower(view.param.data.army) + view.cfg.addPower * this._useNum)}`]),
				title : `itemUseConstPopupViewTitle`,
				touchMaskClose : true,
				callback : ()=>{
					if(!view.vo.isInActivity()){
						App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
						return;
					}		
					//发兑换消息
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_USEITEM,{
						activeId : view.acTivityId, 
						teamnum : view.param.data.army,
						usenum : this._useNum,
					});
					view.hide();
				},
				handle : view,
				needClose : 1,
				needCancel : true,
			});			
		}
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2"
		]);
	}

	public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		if(this._selectedNumTF)
		{
			this.removeChildFromContainer(this._selectedNumTF);
			this._selectedNumTF.dispose();
			this._selectedNumTF = null;
		}
		if(this._maxNumTF)
		{
			this.removeChildFromContainer(this._maxNumTF);
			this._maxNumTF.dispose();
			this._maxNumTF = null;
		}
		this._maxNum = 0;
		if(this._numBg)
		{
			this.removeChildFromContainer(this._numBg);
			this._numBg.dispose();
			this._numBg = null;
		}
		this._handler = null;
		super.dispose();
	}
}
/**
 * 门客选择
 * author qianjun
 * date 2017/9/28
 */
class ZhenqifangSelectServantItem extends ServantSelectedScrollItem
{
	// 属性文本
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;
		this._data = data;
		let servantInfoVo;
		if(data.support){
			let equip = ``;
			if(!data.equip || data.equip == ""){
				equip = "servant_half_" + data.servantId;
			}
			else{
				let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.equip);
				equip = skincfg.icon;
			}
			let servantcfg = Config.ServantCfg.getServantItemById(data.servantId);
			servantInfoVo = {
				qualityBoxImgPath : "servant_cardbg_" + data.clv,
				level : data.level,
				clv : data.clv ? data.clv : 1,
				halfImgPath : equip,
				servantName : servantcfg.name,
				total : data.total
			};
		}
		else{
			servantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
		}
		this._servantInfoVo = servantInfoVo;


		let bg:BaseBitmap = BaseBitmap.create("public_9_bg44");
		bg.width = 500;
		bg.height = 120;
		this.addChild(bg);

		this.initServantIcon(servantInfoVo);
		this.initServantInfo();
		
		if(data.inBuzhen){
			let selected = BaseBitmap.create(`zqfinsend`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, selected, bg, [30,0]);
			this.addChild(selected);
		}
		else{
			let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
			useBtn.setColor(TextFieldConst.COLOR_BLACK);
			useBtn.x = bg.width - useBtn.width - 10;
			useBtn.y = bg.height/2 - useBtn.height/2;
			this.addChild(useBtn);

			if(data.need && data.need > data.value){
				let sxbg = BaseBitmap.create(`acchristmasview_smalldescbg`);
				sxbg.width = 95;
				this.addChild(sxbg);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sxbg, useBtn, [0,useBtn.height + 5]);
	
				let notTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangnotmanzu`), 15, TextFieldConst.COLOR_WARN_RED3);
				this.addChild(notTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, notTxt, sxbg);
				if(this._data.support){
					sxbg.visible = notTxt.visible = false;
				}
			}
			if(data.insend){
				let notTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip17`), 15);
				this.addChild(notTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notTxt, useBtn, [0,-notTxt.height-3]);
			}
		}
	}

	protected initServantIcon(servantInfoVo:ServantInfoVo):void
	{	
		let temW:number = 100;
		let iconBgBt:BaseBitmap = BaseLoadBitmap.create(this._data.support ? `servant_cardbg_0` : servantInfoVo.qualityBoxImgPath);//
		iconBgBt.x = 10;
		iconBgBt.y = 12;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
		iconBgBt.scaleY = temW/192;

		let iconBt:BaseBitmap = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
		iconBt.scaleY = (temW-10)/177;
	}


	/**重写该方法 */
	protected initServantInfo():void
	{
		let nameTF:BaseTextField = ComponentManager.getTextField(this._servantInfoVo.servantName,22,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTF.x = 120;
		nameTF.y = 18;
		this.addChild(nameTF);

		if(this._data.support){
			if(this._data.need){
				let flag = this._data.need && this._data.need <= this._data.value
				let attrTF = ComponentManager.getTextField(LanguageManager.getlocal(flag ? "zhenqifangcdtip22" : "zhenqifangcdtip23"),18);
				attrTF.x = 120;
				attrTF.y = 65;
				this.addChild(attrTF);
			}
		}
		else{
			let levelTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv")  + '：' + `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${this._servantInfoVo.level}</font>`,18);
			levelTF.x = 120;
			levelTF.y = 41;
			this.addChild(levelTF);

			let attrTF = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangnotetotal")  + '：' + `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${App.StringUtil.changeIntToText(this._servantInfoVo.total)}</font>`,18);
			attrTF.x = 120;
			attrTF.y = 64;
			this.addChild(attrTF);
			
			//LanguageManager.getlocal(attr) + '：' + App.StringUtil.changeIntToText(mainAtr),
			if(LanguageManager.getlocal("zhenqifangnotetotal") !== this.getAttrStr() && LanguageManager.getlocal("servant_infoLv") !== this.getAttrStr()){
				this._attrTF = ComponentManager.getTextField(this.getAttrStr() + '：' + `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${App.StringUtil.changeIntToText(this._data.support ? this._data.total : this._data.value)}</font>`,18);
				this._attrTF.x = 120;
				this._attrTF.y = 87;
				this.addChild(this._attrTF);
			}
			else{
				nameTF.y = 20;
				levelTF.y = 50;
				attrTF.y = 80;
			}
		}
	}

	private get api(){
        return Api.zhenqifangVoApi;
    }
    
	protected getAttrStr()
	{
		return this._data.text;
	}

	/**按钮文字 */
	protected getBtnLocalName():string
	{
		let view = this;
		return view._data.inBuzhen ? "allianceTaskSendBtnTxt2" : "allianceTaskSendBtnTxt";
	}
	
	protected clickBtnHandler(param:any):void{
		let data = this._data;
						
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT,{
			"index" : this._selectedIndex,
			"id" : data.servantId,
			clv :  data.clv,
			equip : data.equip,
			value : data.value,
		});
	}
    
	public dispose():void
    {
        super.dispose();
    }
}
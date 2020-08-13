/**
 * author:qianjun
 * desc:情缘绘卷Item
*/
class QingyuanDetailItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
	private _data : any = null;
	private _num = 0;

	protected initItem(index:number,data:any){	
        let view = this;
        view._data = data;
        view.width = 565;
		
		let need = data.need;
		let attr : Config.EncounterCfg.EncounterServantInfoCfg = data.attr;

		let have = Api.encounterVoApi.getActiveBuffNum(data.type);

		// let flower = BaseBitmap.create(`qingyuanflower`);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flower, view, [0,10], true);
		// view.addChild(flower);

		let txtcolor = have >= (data.id) ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_WHITE;

		let strarr = [];
		let attrarr = attr.addattr;
		let attrstring = [`strength`, `intelligence`,`politics`,`charm`,`all`,`strength_Constant`,`intelligence_Constant`,
			`politics_Constant`,`charm_Constant`,`all_Constant`,`wife_Intimacy`,`wife_Charm`,`wife_exp`,`wife_Child`];
		for(let j in attr.addattr){
			let sid = j;
			let name = ``;
			if(Config.ServantCfg.getServantItemById(sid)){
				name = Config.ServantCfg.getServantItemById(sid).name;
			}
			else if(Config.WifeCfg.getWifeCfgById(sid)){
				name = Config.WifeCfg.getWifeCfgById(sid).name;
			}
			let unit : Config.EncounterCfg.EncounterAddCfg = attr.addattr[j];
			for(let k in attrstring){
				let attrstr = attrstring[k];
				let num = unit[attrstr];
				if(num > 0){
					//处理
					if(num < 1){
						num *= 100;
					}
					strarr.push(
						`${name}${LanguageManager.getlocal(`qingyuanadd${attrstr}`, [num.toString()])}`
					);
				}
			}
		}

		let childall = attr.all_Child;
		if(childall){
			if(childall < 1){
				childall *= 100;
			}
			strarr.push(
				`${LanguageManager.getlocal(`qingyuanaddall_Child`, [childall.toString()])}`
			);
		}

		if(attr.reward){
			let rewardvo = GameData.formatRewardItem(attr.reward)[0];

			strarr.push(
				`${LanguageManager.getlocal(`qingyuanaddgetrewards`, [rewardvo.itemType, rewardvo.name, rewardvo.num.toString()])}`
			);
			
		}

		for(let i in strarr){
			let isdouble = Number(i) % 2 == 0;
			let addtxt = ComponentManager.getTextField(strarr[i], 22, txtcolor);
			addtxt.x = isdouble ? 0 : (view.width - addtxt.width);
			addtxt.y = Math.floor(Number(i) / 2) * 28 + 5;
			addtxt.name = `str${i}`;
			view.addChild(addtxt);
		}
		view._num = strarr.length;
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_WIFE,this.clickItemHandler,this);
	}
	
	public refresh():void{
		let view = this;
		let have = Api.encounterVoApi.getActiveBuffNum(view._data.type);
		let txtcolor = have >= (view._index + 1) ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_WHITE;
		for(let i = 0; i < view._num; ++ i){
			let txt = <BaseTextField>view.getChildByName(`str${i}`);
			if(txt){
				txt.textColor = txtcolor;
			}
		}
	}

   /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
	}
	public dispose():void{
		let view = this;
		view._num = 0;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}